"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "../styles/about.css";

const logos = [
  "/images/about-nust/nust-logo.png",
  "/images/about-nust/pnec-logo.png",
  "/images/about-nust/nust main campus.jpg",
];

export function AboutNust() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const extendedImages = [...logos, logos[0]]; // for smooth looping

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === logos.length) {
      setIsTransitioning(true);
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 600);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsTransitioning(true), 20);
    }
  }, [currentIndex]);

  return (
    <section className="about-section reverse-layout">
      {/* Left: Logo Carousel */}
      <div className="about-container">

        <div className="about-images">
            <div className="image-wrapper">
            <div
                className="image-slider"
                style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: isTransitioning ? "transform 0.6s ease-in-out" : "none",
                }}
            >
                {extendedImages.map((src, idx) => (
                <div className="image-frame" key={idx}>
                    <Image
                    src={src}
                    alt={`NUST logo ${idx}`}
                    width={600}
                    height={400}
                    className="carousel-image"
                    priority={idx === 0}
                    />
                </div>
                ))}
            </div>
            </div>
        </div>

        <div className="about-text">
            <h2>About NUST</h2>
            <ul>
            <li>
                NUST is ranked 353<sup>rd</sup> globally, 60<sup>th</sup> in Asia, and 1<sup>st</sup> in Pakistan for the 7<sup>th</sup> year thanks to its highly qualified faculty and continuous improvement.
            </li>
            <li>
                NUST supports 15+ student teams globally, maintaining top standards in science, technology, and innovation, with strong academic, research, and industry ties.
            </li>
            <li>
                As a NUST-affiliated team, Team Envision benefits from expert guidance, cutting-edge facilities, and a focus on sustainable technologies.
            </li>
            </ul>
        </div>
      </div>
    </section>
  );
}
