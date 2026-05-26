"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function FloatingTeeth() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fluid luxury scrub speed (1.6s lag to smooth out minor scroll jitters)
      const scrubSpeed = 1.6;

      // Tooth 1: Very Foreground Bokeh (Bottom-Left) -> Moves Up & Right in an Arc
      gsap.to(".floating-tooth-1", {
        x: "20vw",
        y: "-35vh",
        rotate: 45,
        scale: 1.15,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: scrubSpeed,
        },
      });

      // Tooth 2: Foreground Mid-Depth (Top-Right) -> Moves Down & Left in an Arc
      gsap.to(".floating-tooth-2", {
        x: "-22vw",
        y: "30vh",
        rotate: -35,
        scale: 0.9,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: scrubSpeed,
        },
      });

      // Tooth 3: Background Deep (Mid-Left) -> Moves Up & Left in an Arc
      gsap.to(".floating-tooth-3", {
        x: "-12vw",
        y: "-25vh",
        rotate: 60,
        scale: 0.8,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: scrubSpeed,
        },
      });

      // Tooth 4: Background Deepest (Bottom-Right) -> Moves Down & Right in an Arc
      gsap.to(".floating-tooth-4", {
        x: "15vw",
        y: "20vh",
        rotate: -55,
        scale: 0.85,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: scrubSpeed,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden"
    >
      {/* 1. Tooth 1: Foreground Bokeh (Bottom-Left) · Large, high blur */}
      <div 
        className="floating-tooth-1 absolute bottom-[10vh] left-[-6vw] w-56 h-56 md:w-72 md:h-72 blur-[7px] opacity-75 z-40"
      >
        <div className="relative w-full h-full">
          <Image
            src="/dente.png"
            alt="Tooth Bokeh Foreground"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 2. Tooth 2: Foreground Mid (Top-Right) · Medium-Large, moderate blur */}
      <div 
        className="floating-tooth-2 absolute top-[15vh] right-[-3vw] w-44 h-44 md:w-56 md:h-56 blur-[3px] opacity-70 z-40"
      >
        <div className="relative w-full h-full">
          <Image
            src="/dente.png"
            alt="Tooth Mid Foreground"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 3. Tooth 3: Background Deep (Mid-Left) · Small, light blur */}
      <div 
        className="floating-tooth-3 absolute top-[45vh] left-[8vw] w-24 h-24 md:w-32 md:h-32 blur-[1.2px] opacity-[0.22] z-0"
      >
        <div className="relative w-full h-full">
          <Image
            src="/dente.png"
            alt="Tooth Deep Background"
            fill
            className="object-contain animate-pulse"
            style={{ animationDuration: "8s" }}
            priority
          />
        </div>
      </div>

      {/* 4. Tooth 4: Background Deepest (Bottom-Right) · Very small, no/almost no blur */}
      <div 
        className="floating-tooth-4 absolute bottom-[20vh] right-[10vw] w-16 h-16 md:w-20 md:h-20 blur-none opacity-[0.16] z-0"
      >
        <div className="relative w-full h-full">
          <Image
            src="/dente.png"
            alt="Tooth Deepest Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

    </div>
  );
}
