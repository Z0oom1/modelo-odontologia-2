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
        const corpoClinicoEl = document.getElementById("corpo-clinico");

        if (!estudioEl || !sobreEl || !tecnologiaEl || !corpoClinicoEl) {
          console.warn("FloatingTeeth triggers not found in DOM:", { estudioEl, sobreEl, tecnologiaEl, corpoClinicoEl });
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
              if (staticEl) staticEl.classList.add("tooth-hidden");
              if (fixedEl) fixedEl.classList.remove("tooth-hidden");
            },
            onLeave: () => {
              // Reached landing point scrolling down: Instant swap!
              const staticEl = document.getElementById("sobre-tooth-static");
              const fixedEl = document.querySelector(".floating-tooth-1") as HTMLElement;
              if (staticEl) staticEl.classList.remove("tooth-hidden");
              if (fixedEl) fixedEl.classList.add("tooth-hidden");
            },
            onEnterBack: () => {
              // Scrolling back up: Instant reverse swap!
              // Force static tooth to hidden and instantly show the fixed tooth to prevent delay
              const staticEl = document.getElementById("sobre-tooth-static");
              const fixedEl = document.querySelector(".floating-tooth-1") as HTMLElement;
              if (staticEl) staticEl.classList.add("tooth-hidden");
              if (fixedEl) fixedEl.classList.remove("tooth-hidden");
            },
            onLeaveBack: () => {
              // Scrolled back up into the Hero: Instantly hide everything
              const staticEl = document.getElementById("sobre-tooth-static");
              const fixedEl = document.querySelector(".floating-tooth-1") as HTMLElement;
              if (staticEl) staticEl.classList.add("tooth-hidden");
              if (fixedEl) fixedEl.classList.add("tooth-hidden");
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


        // 2. RIGHT TOOTH TIMELINE: Lands exactly in the doctor's pinched hand inside #corpo-clinico
        const tlRight = gsap.timeline({
          scrollTrigger: {
            trigger: estudioEl,
            endTrigger: corpoClinicoEl,
            start: "top bottom",         // Starts exactly when #estudio enters the bottom of the viewport
            end: "center center",     // Ends when #corpo-clinico is centered in viewport (landing point)
            scrub: scrubSpeed,
            invalidateOnRefresh: true,
            onEnter: () => {
              // Scrolling down: Clear forced states
              const emptyImg = document.getElementById("doctor-empty-img");
              const toothImg = document.getElementById("doctor-tooth-img");
              const fixedEl = document.querySelector(".floating-tooth-2") as HTMLElement;

              if (emptyImg) emptyImg.classList.remove("tooth-hidden");
              if (toothImg) toothImg.classList.add("tooth-hidden");
              if (fixedEl) fixedEl.classList.remove("tooth-hidden");
            },
            onLeave: () => {
              // Reached landing point scrolling down: Instant swap!
              const emptyImg = document.getElementById("doctor-empty-img");
              const toothImg = document.getElementById("doctor-tooth-img");
              const fixedEl = document.querySelector(".floating-tooth-2") as HTMLElement;

              if (emptyImg) emptyImg.classList.add("tooth-hidden");
              if (toothImg) toothImg.classList.remove("tooth-hidden");
              if (fixedEl) fixedEl.classList.add("tooth-hidden");
            },
            onEnterBack: () => {
              // Scrolling back up: Instant reverse swap!
              const emptyImg = document.getElementById("doctor-empty-img");
              const toothImg = document.getElementById("doctor-tooth-img");
              const fixedEl = document.querySelector(".floating-tooth-2") as HTMLElement;

              if (emptyImg) emptyImg.classList.remove("tooth-hidden");
              if (toothImg) toothImg.classList.add("tooth-hidden");
              if (fixedEl) fixedEl.classList.remove("tooth-hidden");
            },
            onLeaveBack: () => {
              // Scrolled back up into the Hero: Instantly hide everything
              const emptyImg = document.getElementById("doctor-empty-img");
              const toothImg = document.getElementById("doctor-tooth-img");
              const fixedEl = document.querySelector(".floating-tooth-2") as HTMLElement;

              if (emptyImg) emptyImg.classList.remove("tooth-hidden");
              if (toothImg) toothImg.classList.add("tooth-hidden");
              if (fixedEl) fixedEl.classList.add("tooth-hidden");
            }
          },
        });

        // Right: Gradual fade-in as it glides from off-screen (first 15% of scroll)
        tlRight.fromTo(
          ".floating-tooth-2",
          { opacity: 0 },
          { opacity: 1, duration: 0.15, ease: "power1.inOut" },
          0
        );

        // Right: Glide horizontally (x) in a mirror parabolic curve entering from off-screen right
        tlRight.fromTo(
          ".floating-tooth-2",
          { x: "35vw" },
          {
            x: () => {
              const toothEl = document.querySelector(".floating-tooth-2") as HTMLElement;
              const slotEl = document.getElementById("doctor-tooth-slot");
              if (!toothEl || !slotEl) return 0;

              // Temporarily clear active GSAP transforms to measure true untransformed bounding rect
              const prevTransform = toothEl.style.transform;
              toothEl.style.transform = "none";
              const toothRect = toothEl.getBoundingClientRect();
              const slotRect = slotEl.getBoundingClientRect();
              toothEl.style.transform = prevTransform;

              return slotRect.left - toothRect.left;
            },
            ease: "power2.out", // Decelerate horizontally for gentle docking
            duration: 1.0
          },
          0
        );

        // Right: Glide vertically (y), rotate and scale in a beautiful parabolic arc landing exactly in the doctor's hand
        tlRight.fromTo(
          ".floating-tooth-2",
          { y: "-10vh", rotate: 30, scale: 0.9 },
          {
            y: () => {
              const toothEl = document.querySelector(".floating-tooth-2") as HTMLElement;
              const slotEl = document.getElementById("doctor-tooth-slot");
              const corpoClinicoEl = document.getElementById("corpo-clinico");
              if (!toothEl || !slotEl || !corpoClinicoEl) return 0;

              // Temporarily clear active GSAP transforms to measure true untransformed bounding rect
              const prevTransform = toothEl.style.transform;
              toothEl.style.transform = "none";
              const toothRect = toothEl.getBoundingClientRect();
              const slotRect = slotEl.getBoundingClientRect();
              const corpoClinicoRect = corpoClinicoEl.getBoundingClientRect();
              toothEl.style.transform = prevTransform;

              // Calculate relative vertical offset of slot within #corpo-clinico section
              const slotOffset = slotRect.top - corpoClinicoRect.top;

              // Target top of slot inside viewport when #corpo-clinico center is at viewport center
              const targetTop = (window.innerHeight / 2) - (corpoClinicoRect.height / 2) + slotOffset;

              return targetTop - toothRect.top;
            },
            rotate: 0,
            scale: 1.0,
            ease: "power2.inOut", // Smooth acceleration/deceleration for vertical docking
            duration: 1.0
          },
          0
        );


        // Force immediate calculation and lock triggers in position
        ScrollTrigger.refresh();

      }, containerRef);
    }, 100);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        document.body.classList.add("scroll-jumping");
        
        if ((window as any).scrollJumpingTimeout) {
          clearTimeout((window as any).scrollJumpingTimeout);
        }
        
        (window as any).scrollJumpingTimeout = setTimeout(() => {
          document.body.classList.remove("scroll-jumping");
        }, 1500); // Safe duration for smooth-scrolling jumps
      }
    };

    const removeJumpingClass = () => {
      document.body.classList.remove("scroll-jumping");
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("wheel", removeJumpingClass, { passive: true });
    window.addEventListener("touchmove", removeJumpingClass, { passive: true });

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("wheel", removeJumpingClass);
      window.removeEventListener("touchmove", removeJumpingClass);
      if ((window as any).scrollJumpingTimeout) {
        clearTimeout((window as any).scrollJumpingTimeout);
      }
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* Foreground Teeth Container (z-[30])
          This sits above all page sections (z-10 and z-20), so the left-side tooth passes in front of everything */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-[30]">
        {/* Left Tooth: Foreground Bokeh (Bottom-Left) · Large, elevated, blurred, solid opacity */}
        <div 
          className="floating-tooth-el floating-tooth-1 absolute top-[25vh] left-[4vw] md:left-[6vw] w-64 h-64 md:w-80 md:h-80 blur-[6px] tooth-hidden"
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

        {/* Right Tooth: Foreground Mid-Small (Top-Right) · Large (25% increase), elevated, sharper, solid opacity */}
        {/* Starts on the right side, lands inside the doctor's hand! */}
        <div 
          className="floating-tooth-el floating-tooth-2 absolute top-[15vh] right-[4vw] md:right-[6vw] w-[60px] h-[60px] md:w-20 md:h-20 blur-[3px] tooth-hidden"
        >
          <div className="relative w-full h-full">
            <Image
              src="/dente.png"
              alt="Tooth Right Foreground"
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
