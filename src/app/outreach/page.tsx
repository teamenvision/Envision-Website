"use client";
import Image from "next/image";
import styles from "../../styles/outreach.module.css";
import data from "../../data/outreach.json";

type Event = {
  title: string;
  description: string;
  image: string;
  category: string;
  date?: string;
};

export default function OutreachPage() {
  return (
    <section className={styles.outreachPage}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Our Outreach</h1>
        <p className={styles.subtitle}>
          Impacting Communities Through Innovation and Action
        </p>
      </header>

      <div className={styles.statsRow}>
        <div className={`${styles.circleStat} ${styles.neonBlue}`}>30+ Events</div>
        <div className={`${styles.circleStat} ${styles.neonGreen}`}>10+ Cities</div>
        <div className={`${styles.circleStat} ${styles.neonYellow}`}>5,000+ People Impacted</div>
      </div>

      <div className={styles.categories}>
        {Object.entries(data).map(([category, events]) => (
          <div key={category} className={styles.categorySection}>
            <h2 className={`${styles.categoryTitle} ${styles[category.toLowerCase().replace(/\s/g, "")]}`}>
              {category}
            </h2>
            <div className={styles.eventGrid}>
              {(events as Event[]).map((event, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={400}
                      height={250}
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    {event.date && <span className={styles.date}>{event.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
