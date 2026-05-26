"use client";

import Image from "next/image";

interface LogoProps {
  onlyIcon?: boolean;
  className?: string;
  iconClassName?: string;
  dark?: boolean; // If rendering on a dark background (like the footer)
}

export default function Logo({ onlyIcon = false, className = "", iconClassName = "w-16 h-16", dark = false }: LogoProps) {
  
  // High-performance Next.js image container rendering the actual logo.png dente
  const ToothImage = () => (
    <div className={`relative ${iconClassName} select-none pointer-events-none`}>
      <Image
        src="/logo.png"
        alt="myTooth Logo Icon"
        fill
        className="object-contain"
        priority
      />
    </div>
  );

  if (onlyIcon) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <ToothImage />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Actual 3D Gold-Border Tooth PNG at the top */}
      <ToothImage />

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
