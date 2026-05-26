"use client";

interface LogoProps {
  onlyIcon?: boolean;
  className?: string;
  iconClassName?: string;
  dark?: boolean; // If rendering on a dark background (like the footer)
}

export default function Logo({ onlyIcon = false, className = "", iconClassName = "w-16 h-16", dark = false }: LogoProps) {
  // Tooth SVG component (highly detailed glossy porcelain rendering with gold outline)
  const ToothIcon = () => (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={iconClassName}
    >
      <defs>
        {/* Porcelain white 3D gradient */}
        <linearGradient id="toothGradient" x1="60" y1="20" x2="60" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#FBFBFA" />
          <stop offset="100%" stopColor="#EDEDE9" />
        </linearGradient>
        
        {/* Inner volumetric radial highlight */}
        <radialGradient id="toothHighlight" cx="55" cy="40" r="45" fx="55" fy="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D5D4CD" stopOpacity="0" />
        </radialGradient>

        {/* Soft realistic drop shadow for the white body */}
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F1E2E" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* Gold outer border */}
      <path 
        d="M 60 30 C 67 20, 92 22, 94 46 C 96 64, 84 80, 74 92 C 70 97, 67 96, 60 88 C 53 96, 50 97, 46 92 C 36 80, 24 64, 26 46 C 28 22, 53 20, 60 30 Z" 
        stroke="#C5A880" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      {/* Glossy White Inner Porcelain Body */}
      <path 
        d="M 60 33 C 66 24, 88 26, 90 47 C 92 63, 81 78, 72 89 C 69 93, 66 92, 60 85 C 54 92, 51 93, 48 89 C 39 78, 28 63, 30 47 C 32 26, 54 24, 60 33 Z" 
        fill="url(#toothGradient)"
        filter="url(#softShadow)"
      />

      {/* Soft overlay gradient for realistic refraction */}
      <path 
        d="M 60 33 C 66 24, 88 26, 90 47 C 92 63, 81 78, 72 89 C 69 93, 66 92, 60 85 C 54 92, 51 93, 48 89 C 39 78, 28 63, 30 47 C 32 26, 54 24, 60 33 Z" 
        fill="url(#toothHighlight)"
        style={{ mixBlendMode: "overlay" }}
      />

      {/* Hand-placed specular reflections (porcelain reflections) */}
      <path 
        d="M 46 36 C 51 32, 56 32, 60 35" 
        stroke="#FFFFFF" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        opacity="0.95"
      />
      <path 
        d="M 72 36 C 76 32, 82 32, 86 35" 
        stroke="#FFFFFF" 
        strokeWidth="2" 
        strokeLinecap="round" 
        opacity="0.85"
      />
    </svg>
  );

  if (onlyIcon) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <ToothIcon />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* 3D Gold-Border Tooth at the top */}
      <ToothIcon />

      {/* "myTooth" Wordmark */}
      <div className="flex flex-col items-center mt-3 select-none">
        <div className="flex items-baseline text-4xl md:text-5xl font-light tracking-wide">
          <span className="text-[#C5A880] font-light font-serif italic">my</span>
          <span className={`font-medium font-sans ${dark ? "text-white" : "text-[#0F1E2E]"}`}>Tooth</span>
        </div>
        
        {/* Upper case subtitle spaced between lines */}
        <div className="w-full flex items-center justify-between gap-3 mt-3 px-1 text-[9px] md:text-[10px] tracking-[0.25em] font-light text-[#C5A880]">
          <span className="h-[0.5px] flex-1 bg-[#C5A880]/30" />
          <span className="whitespace-nowrap">CLÍNICA ODONTOLÓGICA</span>
          <span className="h-[0.5px] flex-1 bg-[#C5A880]/30" />
        </div>
      </div>
    </div>
  );
}
