"use client";
import { useState } from "react";
import "../styles/awards.css";
import awardsData from "../data/awards.json";
import achievementsData from "../data/achievements.json";
import Image from "next/image";

export function Awards() {
  const [awardsIndex, setAwardsIndex] = useState(0);
  const [achievementsIndex, setAchievementsIndex] = useState(0);

  const scrollToIndex = (selector: string, index: number, type: "award" | "achievement") => {
    const container = document.querySelector(selector);
    const card = container?.children?.[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "center" });
      if (type === "award") setAwardsIndex(index);
      else setAchievementsIndex(index);
    }
  };

  // Detect scroll for Awards
  const handleScroll = (selector: string, type: "award" | "achievement") => {
    const container = document.querySelector(selector);
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 1;
    const index = Math.round(scrollLeft / cardWidth);

    if (type === "award") setAwardsIndex(index);
    else setAchievementsIndex(index);
  };

  return (
    <section className="awards-section">
      <h2>Awards & Achievements</h2>

      {/* === Mobile Awards Slider === */}
      <div
        className="awards-slider-mobile awards-slider-inner"
        onScroll={() => handleScroll(".awards-slider-mobile", "award")}
      >
        {awardsData.map((award, idx) => (
          <div className="award-card" key={idx}>
            {award.image && (
              <div className="award-img">
                <Image
                  src={award.image}
                  alt={award.title}
                  width={200}
                  height={120}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div className="award-info">
              <h3>{award.title}</h3>
              <p><strong>Year:</strong> {award.year}</p>
              <p><strong>Competition:</strong> {award.competition}</p>
              <p><strong>Location:</strong> {award.location}</p>
              <p><strong>Position:</strong> {award.position}</p>
              <p><strong>Prize:</strong> {award.prize}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dots dots-mobile-only">
        {awardsData.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === awardsIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(".awards-slider-mobile", idx, "award")}
          />
        ))}
      </div>

      {/* === Desktop Awards Grid === */}
      <div className="awards-cards-container">
        {awardsData.map((award, idx) => (
          <div className="award-card" key={idx}>
            {award.image && (
              <div className="award-img">
                <Image
                  src={award.image}
                  alt={award.title}
                  width={200}
                  height={120}
                  objectFit="cover"
                />
              </div>
            )}
            <div className="award-info">
              <h3>{award.title}</h3>
              <p><strong>Year:</strong> {award.year}</p>
              <p><strong>Competition:</strong> {award.competition}</p>
              <p><strong>Location:</strong> {award.location}</p>
              <p><strong>Position:</strong> {award.position}</p>
              <p><strong>Prize:</strong> {award.prize}</p>
            </div>
          </div>
        ))}
      </div>

      {/* === Achievements Scroll === */}
      <h3 style={{ marginTop: "2rem" }}>Achievements</h3>
      <div
        className="achievements-slider-container achievements-slider-inner"
        onScroll={() => handleScroll(".achievements-slider-container", "achievement")}
      >
        {achievementsData.map((ach, idx) => (
          <div className="achievement-card" key={idx}>
            <h4>{ach.title}</h4>
            <p>{ach.event} - {ach.location}</p>
            <p><strong>{ach.year}</strong></p>
          </div>
        ))}
      </div>
      <div className="dots">
        {achievementsData.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === achievementsIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(".achievements-slider-container", idx, "achievement")}
          />
        ))}
      </div>
    </section>
  );
}
