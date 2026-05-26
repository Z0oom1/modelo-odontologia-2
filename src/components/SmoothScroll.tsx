"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with high-end configurations
    const lenis = new Lenis({
      duration: 1.6, // Longer duration for maximum premium fluidity (>0.6s rule)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Elegant exponential out ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // CRITICAL FOR MOBILE STABILIZATION:
      // We disable touch smoothing on touch screens.
      // This completely prevents touch scroll conflicts, lag, or double-momentum 
      // issues on iOS and Android devices, allowing native swipe speed while
      // preserving the premium smooth-scroll on desktop screens.
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Synchronize ScrollTrigger with Lenis scroll events
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Hook Lenis into GSAP requestAnimationFrame ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);

    // Disable lag smoothing to prevent scroll drifting / jumping
    gsap.ticker.lagSmoothing(0);

    // MOBILE PERFORMANCE AND LAYOUT STABILIZATION:
    // In mobile browsers (e.g. Safari iOS, Chrome Android), scrolling causes the address bar
    // to dynamically show and hide, firing window resize events. Standard ScrollTrigger recalculates
    // on every resize event, which causes visual jumps/jitters. 
    // We ignore mobile vertical resizing to achieve stable, buttery-smooth mobile animations.
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    // Refresh ScrollTrigger to align coordinates
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
