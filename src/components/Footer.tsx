"use client";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "../styles/footer.css";
import contactData from "../data/contact.json";

export function Footer() {
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

      <div className="footer-contacts">
        {/* <h4>Whatsapp</h4>
        {contactData.whatsapp.map((lead, idx) => (
          <p key={idx}>
            <FaWhatsapp />{" "}
            <a href={`https://wa.me/${lead.phone.replace("+", "")}`} target="_blank" rel="noopener noreferrer">
              {lead.name}
            </a>
          </p>
        ))} */}

        <h4>Email</h4>
        {contactData.emails.map((email, idx) => (
          <p key={idx}>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        ))}
      </div>

      <div className="footer-trademark">
        © 2009-{new Date().getFullYear()} Team Envision, NUST PNEC
      </div>
    </footer>
  );
}
