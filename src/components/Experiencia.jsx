import React, { useState, useEffect, useRef } from 'react';

const ACCENT = 'var(--vadano-primary)';
const ACCENT2 = 'var(--vadano-secondary)';

const galleryItems = [
  {
    id: 'item-1',
    video: 'https://res.cloudinary.com/dkc39tw6r/video/upload/v1794960253/laposada_____%EF%B8%8F_Verano_en_la_Posada___Nuestros_hu%C3%A9spedes_disfrutaron_a_f_2025-03-10_DHBi_LguQvk_358530_DHBi_LguQvk_yhw5he.mp4',
    alt: 'La Posada — Verano y pileta en el hotel',
  },
  {
    id: 'item-2',
    video: 'https://res.cloudinary.com/dkc39tw6r/video/upload/v1794960268/laposada____Veni_a_conocer_nuestras_habitaciones__Nos_encontramos_ubicad_2025-11-27_DRk1zx7D24v_377537_DRk1zx7D24v_eqwtxi.mp4',
    alt: 'La Posada — Recorrido por las habitaciones',
  },
  {
    id: 'item-3',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794960786/laposada____TIEMPOS_PARA_RENOVARSE_____Lleg%C3%B3_el_tiempo_de_cambios__y_h_2024-03-13_C4eVZQVu2s2_3323187669554129718_02_wxppyf.jpg',
    alt: 'La Posada — Espacios renovados del hotel',
  },
  {
    id: 'item-4',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794960836/laposada____RINCONES_M%C3%81GICOS_____Hay_espacios_que_se_convierten_en_lugar_2025-01-13_DEyTvVruMsk_3544982672675228452_02_cxuacx.jpg',
    alt: 'La Posada — Rincones y áreas comunes',
  },
  {
    id: 'item-5',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794960973/laposada____LAS_PAUSAS_SON_NECESARIAS_____Imagina_desconectar_y_descans_2024-08-04_C-RHC5RuXxc_3427551776670841948_02_yi55ph.jpg',
    alt: 'La Posada — Descanso y desconexión',
  },
  {
    id: 'item-6',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794960918/laposada____Qu%C3%A9_bella_es_nuestra_Posada__%EF%B8%8F___Las_noches_se_ponen_cada_ve_2024-10-11_DBANH4PREPN_3476836628356678605_02_piozdm.jpg',
    alt: 'La Posada — Noches en la posada',
  },
];

function GalleryItem({ item }) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (item.video && videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const attemptPlay = () => {
        if (video && video.paused) {
          video.play().catch(() => {});
        }
      };

      attemptPlay();

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          attemptPlay();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', attemptPlay);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', attemptPlay);
      };
    }
  }, [item.video]);

  return (
    <div
      ref={containerRef}
      id={`gallery-${item.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '18px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        border: `2px solid ${hovered ? 'var(--vadano-primary)' : 'rgba(238, 223, 204, 0.18)'}`,
        transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? '0 16px 40px var(--vadano-primary-glow)' : '0 6px 20px rgba(0,0,0,0.5)',
        width: '100%',
        backgroundColor: '#0A130D',
        aspectRatio: '4 / 3',
      }}
    >
      {item.video ? (
        <video
          ref={videoRef}
          src={item.video}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            backgroundColor: '#0A130D',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
      ) : (
        <img
          src={item.img}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
      )}

      {/* Shimmer overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, rgba(238, 223, 204, 0.1) 0%, transparent 100%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default function Experiencia() {
  return (
    <section id="galeria" style={{ background: '#0A130D', padding: '7rem 1.5rem', position: 'relative' }}>
      {/* Compatibility anchor for old #experiencia links */}
      <div id="experiencia" style={{ position: 'absolute', top: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.8rem' }}>
          <p
            style={{
              color: 'var(--vadano-secondary)',
              fontSize: '0.88rem',
              letterSpacing: '0.28em',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
            }}
          >
            ✦ GALERÍA DE ESPACIOS ✦
          </p>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.9rem' }}>
            Conocé el hotel
          </h2>
          <p className="section-subtitle" style={{ color: '#EEDFCC', maxWidth: '700px', margin: '1.2rem auto 0' }}>
            Recorré los espacios del hotel: habitaciones, áreas comunes y el exterior
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.8rem',
            marginBottom: '3rem',
          }}
          className="gallery-grid"
        >
          {galleryItems.map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="#disponibilidad"
            className="gold-pill-btn"
            style={{ padding: '0.85rem 2.5rem', fontSize: '0.85rem', textDecoration: 'none' }}
          >
            CONSULTAR TU ESTADÍA
          </a>
        </div>
      </div>
    </section>
  );
}
