import React, { useEffect, useRef, useState } from 'react';

const ACCENT = 'var(--vadano-primary)';
const BIENVENIDOS_IMG = 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794954148/laposada_____%EF%B8%8F_La_Posada__lugar_m%C3%A1gico__%EF%B8%8F_Este_fin_de_semana_no_dejamos_2025-03-02_DGt4YLJOPQu_3579765230667363374_01_h7mlka.jpg';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
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
    <section id="historia" style={{ background: '#FAF5EE', padding: '7rem 1.5rem', color: '#1B2C20' }}>
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
                opacity: textVisible ? 1 : 0,
                transform: textVisible ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
          >
            {/* Label */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
              <p style={{
                color: 'var(--vadano-primary)', fontSize: '0.9rem',
                letterSpacing: '0.25em', fontWeight: 700,
                textTransform: 'uppercase', marginBottom: '0.4rem',
              }}>
                ✦ QUIÉNES SOMOS ✦
              </p>
              <div style={{ width: '45px', height: '3px', background: 'var(--vadano-primary)', borderRadius: '2px' }} />
            </div>

            {/* Title */}
            <h2 className="font-serif" style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
              fontWeight: 800,
              color: '#163520',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              lineHeight: 1.15,
              marginBottom: '1.8rem',
            }}>
              Un refugio de montaña en Merlo
            </h2>

            <p style={{
              color: '#284130',
              fontSize: '1.02rem',
              lineHeight: 1.9,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              marginBottom: '1.4rem',
            }}>
              La Posada del Tiempo está en Merlo, San Luis, a 200 metros de la avenida principal. Es un lugar pensado para descansar, desconectarse y disfrutar del entorno serrano sin alejarse de la comodidad.
            </p>

            <p style={{
              color: '#284130',
              fontSize: '1.02rem',
              lineHeight: 1.9,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 500,
              marginBottom: '2.4rem',
            }}>
              Ofrecemos desayuno, pileta y estacionamiento para que tu estadía sea tranquila desde que llegás. Te esperamos para pasar unos días de descanso en la montaña.
            </p>

            <div className="historia-btn-desktop">
              <a href="#habitaciones" style={{
                color: 'var(--vadano-primary)', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.85rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                borderBottom: `2px solid var(--vadano-primary)`, paddingBottom: '4px',
                transition: 'gap 0.2s ease, opacity 0.2s, color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.gap = '1rem'; e.currentTarget.style.color = '#23693F'; }}
              onMouseLeave={e => { e.currentTarget.style.gap = '0.6rem'; e.currentTarget.style.color = 'var(--vadano-primary)'; }}
              >
                CONOCER HABITACIONES →
              </a>
            </div>
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
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: `2px solid var(--vadano-primary)`,
              boxShadow: '0 24px 60px rgba(22, 73, 40, 0.16)',
              position: 'relative',
              backgroundColor: '#FAF5EE',
            }}>
              <img
                src={BIENVENIDOS_IMG}
                alt="La Posada — Un refugio de montaña en Merlo"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
              />
            </div>

            {/* Mobile-only button below the photo */}
            <div className="historia-btn-mobile" style={{ display: 'none', justifyContent: 'center', marginTop: '2rem' }}>
              <a href="#habitaciones" style={{
                color: 'var(--vadano-primary)', textDecoration: 'none',
                fontWeight: 700, fontSize: '0.85rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                borderBottom: `2px solid var(--vadano-primary)`, paddingBottom: '4px',
                transition: 'gap 0.2s ease, opacity 0.2s, color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.gap = '1rem'; e.currentTarget.style.color = '#23693F'; }}
              onMouseLeave={e => { e.currentTarget.style.gap = '0.6rem'; e.currentTarget.style.color = 'var(--vadano-primary)'; }}
              >
                CONOCER HABITACIONES →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .historia-btn-mobile {
          display: none !important;
        }
        @media (max-width: 768px) {
          .historia-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .historia-btn-desktop { display: none !important; }
          .historia-btn-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
