"use client";
import React from "react";
import Image from "next/image";
import sponsorsData from "../../data/sponsors.json";
import "../../styles/sponsors.css";

type Sponsor = {
  name: string;
  image: string;
};

type SponsorsSectionProps = {
  title: string;
  sponsors: Sponsor[];
  tierColor: string;
  isPrevious?: boolean;
};

const SponsorsSection: React.FC<SponsorsSectionProps> = ({
  title,
  sponsors,
  tierColor,
  isPrevious = false,
}) => {
  return (
    <section className={`sponsors-section ${isPrevious ? "previous-section" : ""}`}>
      <h2 style={{ color: tierColor }} className="sponsors-title">
        {title}
      </h2>
      <div
        className={`sponsors-grid ${isPrevious ? "previous-grid" : "active-grid"}`}
        style={!isPrevious ? { borderColor: tierColor } : undefined}
      >
        {sponsors.map(({ name, image }, idx) => (
          <div
            key={idx}
            className={`sponsor-card ${isPrevious ? "previous-card" : "active-card"}`}
            style={!isPrevious ? { borderColor: tierColor } : undefined}
            aria-label={name}
            title={name}
          >
            <Image
              src={image}
              alt={name}
              width={150}
              height={80}
              objectFit="contain"
              className="sponsor-logo"
              priority={true}
            />
            {!isPrevious && <div className="sponsor-overlay">{name}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default function SponsorsPage() {
  return (
    <main className="sponsors-page">
      <SponsorsSection
        title="Platinum Sponsors"
        sponsors={sponsorsData.platinum}
        tierColor="#00FFFF"
      />
      <SponsorsSection
        title="Gold Sponsors"
        sponsors={sponsorsData.gold}
        tierColor="#FFD700"
      />
      <SponsorsSection
        title="Silver Sponsors"
        sponsors={sponsorsData.silver}
        tierColor="#C0C0C0"
      />
      {sponsorsData.previous && sponsorsData.previous.length > 0 && (
        <SponsorsSection
          title="Previous Sponsors"
          sponsors={sponsorsData.previous}
          tierColor="#888"
          isPrevious
        />
      )}
    </main>
  );
}
