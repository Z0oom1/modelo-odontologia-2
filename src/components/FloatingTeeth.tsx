"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function FloatingTeeth() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | null = null;

    // Defer ScrollTrigger creation to ensure sibling DOM nodes (#estudio and #tecnologia)
    // are fully rendered and painted by the browser on first paint
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Find the trigger elements globally to bypass GSAP context scoping
        const estudioEl = document.getElementById("estudio");
        const tecnologiaEl = document.getElementById("tecnologia");

        if (!estudioEl || !tecnologiaEl) {
          console.warn("FloatingTeeth triggers not found in DOM:", { estudioEl, tecnologiaEl });
          return;
        }

        const scrubSpeed = 1.6;

        // Master Timeline linked from top of #estudio to bottom of #tecnologia (stays longer on screen)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: estudioEl,
            endTrigger: tecnologiaEl,
            start: "top bottom",      // Starts when the top of #estudio enters the viewport (right after Hero)
            end: "bottom top",        // Ends when the bottom of #tecnologia leaves the viewport (stays longer)
            scrub: scrubSpeed,
            invalidateOnRefresh: true,
          },
        });

        // 1. Fast Fade-in at the very beginning of the scroll timeline (first 5% of scroll)
        // This ensures they are fully visible immediately after the Hero section
        tl.fromTo(
          ".floating-tooth-el",
          { opacity: 0 },
          { opacity: 1, duration: 0.05, ease: "power1.inOut" },
          0
        );

        // 2. Descending Movements (different vertical travel ranges for different speeds)
        // They stay "mais para o canto" and drift slightly outwards to ensure zero overlap with content
        
        // Left Tooth (Tooth 1): Medium, elevated, blur-6px, opaque. Descends 60vh
        tl.fromTo(
          ".floating-tooth-1",
          { y: "-10vh", x: "0vw", rotate: -30, scale: 0.9 },
          { y: "50vh", x: "-2vw", rotate: 20, scale: 1.1, ease: "power1.inOut" },
          0
        );

        // Right Tooth (Tooth 2): Medium-Small, blur-7px, opaque. Descends 40vh (different speed)
        tl.fromTo(
          ".floating-tooth-2",
          { y: "-15vh", x: "0vw", rotate: 25, scale: 0.8 },
          { y: "25vh", x: "2vw", rotate: -15, scale: 1.0, ease: "power1.inOut" },
          0
        );

        // 3. Smooth Fade-out at the very end of the scroll timeline (last 15% of scroll)
        tl.to(
          ".floating-tooth-el",
          { opacity: 0, duration: 0.15, ease: "power1.inOut" },
          0.85
        );

        // Force immediate calculation and lock triggers in position
        ScrollTrigger.refresh();

      }, containerRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* Background Teeth Container (z-[5])
          This sits below all page sections (z-10 and z-20), so the teeth pass behind all content and stats */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-[5]">
        
        {/* Left Tooth: Foreground Bokeh (Bottom-Left) · Medium, elevated, blurred, solid opacity */}
        <div 
          className="floating-tooth-el floating-tooth-1 absolute top-[25vh] left-[4vw] md:left-[6vw] w-48 h-48 md:w-64 md:h-64 blur-[6px] opacity-0"
        >
          <div className="relative w-full h-full">
            <Image
              src="/dente.png"
              alt="Tooth Left Background"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Tooth: Foreground Mid (Top-Right) · Medium-Small, blurred, solid opacity */}
        <div 
          className="floating-tooth-el floating-tooth-2 absolute top-[15vh] right-[4vw] md:right-[6vw] w-40 h-40 md:w-52 md:h-52 blur-[7px] opacity-0"
        >
          <div className="relative w-full h-full">
            <Image
              src="/dente.png"
              alt="Tooth Right Background"
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
