import React, { useRef } from 'react';

const ACCENT = 'var(--vadano-primary)';
const ACCENT2 = 'var(--vadano-secondary)';

const HERO_VIDEO = 'https://res.cloudinary.com/dkc39tw6r/video/upload/v1794953948/laposada____Bienvenido_a_tu_descanso_____Al_llegar_a_La_Posada_del_Tiem_2024-12-04_DDLRQ0BuZEc_351597_DDLRQ0BuZEc_ezcxal.mp4';
const HERO_POSTER = 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794954148/laposada_____%EF%B8%8F_La_Posada__lugar_m%C3%A1gico__%EF%B8%8F_Este_fin_de_semana_no_dejamos_2025-03-02_DGt4YLJOPQu_3579765230667363374_01_h7mlka.jpg';

export default function Hero({ onReserve }) {
  const videoRef = useRef(null);

  return (
    <section id="hero" className="hero-section" style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '620px', overflow: 'hidden' }}>
      {/* Background Video Wrapper */}
      <div
        className="hero-video-bg"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundColor: '#0A130D',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      {/* Multi-stop gradient overlay for superior text contrast */}
      <div style={{
        position: 'absolute', inset: 0,
        zIndex: 1,
        background: [
          'linear-gradient(to bottom,',
          '  rgba(10,19,13,0.55) 0%,',
          '  rgba(10,19,13,0.35) 30%,',
          '  rgba(10,19,13,0.55) 60%,',
          '  rgba(10,19,13,0.85) 85%,',
          '  rgba(10,19,13,0.95) 100%)',
        ].join(''),
        pointerEvents: 'none',
      }} />

      {/* Subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,19,13,0.65) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="hero-content" style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '8rem 1.5rem 5rem',
      }}>
        {/* Eyebrow */}
        <div className="hero-eyebrow" style={{
          display: 'flex', alignItems: 'center', gap: '1.2rem',
          marginBottom: '1.8rem',
          animation: 'fadeUp 0.8s ease both',
        }}>
          <div style={{ width: '60px', height: '1px', background: `linear-gradient(to right, transparent, var(--vadano-secondary))` }} />
          <span style={{
            color: 'var(--vadano-secondary)', fontSize: '0.88rem',
            letterSpacing: '0.35em', fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            ✦ MERLO · SAN LUIS · SIERRAS ✦
          </span>
          <div style={{ width: '60px', height: '1px', background: `linear-gradient(to left, transparent, var(--vadano-secondary))` }} />
        </div>

        {/* Main Title */}
        <h1 className="hero-title font-serif" style={{
          fontSize: 'clamp(3rem, 7.5vw, 6rem)',
          fontWeight: 800,
          color: '#FAF4EC',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          lineHeight: 0.95,
          textShadow: '0 4px 30px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,0.95)',
          marginBottom: '1rem',
          animation: 'fadeUp 0.9s 0.1s ease both',
        }}>
          LA POSADA
        </h1>

        {/* Decorative rule */}
        <div className="hero-divider" style={{
          display: 'flex', alignItems: 'center', gap: '0.8rem',
          marginBottom: '1.4rem',
          animation: 'fadeUp 1s 0.2s ease both',
        }}>
          <div style={{ width: '35px', height: '1px', background: 'var(--vadano-secondary)', opacity: 0.8 }} />
          <div style={{ width: '6px', height: '6px', background: 'var(--vadano-secondary)', transform: 'rotate(45deg)' }} />
          <div style={{ width: '35px', height: '1px', background: 'var(--vadano-secondary)', opacity: 0.8 }} />
        </div>

        {/* Subtitle / Bio */}
        <p className="hero-subtitle" style={{
          fontFamily: "'Playfair Display', serif",
          color: '#FAF4EC',
          fontSize: 'clamp(1.05rem, 2.2vw, 1.32rem)',
          letterSpacing: '0.04em',
          fontWeight: 400,
          fontStyle: 'italic',
          marginBottom: '3rem',
          textShadow: '0 3px 20px rgba(0,0,0,0.85), 0 1px 6px rgba(0,0,0,0.95)',
          animation: 'fadeUp 1s 0.3s ease both',
          maxWidth: '780px',
          lineHeight: 1.65,
        }}>
          Una estadía tranquila en las montañas de Merlo, a pasos de la avenida principal. Desayuno, pileta y estacionamiento incluidos.
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas" style={{
          display: 'flex', gap: '1.2rem',
          flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeUp 1s 0.45s ease both',
        }}>
          <a
            href="#habitaciones"
            id="hero-ver-habitaciones"
            className="gold-pill-btn"
            style={{
              padding: '0.95rem 2.4rem',
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            VER HABITACIONES
          </a>
          <a
            href="#disponibilidad"
            id="hero-consultar-disponibilidad"
            className="gold-pill-btn"
            style={{
              padding: '0.95rem 2.4rem',
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              fontWeight: 700,
              background: 'rgba(238, 223, 204, 0.12)',
              borderColor: 'var(--vadano-secondary)',
              color: 'var(--vadano-secondary)',
              backdropFilter: 'blur(10px)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--vadano-secondary)';
              e.currentTarget.style.color = '#0A130D';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(238, 223, 204, 0.12)';
              e.currentTarget.style.color = 'var(--vadano-secondary)';
            }}
          >
            CONSULTAR DISPONIBILIDAD
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: 0,
        right: 0,
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none',
        animation: 'fadeUp 1s 0.7s ease both',
      }}>
        <span className="hero-scroll-text" style={{
          color: `rgba(238, 223, 204, 0.75)`,
          fontSize: '0.62rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '6px',
          paddingLeft: '0.25em',
          display: 'inline-block',
          textAlign: 'center',
        }}>
          DESCUBRÍ
        </span>
        <div className="hero-scroll-line" style={{
          width: '1px',
          height: '52px',
          margin: '0 auto',
          background: `linear-gradient(to bottom, var(--vadano-secondary), transparent)`,
          animation: 'scrollPulse 2.2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity: 0.25; transform: scaleY(0.85); }
          50%      { opacity: 1;    transform: scaleY(1.1); }
        }

        @media (max-width: 768px) {
          .hero-section {
            height: 100dvh !important;
            min-height: 100dvh !important;
            padding-top: 0 !important;
          }
          .hero-content {
            min-height: 100dvh !important;
            height: 100dvh !important;
            padding: 64px 1.2rem 85px !important;
          }
          .hero-eyebrow {
            margin-bottom: 0.75rem !important;
            gap: 0.6rem !important;
          }
          .hero-eyebrow div {
            width: 25px !important;
          }
          .hero-eyebrow span {
            font-size: 0.68rem !important;
            letter-spacing: 0.18em !important;
          }
          .hero-title {
            font-size: clamp(2.4rem, 9vw, 3.8rem) !important;
            margin-bottom: 0.5rem !important;
            letter-spacing: 0.05em !important;
          }
          .hero-divider {
            margin-bottom: 0.75rem !important;
          }
          .hero-subtitle {
            font-size: 0.95rem !important;
            margin-bottom: 1.8rem !important;
            max-width: 95% !important;
            line-height: 1.5 !important;
          }
          .hero-ctas {
            gap: 0.75rem !important;
            flex-direction: column !important;
            width: 100% !important;
            max-width: 300px !important;
          }
          .hero-ctas a {
            width: 100% !important;
            padding: 0.8rem 1.4rem !important;
            font-size: 0.8rem !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
          .hero-scroll-indicator {
            bottom: 68px !important;
          }
        }
      `}</style>
    </section>
  );
}
