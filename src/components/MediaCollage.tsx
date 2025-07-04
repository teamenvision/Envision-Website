"use client";

import { useState } from "react";
import Image from "next/image";
import collageData from "@/data/outreach.json";
import "../styles/mediacollage.css";

type Category = keyof typeof collageData;
const categories: Category[] = ["stem", "exhibition", "mallshow/roadshow"];

export default function MediaCollage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("stem");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = collageData[selectedCategory];

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

        {/* Gallery with fade-in animation on category change */}
        <div key={selectedCategory} className="gallery flip-in">
          {images.map((src, idx) => (
            <Image
              key={`${selectedCategory}-${idx}`} // forces re-render per category
              src={src}
              alt={`image-${idx}`}
              className="image flip-in"
              width={300}
              height={300}
              onClick={() => setSelectedImage(src)}
              tabIndex={0}
            />
          ))}
        </div>

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
