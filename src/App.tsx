import { useEffect, useState } from "react";

// ============ IMAGES ============
const IMG = {
  limpeza: "/fotos/image.png",
  labial1: "/fotos/image-2.png",
  labial2: "/fotos/image-3.png",
  labial3: "/fotos/image-4.png",
  acne: "/fotos/image-5.png",
  retrato: "/fotos/image-6.png",
  micro: "/fotos/image-7.png",
  belotero: "/fotos/image-8.png",
};

const WHATSAPP = "https://wa.me/5561999360811?text=Ol%C3%A1%20Val%C3%A9ria%2C%20gostaria%20de%20agendar%20uma%20consulta.";
const INSTAGRAM = "https://instagram.com/valeriatavarestetica";
const BEACONS = "https://beacons.ai/valeriatavares";

// ============ Line-art face SVG ============
function FaceLineArt({ className = "", strokeWidth = 1 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className} fill="none">
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {/* face outline */}
        <path d="M100,30 C130,30 155,55 155,95 C155,130 140,160 120,175 Q100,185 80,175 C60,160 45,130 45,95 C45,55 70,30 100,30 Z" />
        {/* hair top */}
        <path d="M60,55 Q80,25 100,25 Q125,25 145,55 Q150,45 140,35" />
        <path d="M55,80 Q45,60 55,45" />
        <path d="M148,80 Q158,60 148,45" />
        {/* eyebrows */}
        <path d="M72,80 Q80,76 90,80" />
        <path d="M110,80 Q120,76 128,80" />
        {/* eyes */}
        <path d="M74,92 Q80,89 88,92" />
        <path d="M112,92 Q120,89 128,92" />
        {/* nose */}
        <path d="M100,98 Q97,115 94,128 Q100,132 106,128 Q103,115 100,98" />
        {/* lips */}
        <path d="M85,150 Q92,146 100,148 Q108,146 115,150 Q108,156 100,156 Q92,156 85,150 Z" />
        {/* subtle jaw shadow */}
        <path d="M70,140 Q100,165 130,140" opacity="0.5" />
      </g>
    </svg>
  );
}

function TinyFace({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="0.8" />
      <g stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none">
        <path d="M13,17 Q11,26 15,32 Q20,35 25,32 Q29,26 27,17 Q25,11 20,11 Q15,11 13,17 Z" />
        <path d="M15,20 Q17,19 19,20" />
        <path d="M21,20 Q23,19 25,20" />
        <path d="M20,23 L20,27 Q19,28 20,28.5" />
        <path d="M17,30 Q20,32 23,30" />
      </g>
    </svg>
  );
}

