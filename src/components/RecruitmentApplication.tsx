"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "@/styles/recruitment.css";


export default function RecruitmentApplication() {
  const params = useSearchParams();
  const dept = params?.get("dept") || "";
  const subDept = params?.get("subDept") || "";

  const isApplyEnabled = process.env.NEXT_PUBLIC_RECRUITMENT_OPEN === "true";
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (dept) setFormData((p) => ({ ...p, joinDepartment: dept }));
    if (subDept) setFormData((p) => ({ ...p, subDepartment: subDept }));
  }, [dept, subDept]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const newErrors: Record<string, boolean> = {};

    if (!emailRegex.test(formData.email || "")) newErrors.email = true;
    if (!phoneRegex.test(formData.phone || "")) newErrors.phone = true;

    const requiredFields = ["name", "nustRegistration", "email", "phone", "waNumber", "college", "enrolledDepartment", "joinDepartment", "whyTeamEnvision", "significantAccomplishment", "stemThing", "vehiclePreference", "fuelEfficiencyExplain", "semKnowledge"];
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = true;
    });

    if (formData.enrolledDepartment !== "Computer Science" && !formData.year) {
      newErrors.year = true;
    }

    if ((formData.aboutYourself || "").length > 100) {
      newErrors.aboutYourself = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setStatus("Please fix the highlighted fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus("Submitting...");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setShowOverlay(true);
      } else {
        setStatus(`Error: ${result.message || "Submission failed."}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error: Network or server issue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClose = () => {
    setFormData({});
    setErrors({});
    setStatus("");
    setShowOverlay(false);
    router.push("/");
  };

  if (!isApplyEnabled) {
    return (
      <section className="apply-section">
        <h2>Applications are currently closed.</h2>
      </section>
    );
  }

  return (
    <section className="apply-section">
      <h2>Apply Now</h2>
      <p className="helper-link">
        Not sure which department to apply in?{" "}
        <a href="/team#department-leads">Check out our departments</a>.
      </p>

      <form className="apply-form" onSubmit={handleSubmit}>
        <label>
          Name<span className="required-star">*</span>
        </label>
        <input name="name" type="text" value={formData.name || ""} onChange={handleChange} className={errors.name ? "input-error" : ""} />

        <label>
          NUST Registration ID (e.g: 00000XXXXXX)<span className="required-star">*</span>
          </label>
        <input name="nustRegistration" type="number" value={formData.nustRegistration || ""} onChange={handleChange} className={errors.nustRegistration ? "input-error" : ""}/>

        <label>
          Email Address<span className="required-star">*</span>
        </label>
        <input name="email" type="email" value={formData.email || ""} onChange={handleChange} className={errors.email ? "input-error" : ""} />

        <label>
          Phone Number<span className="required-star">*</span>
        </label>
        <input name="phone" type="number" value={formData.phone || ""} onChange={handleChange} className={errors.phone ? "input-error" : ""} />

        <label>
          WhatsApp Number<span className="required-star">*</span>
        </label>
        <input name="waNumber" type="number" value={formData.waNumber || ""} onChange={handleChange} className={errors.waNumber ? "input-error" : ""}/>

        <label>
          College Name<span className="required-star">*</span>
        </label>
        <input name="college" type="text" value={formData.college || ""} onChange={handleChange} className={errors.college ? "input-error" : ""} />

        <label>
          Department Enrolled in University<span className="required-star">*</span>
        </label>
        <select name="enrolledDepartment" value={formData.enrolledDepartment || ""} onChange={handleChange} className={errors.enrolledDepartment ? "input-error" : ""}>
          <option value="">Select</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Electrical">Electrical</option>
          <option value="Naval Architecture">Naval Architecture</option>
          <option value="Computer Science">Computer Science</option>
        </select>

        {formData.enrolledDepartment !== "Computer Science" && formData.enrolledDepartment && (
          <div>
            <label>
              Year<span className="required-star">*</span>
            </label>
            <select name="year" value={formData.year || ""} onChange={handleChange} className={errors.year ? "input-error" : ""}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        )}

        <label>
          Why do you want to join Team Envision?<span className="required-star">*</span>
        </label>
        <textarea
          name="whyTeamEnvision"
          value={formData.whyTeamEnvision || ""}
          onChange={handleChange}
          className={errors.whyTeamEnvision ? "input-error" : ""}
        />

        <label>
          Which department would you be interested in joining? (First Preference)<span className="required-star">*</span>
        </label>
        <select name="joinDepartment" value={formData.joinDepartment || ""} onChange={handleChange} className={errors.joinDepartment ? "input-error" : ""}>
          <option value="">Select</option>
          <option value="Autonomous">Autonomous</option>
          <option value="Electrical">Electrical</option>
          <option value="Marketing">Marketing</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Media">Media</option>
        </select>

        {(formData.joinDepartment === "Mechanical" || formData.joinDepartment === "Electrical") && (
          <div>
            <label>
              Sub-Department (optional)
            </label>
            <select name="subDepartment" value={formData.subDepartment || ""} onChange={handleChange}>
              <option value="">Select</option>
              {formData.joinDepartment === "Mechanical" && (
                <>
                  <option value="Vehicle Dynamics">Vehicle Dynamics</option>
                  <option value="Powertrain">Powertrain</option>
                  <option value="Chassis / Structure / Body">Chassis / Structure / Body</option>
                </>
              )}
              {formData.joinDepartment === "Electrical" && (
                <>
                  <option value="Data & Telemetry">Data & Telemetry</option>
                  <option value="Controls">Controls</option>
                </>
              )}
            </select>
          </div>
        )}

        <label>
          Which department would you be interested in joining? (Second Preference)
        </label>
        <select name="secondaryDepartment" value={formData.secondaryDepartment || ""} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Autonomous">Autonomous</option>
          <option value="Electrical">Electrical</option>
          <option value="Marketing">Marketing</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Media">Media</option>
        </select>

        {(formData.secondaryDepartment === "Mechanical" || formData.secondaryDepartment === "Electrical") && (
          <div>
            <label>
              Sub-Department (optional)
            </label>
            <select name="secondarysubDepartment" value={formData.secondarysubDepartment || ""} onChange={handleChange}>
              <option value="">Select</option>
              {formData.secondaryDepartment === "Mechanical" && (
                <>
                  <option value="Vehicle Dynamics">Vehicle Dynamics</option>
                  <option value="Powertrain">Powertrain</option>
                  <option value="Structure">Structure</option>
                </>
              )}
              {formData.secondaryDepartment === "Electrical" && (
                <>
                  <option value="HV">HV</option>
                  <option value="LV">LV</option>
                  <option value="Telemetry">Telemetry</option>
                  <option value="Controls">Controls</option>
                </>
              )}
            </select>
          </div>
        )}

        <label>
          What has been your significant accomplishment to date?<span className="required-star">*</span>
        </label>
        <textarea
          name="significantAccomplishment"
          value={formData.significantAccomplishment || ""}
          onChange={handleChange}
          className={errors.significantAccomplishment ? "input-error" : ""}
        />

        <label>
          Have you been part of any STEM project/team? If yes, tell us about it?<span className="required-star">*</span>
        </label>
        <textarea
          name="stemThing"
          value={formData.stemThing || ""}
          onChange={handleChange}
          className={errors.stemThing ? "input-error" : ""}
        />

        <label>
          What do you prefer the most in a vehicle?<span className="required-star">*</span>
        </label>
        <select name="vehiclePreference" value={formData.vehiclePreference || ""} onChange={handleChange} className={errors.vehiclePreference ? "input-error" : ""}>
          <option value="">Select</option>
          <option value="Comfort">Comfort</option>
          <option value="Efficiency">Efficiency</option>
          <option value="Speed">Speed</option>
        </select>

        <label>
          How will you explain fuel efficiency to a 5th grader?<span className="required-star">*</span>
        </label>
        <textarea
          name="fuelEfficiencyExplain"
          value={formData.fuelEfficiencyExplain || ""}
          onChange={handleChange}
          className={errors.fuelEfficiencyExplain ? "input-error" : ""}
        />

        <Image
          src={"/images/awards/2025.jpg"}
          alt={"2025"}
          width={600}
          height={400}
        />
        
        <label>
          What do you know about Shell Eco-Marathon?<span className="required-star">*</span>
        </label>
        <textarea
          name="semKnowledge"
          value={formData.semKnowledge || ""}
          onChange={handleChange}
          className={errors.semKnowledge ? "input-error" : ""}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <p className="status">{status}</p>
      </form>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>🎉 Congratulations!</h2>
            <p>Your application has been submitted successfully.</p>
            <button onClick={handleOverlayClose}>Go to Home</button>
          </div>
        </div>
      )}
    </section>
  );
}
