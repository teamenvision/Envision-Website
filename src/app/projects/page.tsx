"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../../styles/projects.css";
import LatestProjects from "../../components/latestprojects";

type Project = {
  name: string;
  image: string;
  year: number;
  location: string;
  description: string;
};

export default function Projects() {
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [panelContent, setPanelContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/data/projects.json");
        const data = await res.json();
        setProjectData(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const openPanel = (fullText: string) => {
    setPanelContent(fullText);
    setShowPanel(true);
  };

  const closePanel = () => {
    setShowPanel(false);
  };

  return (
    <section className="projects-section">
      <LatestProjects />
      <h2>Previous Vehicles</h2>

      {loading ? (
        <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
      ) : (
        <div className="project-grid">
          {projectData.map((car, index) => {
            const yearStr = car.year.toString();
            const leftYear = yearStr.slice(0, 2);
            const rightYear = yearStr.slice(2);
            const isActive = activeIndex === index;

            return (
              <div className="project-card" key={`car-${index}`}>
                <div className="car-image-wrapper">
                  <Image
                    src={car.image}
                    alt={car.name}
                    width={300}
                    height={200}
                    className={`car-image ${isActive ? "darkened" : ""}`}
                  />
                  {isActive && (
                    <div className="overlay-description">
                      <div>
                        {car.description.length > 150 ? (
                          <>
                            {car.description.slice(0, 140)}...
                            <button
                              className="read-more-btn"
                              onClick={() => openPanel(car.description)}
                            >
                              Read More
                            </button>
                          </>
                        ) : (
                          car.description
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="number-plate"
                  onClick={() => handleToggle(index)}
                >
                  <span className="year-left">{leftYear}</span>
                  <div className="plate-center">
                    <div className="car-name">{car.name}</div>
                    <div className="car-location">{car.location}</div>
                  </div>
                  <span className="year-right">{rightYear}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showPanel && (
        <div className="slide-panel">
          <button className="close-btn" onClick={closePanel}>
            ×
          </button>
          <p>{panelContent}</p>
        </div>
      )}
    </section>
  );
}
