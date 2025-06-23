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
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/sponsors">Sponsors</Link>
        <Link href="/team">Team</Link>
        <Link href="/apply">Apply</Link>
      </div>
    </nav>
  );
}
