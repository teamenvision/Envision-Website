"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-header">
          <div className="navbar-logo-container">
            <Link href="/">
              <Image
                src="/images/Team Envision Logo.png"
                alt="Team Envision Logo"
                width={300}
                height={100}
                className="navbar-logo"
              />
            </Link>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>

        <div className="navbar-links desktop-only">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/sponsors">Sponsors</Link>
          <Link href="/team">Team</Link>
          <Link href="/apply">Apply</Link>
        </div>
      </nav>

      {menuOpen && (
        <div className="navbar-overlay">
          <button
            className="close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
          <div className="navbar-links-mobile">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
            <Link href="/sponsors" onClick={() => setMenuOpen(false)}>Sponsors</Link>
            <Link href="/team" onClick={() => setMenuOpen(false)}>Team</Link>
            <Link href="/apply" onClick={() => setMenuOpen(false)}>Apply</Link>
          </div>
        </div>
      )}
    </>
  );
}
