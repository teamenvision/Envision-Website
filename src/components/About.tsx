"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "../styles/about.css";

const images = ["/images/pic1.jpg", "/images/pic2.jpg", "/images/pic3.jpg"];

export function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const extendedImages = [...images, images[0]]; // Clone first image

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // At cloned image (index == images.length), reset to 0 without transition
    if (currentIndex === images.length) {
      setIsTransitioning(true); // transition to clone
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false); // disable transition
        setCurrentIndex(0);       // jump to real image 0
      }, 600); // match CSS transition time
    } else {
      // Resume transition for normal images
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(true);
      }, 20); // tiny delay to re-enable
    }
  }, [currentIndex]);

  return (
    <section className="about-section">
      <div className="about-text">
        <h2>About Us</h2>
        <p>
          Team Envision was founded in 2009 at NUST-PNEC. We design ultra-efficient and electric vehicles for global competitions like Shell Eco-Marathon. Over the years, we've built a legacy of innovation, winning multiple international awards and representing Pakistan with pride.
        </p>
      </div>

      <div className="vertical-divider" />

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
    </section>
  );
}
