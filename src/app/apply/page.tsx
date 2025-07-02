"use client";
import { useState } from "react";
import formFields from "@/data/applyFields.json";
import "@/styles/apply.css";

type Field = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  condition?: {
    field: string;
    notValues?: string[];
  };
  dependsOn?: string;
  optionsMap?: Record<string, string[]>;

  requiredWhen?: {
    field: string;
    notValues: string[];
  };

};

export default function ApplyForm() {
  const isApplyEnabled = process.env.NEXT_PUBLIC_APPLY_ENABLED === "true";
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  
  
  const fields: Field[] = formFields.fields;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const validate = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    
    if (!emailRegex.test(formData.email || "")) {
      setStatus("Please enter a valid email address.");
      return false;
    }
    if (!phoneRegex.test(formData.phone || "")) {
      setStatus("Please enter a valid phone number.");
      return false;
    }

    for (const field of fields) {
      if (isRequired(field) && !formData[field.name]) {
        setStatus(`Please fill the required field: ${field.label}`);
        return false;
      }
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus("Submitting...");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Application submitted successfully!");
        setFormData({});
      } else {
        setStatus(`Error: ${result.message || "Submission failed."}`);
      }
    } catch (err) {
      console.log(err)
      setStatus("Error: Network or server issue.");
    }
  };
  
  const shouldDisable = (field: Field): boolean => {
    if (field.condition) {
      const current = formData[field.condition.field];
      return field.condition.notValues?.includes(current) ?? false;
    }
    if (field.dependsOn && !formData[field.dependsOn]) return true;
    return false;
  };
  
  
  const getOptions = (field: Field): string[] => {
    if (field.options) return field.options;
    if (field.optionsMap && field.dependsOn) {
      const depValue = formData[field.dependsOn];
      return field.optionsMap[depValue] || [];
    }
    return [];
  };
  const isRequired = (field: Field): boolean => {
    if (field.requiredWhen) {
      const current = formData[field.requiredWhen.field];
      return !field.requiredWhen.notValues?.includes(current);
    }
    return !!field.required;
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
      <form className="apply-form" onSubmit={handleSubmit}>
        {fields.map((field) => {
          
          const disabled = shouldDisable(field);
          const value = formData[field.name] || "";
          const requiredMark = isRequired(field) ? " *" : "";


          return (
            <label key={field.name}>
              {field.label}
              {requiredMark}
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={value}
                  onChange={handleChange}
                  disabled={disabled}
                  required={isRequired(field)}
                >
                  <option value="">Select</option>
                  {getOptions(field).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={value}
                  onChange={handleChange}
                  required={isRequired(field)}
                />
              )}
            </label>
          );
        })}

        <button type="submit">Submit</button>
        <p className="status">{status}</p>
      </form>
    </section>
  );
}
