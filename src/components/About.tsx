"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "../styles/about.css";

const images = ["/images/about-us/pic (1).jpg", 
                "/images/about-us/pic (2).jpg", 
                "/images/about-us/pic (3).jpg",
                "/images/about-us/pic (4).jpg",
                "/images/about-us/pic (5).jpg", 
                "/images/about-us/pic (6).jpg",
                "/images/about-us/pic (7).jpg",
                "/images/about-us/pic (8).jpg", 
                "/images/about-us/pic (9).jpg",];

export function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const extendedImages = [...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === images.length) {
      setIsTransitioning(true);
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 600);
    } else {

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(true);
      }, 20);
    }
  }, [currentIndex]);

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
          <div>
            <h2>About Us</h2>
            <p>
              Team Envision, a student-led team from NUST-PNEC, is representing Pakistan globally since 2009, designing energy-efficient vehicles for competitions like Shell Eco-Marathon and Teknofest. After pioneering AZAAD-E, Pakistan’s first urban EV, we introduced a new Urban and a Prototype vehicle for Shell Eco-Marathon Qatar 2025. Over the years, our dedication has earned us multiple awards, with our latest achievement being the prestigious Communication Award at Shell Eco-Marathon 2025 Qatar.            </p>
          </div>
        </div>

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
                    alt={`About image ${idx}`}
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
      </div>
    </section>
  );
}
