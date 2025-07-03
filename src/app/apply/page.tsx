"use client";
import Link from "next/link";
import "@/styles/apply.css";

export default function ApplyLandingPage() {
  const recruitmentActive = process.env.NEXT_PUBLIC_RECRUITMENT_OPEN === "true";
  const summerCampActive = process.env.NEXT_PUBLIC_SUMMERCAMP_OPEN === "true";

  return (
    <section className="apply-landing">
      <h2>Apply Now</h2>
      <div className="apply-cards">
        <div className="apply-card">
          <h3>Team Recruitment</h3>
          <p>Join the team and build the future of electric mobility.</p>
          {recruitmentActive ? (
            <Link href="/apply/recruitment" className="apply-button">Apply Now</Link>
          ) : (
            <p className="closed">Applications Closed</p>
          )}
        </div>
        <div className="apply-card">
          <h3>Summer Camp</h3>
          <p>Explore, learn, and build with us during the summer.</p>
          {summerCampActive ? (
            <Link href="/apply/summercamp" className="apply-button">Apply Now</Link>
          ) : (
            <p className="closed">Applications Closed</p>
          )}
        </div>
      </div>
    </section>
  );
}
