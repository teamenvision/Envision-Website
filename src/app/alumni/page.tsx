"use client";
import { useEffect, useState } from "react";
import alumniData from "@/data/alumni.json";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import "@/styles/alumni.css";

const WORD_LIMIT = 100;

export default function Alumni() {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [filteredAlumni, setFilteredAlumni] = useState(alumniData);

  useEffect(() => {
    if (selectedYear === "all") {
      setFilteredAlumni(alumniData);
    } else {
      setFilteredAlumni(alumniData.filter((a) => a.year === selectedYear));
    }
  }, [selectedYear]);

  const years = Array.from(new Set(alumniData.map((a) => a.year))).sort((a, b) => b - a);

  return (
    <section className="alumni-container">
      <div className="alumni-hero">
        <h1 className="alumni-heading">Our Alumni</h1>
        <select
          className="alumni-filter"
          value={selectedYear}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedYear(val === "all" ? "all" : parseInt(val));
          }}
        >
          <option value="all">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="alumni-grid">
        {filteredAlumni.map((alumnus, idx) => (
          <div className="alumni-card" key={idx}>
            <div className="alumni-img-wrapper">
              <Image
                src={alumnus.image}
                alt={alumnus.name}
                width={300}
                height={400}
                className="alumni-img"
              />
            </div>
            <div className="alumni-info">
              <h2>{alumnus.name}</h2>
              <p className="alumni-year">{alumnus.year}</p>
              {alumnus.linkedin && (
                <a
                  href={alumnus.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-icon"
                >
                  <FaLinkedinIn />
                </a>
              )}
              <p className="alumni-bio">
                {alumnus.bio.split(" ").slice(0, WORD_LIMIT).join(" ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
