"use client";
import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import "@/styles/gallery.css";
import carModels from "@/data/cars3d.json";

function ModelViewer({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={window.innerWidth < 768 ? 0.2 : 0.4} />;
}

function Placeholder() {
  return (
    <Html center>
      <div className="placeholder-text">Click a Number Plate</div>
    </Html>
  );
}

export default function GalleryPage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const plateListRef = useRef<HTMLDivElement>(null);

  const handlePlateClick = (index: number) => {
    setSelectedModel(carModels[index].modelPath);
    setActiveIndex(index);
  };

  // Handle Scroll for Mobile Pagination Dots
  useEffect(() => {
    const handleScroll = () => {
      if (plateListRef.current) {
        const scrollLeft = plateListRef.current.scrollLeft;
        const plateWidth = plateListRef.current.children[0]?.clientWidth || 0;
        const index = Math.floor(scrollLeft / plateWidth);
        setActiveIndex(index);
      }
    };

    if (plateListRef.current) {
      plateListRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (plateListRef.current) {
        plateListRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Handle Dot Click
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (plateListRef.current) {
      const plateWidth = plateListRef.current.children[0]?.clientWidth || 0;
      plateListRef.current.scrollTo({
        left: index * plateWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="gallery-page">
      <h2>3D Vehicle Gallery</h2>

      {/* === 3D Viewer Container === */}
      <div className="viewer-container">
        <Canvas camera={{ position: [50, 0, 50], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} />
          <OrbitControls enablePan={true} enableZoom={true} />
          {selectedModel ? <ModelViewer modelPath={selectedModel} /> : <Placeholder />}
        </Canvas>
      </div>

      {/* === Number Plates List === */}
      <div className="plate-scroll-container">
        <div className="plate-list" ref={plateListRef}>
          {carModels.map((car, idx) => {
            const year = car.year.toString();
            const left = year.slice(0, 2);
            const right = year.slice(2);
            return (
              <div
                key={idx}
                className={`number-plate ${idx === activeIndex ? "active" : ""}`}
                onClick={() => handlePlateClick(idx)}
              >
                <span className="year-left">{left}</span>
                <div className="plate-center">
                  <div className="car-name">{car.name}</div>
                  <div className="car-location">{car.location}</div>
                </div>
                <span className="year-right">{right}</span>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="dots-container">
          {carModels.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === activeIndex ? "active-dot" : ""}`}
              onClick={() => handleDotClick(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