// ============ Reveal hook ============
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = Number((e.target as HTMLElement).dataset.delay ?? 0);
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
    { l: "Sobre", h: "#sobre" },
    { l: "Tratamentos", h: "#tratamentos" },
    { l: "Resultados", h: "#resultados" },
    { l: "Contato", h: "#contato" },
  ];
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(253,252,240,0.9)" : "rgba(253,252,240,0.5)",
        backdropFilter: "blur(18px)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 md:px-12 py-6">
        <a href="#top" className="flex items-center gap-3 group">
          <span style={{ color: "var(--clay)" }}>
            <TinyFace size={30} />
          </span>
          <div className="leading-tight">
            <div className="font-serif font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--cocoa)", fontSize: 16 }}>
              Valéria Tavares
            </div>
            <div className="font-sans uppercase" style={{ color: "var(--clay)", fontSize: 8.5, letterSpacing: "0.32em" }}>
              Estética Facial · Brasília
            </div>
          </div>
        </a>
        <div className="hidden md:flex gap-10 items-center">
          {links.map((k) => (
            <a
              key={k.l}
              href={k.h}
              className="font-sans line-slide"
              style={{ color: "var(--cocoa)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}
            >
              {k.l}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full font-sans transition-all duration-500"
            style={{ background: "var(--cocoa)", color: "var(--paper)", padding: "12px 24px", fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--clay)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--cocoa)")}
          >
            Agendar
          </a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" style={{ color: "var(--cocoa)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-8" style={{ background: "var(--paper)" }}>
          {links.map((k) => (
            <a key={k.l} href={k.h} onClick={() => setOpen(false)} className="font-sans" style={{ color: "var(--cocoa)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {k.l}
            </a>
          ))}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rounded-full text-center" style={{ background: "var(--cocoa)", color: "var(--paper)", padding: "14px 24px", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}>
            Agendar
          </a>
        </div>
      )}
    </nav>
  );
}

// ============ HERO ============
function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col md:flex-row items-center px-6 md:px-16 min-h-[88vh] pt-28 md:pt-28 pb-20"
      style={{ background: "linear-gradient(180deg, rgba(245,230,224,0.35) 0%, rgba(245,230,224,0.15) 100%)" }}
    >
      <div className="w-full md:w-1/2 z-10 max-w-[620px] fade-up">
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="block h-px w-8" style={{ background: "var(--clay)" }} />
          <span className="font-sans uppercase" style={{ color: "var(--clay)", fontSize: 10, letterSpacing: "0.35em", fontWeight: 500 }}>
            Estética Facial · Brasília
          </span>
        </div>
        <h1 className="font-serif italic mb-8" style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.05, color: "var(--ink)", fontWeight: 300 }}>
          Realçando a{" "}
          <span style={{ color: "var(--clay)" }}>sua beleza</span>{" "}
          de forma natural.
        </h1>
        <p className="font-sans max-w-md mb-10 leading-relaxed" style={{ fontSize: 14, fontWeight: 300, color: "var(--cocoa)", letterSpacing: "0.02em" }}>
          Estética facial avançada em Brasília com foco em naturalidade, sofisticação e o cuidado que a sua pele merece.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full font-sans transition-all duration-500"
            style={{ background: "var(--cocoa)", color: "var(--paper)", padding: "16px 34px", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--clay)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--cocoa)")}
          >
            Agendar Consulta
          </a>
          <a
            href="#tratamentos"
            className="font-sans line-slide"
            style={{ color: "var(--cocoa)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", padding: "16px 8px" }}
          >
            Ver Tratamentos
          </a>
        </div>
      </div>

      <div className="w-full md:w-1/2 mt-16 md:mt-0 relative flex justify-center fade-up" data-delay="200">
        <div className="relative w-full max-w-[460px] aspect-[4/5]">
          <div className="absolute inset-0 rounded-t-full overflow-hidden" style={{ background: "var(--blush)" }}>
            <img
              src={IMG.retrato}
              alt="Valéria Tavares"
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center 18%" }}
            />
          </div>
          {/* pulsing outer ring */}
          <div className="absolute inset-0 rounded-t-full border soft-ping pointer-events-none" style={{ borderColor: "var(--clay)", transform: "scale(1.05)", opacity: 0.3 }} />
          {/* line art overlay */}
          <div className="absolute -top-8 -right-8 w-40 h-40 pointer-events-none opacity-40" style={{ color: "var(--clay)" }}>
            <FaceLineArt className="w-full h-full" strokeWidth={0.7} />
          </div>
          {/* badge */}
          <div
            className="absolute -bottom-4 left-6 px-6 py-3 rounded-full shadow-xl"
            style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
          >
            <div className="font-serif italic" style={{ color: "var(--cocoa)", fontSize: 18 }}>Valéria Tavares</div>
            <div className="font-sans" style={{ color: "var(--clay)", fontSize: 8.5, letterSpacing: "0.28em", textTransform: "uppercase" }}>
              Especialista em Estética Facial
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-16 gap-5 items-center" style={{ color: "var(--clay)" }}>
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="line-slide font-sans" style={{ fontSize: 11, letterSpacing: "0.15em" }}>Instagram</a>
        <span className="w-8 h-px" style={{ background: "var(--clay)" }} />
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="line-slide font-sans" style={{ fontSize: 11, letterSpacing: "0.15em" }}>WhatsApp</a>
      </div>
    </section>
  );
}

