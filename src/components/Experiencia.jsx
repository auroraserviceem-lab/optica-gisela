import React, { useState } from 'react';

const ACCENT = '#E87008';

const galleryItems = [
  {
    id: 'video-1',
    video: 'https://res.cloudinary.com/dkc39tw6r/video/upload/f_auto,q_auto/v1789439572/optica.gisela_Modelitos_clipon_disponibles__todos_con_cristales_polarizado_2023-11-17_CzwD37UucNz_3238105169488626547_sajxd3.mp4',
    alt: 'Óptica Gisela Modelos Clip On',
    aspectRatio: '4/3',
  },
  {
    id: 'video-2',
    video: 'https://res.cloudinary.com/dkc39tw6r/video/upload/f_auto,q_auto/v1789521362/optica.gisela_2023-09-21_CxdS-H9OdiQ_3196794744491071632_w7kyhi.mp4',
    alt: 'Óptica Gisela Nueva Temporada',
    aspectRatio: '4/3',
  },
  {
    id: 'img-3',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789522777/7d6a51ae-ee62-4e73-ac10-b48121be8a72_amnr8i.jpg',
    alt: 'Óptica Gisela Colección de Armazones',
    aspectRatio: '3/4',
  },
  {
    id: 'img-4',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789440100/R6CSH_aehpe3.jpg',
    alt: 'Óptica Gisela Diseños Modernos',
    aspectRatio: '3/4',
  },
  {
    id: 'img-5',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789440213/BpiDf_ancozj.jpg',
    alt: 'Óptica Gisela Tendencias',
    aspectRatio: '3/4',
  },
  {
    id: 'img-6',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789440302/g5Pqe_pugxku.jpg',
    alt: 'Óptica Gisela Anteojos de Sol',
    aspectRatio: '3/4',
  },
];

function GalleryPhoto({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={`gallery-${item.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        border: `2px solid ${hovered ? ACCENT : 'rgba(255,255,255,0.12)'}`,
        transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? `0 12px 36px rgba(232,112,8,0.2)` : '0 4px 12px rgba(0,0,0,0.3)',
        aspectRatio: item.aspectRatio || '4/3',
        width: '100%',
      }}
    >
      {item.video ? (
        <video
          src={item.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
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
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />
      )}
      {/* Subtle shimmer on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, rgba(232,112,8,0.12) 0%, transparent 100%)`,
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
    <section id="experiencia" style={{ background: '#0F1316', padding: '6rem 1.5rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.8rem' }}>
            EXPERIENCIA GISELA
          </h2>
        </div>
        <p className="section-subtitle" style={{ color: '#FFFFFF', marginBottom: '3.5rem' }}>
          Más que anteojos, una atención pensada para vos. Calidez, confianza y ese detalle personalizado que hace la diferencia en cada visita
        </p>

        {/* Gallery Grid — 2 columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
          className="gallery-grid"
        >
          {galleryItems.map(item => (
            <GalleryPhoto key={item.id} item={item} />
          ))}
        </div>

        {/* CTA (Decorativo) */}
        <div style={{ textAlign: 'center' }}>
          <button className="gold-pill-btn" id="ver-galeria"
             type="button"
             style={{ padding: '0.85rem 2.5rem', fontSize: '0.85rem', cursor: 'default' }}>
            VER GALERÍA
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
