import { useEffect, useRef, useState } from "react";

// ============ IMAGE URLS (Lovable CDN) ============
const IMG = {
  limpeza: "/__l5e/assets-v1/b2670a3f-b16a-4b86-94e7-6d0542515650/image.png",
  labial1: "/__l5e/assets-v1/d039f7c6-73bc-49fe-b846-c393a0d553b0/image-2.png",
  labial2: "/__l5e/assets-v1/c6afd2ef-0496-4699-b7b8-f0876daecf94/image-3.png",
  labial3: "/__l5e/assets-v1/369b1c85-1f6f-42cd-b1c0-6e32c9c87b8f/image-4.png",
  acne: "/__l5e/assets-v1/040d1ccb-9f0d-4466-b099-27319b22354c/image-5.png",
  retrato: "/__l5e/assets-v1/a1ed25f9-7935-4566-8eab-e7e3e6fa0ffd/image-6.png",
  micro: "/__l5e/assets-v1/2909f0eb-3ef0-4895-8f87-a3da8ba4cf8d/image-7.png",
  belotero: "/__l5e/assets-v1/30064067-4bbe-4b8c-a5db-1c34c28b7be0/image-8.png",
};

const WHATSAPP_URL = "https://wa.me/5561999360811?text=Ol%C3%A1%20Val%C3%A9ria%2C%20gostaria%20de%20agendar%20uma%20consulta.";
const BEACONS_URL = "https://beacons.ai/valeriatavares";

// ============ LINE-ART SVGs ============
function FaceProfile({ size = 100, opacity = 1, stroke = "var(--clay)" }: { size?: number; opacity?: number; stroke?: string }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 100 130" fill="none" style={{ opacity }}>
      <g stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* hair back */}
        <path d="M 30 20 Q 20 40 22 65 Q 24 90 34 108 Q 40 118 48 122" />
        {/* forehead + nose + lips + chin */}
        <path d="M 48 22 Q 62 20 70 32 Q 74 42 72 52 L 78 60 Q 82 63 78 66 L 74 68 Q 74 74 70 76 L 68 80 Q 71 84 66 86 Q 68 92 62 94 Q 68 96 65 100 Q 64 108 58 114 Q 52 120 46 122" />
        {/* hair front */}
        <path d="M 30 20 Q 40 12 55 12 Q 70 14 75 22" />
        {/* eye */}
        <path d="M 60 44 Q 63 42 67 44" />
        {/* eyebrow */}
        <path d="M 60 38 Q 64 36 68 38" />
        {/* hair flow */}
        <path d="M 22 65 Q 12 80 15 100 Q 18 115 28 120" />
      </g>
    </svg>
  );
}

function FaceFront({ size = 100, opacity = 1, stroke = "var(--clay)" }: { size?: number; opacity?: number; stroke?: string }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none" style={{ opacity }}>
      <g stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 50 15 Q 30 15 25 40 Q 22 60 28 80 Q 34 100 50 108 Q 66 100 72 80 Q 78 60 75 40 Q 70 15 50 15 Z" />
        {/* hair */}
        <path d="M 25 40 Q 20 20 40 12 Q 55 8 65 14 Q 78 22 75 40" />
        {/* eyes */}
        <path d="M 36 50 Q 40 48 44 50" />
        <path d="M 56 50 Q 60 48 64 50" />
        {/* eyebrows */}
        <path d="M 35 44 Q 40 42 45 44" />
        <path d="M 55 44 Q 60 42 65 44" />
        {/* nose */}
        <path d="M 50 55 Q 48 65 47 72 Q 50 74 53 72 Q 52 65 50 55" />
        {/* lips */}
        <path d="M 43 85 Q 50 82 57 85 Q 50 90 43 85 Z" />
      </g>
    </svg>
  );
}

function CircleFace({ size = 44, stroke = "var(--clay)" }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="28" stroke={stroke} strokeWidth="1" fill="none" />
      <g stroke={stroke} strokeWidth="1" strokeLinecap="round" fill="none">
        <path d="M 20 26 Q 18 40 24 48 Q 30 52 36 48 Q 42 40 40 26 Q 38 18 30 18 Q 22 18 20 26 Z" />
        <path d="M 24 30 Q 26 29 28 30" />
        <path d="M 32 30 Q 34 29 36 30" />
        <path d="M 30 34 L 30 40 Q 28 42 30 43 Q 32 42 30 40" />
        <path d="M 27 45 Q 30 47 33 45" />
      </g>
    </svg>
  );
}

