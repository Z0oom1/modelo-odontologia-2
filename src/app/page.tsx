"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import CameraScrollSection from "@/components/CameraScrollSection";
import Logo from "@/components/Logo";
import Image from "next/image";
import FloatingTeeth from "@/components/FloatingTeeth";
import { Sparkle, Phone, Envelope, MapPin, ArrowRight, Eye, ShieldCheck, Pulse } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";

export default function Home() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 6000); // 6 seconds for clean fluid status reset
  };

  return (
    <SmoothScroll>
      <FloatingTeeth />
      <div className="relative w-full min-h-[100dvh] flex flex-col bg-[#FCFCFA]">
        
        {/* 1. Fullscreen Cinematic Hero Section */}
        <Hero />

        {/* 2. Transition Section: Clinical Overview & Biomimetics */}
        <section id="estudio" className="relative w-full py-24 md:py-36 bg-[#FCFCFA] z-10">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
            
            {/* Left: Headline & Concept */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.25em] font-light text-neutral-400 block mb-4 uppercase">
                FILOSOFIA INTEGRADA
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-neutral-900 leading-[1.1] mb-8">
                Microscopia de alta precisão e materiais <span className="italic font-serif text-neutral-800">100% biocompatíveis</span>.
              </h2>
              <p className="text-sm md:text-base font-light text-neutral-500 leading-relaxed max-w-[55ch] mb-8">
                No estúdio myTooth, cada elemento anatômico é restaurado respeitando os preceitos da biomimética dentária. Operamos sob magnificação óptica avançada, preservando a estrutura saudável de forma ultra-conservadora, livre de componentes metálicos prejudiciais à saúde sistêmica.
              </p>
              
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400">
                <Sparkle size={14} className="text-neutral-900 animate-pulse" />
                <span>EXCELÊNCIA INTEGRATIVA · CUIDADO CIENTÍFICO</span>
              </div>
            </div>

            {/* Right: Premium Statistics Bento-Grid (3 elements, fully proportional) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="liquid-glass rounded-3xl overflow-hidden relative flex flex-col justify-between aspect-[1.1]">
                <div className="absolute inset-0 z-0 opacity-[0.14] select-none pointer-events-none">
                  <Image 
                    src="/veneers.png" 
                    alt="Porcelana myTooth"
                    fill 
                    className="object-cover scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FCFCFA] via-transparent to-transparent" />
                </div>
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <span className="text-sm font-mono text-neutral-400">01 / LENTES</span>
                  <div>
                    <div className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-2">0.08 mm</div>
                    <p className="text-xs font-light text-neutral-500 leading-relaxed">
                      Espessura ultra-conservadora das nossas lentes microscópicas feldspáticas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="liquid-glass rounded-3xl p-8 flex flex-col justify-between aspect-[1.1]">
                <span className="text-sm font-mono text-neutral-400">02 / BIOLOGIA</span>
                <div>
                  <div className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-2">100%</div>
                  <p className="text-xs font-light text-neutral-400 leading-relaxed">
                    Materiais metal-free e biocompatibilidade cientificamente testada.
                  </p>
                </div>
              </div>

              <div className="liquid-glass rounded-3xl p-8 flex flex-col justify-between col-span-1 sm:col-span-2 aspect-[2.3] sm:aspect-auto">
                <span className="text-sm font-mono text-neutral-400">03 / HISTÓRIA</span>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <div className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-2">25 anos</div>
                    <p className="text-xs font-light text-neutral-400 leading-relaxed max-w-[35ch]">
                      De dedicação clínica exclusiva voltada à odontologia de alta precisão e estética funcional.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white">
                    <Sparkle size={12} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2.B. New Section: Sobre (About & Dental Care) */}
        <section id="sobre" className="relative w-full py-24 md:py-36 bg-[#FCFCFA] z-10 border-t border-neutral-900/5 overflow-hidden">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
            
            {/* Left: Premium Empty-Image Frame (Target for the descending Tooth 1) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div id="sobre-tooth-target-container" className="sobre-tooth-target-container w-full max-w-[400px] aspect-square relative rounded-3xl border border-neutral-900/5 bg-[#FDFDFB] flex items-center justify-center shadow-xl">
                {/* Visual marker of the slot: elegant dashed thin ring */}
                <div className="absolute inset-8 rounded-full border border-dashed border-neutral-900/5 animate-[spin_120s_linear_infinite]" />
                
                {/* Real DOM Slot: This is the target box where the floating tooth will dock! */}
                <div 
                  id="sobre-tooth-slot" 
                  className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center"
                >
                  {/* Static Tooth Image inside the slot, initially invisible (opacity-0)
                      We'll fade it to 100% opacity exactly when the floating tooth lands! */}
                  <div 
                    id="sobre-tooth-static" 
                    className="w-full h-full relative tooth-hidden"
                  >
                    <Image
                      src="/dente.png"
                      alt="Tooth Clean Docked"
                      fill
                      className="object-contain blur-none"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Premium Dental Care Philosophy & Info */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.25em] font-light text-neutral-400 block mb-4 uppercase">
                ARQUITETURA DO SORRISO
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-neutral-900 leading-[1.1] mb-8">
                Preservação ativa e a ciência do <span className="italic font-serif text-neutral-800">cuidado diário</span>.
              </h2>
              <p className="text-sm md:text-base font-light text-neutral-500 leading-relaxed max-w-[55ch] mb-8">
                No estúdio myTooth, acreditamos que a odontologia de excelência começa no cuidado biológico preventivo. Mais do que esculpir restaurações perfeitas sob microscopia, orientamos nossos pacientes na manutenção da saúde e integridade do esmalte natural.
              </p>
              
              {/* Dental Care Info Blocks - High end spaced metadata rows */}
              <div className="space-y-6 border-t border-neutral-900/5 pt-8">
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-[#C5A880] mt-1">01 /</span>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Remineralização Biológica do Esmalte</h4>
                    <p className="text-xs text-neutral-400 mt-1">Estimulação mineral ativa através de nano-hidroxiapatita sintética, protegendo a barreira natural contra ácidos e micro-lesões diárias.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-[#C5A880] mt-1">02 /</span>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Preservação do Microbioma Oral</h4>
                    <p className="text-xs text-neutral-400 mt-1">Higienização com componentes metal-free e óleos ozonizados essenciais que controlam patógenos sem destruir as bactérias benéficas da saliva.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-[#C5A880] mt-1">03 /</span>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Técnicas de Escovação Micro-Conservadoras</h4>
                    <p className="text-xs text-neutral-400 mt-1">Instrução clínica individualizada para escovação não abrasiva, evitando retrações gengivais e preservando a junção cemento-esmalte.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Pinned Scroll Camera Slider */}
        <section id="especialidades" className="relative w-full z-20">
          <CameraScrollSection />
        </section>

        {/* 3.B. Seção de Diferenciais Tecnológicos & Biologia Integrativa */}
        <section id="tecnologia" className="relative w-full py-24 md:py-36 bg-[#FCFCFA] z-10 border-t border-neutral-900/5">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
            
            <div className="max-w-[75ch] mb-16 md:mb-24">
              <span className="text-[10px] tracking-[0.25em] font-light text-neutral-400 block mb-4 uppercase">
                ENGENHARIA INTEGRATIVA
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-neutral-900 leading-[1.1]">
                Nossa tecnologia redefine a <span className="italic font-serif text-neutral-800">micro-precisão</span> biológica.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Zeiss Microscope Card */}
              <div className="liquid-glass rounded-3xl p-8 md:p-10 flex flex-col justify-between aspect-[1.1] md:aspect-square">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white shadow-lg">
                  <Eye size={22} weight="light" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-light tracking-tight text-neutral-900 mb-3">
                    Microscopia Zeiss
                  </h3>
                  <p className="text-xs md:text-sm font-light text-neutral-500 leading-relaxed">
                    Operamos sob magnificação óptica Zeiss de até 40x. Isso possibilita enxergar micro-fissuras, margens e detalhes invisíveis a olho nu, garantindo preparos ultra-conservadores e vedamento impecável.
                  </p>
                </div>
              </div>

              {/* Safe Amalgam Card */}
              <div className="liquid-glass rounded-3xl p-8 md:p-10 flex flex-col justify-between aspect-[1.1] md:aspect-square">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck size={22} weight="light" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-light tracking-tight text-neutral-900 mb-3">
                    Remoção Segura de Mercúrio
                  </h3>
                  <p className="text-xs md:text-sm font-light text-neutral-500 leading-relaxed">
                    Substituímos restaurações de amálgama cinza antigas seguindo rigorosamente os protocols internacionais de segurança (IAOMT). Proteção total das vias aéreas e barreiras químicas contra vapores de mercúrio.
                  </p>
                </div>
              </div>

              {/* Ozonioterapia Card */}
              <div className="liquid-glass rounded-3xl p-8 md:p-10 flex flex-col justify-between aspect-[1.1] md:aspect-square">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white shadow-lg">
                  <Pulse size={22} weight="light" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-light tracking-tight text-neutral-900 mb-3">
                    Ozonioterapia e Laser
                  </h3>
                  <p className="text-xs md:text-sm font-light text-neutral-500 leading-relaxed">
                    Utilizamos ozônio medicinal gasoso para desinfecção biológica avançada e bioestimulação celular. Associado à laserterapia de baixa intensidade, aceleramos drasticamente a cicatrização pós-cirúrgica.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3.C. Seção de Corpo Clínico / Direção Técnica */}
        <section id="corpo-clinico" className="relative w-full py-24 md:py-36 bg-[#FCFCFA] z-10 border-t border-neutral-900/5">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
            
            {/* Left: Dentist Info, Credentials, and Academic Formations */}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
              <span className="text-[10px] tracking-[0.25em] font-light text-neutral-400 block mb-4 uppercase">
                DIREÇÃO CLÍNICA
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-neutral-900 leading-[1.1] mb-6">
                Dr. João Silva
              </h2>
              <h3 className="text-sm md:text-base font-mono tracking-widest text-[#C5A880] uppercase mb-8">
                RT: CROSP 12345 · Especialista em Odontologia Biomimética
              </h3>
              
              <p className="text-sm md:text-base font-light text-neutral-500 leading-relaxed max-w-[55ch] mb-10">
                Fundador da clínica myTooth, o Dr. João Silva é referência em reabilitação oral microscópica e procedimentos biológicos metal-free. Com mais de duas décadas de dedicação exclusiva, sua prática une precisão laboratorial, bio-compatibilidade sistêmica e uma refinada percepção artística para recriar a arquitetura natural do sorriso.
              </p>

              {/* Formations list - Spaced, premium metadata rows */}
              <div className="space-y-6 border-t border-neutral-900/5 pt-8">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Especialista em Dentística Restauradora e Biomimética</h4>
                    <p className="text-xs text-neutral-400 mt-1">Faculdade de Odontologia da Universidade de São Paulo · USP</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Mestrado em Odontologia Estética e Reabilitação Oral</h4>
                    <p className="text-xs text-neutral-400 mt-1">New York University College of Dentistry · NYU (EUA)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Membro Ativo e Certificado pela IAOMT</h4>
                    <p className="text-xs text-neutral-400 mt-1">International Academy of Oral Medicine and Toxicology (EUA) · Protocolo Safe Amalgam Removal</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">Pioneiro em Microscopia Clínica Aplicada</h4>
                    <p className="text-xs text-neutral-400 mt-1">Pesquisador e mentor em preparos micro-invasivos sob magnificação Zeiss de alta resolução</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Premium Portrait in Liquid Glass Frame */}
            <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
              <div id="doctor-portrait-container" className="liquid-glass rounded-3xl p-4 md:p-6 w-full max-w-[420px] aspect-[4/5] relative overflow-hidden select-none shadow-xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-100">
                  {/* Doctor Image without Tooth (Default State) */}
                  <Image 
                    id="doctor-empty-img"
                    src="/doutor.png" 
                    alt="Dr. João Silva - Diretor Clínico da myTooth" 
                    fill 
                    className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105" 
                    priority
                  />

                  {/* Doctor Image with Tooth (Docked State) */}
                  <Image 
                    id="doctor-tooth-img"
                    src="/doutor-com-dente.png" 
                    alt="Dr. João Silva com dente - myTooth" 
                    fill 
                    className="object-cover absolute inset-0 tooth-hidden transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105" 
                    priority
                  />

                  {/* Absolute Target Slot for the descending right tooth */}
                  <div 
                    id="doctor-tooth-slot"
                    className="absolute top-[50%] left-[45%] w-[60px] h-[60px] md:w-20 md:h-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Elegant Contact / Scheduling Section with Liquid Glass Forms */}
        <section id="contato" className="relative w-full py-24 md:py-36 bg-[#FCFCFA] z-10 border-t border-neutral-900/5">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Contact Info and Visual Branding */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-12">
              <div>
                <span className="text-[10px] tracking-[0.25em] font-light text-neutral-400 block mb-4 uppercase">
                  EXPERIÊNCIA PRESENCIAL
                </span>
                <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-neutral-900 leading-[1.1] mb-6">
                  Agende sua <span className="italic font-serif text-neutral-800">Sessão Clínica</span>
                </h2>
                <p className="text-sm md:text-base font-light text-neutral-500 leading-relaxed max-w-[40ch]">
                  Oferecemos um atendimento singular sob reserva de horário exclusivo para total privacidade e foco terapêutico.
                </p>
              </div>

              {/* Minimalist Details block */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-900/5 flex items-center justify-center text-neutral-900">
                    <Phone size={18} weight="light" />
                  </div>
                  <div className="text-xs md:text-sm tracking-wide text-neutral-600 font-light">
                    +55 (11) 98765-4321
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-900/5 flex items-center justify-center text-neutral-900">
                    <Envelope size={18} weight="light" />
                  </div>
                  <div className="text-xs md:text-sm tracking-wide text-neutral-600 font-light">
                    atendimento@mytooth.com.br
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-900/5 flex items-center justify-center text-neutral-900">
                    <MapPin size={18} weight="light" />
                  </div>
                  <div className="text-xs md:text-sm tracking-wide text-neutral-600 font-light">
                    Al. Lorena, 1500 · Jardins, São Paulo
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono tracking-widest text-neutral-400">
                CROSP 12345 · RT: DR. JOÃO SILVA
              </div>
            </div>

            {/* Right: Booking Form inside Liquid Glass container */}
            <div className="lg:col-span-7">
              <div className="liquid-glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
                
                {formSubmitted ? (
                  <div className="absolute inset-0 bg-[#FCFCFA]/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-20">
                    <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center mb-6 shadow-xl animate-pulse">
                      <Sparkle size={32} weight="light" />
                    </div>
                    <h3 className="text-2xl font-light tracking-tight text-neutral-900 mb-3">Reserva Solicitada</h3>
                    <p className="text-sm font-light text-neutral-500 max-w-[32ch] leading-relaxed">
                      Nossa concierge entrará em contato nas próximas horas para personalizar o horário da sua consulta.
                    </p>
                  </div>
                ) : null}

                <form onSubmit={handleBooking} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Input: Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-[10px] tracking-widest text-neutral-400 font-mono uppercase">
                        NOME COMPLETO
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        placeholder="Ex: Dra. Mariana Vasconcellos"
                        className="bg-transparent border-b border-neutral-900/10 focus:border-neutral-900 py-3 text-sm font-light text-neutral-900 outline-none transition-all duration-500 placeholder-neutral-300"
                      />
                    </div>

                    {/* Input: Phone */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-[10px] tracking-widest text-neutral-400 font-mono uppercase">
                        CONTATO TELEFÔNICO
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        required
                        placeholder="Ex: (11) 99999-8888"
                        className="bg-transparent border-b border-neutral-900/10 focus:border-neutral-900 py-3 text-sm font-light text-neutral-900 outline-none transition-all duration-500 placeholder-neutral-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Dropdown: Treatment Preference */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="treatment" className="text-[10px] tracking-widest text-neutral-400 font-mono uppercase">
                        ÁREA DE INTERESSE
                      </label>
                      <select 
                        id="treatment"
                        className="bg-transparent border-b border-neutral-900/10 focus:border-neutral-900 py-3 text-sm font-light text-neutral-900 outline-none transition-all duration-500 cursor-pointer"
                      >
                        <option value="aligners" className="bg-[#FCFCFA] text-neutral-900">Alinhadores Invisíveis</option>
                        <option value="glass" className="bg-[#FCFCFA] text-neutral-900">Lentes Liquid Glass</option>
                        <option value="biological" className="bg-[#FCFCFA] text-neutral-900">Odontologia Biológica</option>
                        <option value="general" className="bg-[#FCFCFA] text-neutral-900">Consulta Diagnóstica Geral</option>
                      </select>
                    </div>

                    {/* Input: Notes */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="notes" className="text-[10px] tracking-widest text-neutral-400 font-mono uppercase">
                        OBSERVAÇÕES (OPCIONAL)
                      </label>
                      <input 
                        type="text" 
                        id="notes" 
                        placeholder="Ex: Melhor período da tarde"
                        className="bg-transparent border-b border-neutral-900/10 focus:border-neutral-900 py-3 text-sm font-light text-neutral-900 outline-none transition-all duration-500 placeholder-neutral-300"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit" 
                      className="liquid-glass w-full py-4 text-xs tracking-[0.2em] font-light text-white bg-neutral-900 rounded-full flex items-center justify-center gap-3 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-neutral-900/10"
                    >
                      <span>SOLICITAR RESERVA</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </section>

        {/* 5. Minimalist Premium Footer */}
        <footer className="w-full bg-neutral-950 text-white py-16 md:py-24 z-10">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-white/10 pb-16">
            
            <div className="flex flex-col items-center md:items-start gap-4">
              <Logo dark iconClassName="w-20 h-20" className="scale-100" />
              <p className="text-xs font-light text-white/50 max-w-[28ch] leading-relaxed mt-2 text-center md:text-left">
                Estúdio de odontologia microscópica e saúde integrativa sistêmica.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-16 gap-y-8 text-xs font-light tracking-widest text-white/60">
              <a href="#estudio" className="hover:text-white transition-colors duration-300">ESTÚDIO</a>
              <a href="#sobre" className="hover:text-white transition-colors duration-300">SOBRE</a>
              <a href="#especialidades" className="hover:text-white transition-colors duration-300">ESPECIALIDADES</a>
              <a href="#corpo-clinico" className="hover:text-white transition-colors duration-300">DOUTOR</a>
              <a href="#contato" className="hover:text-white transition-colors duration-300">RESERVA</a>
            </div>

          </div>

          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-mono tracking-widest text-white/40">
            <span>© {new Date().getFullYear()} MYTOOTH CLÍNICA ODONTOLÓGICA. TODOS OS DIREITOS RESERVADOS.</span>
            <span>DESIGN BY CRdev</span>
          </div>
        </footer>

      </div>
    </SmoothScroll>
  );
}
