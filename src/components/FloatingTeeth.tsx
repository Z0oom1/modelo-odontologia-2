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

      // Master Timeline linked EXCLUSIVELY to the specialties trigger viewport scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".camera-section-trigger",
          start: "top bottom",      // Starts when the top of the specialties hits the bottom of screen
          end: "bottom top",        // Ends when the bottom of specialties leaves the top of screen
          scrub: scrubSpeed,
          invalidateOnRefresh: true,
        },
      });

      // 1. Entrance Fade-in at the very beginning of the section scroll
      tl.fromTo(
        ".floating-tooth-el",
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "power1.inOut" },
        0
      );

      // 2. Parabolic Descending Arc Movements (entering from offscreen and descending offscreen)
      // Tooth 1: Foreground Bokeh (Bottom-Left) -> Arcs down and right
      tl.fromTo(
        ".floating-tooth-1",
        { x: "-100vw", y: "-40vh", rotate: -45, scale: 0.8 },
        { x: "20vw", y: "45vh", rotate: 55, scale: 1.2, ease: "power1.inOut" },
        0
      );

      // Tooth 2: Foreground Mid-Depth (Top-Right) -> Arcs down and left
      tl.fromTo(
        ".floating-tooth-2",
        { x: "100vw", y: "-50vh", rotate: 35, scale: 0.75 },
        { x: "-22vw", y: "50vh", rotate: -45, scale: 1.05, ease: "power1.inOut" },
        0
      );

      // Tooth 3: Background (Mid-Left) -> Arcs down and right behind specialties
      tl.fromTo(
        ".floating-tooth-3",
        { x: "-100vw", y: "-30vh", rotate: -60, scale: 0.6 },
        { x: "12vw", y: "35vh", rotate: 75, scale: 0.8, ease: "power1.inOut" },
        0
      );

      // Tooth 4: Background Deepest (Bottom-Right) -> Arcs down and left behind specialties
      tl.fromTo(
        ".floating-tooth-4",
        { x: "100vw", y: "-45vh", rotate: 45, scale: 0.5 },
        { x: "-15vw", y: "40vh", rotate: -60, scale: 0.9, ease: "power1.inOut" },
        0
      );

      // 3. Exit Fade-out at the very end of the scroll trigger timeline (guarantees disappearance)
      tl.to(
        ".floating-tooth-el",
        { opacity: 0, duration: 0.15, ease: "power1.inOut" },
        0.85
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Parent wrapper MUST NOT restrict z-index globally so children can layer both
    // in front of (z-50) and behind (z-5) the Specialties container (z-10)
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none select-none overflow-hidden"
    >
      {/* 1. Tooth 1: Foreground Bokeh (Bottom-Left) · Large, z-50, heavily blurred, NO opacity transparency */}
      <div 
        className="floating-tooth-el floating-tooth-1 absolute bottom-[5vh] left-[-8vw] w-64 h-64 md:w-80 md:h-80 blur-[8px] z-[50] opacity-0"
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

      {/* 2. Tooth 2: Foreground Mid (Top-Right) · Medium-Large, z-50, blurred, NO opacity transparency */}
      <div 
        className="floating-tooth-el floating-tooth-2 absolute top-[10vh] right-[-5vw] w-48 h-48 md:w-60 md:h-60 blur-[5px] z-[50] opacity-0"
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

      {/* 3. Tooth 3: Background Deep (Mid-Left) · Small, z-5 (passes behind z-10), lightly blurred, NO opacity transparency */}
      <div 
        className="floating-tooth-el floating-tooth-3 absolute top-[40vh] left-[6vw] w-28 h-28 md:w-36 md:h-36 blur-[1.2px] z-[5] opacity-0"
      >
        <div className="relative w-full h-full">
          <Image
            src="/dente.png"
            alt="Tooth Deep Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 4. Tooth 4: Background Deepest (Bottom-Right) · Very small, z-5 (passes behind z-10), unblurred, NO opacity transparency */}
      <div 
        className="floating-tooth-el floating-tooth-4 absolute bottom-[15vh] right-[8vw] w-16 h-16 md:w-20 md:h-20 blur-none z-[5] opacity-0"
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
