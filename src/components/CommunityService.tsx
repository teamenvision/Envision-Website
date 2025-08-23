"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import outreachData from "@/data/outreach.json";
import "../styles/community.css";

export default function CommunityService() {
  const images = outreachData.community || [];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const idx = Number(entry.target.dataset.index);
            if (!isNaN(idx)) setCurrentSlide(idx);
          }
        });
      },
      {
        root: document.querySelector(".mobile-gallery"),
        threshold: 0.5,
      }
    );

    document
      .querySelectorAll(".mobile-slide")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="community-section">
      <h2 className="community-heading">Community Service</h2>
      <p>Community service is at the heart of Team Envision’s mission. Over the years, we’ve participated in various initiatives—from flood relief, blood donation, and school visits to helping underserved neighborhoods—with a focus on making a meaningful, lasting impact.</p>
      <div className="community-gallery desktop-gallery">
        {images.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`community-${idx}`}
            className="community-img"
            width={300}
            height={300}
            onClick={() => setSelectedImage(src)}
          />
        ))}
      </div>

      <div className="mobile-gallery">
        {images.map((src, idx) => (
          <div key={idx} className="mobile-slide" data-index={idx}>
            <Image
              src={src}
              alt={`community-${idx}`}
              width={300}
              height={300}
              className="community-img"
              onClick={() => setSelectedImage(src)}
            />
          </div>
        ))}
      </div>

      <div className="mobile-community-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`community-dot ${currentSlide === idx ? "active" : ""}`}
          />
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <span className="closeBtn">&times;</span>
          <img src={selectedImage} alt="Full View" className="modalImage" />
        </div>
      )}
    </section>
  );
}
