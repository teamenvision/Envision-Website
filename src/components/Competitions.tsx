"use client";
import Image from "next/image";
import "../styles/competitions.css";
import { useState, useEffect } from "react";
import rawCompetitions from "../data/competitions.json";

type Competition = {
  key: "shell" | "teknofest";
  logo: string;
  name: string;
  title: string;
  map: string;
  theme: string;
  stats: string[];
  sections: { heading: string; points: string[] }[];
};
const competitions = rawCompetitions as Competition[];


export function Competitions() {
  const [activePanel, setActivePanel] = useState<"shell" | "teknofest" | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closePanel = () => setActivePanel(null);

  return (
    <section className="competitions-section">
      <h2>Competitions We Participate In</h2>
      <div className="competitions-grid">
        {competitions.map((comp: Competition) => (
          <div className="logo-container" key={comp.key}>
            <button className={comp.theme === "yellow" ? "neon-yellow" : "neon-red"} onClick={() => setActivePanel(comp.key)}>
              <Image
                src={comp.logo}
                alt={comp.name}
                width={300}
                height={100}
                className="logo"
              />
            </button>
          </div>
        ))}
      </div>

      {competitions.map((comp: Competition) =>
        activePanel === comp.key ? (
          <div key={comp.key} className="competition-slide-panel">
            <button className="competition-close-btn" onClick={closePanel}>×</button>
            <div className={`competition-content ${comp.key}`}>
              
              {/* Bullet Points */}
              <div className="competition-left">
                <ul className="bullet-list">
                  {comp.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className={`section-heading ${comp.theme}`}>{section.heading}</h3>
                      {section.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </div>
                  ))}
                </ul>
              </div>

              {/* Logo, Title, Map */}
              <div className="competition-center">
                <Image
                  src={comp.logo}
                  alt={comp.name}
                  width={isMobile ? 250 : 400}
                  height={100}
                  className="logo"
                />
                <h2 className={comp.theme}>{comp.title}</h2>
                <Image
                  src={comp.map}
                  alt={`${comp.name} map`}
                  width={500}
                  height={500}
                  className={`map-image ${comp.theme === "neon-yellow" ? "neon-yellow-glow" : "neon-red-glow"}`}
                />
              </div>

              {/* Stats Circles */}
              <div className="competition-right">
                <div>
                  {comp.stats.map((stat, i) => (
                    <div key={i} className={`circle-stat ${comp.theme}`}>
                      {stat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null
      )}
    </section>
  );
}
