"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/plantationstats.css";

type Stat = {
  label: string;
  value: number;
  themeColor: "green" | "blue";
};

const stats: Stat[] = [
  { label: "Trees Planted Through Plantation Drives", value: 500, themeColor: "green" },
  { label: "KGs of Waste Collected Through Beach Cleaning Campaings", value: 150, themeColor: "blue" },
];

export default function PlantationStats() {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setStartCount(true);
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="plantation-section" ref={sectionRef}>
      <h2 className="section-title">Environmental Outreach Impact</h2>
      <div className="stats-wrapper">
        {stats.map((stat, idx) => (
          <div className={`stat-card ${stat.themeColor}`} key={idx}>
            <div className="stat-number">
              {startCount ? (
                <CountUp target={stat.value} duration={2000} />
              ) : (
                0
              )}
              <span> +</span>
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// CountUp component
function CountUp({ target, duration }: { target: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(target / (duration / 16)); // 60fps approx
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
}
