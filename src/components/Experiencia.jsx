import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ACCENT = '#E87008';

const modalImages = [
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791430666/c27dc5ab-6cf0-4c9b-8256-91fac0b539f3_y1tkgs.jpg',
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791430666/0c21f7d5-fb60-4bdb-8c19-3373747aff58_ht6fqr.jpg',
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791430667/02b1be74-ccea-4956-9fd8-f7b0dc79797b_qup1r5.jpg',
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791430667/8bbaccb2-6be8-4619-8a4d-9fdb436bbb73_j5n9pr.jpg',
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791430667/4e5ae6fa-000c-40c3-8279-42f3578ba38d_t2kmti.jpg'
];

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % modalImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);

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

        {/* CTA (Decorativo) -> Ahora funcional */}
        <div style={{ textAlign: 'center' }}>
          <button className="gold-pill-btn" id="ver-galeria"
             type="button"
             onClick={() => setIsModalOpen(true)}
             style={{ padding: '0.85rem 2.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            VER GALERÍA
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 19, 22, 0.95)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <button 
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'none', border: 'none', color: '#fff', cursor: 'pointer'
            }}
          >
            <X size={32} />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '800px', flex: 1, position: 'relative' }}>
            <button onClick={prevImage} style={{ position: 'absolute', left: 0, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', zIndex: 1 }}>
              <ChevronLeft size={32} />
            </button>
            
            <img 
              src={modalImages[currentIndex]} 
              alt={`Galeria ${currentIndex + 1}`} 
              style={{ maxHeight: '70vh', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
            />
            
            <button onClick={nextImage} style={{ position: 'absolute', right: 0, background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', zIndex: 1 }}>
              <ChevronRight size={32} />
            </button>
          </div>
          
          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem', overflowX: 'auto', paddingBottom: '10px', maxWidth: '100%' }}>
            {modalImages.map((img, idx) => (
              <img 
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: currentIndex === idx ? `2px solid ${ACCENT}` : '2px solid transparent',
                  opacity: currentIndex === idx ? 1 : 0.6,
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
