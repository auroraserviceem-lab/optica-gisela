import React, { useState } from 'react';
import { X } from 'lucide-react';

const ACCENT = '#E87008';

const dishes = [
  {
    id: 'miu-miu',
    name: 'miu miu',
    price: '',
    tag: 'Receta',
    description: 'Diseño carey clásico con un toque moderno, ideal para uso diario - RECETA',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789437406/optica.gisela__cristales_celstes__2026-04-11_DXAF24JiStF_3873121440912452421_2_ns9pw9.jpg',
  },
  {
    id: 'gyor-degrade',
    name: 'Györ Degradé',
    price: '',
    tag: 'Sol / Receta',
    description: 'Montura redonda con degradé violeta a miel, liviana y elegante para el uso diario',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789524514/f374n_pojkvy.jpg',
  },
  {
    id: 'humah-eyewear',
    name: 'HUMAH Eyewear',
    price: '',
    tag: 'Clip On',
    description: 'Armazón argentino con clip on magnético: pasás de receta a sol en un segundo',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789524624/pPZAx_zpofpz.jpg',
  },
  {
    id: 'loggo',
    name: 'LOGGO',
    price: '',
    tag: 'Diseño',
    description: 'Montura hexagonal/geométrica en transparente-rosado con degradé, lentes marrón/ámbar.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789438548/optica.gisela_Amamos_est%C3%A1_formita__Tienen_toda_la_onda._Qu%C3%A9_opinan_Se_ani_2021-01-08_CJyAYrnnVTp_2482048040737527017_qzxngn.jpg',
  },
  {
    id: 'optica-gisela',
    name: 'Óptica GISELA',
    price: '',
    tag: 'Polarizado',
    description: 'Lente polarizado espejado en tonos rosa',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789438765/optica.gisela_Amamos_el_rosa___es_m%C3%A1s_fuerte_que_nosotras_2021-02-01_CKw_dYpnsu6_2499776889453726650_bpigrf.jpg',
  },
  {
    id: 'rectangular-polarizado',
    name: 'Rectangular Polarizado UV400',
    price: '',
    tag: 'Protección UV',
    description: 'Montura rectangular translúcida con lente polarizado y protección UV400 certificada',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789438896/optica.gisela_2026-04-30_DXwzX07DfPR_3886832416166114257_isfk9f.jpg',
  },
];


function DishCard({ dish, delay, onOpenModal }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={`dish-${dish.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#181F25',
        borderRadius: '18px',
        overflow: 'hidden',
        border: `1px solid rgba(255,255,255,0.12)`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 50px rgba(232,112,8,0.18), 0 0 0 1px rgba(232,112,8,0.4)`
          : '0 4px 20px rgba(0,0,0,0.35)',
        cursor: 'pointer',
        zIndex: hovered ? 10 : 1,
        position: 'relative',
        height: '520px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Photo ── 60% = 312px */}
      <div style={{
        height: '312px',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          src={dish.img}
          alt={dish.name}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            transition: 'transform 0.45s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {/* Hover shimmer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, rgba(232,112,8,0.15), transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Text area ── 40% = 208px */}
      <div style={{
        flex: 1,
        background: '#181F25',
        borderTop: `1px solid rgba(255,255,255,0.08)`,
        padding: '1.4rem 1.6rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Name */}
        <h3 className="font-serif" style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#ffffff',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '0.5rem',
          lineHeight: 1.2,
          flexShrink: 0,
        }}>
          {dish.name}
        </h3>

        {/* Price / Subtitle if any */}
        {dish.price ? (
          <span style={{
            color: ACCENT,
            fontSize: '1.25rem',
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            marginBottom: '0.6rem',
            flexShrink: 0,
            display: 'block',
          }}>
            {dish.price}
          </span>
        ) : null}

        {/* Description */}
        <p style={{
          color: 'rgba(255,255,255,0.78)',
          fontSize: '0.82rem',
          lineHeight: 1.6,
          margin: 0,
          flexGrow: 1,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
          {dish.description}
        </p>

        {/* Button */}
        <a
          href="https://wa.me/5493426487738?text=Hola%2C%20quisiera%20hacer%20una%20consulta%20en%20%C3%93ptica%20Gisela"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: '0.9rem',
            flexShrink: 0,
            background: hovered ? '#D06000' : ACCENT,
            border: 'none',
            color: '#ffffff',
            borderRadius: '8px',
            padding: '0.55rem 1rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'background 0.2s ease, transform 0.2s ease',
            width: '100%',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          CONSULTAR
        </a>
      </div>
    </div>
  );
}


export default function MenuDestacado() {
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <section id="menu" style={{
      background: '#0F1316',
      padding: '7rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <p style={{
            color: ACCENT, fontSize: '0.7rem',
            letterSpacing: '0.3em', fontWeight: 600,
            textTransform: 'uppercase', marginBottom: '0.8rem',
          }}>
            ❖ COLECCIÓN EXCLUSIVA ❖
          </p>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.9rem' }}>
            CATÁLOGO DESTACADO
          </h2>
          <p className="section-subtitle" style={{ color: '#FFFFFF' }}>
            Descubrí nuestra selección de anteojos de sol, receta y clip on, con calidad y estilo para cada mirada
          </p>
        </div>

        {/* Grid */}
        <div className="menu-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.6rem',
          margin: '3.5rem 0 3rem',
        }}>
          {dishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} delay={i * 60} onOpenModal={setSelectedDish} />
          ))}
        </div>

        {/* CTA (Decorativo) */}
        <div style={{ textAlign: 'center' }}>
          <button className="gold-pill-btn" id="ver-menu-completo"
             type="button"
             style={{ padding: '0.9rem 2.8rem', fontSize: '0.85rem', letterSpacing: '0.12em', cursor: 'default' }}>
            VER CATÁLOGO COMPLETO
          </button>
        </div>
      </div>

      {/* Dish Modal */}
      {selectedDish && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 3000,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
          animation: 'fadeIn 0.2s ease',
        }} onClick={() => setSelectedDish(null)}>
          <div style={{
            background: '#181F25',
            border: `1px solid rgba(232,112,8,0.3)`,
            borderRadius: '20px', overflow: 'hidden',
            width: '100%', maxWidth: '800px',
            display: 'flex', flexDirection: 'column',
            position: 'relative',
            animation: 'slideUp 0.3s ease',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 30px rgba(232,112,8,0.15)',
          }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedDish(null)} style={{
              position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
              background: 'rgba(15,19,22,0.7)', border: 'none',
              borderRadius: '50%', padding: '0.4rem',
              color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}>
              <X size={24} />
            </button>
            <img src={selectedDish.img} alt={selectedDish.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            <div style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.2rem' }}>
                <h3 className="font-serif" style={{ fontSize: '2.2rem', color: '#fff', margin: 0 }}>{selectedDish.name}</h3>
                {selectedDish.price && (
                  <span className="font-serif" style={{ fontSize: '1.8rem', color: ACCENT, fontWeight: 700 }}>{selectedDish.price}</span>
                )}
              </div>
              <p style={{ color: '#e5e7eb', fontSize: '1.1rem', lineHeight: 1.7 }}>{selectedDish.description}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .menu-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .menu-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .menu-grid {
          background: transparent;
        }
      `}</style>
    </section>
  );
}
