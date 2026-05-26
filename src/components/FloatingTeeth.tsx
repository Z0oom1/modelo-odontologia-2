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

      // Find the trigger elements globally to bypass GSAP context scoping
      const estudioEl = document.getElementById("estudio");
      const tecnologiaEl = document.getElementById("tecnologia");

      if (!estudioEl || !tecnologiaEl) return;

      // Master Timeline linked from top of #estudio to bottom of #tecnologia
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: estudioEl,
          endTrigger: tecnologiaEl,
          start: "top bottom",      // Starts when the top of #estudio enters the viewport
          end: "bottom top",        // Ends when the bottom of #tecnologia leaves the viewport
          scrub: scrubSpeed,
          invalidateOnRefresh: true,
        },
      });

      // 1. Smooth Fade-in at the very beginning of the scroll timeline (first 15%)
      tl.fromTo(
        ".floating-tooth-el",
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "power1.inOut" },
        0
      );

      // 2. Parabolic Descending Arc Movements (using keyframes to create smooth sweeps)
      // Tooth 1: Foreground Bokeh (Bottom-Left) · Large, z-[30] (in front of specialties)
      tl.fromTo(
        ".floating-tooth-1",
        { x: "-50vw", y: "-20vh", rotate: -45, scale: 0.8 },
        {
          keyframes: [
            { x: "-10vw", y: "15vh", rotate: 5, scale: 1.0, ease: "power1.out" },
            { x: "20vw", y: "55vh", rotate: 50, scale: 1.15, ease: "power1.in" }
          ],
          duration: 1.0
        },
        0
      );

      // Tooth 2: Foreground Mid (Top-Right) · Medium-Large, z-[30] (in front of specialties)
      tl.fromTo(
        ".floating-tooth-2",
        { x: "50vw", y: "-30vh", rotate: 35, scale: 0.75 },
        {
          keyframes: [
            { x: "10vw", y: "10vh", rotate: 0, scale: 0.9, ease: "power1.out" },
            { x: "-25vw", y: "60vh", rotate: -40, scale: 1.05, ease: "power1.in" }
          ],
          duration: 1.0
        },
        0
      );

      // Tooth 3: Background Deep (Mid-Left) · Small, z-[5] (passes behind z-20 specialties)
      tl.fromTo(
        ".floating-tooth-3",
        { x: "-45vw", y: "-15vh", rotate: -60, scale: 0.6 },
        {
          keyframes: [
            { x: "-5vw", y: "18vh", rotate: 5, scale: 0.7, ease: "power1.out" },
            { x: "15vw", y: "50vh", rotate: 70, scale: 0.85, ease: "power1.in" }
          ],
          duration: 1.0
        },
        0
      );

      // Tooth 4: Background Deepest (Bottom-Right) · Very small, z-[5] (passes behind z-20 specialties)
      tl.fromTo(
        ".floating-tooth-4",
        { x: "45vw", y: "-25vh", rotate: 45, scale: 0.5 },
        {
          keyframes: [
            { x: "5vw", y: "12vh", rotate: -10, scale: 0.65, ease: "power1.out" },
            { x: "-15vw", y: "55vh", rotate: -55, scale: 0.75, ease: "power1.in" }
          ],
          duration: 1.0
        },
        0
      );

      // 3. Smooth Fade-out at the very end of the scroll timeline (last 15%)
      tl.to(
        ".floating-tooth-el",
        { opacity: 0, duration: 0.15, ease: "power1.inOut" },
        0.85
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* A. Background Teeth Container (z-[5])
          This sits below specialties (z-20) and study/technology (z-10), so these teeth pass behind them */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-[5]">
        {/* Tooth 3: Background Deep (Mid-Left) · Small, lightly blurred, solid opacity */}
        <div 
          className="floating-tooth-el floating-tooth-3 absolute top-[40vh] left-[6vw] w-28 h-28 md:w-36 md:h-36 blur-[1.2px] opacity-0"
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

        {/* Tooth 4: Background Deepest (Bottom-Right) · Very small, unblurred, solid opacity */}
        <div 
          className="floating-tooth-el floating-tooth-4 absolute bottom-[15vh] right-[8vw] w-16 h-16 md:w-20 md:h-20 blur-none opacity-0"
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

      {/* B. Foreground Teeth Container (z-[30])
          This sits above all sections (z-10 and z-20), so these teeth pass in front of everything */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-[30]">
        {/* Tooth 1: Foreground Bokeh (Bottom-Left) · Large, heavily blurred, solid opacity */}
        <div 
          className="floating-tooth-el floating-tooth-1 absolute bottom-[5vh] left-[-8vw] w-64 h-64 md:w-80 md:h-80 blur-[8px] opacity-0"
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

        {/* Tooth 2: Foreground Mid (Top-Right) · Medium-Large, blurred, solid opacity */}
        <div 
          className="floating-tooth-el floating-tooth-2 absolute top-[10vh] right-[-5vw] w-48 h-48 md:w-60 md:h-60 blur-[5px] opacity-0"
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
      </div>
    </div>
  );
}
