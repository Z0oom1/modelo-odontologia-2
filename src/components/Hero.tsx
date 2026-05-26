"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/components/Logo";
import { ArrowUpRight, Sparkle } from "@phosphor-icons/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance Timeline for elegant load-in (>0.6s transitions & power3 eases)
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".hero-nav",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
      .fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=0.9"
      )
      .fromTo(
        ".hero-title-line",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.2 },
        "-=1.0"
      )
      .fromTo(
        ".hero-sub",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=1.1"
      )
      .fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.4 },
        "-=1.1"
      )
      .fromTo(
        ".hero-scroll-indicator",
        { opacity: 0, y: 15 },
        { opacity: 0.8, y: 0, duration: 1.5 },
        "-=0.9"
      );

      // Scroll Trigger to hide scroll indicator gracefully as the user scrolls
      gsap.to(".hero-scroll-indicator", {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "30% top",
          scrub: 1.2,
        },
      });

      // Subtle video parallax effect for cinematic breathing space
      gsap.to(".hero-video-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-container relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-neutral-950 text-white"
    >
      {/* 1. Cinematic Background Video Loop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/20 to-[#FCFCFA] z-10" />
        <div className="absolute inset-0 bg-neutral-950/30 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-bg absolute inset-0 w-full h-full object-cover scale-105 opacity-80"
        >
          <source
            src="/background.webm"
            type="video/webm"
          />
          <source
            src="/background.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* 2. Embedded Premium Header */}
      <header className="hero-nav relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo onlyIcon iconClassName="w-14 h-14 md:w-18 md:h-18" />
          <span className="text-sm md:text-base font-light tracking-[0.25em] text-white select-none">myTooth</span>
        </div>
        
        {/* Desktop Single Line Navigation - Standard height cap under 80px */}
        <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.15em] font-light text-white/70">
          <a href="#estudio" className="hover:text-white transition-colors duration-300">ESTÚDIO</a>
          <a href="#sobre" className="hover:text-white transition-colors duration-300">SOBRE</a>
          <a href="#especialidades" className="hover:text-white transition-colors duration-300">ESPECIALIDADES</a>
          <a href="#tecnologia" className="hover:text-white transition-colors duration-300">TECNOLOGIA</a>
          <a href="#corpo-clinico" className="hover:text-white transition-colors duration-300">DOUTOR</a>
          <a href="#contato" className="hover:text-white transition-colors duration-300">AGENDA</a>
        </nav>

        {/* Muted Premium Action Button */}
        <a 
          href="#contato"
          className="liquid-glass text-xs font-light tracking-[0.1em] text-neutral-950 bg-white/95 px-6 py-2.5 rounded-full hover:scale-105 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]"
        >
          CONSULTA
        </a>
      </header>

      {/* 3. Hero Main Content - Controlled layout height and alignment */}
      <main className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center py-20">
        <div className="max-w-[85ch]">
          {/* Muted Eyebrow */}
          <div className="hero-eyebrow flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="text-[10px] md:text-xs tracking-[0.25em] font-light text-white/60">
              CONCEITO SINGULAR DE ESTÉTICA
            </span>
          </div>

          {/* Majestic, elegant typography */}
          <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] leading-[1.05] font-light tracking-tighter text-white select-none">
            <span className="hero-title-line block overflow-hidden">
              A Arte da
            </span>
            <span className="hero-title-line block italic font-serif text-white/90 pr-2">
              Odontologia Simétrica
            </span>
          </h1>

          {/* Under 20 words max subtext rule strictly enforced */}
          <p className="hero-sub text-sm md:text-base font-light tracking-wide text-white/70 leading-relaxed max-w-[45ch] mt-8 mb-10">
            Desenhamos sorrisos que combinam anatomia perfeita, biologia integrada e a refração natural da luz. Um estúdio odontológico sob medida.
          </p>

          {/* CTA Buttons in Premium glassmorphism */}
          <div className="hero-cta flex flex-wrap gap-4 items-center">
            <a 
              href="#estudio" 
              className="liquid-glass flex items-center gap-2 text-xs font-light tracking-[0.15em] text-neutral-900 bg-white px-8 py-4 rounded-full transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <span>EXPLORAR CONCEITO</span>
              <ArrowUpRight size={14} />
            </a>
            <a 
              href="#contato" 
              className="flex items-center gap-2 text-xs font-light tracking-[0.15em] text-white/80 border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 backdrop-blur-md"
            >
              <span>EXPERIÊNCIA CLINICA</span>
            </a>
          </div>
        </div>
      </main>

      {/* 4. Elegant Scroll Indicator */}
      <div className="hero-scroll-indicator relative z-20 w-full flex flex-col items-center justify-center pb-12 select-none">
        <span className="text-[10px] tracking-[0.3em] font-light text-white/40 mb-3 uppercase">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-white rounded-full animate-bounce" style={{ animationDuration: '2.4s' }} />
        </div>
      </div>
    </div>
  );
}
