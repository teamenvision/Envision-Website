"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

    const requiredFields = ["name", "email", "phone", "college", "enrolledDepartment", "joinDepartment"];
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
          <input name="name" type="text" value={formData.name || ""} onChange={handleChange} className={errors.name ? "input-error" : ""} />
        </label>

        <label>
          Email Address<span className="required-star">*</span>
          <input name="email" type="email" value={formData.email || ""} onChange={handleChange} className={errors.email ? "input-error" : ""} />
        </label>

        <label>
          Phone Number<span className="required-star">*</span>
          <input name="phone" type="number" value={formData.phone || ""} onChange={handleChange} className={errors.phone ? "input-error" : ""} />
        </label>

        <label>
          College Name<span className="required-star">*</span>
          <input name="college" type="text" value={formData.college || ""} onChange={handleChange} className={errors.college ? "input-error" : ""} />
        </label>

        <label>
          Department Enrolled in University<span className="required-star">*</span>
          <select name="enrolledDepartment" value={formData.enrolledDepartment || ""} onChange={handleChange} className={errors.enrolledDepartment ? "input-error" : ""}>
            <option value="">Select</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Naval Architecture">Naval Architecture</option>
            <option value="Computer Science">Computer Science</option>
          </select>
        </label>

        {formData.enrolledDepartment !== "Computer Science" && formData.enrolledDepartment && (
          <label>
            Year<span className="required-star">*</span>
            <select name="year" value={formData.year || ""} onChange={handleChange} className={errors.year ? "input-error" : ""}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
        )}

        <label>
          Department to Join in Team<span className="required-star">*</span>
          <select name="joinDepartment" value={formData.joinDepartment || ""} onChange={handleChange} className={errors.joinDepartment ? "input-error" : ""}>
            <option value="">Select</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Marketing">Marketing</option>
            <option value="Media">Media</option>
          </select>
        </label>

        {(formData.joinDepartment === "Mechanical" || formData.joinDepartment === "Electrical") && (
          <label>
            Sub-Department (optional)
            <select name="subDepartment" value={formData.subDepartment || ""} onChange={handleChange}>
              <option value="">Select</option>
              {formData.joinDepartment === "Mechanical" && (
                <>
                  <option value="Vehicle Dynamics">Vehicle Dynamics</option>
                  <option value="Powertrain">Powertrain</option>
                  <option value="Structure">Structure</option>
                </>
              )}
              {formData.joinDepartment === "Electrical" && (
                <>
                  <option value="HV">HV</option>
                  <option value="LV">LV</option>
                  <option value="Telemetry">Telemetry</option>
                  <option value="Controls">Controls</option>
                </>
              )}
            </select>
          </label>
        )}

        <label>
          Secondary Department to Join (optional)
          <select name="secondaryDepartment" value={formData.secondaryDepartment || ""} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Marketing">Marketing</option>
            <option value="Media">Media</option>
          </select>
        </label>

        {(formData.secondaryDepartment === "Mechanical" || formData.secondaryDepartment === "Electrical") && (
          <label>
            Sub-Department (optional)
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
          </label>
        )}

        <label>
          Tell us about yourself (max 100 characters)
          <textarea name="aboutYourself" maxLength={100} value={formData.aboutYourself || ""} onChange={handleChange} className={errors.aboutYourself ? "input-error" : ""} />
        </label>

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
