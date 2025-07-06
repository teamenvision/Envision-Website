"use client";

import { useState } from "react";
import "@/styles/summercamp.css";

export default function SummerCampApplication() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  const [emailStatus, setEmailStatus] = useState<"available" | "duplicate" | "checking" | null>(null);
  const [emailCheckTimer, setEmailCheckTimer] = useState<NodeJS.Timeout | null>(null);

  const [cnicStatus, setCnicStatus] = useState<"available" | "duplicate" | "checking" | null>(null);
  const [cnicCheckTimer, setCnicCheckTimer] = useState<NodeJS.Timeout | null>(null);

  const isApplyEnabled = process.env.NEXT_PUBLIC_SUMMERCAMP_OPEN === "true";
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    cnic: "",
    phone: "",
    whatsapp: "",
    emergencyContact: "",
    email: "",
    applyingAs: "Individual",
    groupMembers: [
      { name: "", cnic: "", contact: "" },
      { name: "", cnic: "", contact: "" },
      { name: "", cnic: "", contact: "" },
    ],
    institution: "",
    grade: "",
    courses: [] as string[],
    experience: "",
    codeOfConduct: false,
    parentalConsent: false,
    paymentScreenshot: null as File | null,
  });

  const [status, setStatus] = useState("");
  const isGroup = formData.applyingAs === "Group of 4";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, paymentScreenshot: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === "email") {
        setEmailStatus("checking");
        if (emailCheckTimer) clearTimeout(emailCheckTimer);

        const timer = setTimeout(async () => {
          try {
            const res = await fetch("/api/summer-camp-check-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: value }),
            });
            const result = await res.json();
            console.log(result)
            if (result.exists) {
              setEmailStatus("duplicate");
            } else {
              setEmailStatus("available");
            }
          } catch (err) {
            setEmailStatus(null);
            console.error("Email check failed", err);
          }
        }, 500); // debounce delay

        setEmailCheckTimer(timer);
      }
      
      if (name === "cnic") {
        setCnicStatus("checking");
        if (cnicCheckTimer) clearTimeout(cnicCheckTimer);

        const timer = setTimeout(async () => {
          try {
            const res = await fetch("/api/summer-camp-check-cnic", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ cnic: value }),
            });
            const result = await res.json();
            console.log(result)
            if (result.exists) {
              setCnicStatus("duplicate");
            } else {
              setCnicStatus("available");
            }
          } catch (err) {
            setCnicStatus(null);
            console.error("Cnic check failed", err);
          }
        }, 500); // debounce delay

        setCnicCheckTimer(timer);
      }
    }
  };


  const handleCourseToggle = (course: string) => {
    setFormData((prev) => {
      const exists = prev.courses.includes(course);
      return {
        ...prev,
        courses: exists ? prev.courses.filter((c) => c !== course) : [...prev.courses, course],
      };
    });
  };

  const handleGroupMemberChange = (i: number, field: "name" | "cnic" | "contact", value: string) => {
    const updated = [...formData.groupMembers];
    updated[i][field] = value;
    setFormData((prev) => ({ ...prev, groupMembers: updated }));
  };

  const validateStep = (): boolean => {
    if (step === 1) {
      if (!formData.name || !formData.age || !formData.gender || !formData.cnic || !formData.phone || !formData.email)
        return setStatus("Please fill all required personal info."), false;

      const phoneRegex = /^[0-9]{10,15}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!phoneRegex.test(formData.phone) || !phoneRegex.test(formData.whatsapp)) {
        return setStatus("Phone numbers must be 10-15 digits."), false;
      }
      if (!emailRegex.test(formData.email)) {
        return setStatus("Invalid email format."), false;
      }
      if (emailStatus === "duplicate") {
        return setStatus("Email is already registered."), false;
      }
      if (emailStatus === "checking") {
        return setStatus("Please wait while we verify the email..."), false;
      }
      if (isGroup && formData.groupMembers.some(m => !m.name || !m.cnic || !m.contact)) {
        return setStatus("Fill all group member details."), false;
      }
    }

    if (step === 2 && (!formData.institution || !formData.grade)) {
      return setStatus("Please fill academic info."), false;
    }

    if (step === 3 && formData.courses.length === 0) {
      return setStatus("Select at least one course."), false;
    }

    if (step === 4) {
      if (!formData.codeOfConduct || (parseInt(formData.age) < 18 && !formData.parentalConsent)) {
        return setStatus("You must agree to all required conditions."), false;
      }
      if (!formData.paymentScreenshot) {
        return setStatus("Upload payment screenshot."), false;
      }
    }

    setStatus("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true); // disable submit button
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "groupMembers" || key === "courses") {
          payload.append(key, JSON.stringify(value));
        } else if (key === "paymentScreenshot" && value instanceof File) {
          payload.append(key, value);
        } else {
          payload.append(key, value as string);
        }
      });

      const res = await fetch("/api/summer-camp", {
        method: "POST",
        body: payload,
      });

      const result = await res.json();
      setShowModal(true); // Show modal
      setStatus(result.message || "Submitted successfully!");
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("Submission failed. Please try again.");
    } finally {
      setLoading(false); // re-enable button
    }
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
      <h2>NUST Summer Program - Powered by Team Envision</h2>
      <p className="intro-text">
        Sign up below!
        <br />
        This immersive program is being organized in collaboration with Team Envision – NUST’s premier student-led
        technical society – and offers participants the opportunity to gain hands-on experience across key engineering
        disciplines including Mechanical, Electrical, Computer Science, and Marketing.
        <br />
        <strong>Dates:</strong> 15th - 18th July 2025<br />
        <strong>Location:</strong> PNEC - NUST<br />
        <strong>Timings:</strong> 0930 HOURS - 1530 HOURS<br />
        <strong>Registration Fee:</strong> Individual: PKR 2,500/- &nbsp;&nbsp; Group of 4: PKR 8,000/-<br />
        <strong>Contact:</strong> 0331-0423186 / 0330-2791166<br />
        <br />
        Fill in the details below to secure your spot. Limited seats available!
      </p>

      <div className="step-indicator">Step {step} of 4</div>
      <form className="apply-form" onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <label>Name<span className="req">*</span></label>
            <input name="name" value={formData.name} onChange={handleInputChange} required />

            <label>Age<span className="req">*</span></label>
            <input name="age" type="number" value={formData.age} onChange={handleInputChange} required />

            <label>Gender<span className="req">*</span></label>
            <select name="gender" value={formData.gender} onChange={handleInputChange} required>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <label>CNIC<span className="req">*</span></label>
            <input
              name="cnic"
              type="number"
              value={formData.cnic}
              onChange={handleInputChange}
              required
              style={{
                borderColor:
                  cnicStatus === "duplicate"
                    ? "red"
                    : cnicStatus === "available"
                    ? "green"
                    : undefined,
              }}
            />
            {cnicStatus === "checking" && (
              <span className="email-status">Checking...</span>
            )}
            {cnicStatus === "available" && (
              <span className="email-status" style={{ color: "green" }}>✔ Available</span>
            )}
            {cnicStatus === "duplicate" && (
              <span className="email-status" style={{ color: "red" }}>❌ Already used</span>
            )}

            <label>Phone Number<span className="req">*</span></label>
            <input name="phone" type="number" value={formData.phone} onChange={handleInputChange} required />
            
            <label>WhatsApp Number<span className="req">*</span></label>
            <input name="whatsapp" type="number" value={formData.whatsapp} onChange={handleInputChange} required />
            
            <label>Emergency Contact Number<span className="req">*</span></label>
            <input name="emergencyContact" type="number" value={formData.emergencyContact} onChange={handleInputChange} required />
            
            <label>Email Address<span className="req">*</span></label>
            <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    borderColor:
                      emailStatus === "duplicate"
                        ? "red"
                        : emailStatus === "available"
                        ? "green"
                        : undefined,
                  }}
              />
                {emailStatus === "checking" && (
                  <span className="email-status">Checking...</span>
                )}
                {emailStatus === "available" && (
                  <span className="email-status" style={{ color: "green" }}>✔ Available</span>
                )}
                {emailStatus === "duplicate" && (
                  <span className="email-status" style={{ color: "red" }}>❌ Already used</span>
                )}
            
            <label>Applying as<span className="req">*</span></label>
            <select name="applyingAs" value={formData.applyingAs} onChange={handleInputChange}>
              <option value="Individual">Individual</option>
              <option value="Group of 4">Group of 4</option>
            </select>

            {isGroup &&
              formData.groupMembers.map((member, i) => (
                <div key={i}>
                  <h4>Group Member {i + 1}</h4>
                  <label>Name<span className="req">*</span></label>
                  <input value={member.name} onChange={(e) => handleGroupMemberChange(i, "name", e.target.value)} required />

                  <label>CNIC<span className="req">*</span></label>
                  <input type="number" value={member.cnic} onChange={(e) => handleGroupMemberChange(i, "cnic", e.target.value)} required />

                  <label>Contact<span className="req">*</span></label>
                  <input type="number" value={member.contact} onChange={(e) => handleGroupMemberChange(i, "contact", e.target.value)} required />
                </div>
              ))}
          </>
        )}

        {step === 2 && (
          <>
            <label>Institution Name<span className="req">*</span></label>
            <input name="institution" value={formData.institution} onChange={handleInputChange} required />

            <label>Current Grade / Year<span className="req">*</span></label>
            <input name="grade" value={formData.grade} onChange={handleInputChange} required />
          </>
        )}

        {step === 3 && (
          <>
            <label>Select Courses<span className="req">*</span></label>
            <div className="multiselect-options">
              {["Essentials Cad and 3D", "Electronics Workshop", "Embedded System", "Marketing in Engineering"].map((course) => (
                <label key={course}>
                  <input type="checkbox" checked={formData.courses.includes(course)} onChange={() => handleCourseToggle(course)} />
                  {course}
                </label>
              ))}
            </div>
            
            <label>Do you have any prior experience in the courses you have selected?</label>
            <textarea name="experience" value={formData.experience} onChange={handleInputChange} />
          </>
        )}

        {step === 4 && (
          <>
            <p>Please agree to the following terms before submission:</p>
            <label><input type="checkbox" name="codeOfConduct" checked={formData.codeOfConduct} onChange={handleInputChange} /> <span className="req">*</span> I hereby confirm that the information provided is accurate, and I agree to follow all rules and guidelines within the duration of this camp.</label>
            {parseInt(formData.age) < 18 && (
              <label><input type="checkbox" name="parentalConsent" checked={formData.parentalConsent} onChange={handleInputChange} /> <span className="req">*</span> I have informed my parents/guardians and obtained their permission to attend the NUST summer camp powered by Team Envision</label>
            )}

            <h3>Payment Procedure:</h3>
            <p><b>Bank Name:</b> Nayapay <br></br>
              <b>Account Name:</b> Hamdan Ahmed Qazi <br></br>
              <b>Account Number:</b> 0331-0423186<br></br>
            </p>
            <label>Upload Payment Screenshot<span className="req">*</span>
              <input type="file" name="paymentScreenshot" accept="image/*" onChange={handleInputChange} required />
            </label>
            <div>Fee: {isGroup ? "PKR 8000 (Group of 4)" : "PKR 2500 (Individual)"}</div>
          </>
        )}

        <div className="form-nav">
          {step > 1 && <button type="button" onClick={() => setStep(step - 1)}>Back</button>}
          {step < 4 ? (
            <button
              type="button"
              onClick={async () => {
                if (validateStep()) setStep(step + 1);
              }}
              disabled={step === 1 && (emailStatus === "checking" || emailStatus === "duplicate" || cnicStatus === "checking" || cnicStatus === "duplicate")}
            >
              {step === 1 && (emailStatus === "checking" || cnicStatus === "checking") ? "Checking..." : "Next"}
            </button>
          ) : (
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
        {status && <p className="status">{status}</p>}
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>🎉 Registration Successful!</h3>
            <p>Thank you for applying to the NUST Summer Program.</p>
            <button onClick={() => {
              setShowModal(false);
              // Option 1: Reset form
              setStep(1);
              setFormData({
                name: "",
                age: "",
                gender: "",
                cnic: "",
                phone: "",
                whatsapp: "",
                emergencyContact: "",
                email: "",
                applyingAs: "Individual",
                groupMembers: [
                  { name: "", cnic: "", contact: "" },
                  { name: "", cnic: "", contact: "" },
                  { name: "", cnic: "", contact: "" },
                ],
                institution: "",
                grade: "",
                courses: [],
                experience: "",
                codeOfConduct: false,
                parentalConsent: false,
                paymentScreenshot: null,
              });
              setStatus("");
              
              // Option 2: Redirect (uncomment if needed)
              window.location.href = "/";
            }}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