// ============ Intersection Observer hook ============
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-up, .line-grow");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const delay = Number((e.target as HTMLElement).dataset.delay ?? i * 110);
            setTimeout(() => e.target.classList.add("in"), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ============ NAVBAR ============
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    { l: "SOBRE", h: "#sobre" },
    { l: "TRATAMENTOS", h: "#tratamentos" },
    { l: "RESULTADOS", h: "#resultados" },
    { l: "CONTATO", h: "#contato" },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(250,247,243,0.85)" : "rgba(250,247,243,0.4)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[76px]">
        <a href="#top" className="flex items-center gap-3">
          <CircleFace size={40} />
          <div className="leading-tight">
            <div className="font-display italic text-[17px]" style={{ color: "var(--dark)" }}>VALÉRIA TAVARES</div>
            <div className="font-sans text-[9px] uppercase" style={{ color: "var(--muted-ink)", letterSpacing: "0.2em" }}>
              ESTÉTICA FACIAL · BRASÍLIA
            </div>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((k) => (
            <a
              key={k.l}
              href={k.h}
              className="font-sans text-[11px] uppercase transition-colors hover:text-[var(--clay)]"
              style={{ color: "var(--mid)", letterSpacing: "0.15em" }}
            >
              {k.l}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-medium text-[12px] uppercase px-6 py-3 rounded-full transition-all duration-300"
            style={{ background: "var(--clay)", color: "var(--paper)", letterSpacing: "0.1em" }}
            onMouseEnter={(e) => ((e.currentTarget.style.background = "var(--cocoa)"))}
            onMouseLeave={(e) => ((e.currentTarget.style.background = "var(--clay)"))}
          >
            AGENDAR
          </a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" strokeWidth="1.5">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "var(--paper)" }}>
          {links.map((k) => (
            <a key={k.l} href={k.h} onClick={() => setOpen(false)} className="font-sans text-[12px] uppercase" style={{ color: "var(--mid)", letterSpacing: "0.15em" }}>
              {k.l}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-sans font-medium text-[12px] uppercase px-6 py-3 rounded-full text-center" style={{ background: "var(--clay)", color: "var(--paper)" }}>
            AGENDAR
          </a>
        </div>
      )}
    </nav>
  );
}

// ============ HERO ============
function Hero() {
  return (
    <section id="top" className="relative w-full min-h-screen overflow-hidden" style={{ background: "var(--paper)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 28% 52%, var(--glow) 0%, transparent 65%)" }}
      />
      <div
        className="absolute pointer-events-none font-display italic font-bold select-none"
        style={{
          left: "-1%",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "clamp(90px, 16vw, 220px)",
          color: "rgba(44,26,16,0.03)",
          lineHeight: 1,
        }}
      >
        FACIAL
      </div>

      {/* TEXT */}
      <div className="relative z-10 h-screen flex items-center px-6 md:pl-[7%] max-w-[1400px]">
        <div className="w-full md:w-[52%] pt-24 md:pt-0">
          <div className="flex items-center gap-3 mb-6 fade-up">
            <FaceProfile size={38} opacity={0.9} />
            <span className="block h-px w-8" style={{ background: "var(--clay)" }} />
            <span className="font-sans text-[10px] uppercase" style={{ color: "var(--clay)", letterSpacing: "0.25em" }}>
              ESTÉTICA FACIAL · BRASÍLIA
            </span>
          </div>
          <h1 className="font-display italic fade-up" style={{ fontSize: "clamp(52px, 7.5vw, 105px)", lineHeight: 0.9, color: "var(--dark)" }} data-delay="120">
            Pele saudável,
            <br />
            <span style={{ color: "var(--clay)", fontWeight: 700 }}>bonita</span>
            <br />
            e natural.
          </h1>
          <p className="mt-6 max-w-[480px] fade-up font-sans" style={{ fontSize: 16, color: "var(--mid)", fontWeight: 300 }} data-delay="260">
            Especialista em tratamentos faciais e harmonização em Brasília — resultado que respeita quem você é.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 fade-up" data-delay="380">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-medium uppercase rounded-full transition-all duration-300"
              style={{ background: "var(--clay)", color: "var(--paper)", fontSize: 12, padding: "15px 36px", letterSpacing: "0.12em" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cocoa)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clay)")}
            >
              AGENDAR CONSULTA
            </a>
            <a href="#tratamentos" className="group font-sans" style={{ color: "var(--clay)", fontSize: 13 }}>
              VER TRATAMENTOS <span className="arrow-slide">→</span>
            </a>
          </div>
          <div className="mt-9 flex flex-wrap gap-2 fade-up" data-delay="500">
            {["Trat. Faciais", "Harmonização", "Acne"].map((t) => (
              <span key={t} className="font-sans rounded-full" style={{ background: "var(--nude)", color: "var(--cocoa)", fontSize: 11, padding: "6px 14px" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* VISUAL */}
      <div
        className="hidden md:block absolute right-0 top-0 h-screen w-[42%] overflow-hidden"
        style={{
          background: "linear-gradient(150deg, var(--nude) 0%, var(--linen) 100%)",
          clipPath: "polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <img
          src={IMG.retrato}
          alt="Valéria Tavares"
          className="w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center 25%" }}
        />
        <div className="absolute bottom-8 left-8 pointer-events-none">
          <FaceFront size={200} opacity={0.15} stroke="var(--clay)" />
        </div>
        <div
          className="absolute font-display italic"
          style={{
            bottom: 40,
            left: -24,
            background: "var(--paper)",
            border: "1px solid var(--clay)",
            padding: "8px 18px",
            borderRadius: 999,
            fontSize: 13,
            color: "var(--dark)",
            boxShadow: "0 10px 30px rgba(176,122,90,0.15)",
          }}
        >
          Valéria Tavares
        </div>
      </div>

      {/* Mobile image */}
      <div className="md:hidden w-full h-[50vh] mt-8" style={{ background: "var(--nude)" }}>
        <img src={IMG.retrato} alt="Valéria Tavares" className="w-full h-full" style={{ objectFit: "cover", objectPosition: "center 25%" }} />
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:flex absolute bottom-10 left-9 flex-col items-center gap-3">
        <span className="font-sans" style={{ color: "var(--clay)", opacity: 0.5, fontSize: 10, writingMode: "vertical-rl", letterSpacing: "0.3em" }}>SCROLL</span>
        <span className="w-px h-14 relative overflow-hidden" style={{ background: "rgba(176,122,90,0.2)" }}>
          <span className="absolute inset-x-0 top-0 h-4 animate-pulse" style={{ background: "var(--clay)" }} />
        </span>
      </div>
    </section>
  );
}

// ============ MANIFESTO ============
function Manifesto() {
  return (
    <section className="relative py-24 px-6 md:px-16 overflow-hidden" style={{ background: "var(--nude)" }}>
      <div className="max-w-[1200px] mx-auto flex items-center gap-8">
        <div className="hidden md:block shrink-0 fade-up">
          <FaceProfile size={140} opacity={0.28} stroke="var(--cocoa)" />
        </div>
        <div className="md:w-[72%] fade-up" data-delay="120">
          <p className="font-serif-italic" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "var(--dark)", lineHeight: 1.15 }}>
            Você não precisava
          </p>
          <p className="font-display italic font-bold" style={{ fontSize: "clamp(34px, 4.2vw, 52px)", color: "var(--clay)", lineHeight: 1.05 }}>
            de lábios maiores.
          </p>
          <p className="font-serif-italic mt-2" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", color: "var(--cocoa)", lineHeight: 1.15 }}>
            Só de lábios mais harmoniosos.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <span className="block h-px" style={{ background: "var(--clay)", width: 60 }} />
            <span className="font-sans uppercase" style={{ color: "var(--muted-ink)", fontSize: 11, letterSpacing: "0.2em" }}>
              — Valéria Tavares
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ SOBRE ============
function Sobre() {
  return (
    <section id="sobre" className="relative py-32 px-6 md:px-16" style={{ background: "var(--paper)" }}>
      <div
        className="absolute font-display font-bold pointer-events-none select-none"
        style={{ top: 40, right: 40, fontSize: 160, color: "var(--dark)", opacity: 0.04, lineHeight: 1 }}
      >
        01
      </div>
      <div className="max-w-[1300px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative fade-up">
          <div className="relative rounded-[20px] overflow-hidden" style={{ border: "1px solid var(--clay)", minHeight: 540 }}>
            <img src={IMG.retrato} alt="Valéria Tavares em Brasília" className="w-full h-[620px]" style={{ objectFit: "cover", objectPosition: "center 15%" }} />
          </div>
          <div
            className="absolute font-sans uppercase"
            style={{
              bottom: -18,
              right: -18,
              background: "var(--linen)",
              border: "1px solid var(--clay)",
              borderRadius: 999,
              padding: "8px 18px",
              fontSize: 10,
              color: "var(--cocoa)",
              letterSpacing: "0.2em",
            }}
          >
            Brasília · DF
          </div>
        </div>
        <div className="fade-up" data-delay="180">
          <span className="font-sans uppercase" style={{ color: "var(--clay)", fontSize: 10, letterSpacing: "0.35em" }}>SOBRE</span>
          <h2 className="font-display italic font-bold mt-3" style={{ fontSize: "clamp(38px, 4.6vw, 56px)", color: "var(--dark)", lineHeight: 1 }}>
            Valéria<br />/ Tavares
          </h2>
          <p className="font-serif-italic mt-6" style={{ fontSize: 22, color: "var(--clay)" }}>
            Especialista em estética facial com resultado natural.
          </p>
          <p className="font-sans mt-6" style={{ fontSize: 16, color: "var(--mid)", fontWeight: 300, lineHeight: 1.7 }}>
            Referência em tratamentos faciais e harmonização em Brasília. Minha filosofia é simples: realçar sem exagerar.
            Cada rosto tem uma história — meu trabalho é ler essa história com técnica, sensibilidade e cuidado personalizado
            para revelar a versão mais bonita e saudável de você.
          </p>
          <ul className="mt-8 space-y-3">
            {["Resultado natural", "Atendimento personalizado", "Brasília · DF"].map((d) => (
              <li key={d} className="font-sans flex items-center gap-3" style={{ color: "var(--dark)", fontSize: 14 }}>
                <span style={{ color: "var(--clay)" }}>✦</span> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============ TRATAMENTOS ============
function Tratamentos() {
  const cards = [
    { n: "I", t: "TRATAMENTOS FACIAIS", d: "Limpeza de pele profunda, peelings e protocolos personalizados para uma pele saudável e luminosa.", w: "44%", h: 380, mt: 0 },
    { n: "II", t: "HARMONIZAÇÃO", d: "Micropigmentação labial, bioestimuladores e refinamento de contornos com resultado natural.", w: "30%", h: 300, mt: 52 },
    { n: "III", t: "ACNE & PELE", d: "Tratamento de acne ativa, controle de oleosidade e melhora de textura e manchas.", w: "22%", h: 340, mt: 20 },
  ];
  return (
    <section id="tratamentos" className="relative py-32 px-6 md:px-16 overflow-hidden" style={{ background: "var(--linen)" }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="mb-16 fade-up">
          <p className="font-serif-italic" style={{ fontSize: "clamp(32px, 4vw, 56px)", color: "var(--mid)", lineHeight: 1 }}>
            os nossos
          </p>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(44px, 5vw, 68px)", color: "var(--dark)", letterSpacing: "-0.02em", lineHeight: 1 }}>
            TRATAMENTOS
          </h2>
        </div>

        <div className="hidden md:flex gap-6 items-start mb-8">
          {cards.map((c, i) => (
            <TratCard key={c.n} card={c} widthStyle={{ width: c.w, height: c.h, marginTop: c.mt }} delay={i * 120} />
          ))}
        </div>
        <div className="md:hidden flex flex-col gap-6 mb-8">
          {cards.map((c, i) => (
            <TratCard key={c.n} card={c} widthStyle={{ width: "100%", height: 320 }} delay={i * 120} />
          ))}
        </div>

        {/* Full card */}
        <div
          className="relative rounded-[16px] p-8 md:p-12 fade-up overflow-hidden flex flex-col md:flex-row gap-8 md:items-center"
          style={{ background: "var(--nude)", border: "1px solid var(--clay)" }}
        >
          <div className="md:w-3/5">
            <h3 className="font-display italic" style={{ fontSize: 32, color: "var(--dark)" }}>
              Limpeza de Pele · Bioestimuladores · Skincare Personalizado
            </h3>
            <p className="font-sans mt-3" style={{ color: "var(--cocoa)", fontSize: 14, fontWeight: 300, lineHeight: 1.7 }}>
              Protocolos completos com produtos selecionados, avaliação individual e acompanhamento contínuo para uma pele visivelmente mais saudável.
            </p>
          </div>
          <div className="md:w-2/5 rounded-[14px] overflow-hidden" style={{ height: 220 }}>
            <img src={IMG.belotero} alt="Produtos Belotero" className="w-full h-full" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TratCard({ card, widthStyle, delay }: { card: { n: string; t: string; d: string }; widthStyle: React.CSSProperties; delay: number }) {
  return (
    <div
      className="relative rounded-[16px] p-6 fade-up overflow-hidden transition-all duration-500"
      style={{
        ...widthStyle,
        background: "var(--paper)",
        borderTop: "2px solid var(--clay)",
      }}
      data-delay={delay}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 24px 60px rgba(176,122,90,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="absolute bottom-2 right-2 pointer-events-none">
        <FaceFront size={70} opacity={0.08} />
      </div>
      <div className="absolute font-display font-bold pointer-events-none select-none" style={{ top: 8, right: 16, fontSize: 80, color: "var(--dark)", opacity: 0.05, lineHeight: 1 }}>
        {card.n}
      </div>
      <div className="relative flex flex-col h-full justify-end">
        <h3 className="font-sans font-medium uppercase" style={{ color: "var(--dark)", fontSize: 15, letterSpacing: "0.08em" }}>
          {card.t}
        </h3>
        <p className="font-sans mt-3" style={{ color: "var(--mid)", fontSize: 13, fontWeight: 300, lineHeight: 1.6 }}>
          {card.d}
        </p>
      </div>
    </div>
  );
}

// ============ RESULTADOS ============
function Resultados() {
  const items = [
    { img: IMG.limpeza, label: "LIMPEZA DE PELE" },
    { img: IMG.acne, label: "TRATAMENTO DE ACNE" },
    { img: IMG.labial1, label: "MICROPIGMENTAÇÃO LABIAL" },
    { img: IMG.labial2, label: "MICROPIGMENTAÇÃO LABIAL" },
    { img: IMG.labial3, label: "MICROPIGMENTAÇÃO LABIAL" },
    { img: IMG.micro, label: "MICROPIGMENTAÇÃO" },
  ];
  return (
    <section id="resultados" className="relative py-32 px-6 md:px-16" style={{ background: "var(--paper)" }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="mb-16 fade-up">
          <p className="font-serif-italic" style={{ fontSize: "clamp(32px, 4vw, 56px)", color: "var(--clay)", lineHeight: 1 }}>
            resultados
          </p>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(44px, 5vw, 68px)", color: "var(--dark)", letterSpacing: "-0.02em", lineHeight: 1 }}>
            REAIS.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="fade-up" data-delay={i * 100}>
              <div className="rounded-[16px] overflow-hidden" style={{ border: "1px solid var(--clay)", background: "var(--linen)" }}>
                <img src={it.img} alt={it.label} className="w-full" style={{ objectFit: "cover", objectPosition: "center top", height: 480 }} />
              </div>
              <p className="font-sans uppercase mt-4 text-center" style={{ color: "var(--muted-ink)", fontSize: 11, letterSpacing: "0.25em" }}>
                {it.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ DEPOIMENTOS ============
function Depoimentos() {
  const t1 = {
    q: "Fui com medo de ficar artificial e saí amando o resultado. A Valéria tem um olhar único — ela melhora sem mudar quem você é.",
    n: "RENATA M.",
    c: "Brasília",
  };
  const others = [
    { q: "Minha pele estava horrível com acne. Depois dos tratamentos, me sinto outra pessoa. Recomendo de olhos fechados.", n: "CAMILA P.", c: "Brasília" },
    { q: "Harmonização impecável, naturalíssima. Todo mundo perguntou se eu tinha feito algo diferente, mas não sabia dizer o quê.", n: "MARIANA L.", c: "Asa Sul" },
  ];
  return (
    <section className="relative py-32 px-6 md:px-16" style={{ background: "var(--nude)" }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="mb-16 fade-up">
          <p className="font-serif-italic" style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--dark)", lineHeight: 1 }}>
            cada mensagem
          </p>
          <h2 className="font-display italic font-bold" style={{ fontSize: "clamp(32px, 3.8vw, 44px)", color: "var(--clay)", lineHeight: 1 }}>
            me lembra o porquê.
          </h2>
        </div>
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-6">
          <div className="relative rounded-[20px] p-10 md:p-14 fade-up overflow-hidden" style={{ background: "var(--paper)", border: "1px solid var(--clay)" }}>
            <span className="absolute font-display font-bold pointer-events-none" style={{ top: 10, left: 20, fontSize: 140, color: "var(--clay)", opacity: 0.12, lineHeight: 1 }}>
              &ldquo;
            </span>
            <p className="font-serif-italic relative" style={{ fontSize: 26, color: "var(--dark)", lineHeight: 1.4 }}>
              {t1.q}
            </p>
            <div className="mt-8">
              <p className="font-sans font-bold uppercase" style={{ color: "var(--clay)", fontSize: 11, letterSpacing: "0.2em" }}>{t1.n}</p>
              <p className="font-sans mt-1" style={{ color: "var(--muted-ink)", fontSize: 12 }}>{t1.c}</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {others.map((t, i) => (
              <div key={i} className="rounded-[20px] p-8 fade-up" style={{ background: "var(--paper)", border: "1px solid var(--clay)" }} data-delay={(i + 1) * 150}>
                <p className="font-serif-italic" style={{ fontSize: 19, color: "var(--dark)", lineHeight: 1.4 }}>{t.q}</p>
                <p className="font-sans font-bold uppercase mt-4" style={{ color: "var(--clay)", fontSize: 10, letterSpacing: "0.2em" }}>{t.n}</p>
                <p className="font-sans" style={{ color: "var(--muted-ink)", fontSize: 11 }}>{t.c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CTA FINAL ============
function CtaFinal() {
  return (
    <section
      id="contato"
      className="relative py-32 px-6 md:px-16 overflow-hidden"
      style={{
        background: "var(--cocoa)",
        backgroundImage: "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(176,122,90,0.18) 0%, transparent 70%)",
      }}
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <FaceProfile size={280} opacity={0.08} stroke="var(--paper)" />
      </div>
      <div className="max-w-[900px] mx-auto text-center relative">
        <span className="line-grow block mx-auto mb-8 h-px" style={{ background: "var(--clay)" }} />
        <p className="font-serif-italic fade-up" style={{ fontSize: "clamp(40px, 5vw, 68px)", color: "var(--paper)", lineHeight: 1 }}>
          sua melhor pele
        </p>
        <h2 className="font-display font-bold fade-up" style={{ fontSize: "clamp(48px, 5.6vw, 76px)", color: "var(--clay)", letterSpacing: "-0.02em", lineHeight: 1, marginTop: 8 }} data-delay="120">
          COMEÇA AQUI.
        </h2>
        <p className="font-sans fade-up mt-8" style={{ color: "var(--muted-ink)", opacity: 0.8, fontSize: 15, fontWeight: 300 }} data-delay="240">
          Consulta inicial sem compromisso. Tratamentos personalizados em Brasília.
        </p>
        <div className="mt-10 fade-up flex flex-wrap gap-4 justify-center" data-delay="360">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-medium uppercase rounded-full transition-all duration-300"
            style={{ background: "var(--clay)", color: "var(--paper)", fontSize: 13, padding: "18px 52px", letterSpacing: "0.12em" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.color = "var(--dark)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--clay)"; e.currentTarget.style.color = "var(--paper)"; }}
          >
            AGENDAR PELO WHATSAPP
          </a>
          <a
            href={BEACONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-medium uppercase rounded-full transition-all duration-300"
            style={{ border: "1px solid var(--clay)", color: "var(--paper)", fontSize: 13, padding: "18px 52px", letterSpacing: "0.12em" }}
          >
            LINKS · BEACONS
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="px-6 md:px-16 py-16" style={{ background: "var(--dark)", borderTop: "1px solid var(--line)" }}>
      <div className="max-w-[1300px] mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <CircleFace size={40} stroke="var(--clay)" />
            <div>
              <p className="font-display italic" style={{ color: "var(--clay)", fontSize: 18 }}>Valéria Tavares</p>
              <p className="font-sans uppercase" style={{ color: "var(--muted-ink)", fontSize: 10, letterSpacing: "0.2em" }}>Estética Facial · Brasília</p>
            </div>
          </div>
          <p className="font-serif-italic mt-4" style={{ color: "var(--muted-ink)", fontSize: 16 }}>
            Pele saudável, bonita e com resultado natural.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-sans uppercase" style={{ color: "var(--clay)", fontSize: 10, letterSpacing: "0.3em" }}>NAVEGAÇÃO</p>
          {[["SOBRE", "#sobre"], ["TRATAMENTOS", "#tratamentos"], ["RESULTADOS", "#resultados"], ["CONTATO", "#contato"]].map(([l, h]) => (
            <a key={l} href={h} className="font-sans transition-colors hover:text-[var(--paper)]" style={{ color: "var(--muted-ink)", fontSize: 13 }}>
              {l}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-sans uppercase" style={{ color: "var(--clay)", fontSize: 10, letterSpacing: "0.3em" }}>CONTATO</p>
          <a href="https://instagram.com/valeriatavarestetica" target="_blank" rel="noopener noreferrer" className="font-sans" style={{ color: "var(--muted-ink)", fontSize: 13 }}>
            @valeriatavarestetica
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-sans" style={{ color: "var(--muted-ink)", fontSize: 13 }}>
            WhatsApp · (61) 99936-0811
          </a>
          <a href={BEACONS_URL} target="_blank" rel="noopener noreferrer" className="font-sans" style={{ color: "var(--muted-ink)", fontSize: 13 }}>
            beacons.ai/valeriatavares
          </a>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto mt-14 pt-8" style={{ borderTop: "1px solid rgba(176,122,90,0.15)" }}>
        <p className="font-sans" style={{ color: "var(--muted-ink)", fontSize: 11, opacity: 0.7 }}>
          © 2025 Valéria Tavares · Estética Facial · Brasília — DF
        </p>
      </div>
    </footer>
  );
}

// ============ FLOATING WHATSAPP ============
function FloatingWhats() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="wa-pulse fixed z-50 flex items-center justify-center transition-transform duration-300 hover:scale-105"
      style={{
        bottom: 32,
        right: 32,
        width: 60,
        height: 60,
        borderRadius: 999,
        background: "var(--clay)",
      }}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="var(--paper)">
        <path d="M20.52 3.48A11.9 11.9 0 0012.06 0C5.53 0 .22 5.31.22 11.85c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.86 11.86 0 005.66 1.44h.01c6.53 0 11.85-5.31 11.85-11.85 0-3.17-1.23-6.15-3.4-8.43zM12.07 21.7h-.01a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.8 1 1.01-3.7-.23-.38a9.85 9.85 0 01-1.51-5.19c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.11 1.03 6.98 2.9a9.82 9.82 0 012.89 6.98c-.01 5.44-4.44 9.85-9.82 9.85zm5.4-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.19.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.5.07-.77.37s-1 .98-1 2.4 1.03 2.78 1.17 2.97c.15.2 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.62.69.22 1.31.19 1.81.11.55-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      </svg>
    </a>
  );
}

// ============ APP ============
export default function App() {
  useReveal();
  return (
    <>
      <Navbar />
      <Hero />
      <Manifesto />
      <Sobre />
      <Tratamentos />
      <Resultados />
      <Depoimentos />
      <CtaFinal />
      <Footer />
      <FloatingWhats />
    </>
  );
}
