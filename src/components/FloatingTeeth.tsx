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

    // Defer ScrollTrigger creation to ensure sibling DOM nodes (#estudio, #sobre and #tecnologia)
    // are fully rendered and painted by the browser on first paint
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Find the trigger elements globally to bypass GSAP context scoping
        const estudioEl = document.getElementById("estudio");
        const sobreEl = document.getElementById("sobre");
        const tecnologiaEl = document.getElementById("tecnologia");

        if (!estudioEl || !sobreEl || !tecnologiaEl) {
          console.warn("FloatingTeeth triggers not found in DOM:", { estudioEl, sobreEl, tecnologiaEl });
          return;
        }

        const scrubSpeed = 0.2; // Tight, ultra-responsive scrub speed to prevent visual lag on fast scroll

        // 1. LEFT TOOTH TIMELINE: Lands exactly centered inside the #sobre section target slot
        const tlLeft = gsap.timeline({
          scrollTrigger: {
            trigger: estudioEl,
            endTrigger: sobreEl,
            start: "top bottom",         // Starts exactly when #estudio enters the bottom of the viewport (smooth transition from Hero)
            end: "center center",     // Ends when #sobre is centered in viewport (landing point)
            scrub: scrubSpeed,
            invalidateOnRefresh: true,
            onEnter: () => {
              // Scrolling down from Hero: Clear forced states and let timeline handle scrub fade-in
              const staticEl = document.getElementById("sobre-tooth-static");
              const fixedEl = document.querySelector(".floating-tooth-1") as HTMLElement;
              if (staticEl) staticEl.style.setProperty("opacity", "0", "important");
              if (fixedEl) fixedEl.style.removeProperty("opacity");
            },
            onLeave: () => {
              // Reached landing point scrolling down: Instant swap!
              const staticEl = document.getElementById("sobre-tooth-static");
              const fixedEl = document.querySelector(".floating-tooth-1") as HTMLElement;
              if (staticEl) staticEl.style.setProperty("opacity", "1", "important");
              if (fixedEl) fixedEl.style.setProperty("opacity", "0", "important");
            },
            onEnterBack: () => {
              // Scrolling back up: Instant reverse swap!
              // Force static tooth to 0 and instantly show the fixed tooth at 100% opacity to prevent delay
              const staticEl = document.getElementById("sobre-tooth-static");
              const fixedEl = document.querySelector(".floating-tooth-1") as HTMLElement;
              if (staticEl) staticEl.style.setProperty("opacity", "0", "important");
              if (fixedEl) fixedEl.style.setProperty("opacity", "1");
            },
            onLeaveBack: () => {
              // Scrolled back up into the Hero: Instantly hide everything
              const staticEl = document.getElementById("sobre-tooth-static");
              const fixedEl = document.querySelector(".floating-tooth-1") as HTMLElement;
              if (staticEl) staticEl.style.setProperty("opacity", "0", "important");
              if (fixedEl) fixedEl.style.setProperty("opacity", "0", "important");
            }
          },
        });

        // Left: Gradual fade-in as it glides from off-screen (first 15% of scroll)
        tlLeft.fromTo(
          ".floating-tooth-1",
          { opacity: 0 },
          { opacity: 1, duration: 0.15, ease: "power1.inOut" },
          0
        );

        // Left: Glide horizontally (x) in an elegant curve entering from off-screen
        tlLeft.fromTo(
          ".floating-tooth-1",
          { x: "-35vw" },
          {
            x: () => {
              const toothEl = document.querySelector(".floating-tooth-1") as HTMLElement;
              const slotEl = document.getElementById("sobre-tooth-static");
              if (!toothEl || !slotEl) return 0;
              
              // Temporarily clear active GSAP transforms to measure true untransformed bounding rect
              const prevTransform = toothEl.style.transform;
              toothEl.style.transform = "none";
              const toothRect = toothEl.getBoundingClientRect();
              const slotRect = slotEl.getBoundingClientRect();
              toothEl.style.transform = prevTransform;
              
              return slotRect.left - toothRect.left;
            },
            ease: "power2.out", // Smooth deceleration horizontally to dock gently
            duration: 1.0
          },
          0
        );

        // Left: Glide vertically (y), rotate and scale in a beautiful parabolic arc landing exactly in the slot
        tlLeft.fromTo(
          ".floating-tooth-1",
          { y: "-10vh", rotate: -30, scale: 0.9 },
          {
            y: () => {
              const toothEl = document.querySelector(".floating-tooth-1") as HTMLElement;
              const slotEl = document.getElementById("sobre-tooth-static");
              const sobreEl = document.getElementById("sobre");
              if (!toothEl || !slotEl || !sobreEl) return 0;

              // Temporarily clear active GSAP transforms to measure true untransformed bounding rect
              const prevTransform = toothEl.style.transform;
              toothEl.style.transform = "none";
              const toothRect = toothEl.getBoundingClientRect();
              const slotRect = slotEl.getBoundingClientRect();
              const sobreRect = sobreEl.getBoundingClientRect();
              toothEl.style.transform = prevTransform;

              // Calculate relative vertical offset of slot within #sobre section
              const slotOffset = slotRect.top - sobreRect.top;

              // Target top of slot inside viewport when #sobre center is at viewport center
              const targetTop = (window.innerHeight / 2) - (sobreRect.height / 2) + slotOffset;

              return targetTop - toothRect.top;
            },
            rotate: 0,
            scale: 1.0,
            ease: "power2.inOut", // Parabolic ease to drop gracefully and dock pixel-perfect
            duration: 1.0
          },
          0
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
      {/* Foreground Teeth Container (z-[30])
          This sits above all page sections (z-10 and z-20), so the left-side tooth passes in front of everything */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-[30]">
        {/* Left Tooth: Foreground Bokeh (Bottom-Left) · Large, elevated, blurred, solid opacity */}
        <div 
          className="floating-tooth-el floating-tooth-1 absolute top-[25vh] left-[4vw] md:left-[6vw] w-64 h-64 md:w-80 md:h-80 blur-[6px] opacity-0"
        >
          <div className="relative w-full h-full">
            <Image
              src="/dente.png"
              alt="Tooth Left Foreground"
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
