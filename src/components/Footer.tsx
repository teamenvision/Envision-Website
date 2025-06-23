"use client";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import "../styles/footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        © 2025 Team Envision, NUST PNEC
      </div>
      <div className="footer-right">
        <a
          href="https://www.instagram.com/teamenvisionpk/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/SEMPNEC/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://pk.linkedin.com/company/team-pnec-nust"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
}
