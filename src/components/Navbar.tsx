import Link from "next/link";
import Image from "next/image";
import "../styles/navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <Image
        src="/images/logo.png"
        alt="Team Envision Logo"
        width={400}
        height={120}
        className="navbar-logo"
        priority
      />
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/projects">Projects</a>
        <a href="/sponsors">Sponsors</a>
        <a href="/team">Team</a>
        <a href="/apply">Apply</a>
      </div>
    </nav>
  );
}
