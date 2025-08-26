"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import collageData from "@/data/stem.json";
import "../styles/mediacollage.css";

type Category = keyof typeof collageData;
const categories: Category[] = ["go-kart", "shell-eco-marathon", "school-drives"];

// Add program details
const programDetails: Record<Category, { title: string; description: string }> = {
  "go-kart": {
    title: "Go-Kart Program",
    description:
      "We also run a 6-month program with Nixor College that brings electric mobility to life through the design and fabrication of four electric go-karts each year. In this program, Team Envision guides and mentors students at every step, from mastering CAD/CAM software to hands-on fabrication, as they apply their engineering knowledge to build fully functional vehicles. The program culminates in Nixor’s annual inter-house event, Nixor Day!, where the go-karts compete, showcasing both technical innovation and team spirit. This initiative provides students with a unique opportunity to experience the full cycle of design, engineering, and competition while fostering creativity and sustainable thinking."
  },
  "shell-eco-marathon": {
    title: "Shell Eco Marathon Program",
    description:
      "We run a year-round STEM program in collaboration with Nixor College, where Team Envision directly teaches and mentors students, immersing them in real-world engineering and innovation. Alongside technical training, we also guide them in non-technical domains such as communications, marketing, and media design, giving them a holistic understanding of how large-scale engineering projects come to life. Through the program, they gain extensive exposure to CAD/CAM software, advanced design techniques, and hands-on fabrication, enabling them to transform classroom learning into practical applications. The journey leads to the Shell Eco-marathon Asia 2025, where these young engineers put their skills to the test, competing for both on-track performance and off-track awards. This initiative not only mentors students toward one of the world’s most prestigious energy efficiency competitions but also lays the foundation for redefining the future of sustainable mobility."
  },

  "school-drives": {
    title: "School Drives",
    description:
      "As part of our mission to inspire the next generation of innovators, Team Envision conducts School Drives, dynamic outreach sessions, held across various schools throughout the year. These drives are designed to spark curiosity and introduce students to the world of STEM, sustainable engineering, and electric mobility. Through interactive presentations, hands-on activities, and live demonstrations, we give students a first-hand look into cutting-edge technologies and real-world applications of classroom concepts. Our team shares insights from projects like the Shell Eco-marathon and the Go-Kart program, offering young minds a glimpse into the exciting possibilities of engineering and innovation. More than just a showcase, School Drives aim to plant the seeds of curiosity, empowering students to think critically, ask bold questions, and envision themselves as future problem-solvers and change-makers in the world of sustainability and mobility."
  }
};

export default function StemCollage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("go-kart");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = collageData[selectedCategory];
  const { title, description } = programDetails[selectedCategory];

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
      {/* Tabs */}
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
        {/* Heading + Paragraph */}
        <div className="program-info">
          <h2 className="program-title">{title}</h2>
          <p className="program-description">{description}</p>
        </div>

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
