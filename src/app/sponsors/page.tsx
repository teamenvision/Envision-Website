"use client";

import sponsorsData from '@/data/sponsors.json' assert { type: "json" };
const sponsors = sponsorsData as SponsorsByTier;

import Image from "next/image";
import { useState } from "react";
import "@/styles/sponsors.css";

type Sponsor = {
  name: string;
  tier: string;
  image: string;
  link?: string | null; // link optional
};

type SponsorsByTier = {
  [key: string]: Sponsor[];
};

const TIER_ORDER = ["platinum", "diamond", "gold", "silver", "bronze"];

export default function SponsorsPage() {
  const [currentIndex, setCurrentIndex] = useState<Record<string, number>>({
    gold: 0,
    silver: 0,
    bronze: 0,
  });

  const handleScroll = (tier: string, e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const cardWidth = container.firstElementChild?.clientWidth || 1;
    const newIndex = Math.round(container.scrollLeft / (cardWidth + 24)); // 24px = gap
    setCurrentIndex((prev) => ({ ...prev, [tier]: newIndex }));
  };

  const scrollTo = (tier: string, index: number) => {
    const container = document.querySelector(`.${tier}-scroll`) as HTMLElement;
    const card = container?.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "center" });
      setCurrentIndex((prev) => ({ ...prev, [tier]: index }));
    }
  };

  return (
    <main className="sponsors-page">
      {TIER_ORDER.map((tier) =>
        sponsors[tier]?.length ? (
          <section key={tier} className={`tier-section tier-${tier}`}>
            <h2 className="sponsors-title">{tier.toUpperCase()} Sponsors</h2>

            {(tier === "gold" || tier === "silver" || tier === "bronze") ? (
              <>
                <div
                  className={`sponsors-grid ${tier}-scroll`}
                  onScroll={(e) => handleScroll(tier, e)}
                >
                  {sponsors[tier].map((s, idx) => {
                    const cardContent = (
                      <div className={`sponsor-card ${tier}`} key={idx}>
                        <Image src={s.image} alt={s.name} fill className="sponsor-logo" />
                        <div className="sponsor-overlay">{s.name}</div>
                      </div>
                    );
                    // Wrap in <a> if link exists
                    return s.link ? (
                      <a
                        key={idx}
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        {cardContent}
                      </a>
                    ) : cardContent;
                  })}
                </div>
                <div>
                  {sponsors[tier].map((_, idx) => (
                    <span
                      key={idx}
                      className={`dot ${idx === currentIndex[tier] ? `active ${tier}` : ""}`}
                      onClick={() => scrollTo(tier, idx)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="sponsors-grid stacked">
                {sponsors[tier].map((s, idx) => {
                  const cardContent = (
                    <div className={`sponsor-card ${tier}`} key={idx}>
                      <Image src={s.image} alt={s.name} fill className="sponsor-logo" />
                      <div className="sponsor-overlay">{s.name}</div>
                    </div>
                  );
                  return s.link ? (
                    <a
                      key={idx}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      {cardContent}
                    </a>
                  ) : cardContent;
                })}
              </div>
            )}
          </section>
        ) : null
      )}

      {sponsors.previous && sponsors.previous.length > 0 && (
        <section className="tier-section tier-previous">
          <h2 className="sponsors-title">Previous Sponsors</h2>
          <div className="previous-marquee">
            <div className="previous-track">
              {[...sponsors.previous, ...sponsors.previous].map((s, idx) => (
                <div className="previous-card" key={`${s.name}-${idx}`}>
                  <Image src={s.image} alt={s.name} fill className="sponsor-logo" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
