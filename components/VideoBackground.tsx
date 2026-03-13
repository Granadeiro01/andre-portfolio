"use client";

export function VideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/running-bg.mp4" type="video/mp4" />
        <source src="/videos/running-bg.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay - Dark gradient to make content readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/70 to-dark-900/80" />
    </div>
  );
}
