import React, { useState, useEffect } from 'react';

const ACCENT = '#E87008';

const slides = [
  {
    desktop: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789437167/hero_1_jgszsb.jpg',
    mobile: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789443465/MOBILE_2_vdps4m.jpg',
  },
  {
    desktop: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789437167/hero_2_achkof.jpg',
    mobile: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789520883/MOBILE_lflebp.jpg',
  },
  {
    desktop: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789520660/HERO_3_go3nvc.jpg',
    mobile: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789443464/MOBILE_1_jqe06r.jpg',
  },
];

export default function Hero({ onReserve }) {
  const [current, setCurrent] = useState(0);

  // Auto-cycle slides every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);



  return (
    <section id="hero" className="hero-section" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Slideshow background wrapper */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundColor: '#0F1316',
        }}
      >
        {/* Define slides */}
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <picture
              key={index}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 1.5s ease-in-out',
                willChange: 'opacity',
                display: 'block',
              }}
            >
              <source media="(max-width: 768px)" srcSet={slide.mobile} />
              <img
                src={slide.desktop}
                alt={`Óptica Gisela Hero Slide ${index + 1}`}
                className="hero-slide-img"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchpriority={index === 0 ? 'high' : 'auto'}
                decoding={index === 0 ? 'sync' : 'async'}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />
            </picture>
          );
        })}
      </div>

      {/* Multi-stop gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        zIndex: 1,
        background: [
          'linear-gradient(to bottom,',
          '  rgba(15,19,22,0.45) 0%,',
          '  rgba(15,19,22,0.15) 30%,',
          '  rgba(15,19,22,0.30) 60%,',
          '  rgba(15,19,22,0.70) 85%,',
          '  rgba(15,19,22,0.90) 100%)',
        ].join(''),
        pointerEvents: 'none',
      }} />

      {/* Subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 1.5rem 6rem',
      }}>
        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1.2rem',
          marginBottom: '1.8rem',
          animation: 'fadeUp 0.8s ease both',
        }}>
          <div style={{ width: '60px', height: '1px', background: `linear-gradient(to right, transparent, ${ACCENT})` }} />
          <span style={{
            color: '#ffffff', fontSize: '0.88rem',
            letterSpacing: '0.35em', fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            ✦ SANTA FE, ARGENTINA ✦
          </span>
          <div style={{ width: '60px', height: '1px', background: `linear-gradient(to left, transparent, ${ACCENT})` }} />
        </div>

        {/* Main Title */}
        <h1 className="font-serif" style={{
          fontSize: 'clamp(3rem, 8vw, 6.5rem)',
          fontWeight: 800,
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          lineHeight: 1,
          textShadow: '0 6px 40px rgba(0,0,0,0.65)',
          marginBottom: '1rem',
          animation: 'fadeUp 0.9s 0.1s ease both',
        }}>
          ÓPTICA GISELA
        </h1>

        {/* Decorative rule */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.8rem',
          marginBottom: '1.4rem',
          animation: 'fadeUp 1s 0.2s ease both',
        }}>
          <div style={{ width: '30px', height: '1px', background: ACCENT, opacity: 0.7 }} />
          <div style={{ width: '6px', height: '6px', background: ACCENT, transform: 'rotate(45deg)' }} />
          <div style={{ width: '30px', height: '1px', background: ACCENT, opacity: 0.7 }} />
        </div>

        {/* Subtitle / Bio */}
        <p style={{
          fontFamily: "'Playfair Display', serif",
          color: 'rgba(255,255,255,0.92)',
          fontSize: 'clamp(1.05rem, 2.2vw, 1.45rem)',
          letterSpacing: '0.04em',
          fontWeight: 400,
          fontStyle: 'italic',
          maxWidth: '720px',
          lineHeight: 1.6,
          marginBottom: '3.2rem',
          textShadow: '0 2px 16px rgba(0,0,0,0.6)',
          animation: 'fadeUp 1s 0.3s ease both',
        }}>
          Cuidamos tu visión con calidez y atención personalizada
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex', gap: '1rem',
          flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeUp 1s 0.45s ease both',
        }}>
          <a href="#menu" id="hero-ver-carta" className="gold-pill-btn"
             style={{ padding: '0.9rem 2.4rem', fontSize: '0.85rem', letterSpacing: '0.12em' }}>
            VER CATÁLOGO
          </a>
          <a href="https://wa.me/5493426487738?text=Hola%2C%20quisiera%20hacer%20una%20consulta%20en%20%C3%93ptica%20Gisela"
             target="_blank" rel="noopener noreferrer"
             id="hero-reservar" className="gold-pill-btn"
             style={{ padding: '0.9rem 2.4rem', fontSize: '0.85rem', letterSpacing: '0.12em', textDecoration: 'none' }}>
            CONSULTAR
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span style={{
          color: `rgba(255,255,255,0.7)`, fontSize: '0.6rem',
          letterSpacing: '0.25em', textIndent: '0.25em', textTransform: 'uppercase', marginBottom: '6px',
          display: 'block', textAlign: 'center',
        }}>
          SCROLL
        </span>
        <div style={{
          width: '1px', height: '52px',
          background: `linear-gradient(to bottom, ${ACCENT}, transparent)`,
          animation: 'scrollPulse 2.2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        .hero-section {
          aspect-ratio: 16 / 9;
          max-height: 100dvh;
        }
        @media (max-width: 768px) {
          .hero-section {
            aspect-ratio: 9 / 16;
            max-height: 100dvh;
          }
          .hero-slide-img {
            object-fit: cover !important;
            object-position: center !important;
          }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity: 0.25; transform: scaleY(0.85); }
          50%      { opacity: 1;    transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  );
}
