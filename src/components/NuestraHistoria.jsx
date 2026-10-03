import React, { useEffect, useRef, useState } from 'react';

const ACCENT = '#E87008';
const BIENVENIDOS_IMG = 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789439204/3alex_qlsf9n.jpg';

function useInView(threshold = 0.05) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function NuestraHistoria() {
  const [textRef, textVisible] = useInView();
  const [imgRef, imgVisible] = useInView();

  return (
    <section id="historia" style={{ background: '#F3F5F7', padding: '7rem 1.5rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="historia-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}>
          {/* ── LEFT: Text ── */}
          <div
            ref={textRef}
            style={{
              opacity: 1,
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            {/* Label */}
            <div className="historia-label-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1.2rem' }}>
              <p className="historia-label" style={{
                color: ACCENT, fontSize: '1.1rem',
                letterSpacing: '0.3em', fontWeight: 600,
                textTransform: 'uppercase', marginBottom: '0.4rem',
                textAlign: 'center',
              }}>
                ✦ QUIÉNES SOMOS ✦
              </p>
              <div className="historia-line" style={{ width: '50px', height: '3px', background: ACCENT, borderRadius: '2px', margin: '0 auto' }} />
            </div>

            {/* Title */}
            <h2 className="font-serif historia-title" style={{
              fontSize: 'clamp(1.4rem, 2.3vw, 1.8rem)',
              fontWeight: 700,
              color: '#111827',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'inline-block',
              marginBottom: '1.8rem',
              lineHeight: 1.3,
            }}>
              ÓPTICA GISELA: ATENCIÓN PERSONALIZADA EN EL CORAZÓN DE SANTA FE
            </h2>

            <p style={{
              color: '#111827', fontSize: '1.05rem', lineHeight: 1.9,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              opacity: 1,
              marginBottom: '1.3rem',
            }}>
              Óptica Gisela nació para acompañar a cada persona en el cuidado de su visión, con atención personalizada y calidez desde el primer momento. Ubicados en López y Planes 4638, en Santa Fe capital, ofrecemos una amplia variedad de anteojos de sol, receta y clip on para cada estilo y necesidad.
            </p>

            <p style={{
              color: '#111827', fontSize: '1.05rem', lineHeight: 1.9,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              opacity: 1,
              marginBottom: '2.2rem',
            }}>
              Desde 8.30 a 12.30hs y de 16.30 a 19.30hs, te esperamos para ayudarte a encontrar el anteojo perfecto, con el mismo compromiso y dedicación de siempre.
            </p>

            <a href="#contacto" className="historia-btn-desktop" style={{
              color: '#1F262D', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.82rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              borderBottom: `2px solid ${ACCENT}`, paddingBottom: '3px',
              transition: 'gap 0.2s ease, opacity 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.gap = '1rem'; e.currentTarget.style.color = ACCENT; }}
            onMouseLeave={e => { e.currentTarget.style.gap = '0.5rem'; e.currentTarget.style.color = '#1F262D'; }}
            >
              CONOCER MÁS →
            </a>
          </div>

          {/* ── RIGHT: Image ── */}
          <div
            ref={imgRef}
            style={{
              position: 'relative',
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.7s 0.15s ease, transform 0.7s 0.15s ease',
            }}
          >
            <img
              src={BIENVENIDOS_IMG}
              alt="Óptica Gisela — Santa Fe"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                backgroundColor: 'transparent',
                borderRadius: '22px',
                border: '3px solid #1F262D',
                boxSizing: 'border-box',
                position: 'relative', zIndex: 1,
                boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
                display: 'block',
              }}
            />

            {/* Mobile Button below Image */}
            <div className="historia-btn-mobile-wrapper">
              <a href="#contacto" style={{
                color: '#1F262D', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.82rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                borderBottom: `2px solid ${ACCENT}`, paddingBottom: '3px',
                transition: 'gap 0.2s ease, opacity 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.gap = '1rem'; e.currentTarget.style.color = ACCENT; }}
              onMouseLeave={e => { e.currentTarget.style.gap = '0.5rem'; e.currentTarget.style.color = '#1F262D'; }}
              >
                CONOCER MÁS →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .historia-btn-mobile-wrapper {
          display: none;
        }
        @media (max-width: 768px) {
          .historia-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
          .historia-label-wrapper {
            align-items: center !important;
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .historia-label {
            text-align: center !important;
          }
          .historia-line {
            margin: 0 auto !important;
          }
          .historia-title {
            text-align: center !important;
            display: block !important;
          }
          .historia-btn-desktop {
            display: none !important;
          }
          .historia-btn-mobile-wrapper {
            display: flex !important;
            justify-content: center !important;
            margin-top: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
