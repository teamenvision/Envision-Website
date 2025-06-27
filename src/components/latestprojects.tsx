"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../styles/latestprojects.css";

type CompetitionInfo = {
  participated: boolean;
  results: string;
};

type TechnicalSpecs = {
  motor: string;
  battery: string;
  chassis: string;
  aerodynamics: string;
  weight: string;
  topSpeed: string;
  range: string;
};

type LatestProject = {
  name: string;
  year: number;
  location: string;
  image: string;
  competition: CompetitionInfo;
  technicalSpecs: TechnicalSpecs;
  description: string;
};

export default function LatestProjects() {
  const [projects, setProjects] = useState<LatestProject[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/data/latestprojects.json");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch latest projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <section className="latest-projects-section">
      <h2 className="section-title">Latest Projects</h2>

      {loading ? (
        <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
      ) : (
        <div className="latest-projects-grid">
          {projects.map((proj: LatestProject, idx: number) => (
            <div
              className={`latest-project-card ${expandedIndex === idx ? "expanded" : ""}`}
              key={proj.name + proj.year}
            >
              <div className="image-container">
                <Image
                  src={proj.image}
                  alt={proj.name}
                  width={400}
                  height={300}
                  className="project-image"
                  priority
                />
                <div className="year-location">
                  <span>{proj.year}</span> | <span>{proj.location}</span>
                </div>
              </div>

              <div className="project-info">
                <h3 className="project-name">{proj.name}</h3>

                <div className="competition-badge">
                  {proj.competition.participated ? (
                    <span title="Competition Result" className="competed">
                      🏆 {proj.competition.results}
                    </span>
                  ) : (
                    <span title="Not yet competed" className="not-competed">
                      ⚙️ In Development
                    </span>
                  )}
                </div>

                <ul className="tech-specs">
                  {Object.entries(proj.technicalSpecs).map(([key, val]) => (
                    <li key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {val}
                    </li>
                  ))}
                </ul>

                <p className="project-description">
                  {proj.description.length > 160 && expandedIndex !== idx
                    ? proj.description.slice(0, 160) + "..."
                    : proj.description}
                </p>

                <button className="toggle-details-btn" onClick={() => toggleExpand(idx)}>
                  {expandedIndex === idx ? "Show Less" : "Learn More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
