import sponsorData from "../../data/sponsors.json";
import Image from "next/image";
import "../../styles/sponsors.css";

export default function Sponsors() {
  return (
    <section className="sponsors-page">
      {/* PLATINUM */}
      <div className="tier-platinum">
        <h2 className="tier-title">Platinum Sponsors</h2>
        <div className="sponsors-grid">
          {sponsorData.platinum.map((sponsor, idx) => (
            <div className="sponsor-card" key={idx}>
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                width={200}
                height={120}
                className="sponsor-logo"
              />
              <div className="sponsor-overlay">{sponsor.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* GOLD */}
      <div className="tier-gold">
        <h2 className="tier-title">Gold Sponsors</h2>
        <div className="sponsors-grid">
          {sponsorData.gold.map((sponsor, idx) => (
            <div className="sponsor-card" key={idx}>
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                width={200}
                height={120}
                className="sponsor-logo"
              />
              <div className="sponsor-overlay">{sponsor.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SILVER */}
      <div className="tier-silver">
        <h2 className="tier-title">Silver Sponsors</h2>
        <div className="sponsors-grid">
          {sponsorData.silver.map((sponsor, idx) => (
            <div className="sponsor-card" key={idx}>
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                width={200}
                height={120}
                className="sponsor-logo"
              />
              <div className="sponsor-overlay">{sponsor.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PREVIOUS Sponsors (MARQUEE) */}
      <div className="previous-section">
        <h2 className="tier-title">Previous Sponsors</h2>
        <div className="marquee-container">
          <div className="marquee-track">
            {sponsorData.previous.map((sponsor, idx) => (
              <div className="previous-card" key={idx}>
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  width={120}
                  height={60}
                  className="sponsor-logo"
                />
              </div>
            ))}
            {/* duplicate for smooth marquee loop */}
            {sponsorData.previous.map((sponsor, idx) => (
              <div className="previous-card" key={`dup-${idx}`}>
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  width={120}
                  height={60}
                  className="sponsor-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
