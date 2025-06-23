"use client";
import "../styles/awards.css";
import awardsData from "../data/awards.json";
import achievementsData from "../data/achievements.json";
import Image from "next/image";

export function Awards() {
  return (
    <section className="awards-section">
      <h2>Awards & Achievements</h2>

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

      <h3 style={{ marginTop: "2rem" }}>Achievements</h3>
      <div className="achievements-cards-container">
        {achievementsData.map((ach, idx) => (
          <div className="achievement-card" key={idx}>
            <h4>{ach.title}</h4>
            <p>{ach.event} - {ach.location}</p>
            <p><strong>{ach.year}</strong></p>
          </div>
        ))}
      </div>
    </section>
  );
}