// ============ MANIFESTO ============
function Manifesto() {
  return (
    <section className="py-28 px-6 md:px-16" style={{ background: "var(--paper)" }}>
      <div className="max-w-[1000px] mx-auto text-center fade-up">
        <span className="font-sans uppercase block mb-6" style={{ color: "var(--clay)", fontSize: 10, letterSpacing: "0.4em", fontWeight: 500 }}>
          Filosofia
        </span>
        <p className="font-serif italic" style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.2, color: "var(--ink)", fontWeight: 300 }}>
          Você não precisava de lábios maiores.<br />
          <span style={{ color: "var(--clay)" }}>Só de lábios mais harmoniosos.</span>
        </p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <span className="h-px w-16" style={{ background: "var(--clay)" }} />
          <span className="font-sans uppercase" style={{ color: "var(--cocoa)", fontSize: 10, letterSpacing: "0.32em" }}>
            Valéria Tavares
          </span>
          <span className="h-px w-16" style={{ background: "var(--clay)" }} />
        </div>
      </div>
    </section>
  );
}

// ============ SOBRE ============
function Sobre() {
  return (
    <section id="sobre" className="px-6 md:px-16 py-24 flex flex-col md:flex-row gap-16" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3 fade-up">
          <span className="font-sans uppercase mb-4 block" style={{ color: "var(--clay)", fontSize: 10, letterSpacing: "0.32em", fontWeight: 600 }}>
            Sobre Valéria
          </span>
          <h2 className="font-serif" style={{ fontSize: "clamp(32px, 3.6vw, 48px)", lineHeight: 1.1, color: "var(--ink)", fontWeight: 500 }}>
            Experiência em <span className="italic" style={{ color: "var(--clay)" }}>harmonia facial</span>.
          </h2>
          <div className="mt-8 rounded-sm overflow-hidden hidden md:block" style={{ border: "1px solid var(--line)", maxWidth: 320 }}>
            <img src={IMG.retrato} alt="Valéria Tavares" className="w-full" style={{ objectFit: "cover", objectPosition: "center 15%", height: 380 }} />
          </div>
        </div>
        <div className="md:w-2/3 fade-up" data-delay="150">
          <p className="font-sans mb-8 leading-loose" style={{ color: "rgba(107,68,35,0.85)", fontSize: 15, fontWeight: 300 }}>
            Com anos de dedicação à estética em Brasília, Valéria Tavares combina técnica de ponta com um olhar artístico.
            Cada rosto é único e merece um plano de tratamento personalizado que respeite suas características individuais —
            porque beleza real é a que você reconhece no espelho, só que mais leve, mais luminosa, mais você.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12" style={{ borderTop: "1px solid var(--blush)" }}>
            {[
              { t: "Personalização", s: "Protocolos exclusivos" },
              { t: "Tecnologia", s: "Equipamentos modernos" },
              { t: "Naturalidade", s: "Resultado autêntico" },
            ].map((d) => (
              <div key={d.t}>
                <h4 className="font-serif mb-2" style={{ fontSize: 26, color: "var(--ink)", fontWeight: 500 }}>{d.t}</h4>
                <p className="font-sans uppercase" style={{ color: "rgba(107,68,35,0.6)", fontSize: 10, letterSpacing: "0.22em" }}>{d.s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ TRATAMENTOS ============
function Tratamentos() {
  const cards = [
    {
      t: "Harmonização",
      d: "Equilíbrio e simetria para o seu rosto de forma sutil e natural.",
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      bg: "#FFFFFF",
    },
    {
      t: "Rejuvenescimento",
      d: "Protocolos antienvelhecimento com ativos de alta performance.",
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
          <path d="M20.2 7.8l-2.6 2.6c1.1 1.2 1.7 2.7 1.7 4.4 0 3.6-2.9 6.5-6.5 6.5s-6.5-2.9-6.5-6.5c0-1.7.6-3.2 1.7-4.4L5.4 7.8" />
          <path d="M12 4v4" />
        </svg>
      ),
      bg: "var(--paper)",
    },
    {
      t: "Limpeza Profunda",
      d: "Cuidado essencial para uma pele iluminada, uniforme e saudável.",
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      bg: "#FFFFFF",
    },
    {
      t: "Micropigmentação",
      d: "Lábios, sobrancelhas e olhos com pigmentação de longa duração.",
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
          <path d="M4 20l4-4 8-8 4 4-8 8-4 4z" />
          <path d="M14 6l4 4" />
        </svg>
      ),
      bg: "var(--paper)",
    },
    {
      t: "Bioestimuladores",
      d: "Estímulo de colágeno para firmeza duradoura e pele revitalizada.",
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
        </svg>
      ),
      bg: "#FFFFFF",
    },
    {
      t: "Tratamento de Acne",
      d: "Controle de oleosidade, melhora de textura e cicatrizes.",
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9">
          <circle cx="12" cy="12" r="9" />
          <circle cx="9" cy="10" r="1" />
          <circle cx="15" cy="13" r="1" />
          <circle cx="11" cy="16" r="0.7" />
        </svg>
      ),
      bg: "var(--paper)",
    },
  ];
  return (
    <section id="tratamentos" className="px-6 md:px-16 py-28" style={{ background: "rgba(245,230,224,0.2)" }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-20 fade-up">
          <span className="font-sans uppercase" style={{ color: "var(--clay)", fontSize: 10, letterSpacing: "0.4em", fontWeight: 500 }}>
            Nossos Serviços
          </span>
          <h3 className="font-serif mt-4 mb-6" style={{ fontSize: "clamp(38px, 4.4vw, 60px)", color: "var(--ink)", fontWeight: 400 }}>
            Tratamentos de <span className="italic" style={{ color: "var(--clay)" }}>Assinatura</span>
          </h3>
          <div className="h-px w-24 mx-auto" style={{ background: "var(--clay)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div
              key={c.t}
              className="p-10 text-center fade-up transition-all duration-500 group"
              style={{ background: c.bg, border: "1px solid var(--line)" }}
              data-delay={i * 100}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--clay)";
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="mb-6 transition-transform duration-500 group-hover:scale-110 flex justify-center" style={{ color: "var(--clay)" }}>
                {c.icon}
              </div>
              <h4 className="font-serif mb-4" style={{ fontSize: 26, color: "var(--ink)", fontWeight: 500 }}>{c.t}</h4>
              <p className="font-sans uppercase" style={{ color: "rgba(107,68,35,0.7)", fontSize: 10.5, letterSpacing: "0.14em", lineHeight: 1.7 }}>
                {c.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ RESULTADOS ============
function Resultados() {
  const items = [
    { img: IMG.limpeza, label: "Limpeza de Pele" },
    { img: IMG.acne, label: "Tratamento de Acne" },
    { img: IMG.labial1, label: "Micropigmentação Labial" },
    { img: IMG.labial2, label: "Micropigmentação Labial" },
    { img: IMG.labial3, label: "Micropigmentação Labial" },
    { img: IMG.micro, label: "Micropigmentação" },
  ];
  return (
    <section id="resultados" className="px-6 md:px-16 py-28" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-20 fade-up">
          <span className="font-sans uppercase" style={{ color: "var(--clay)", fontSize: 10, letterSpacing: "0.4em", fontWeight: 500 }}>
            Antes & Depois
          </span>
          <h3 className="font-serif mt-4 mb-6" style={{ fontSize: "clamp(38px, 4.4vw, 60px)", color: "var(--ink)", fontWeight: 400 }}>
            Resultados <span className="italic" style={{ color: "var(--clay)" }}>Reais</span>
          </h3>
          <div className="h-px w-24 mx-auto" style={{ background: "var(--clay)" }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="fade-up group" data-delay={i * 90}>
              <div className="overflow-hidden" style={{ border: "1px solid var(--line)", background: "var(--blush)" }}>
                <img
                  src={it.img}
                  alt={it.label}
                  className="w-full transition-transform duration-700 group-hover:scale-105"
                  style={{ objectFit: "cover", objectPosition: "center top", height: 520 }}
                />
              </div>
              <p className="font-sans uppercase text-center mt-5" style={{ color: "rgba(107,68,35,0.7)", fontSize: 10.5, letterSpacing: "0.28em" }}>
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
  const list = [
    { q: "Fui com medo de ficar artificial e saí amando o resultado. A Valéria tem um olhar único — ela melhora sem mudar quem você é.", n: "Renata M.", c: "Brasília" },
    { q: "Minha pele estava horrível com acne. Depois dos tratamentos, me sinto outra pessoa. Recomendo de olhos fechados.", n: "Camila P.", c: "Brasília" },
    { q: "Harmonização impecável, naturalíssima. Todo mundo perguntou se eu tinha feito algo diferente, mas não sabia dizer o quê.", n: "Mariana L.", c: "Asa Sul" },
  ];
  return (
    <section className="px-6 md:px-16 py-28" style={{ background: "rgba(245,230,224,0.3)" }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-20 fade-up">
          <span className="font-sans uppercase" style={{ color: "var(--clay)", fontSize: 10, letterSpacing: "0.4em", fontWeight: 500 }}>
            Depoimentos
          </span>
          <h3 className="font-serif italic mt-4" style={{ fontSize: "clamp(30px, 3.6vw, 46px)", color: "var(--ink)", fontWeight: 400 }}>
            Cada mensagem me lembra o porquê.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((t, i) => (
            <div
              key={i}
              className="p-10 fade-up relative"
              style={{ background: "#FFFFFF", border: "1px solid var(--line)" }}
              data-delay={i * 130}
            >
              <span className="font-serif italic absolute" style={{ top: 8, left: 20, fontSize: 90, color: "var(--clay)", opacity: 0.2, lineHeight: 1 }}>“</span>
              <p className="font-serif italic relative" style={{ fontSize: 20, color: "var(--ink)", lineHeight: 1.5, fontWeight: 300 }}>
                {t.q}
              </p>
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--blush)" }}>
                <p className="font-sans uppercase" style={{ color: "var(--clay)", fontSize: 10.5, letterSpacing: "0.24em", fontWeight: 600 }}>{t.n}</p>
                <p className="font-sans mt-1" style={{ color: "rgba(107,68,35,0.6)", fontSize: 11 }}>{t.c}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CTA + FOOTER ============
function Footer() {
  return (
    <footer id="contato" className="px-6 md:px-16 py-14 flex flex-col md:flex-row justify-between items-center gap-8" style={{ background: "var(--cocoa-deep)", color: "var(--paper)" }}>
      <div className="text-center md:text-left">
        <p className="font-sans uppercase mb-2" style={{ opacity: 0.6, fontSize: 10, letterSpacing: "0.32em" }}>
          Agende agora seu horário
        </p>
        <p className="font-serif" style={{ fontSize: 30, fontWeight: 400 }}>Brasília · Distrito Federal</p>
        <div className="mt-4 flex gap-6 justify-center md:justify-start">
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="font-sans line-slide" style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.8 }}>@valeriatavarestetica</a>
          <a href={BEACONS} target="_blank" rel="noopener noreferrer" className="font-sans line-slide" style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.8 }}>beacons.ai</a>
        </div>
      </div>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-full transition-all duration-500"
        style={{ background: "var(--clay-soft)", color: "#FFFFFF", padding: "18px 36px", fontWeight: 500, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.color = "var(--cocoa-deep)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--clay-soft)"; e.currentTarget.style.color = "#FFFFFF"; }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 24C5.495 24 .16 18.665.157 12.108c0-2.096.547-4.142 1.588-5.945L0 0l6.335 1.662C8.055.725 9.994.23 11.965.229h.005c6.554 0 11.89 5.335 11.893 11.893 0 3.176-1.235 6.163-3.481 8.412a11.82 11.82 0 01-8.412 3.48"/>
        </svg>
        Falar no WhatsApp · (61) 99936-0811
      </a>
    </footer>
  );
}

function BottomBar() {
  return (
    <div className="px-6 md:px-16 py-6 text-center" style={{ background: "var(--cocoa-deep)", borderTop: "1px solid rgba(212,163,115,0.15)" }}>
      <p className="font-sans" style={{ color: "rgba(253,252,240,0.5)", fontSize: 10, letterSpacing: "0.18em" }}>
        © 2025 Valéria Tavares · Estética Facial · Brasília — DF
      </p>
    </div>
  );
}

// ============ FLOATING WHATSAPP ============
function FloatingWhats() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="wa-pulse fixed z-50 flex items-center justify-center transition-transform duration-300 hover:scale-110"
      style={{ bottom: 28, right: 28, width: 58, height: 58, borderRadius: 999, background: "var(--clay-soft)" }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 24C5.495 24 .16 18.665.157 12.108c0-2.096.547-4.142 1.588-5.945L0 0l6.335 1.662C8.055.725 9.994.23 11.965.229h.005c6.554 0 11.89 5.335 11.893 11.893 0 3.176-1.235 6.163-3.481 8.412a11.82 11.82 0 01-8.412 3.48"/>
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
      <Footer />
      <BottomBar />
      <FloatingWhats />
    </>
  );
}
