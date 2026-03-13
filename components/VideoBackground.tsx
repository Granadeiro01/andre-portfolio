"use client";

import { useState, useEffect } from "react";

const BACKGROUND_IMAGES = [
  "/images/bg-running.png",
];

const IMAGE_INTERVAL = 10000; // 10 seconds

export function VideoBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, IMAGE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 w-full h-full">
        {BACKGROUND_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(0.7) brightness(0.85)",
            }}
          />
        ))}
      </div>

      {/* Overlay - Dark gradient to make content readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/60 to-dark-900/70" />
    </div>
  );
}
