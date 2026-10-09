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

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % modalImages.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

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
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 10, 10, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'modalFadeIn 0.3s ease-out'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          {/* Close button */}
          <button 
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'rgba(15,19,22,0.8)', border: `1px solid ${ACCENT}50`, 
              color: ACCENT, cursor: 'pointer', borderRadius: '50%', padding: '0.6rem', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s', zIndex: 10000, backdropFilter: 'blur(4px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,19,22,0.8)'; e.currentTarget.style.color = ACCENT; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <X size={24} />
          </button>
          
          {/* Main Card */}
          <div className="modal-card">
            
            {/* Image Container */}
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
              
              <button onClick={prevImage} style={{
                  position: 'absolute', left: '-15px', background: 'rgba(15,19,22,0.8)', border: `1px solid ${ACCENT}50`, color: ACCENT,
                  cursor: 'pointer', padding: '0.6rem', borderRadius: '50%', zIndex: 1, backdropFilter: 'blur(4px)',
                  transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,19,22,0.8)'; e.currentTarget.style.color = ACCENT; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <ChevronLeft size={28} />
              </button>
              
              <img 
                key={currentIndex}
                src={modalImages[currentIndex]} 
                alt={`Galería ${currentIndex + 1}`} 
                className="modal-main-image"
              />
              
              <button onClick={nextImage} style={{
                  position: 'absolute', right: '-15px', background: 'rgba(15,19,22,0.8)', border: `1px solid ${ACCENT}50`, color: ACCENT,
                  cursor: 'pointer', padding: '0.6rem', borderRadius: '50%', zIndex: 1, backdropFilter: 'blur(4px)',
                  transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,19,22,0.8)'; e.currentTarget.style.color = ACCENT; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <ChevronRight size={28} />
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem' }}>
              {modalImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  style={{
                    width: currentIndex === idx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: currentIndex === idx ? ACCENT : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                  onMouseEnter={e => { if(currentIndex !== idx) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.6)'; }}
                  onMouseLeave={e => { if(currentIndex !== idx) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'; }}
                  aria-label={`Ir a la imagen ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
        
        .modal-card {
          background: #121517;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 92%;
          box-shadow: 0 24px 60px rgba(0,0,0,0.6);
          animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .modal-main-image {
          max-height: 70vh;
          width: 100%;
          object-fit: contain;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          animation: imageFade 0.25s ease-out;
        }

        @media (min-width: 768px) {
          .modal-card {
            width: 60%;
            max-width: 1200px;
          }
          .modal-main-image {
            max-height: 80vh;
          }
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes imageFade {
          from { opacity: 0.5; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
