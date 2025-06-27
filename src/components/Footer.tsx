"use client";

import { useEffect, useState } from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import "../styles/footer.css";

type ContactData = {
  whatsapp: { name: string; phone: string }[];
  emails: string[];
};

export function Footer() {
  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/data/contact.json");
        const data = await res.json();
        setContactData(data);
      } catch (error) {
        console.error("Failed to load contact data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-socials">
        <a href="https://www.instagram.com/teamenvisionpk/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/SEMPNEC/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://pk.linkedin.com/company/team-pnec-nust" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedinIn />
        </a>
      </div>

      {contactData && (
        <div className="footer-contacts">
          <h4>Whatsapp</h4>
          {contactData.whatsapp.map((lead, idx) => (
            <p key={`${lead.name}-${idx}`}>
              <FaWhatsapp />{" "}
              <a href={`https://wa.me/${lead.phone.replace("+", "")}`} target="_blank" rel="noopener noreferrer">
                {lead.name}
              </a>
            </p>
          ))}

          <h4>Email</h4>
          {contactData.emails.map((email, idx) => (
            <p key={`${email}-${idx}`}>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          ))}
        </div>
      )}

      <div className="footer-trademark">
        © 2025 Team Envision, NUST PNEC
      </div>
    </footer>
  );
}
