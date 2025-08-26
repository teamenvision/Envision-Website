"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import collageData from "@/data/outreach.json";
import "../styles/mediacollage.css";

type Category = keyof typeof collageData;
const categories: Category[] = ["exhibition", "mallshow-roadshow"];

export default function OutreachCollage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("exhibition");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = collageData[selectedCategory];

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
        root: document.querySelector(".mobile-scroll"),
        threshold: 0.5,
      }
    );

    document
      .querySelectorAll(".mobile-slide")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selectedCategory]);

  return (
    <section>
      <div className="tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.replace(/-/g, " ").toUpperCase()}
          </button>
        ))}
      </div>

      <div className="container">
        {/* Desktop Gallery */}
        <div className="desktop-gallery">
          <div key={selectedCategory} className="gallery flip-in">
            {images.map((src, idx) => (
              <Image
                key={`${selectedCategory}-${idx}`}
                src={src}
                alt={`image-${idx}`}
                className="image"
                width={300}
                height={300}
                onClick={() => setSelectedImage(src)}
                tabIndex={0}
              />
            ))}
          </div>
        </div>

        {/* Mobile Scrollable Gallery */}
        <div className="mobile-scroll">
          {images.map((src, idx) => (
            <div key={idx} className="mobile-slide" data-index={idx}>
              <Image
                src={src}
                alt={`image-${idx}`}
                width={300}
                height={300}
                className="image flip-in"
                onClick={() => setSelectedImage(src)}
                tabIndex={0}
              />
            </div>
          ))}
        </div>

        {/* Scroll Dots */}
        <div className="mobile-dots">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${currentSlide === idx ? "active" : ""}`}
            />
          ))}
        </div>

        {/* Modal View */}
        {selectedImage && (
          <div className="modal" onClick={() => setSelectedImage(null)}>
            <span className="closeBtn">&times;</span>
            <img src={selectedImage} alt="Full View" className="modalImage" />
          </div>
        )}
      </div>
    </section>
  );
}
