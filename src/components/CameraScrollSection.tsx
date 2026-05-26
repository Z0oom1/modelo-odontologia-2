"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle, Shield, SunDim, ArrowRight } from "@phosphor-icons/react";

export default function CameraScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrance reveal for the section titles (fires when section becomes visible)
      gsap.fromTo(
        ".section-header-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Camera Pin Scroll Timeline (Scrubbed smoothly)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".camera-section-trigger",
          start: "top top",
          end: "+=220%", // Creates 2.2 viewports worth of scrolling tension
          pin: true,
          scrub: 1.4, // Buttery smooth lag for visual luxury
          invalidateOnRefresh: true,
        },
      });

      // Simulated Lens Zoom/Rotate (Camera Background element)
      tl.to(
        ".camera-lens-bg",
        {
          scale: 1.7,
          rotate: 35,
          opacity: 0.15,
          ease: "power3.inOut",
        },
        0
      );

      // Slide and Scale Transition: Card 1 (Center) -> Exits Left
      tl.to(
        ".card-1",
        {
          xPercent: -130,
          opacity: 0,
          scale: 0.92,
          ease: "power3.inOut",
        },
        0.1
      );

      // Slide and Scale Transition: Card 2 (Right) -> Enters Center
      tl.fromTo(
        ".card-2",
        { xPercent: 130, opacity: 0, scale: 0.92 },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.inOut",
        },
        0.1
      );

      // Slide and Scale Transition: Card 2 (Center) -> Exits Left
      tl.to(
        ".card-2",
        {
          xPercent: -130,
          opacity: 0,
          scale: 0.92,
          ease: "power3.inOut",
        },
        1.1
      );

      // Slide and Scale Transition: Card 3 (Right) -> Enters Center
      tl.fromTo(
        ".card-3",
        { xPercent: 130, opacity: 0, scale: 0.92 },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          ease: "power3.inOut",
        },
        1.1
      );

      // Progressively shift the background color slightly to warm bone for warmth
      tl.to(
        ".bg-transition-ref",
        {
          backgroundColor: "#F4F4F1",
          ease: "power3.inOut",
        },
        0.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="camera-section-trigger relative w-full overflow-hidden">
      <div className="bg-transition-ref absolute inset-0 bg-[#FCFCFA] transition-colors duration-1000" />

      {/* Immersive Background Lens Ring (Camera Motif) */}
      <div className="camera-lens-bg absolute -right-[15vw] -top-[10vh] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full border border-neutral-900/5 pointer-events-none select-none z-0 flex items-center justify-center scale-100 opacity-5">
        <div className="w-[85%] h-[85%] rounded-full border border-neutral-900/5" />
        <div className="w-[70%] h-[70%] rounded-full border border-neutral-900/5 border-dashed" />
      </div>

      {/* Pinned Viewport Wrapper */}
      <div className="relative min-h-[100dvh] flex flex-col justify-between py-12 md:py-20 z-10">
        
        {/* Section Header */}
        <header className="section-header-reveal w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] tracking-[0.25em] font-light text-neutral-400 block mb-3">ESPECIALIDADES ESTÚDIO</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-neutral-900">
              O Design do <span className="italic font-serif text-neutral-800">Sorriso Biológico</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm font-light text-neutral-500 max-w-[32ch] leading-relaxed">
            Unindo tecnologia microscópica e biomimética para preservar e esculpir a sua essência natural.
          </p>
        </header>

        {/* Cinematic Panning Container */}
        <main className="relative flex-1 w-full max-w-[1200px] mx-auto px-6 flex items-center justify-center my-8 md:my-12">
          
          {/* Card 1: Estética Invisível (Starts in Center) */}
          <div className="card-1 absolute w-full max-w-[650px] aspect-[16/10] md:aspect-[16/9] liquid-glass rounded-3xl p-8 md:p-12 flex flex-col justify-between select-none">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white shadow-lg shadow-neutral-950/10">
                <Sparkle size={22} weight="light" />
              </div>
              <span className="text-xs font-mono tracking-widest text-neutral-400">01 / Estética</span>
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-light tracking-tight text-neutral-900 mb-4">
                Alinhadores Invisíveis
              </h3>
              <p className="text-sm md:text-base font-light text-neutral-500 leading-relaxed max-w-[50ch]">
                Correções ortodônticas de altíssima precisão com design computadorizado. Placas imperceptíveis que reposicionam os dentes preservando a integridade biológica e a estética social.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-900/5 pt-6 text-[10px] md:text-xs tracking-widest font-mono text-neutral-400">
              <span>SCANNING TRIDIMENSIONAL · CAD/CAM</span>
              <a href="#contato" className="flex items-center gap-2 text-neutral-900 hover:gap-3 transition-all duration-300">
                <span>SAIBA MAIS</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Card 2: Lentes Liquid Glass (Initially Right) */}
          <div className="card-2 absolute w-full max-w-[650px] aspect-[16/10] md:aspect-[16/9] liquid-glass rounded-3xl p-8 md:p-12 flex flex-col justify-between opacity-0 select-none">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white shadow-lg shadow-neutral-950/10">
                <SunDim size={22} weight="light" />
              </div>
              <span className="text-xs font-mono tracking-widest text-neutral-400">02 / Biomimética</span>
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-light tracking-tight text-neutral-900 mb-4">
                Lentes Liquid Glass
              </h3>
              <p className="text-sm md:text-base font-light text-neutral-500 leading-relaxed max-w-[50ch]">
                Restaurações ultrafinas em cerâmica feldspática pura. Criamos facetas que mimetizam perfeitamente a translucidez, opalescência e reflexão de luz características do esmalte dentário natural.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-900/5 pt-6 text-[10px] md:text-xs tracking-widest font-mono text-neutral-400">
              <span>ESTÉTICA ADESIVA MATIZ · REFRAÇÃO DE LUZ</span>
              <a href="#contato" className="flex items-center gap-2 text-neutral-900 hover:gap-3 transition-all duration-300">
                <span>SAIBA MAIS</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Card 3: Odontologia Biológica (Initially Right) */}
          <div className="card-3 absolute w-full max-w-[650px] aspect-[16/10] md:aspect-[16/9] liquid-glass rounded-3xl p-8 md:p-12 flex flex-col justify-between opacity-0 select-none">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white shadow-lg shadow-neutral-950/10">
                <Shield size={22} weight="light" />
              </div>
              <span className="text-xs font-mono tracking-widest text-neutral-400">03 / Saúde Sistêmica</span>
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-light tracking-tight text-neutral-900 mb-4">
                Odontologia Integrativa
              </h3>
              <p className="text-sm md:text-base font-light text-neutral-500 leading-relaxed max-w-[50ch]">
                Uma abordagem de saúde integral e livre de metais (Metal-Free). Implantes de zircônia premium e remoção segura de amálgamas sob protocolos biológicos rigorosos para proteger seu bem-estar geral.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-900/5 pt-6 text-[10px] md:text-xs tracking-widest font-mono text-neutral-400">
              <span>METAL-FREE CERAMICS · BIO-COMPATÍVEL</span>
              <a href="#contato" className="flex items-center gap-2 text-neutral-900 hover:gap-3 transition-all duration-300">
                <span>SAIBA MAIS</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

        </main>

        {/* Camera Progress Indicator / Metadata bar */}
        <footer className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between z-20 text-[10px] md:text-xs tracking-widest text-neutral-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-ping" />
            <span>INTERATIVE CAMERA MODE</span>
          </div>
          <span className="hidden sm:inline">EXPLORE DESLIZANDO O SCROLL</span>
        </footer>

      </div>
    </div>
  );
}
