import React, { useState } from 'react';

const ACCENT = '#E87008';

const reviews = [
  {
    id: 'r1',
    name: 'Andrés Alegre',
    text: '"Óptica Gisela es un negocio muy bueno, te atienden muy bien. Y el lugar está muy bien cuidado."',
  },
  {
    id: 'r2',
    name: 'Fernando Redondo',
    text: '"Excelente óptica, atención personalizada y muy buenos productos"',
  },
  {
    id: 'r3',
    name: 'Alanis Insaurralde',
    text: '"Compré varias veces en este negocio y me parece excelente en todos los aspectos (precio, atención, calidad, etc.), hoy busqué unos lentes y me quedé muy conforme con el resultado, además se destacan por la atención al cliente que ofrecen y la forma en la que te asesoran. Muy recomendable."',
  },
  {
    id: 'r4',
    name: 'Adrián Amato',
    text: '"Excelente atención!! Más de 20 años que voy, buenos precios y te atiende bárbaro!!"',
  },
  {
    id: 'r5',
    name: 'Ailin Bogarin',
    text: '"Siempre amables y predispuestos. Recomendable 100%"',
  },
  {
    id: 'r6',
    name: 'Fla Vidal',
    text: '"Excelente atención y asesoramiento! Muy satisfecha con la compra."',
  },
];

function StarRating() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.8rem' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={ACCENT}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      {/* Google Multicolor Logo */}
      <div style={{
        marginLeft: '6px',
        width: '20px', height: '20px',
        borderRadius: '50%',
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid #e0e0e0',
        flexShrink: 0,
        padding: '2px',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={`review-${review.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '1.6rem',
        border: '1px solid #000000',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 32px rgba(232,112,8,0.12), 0 4px 12px rgba(0,0,0,0.05)'
          : '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <StarRating />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        margin: '0.5rem 0 1rem',
      }}>
        <p style={{
          color: '#000000',
          fontWeight: 500,
          opacity: 1,
          fontSize: '0.88rem',
          lineHeight: 1.75,
          fontStyle: 'italic',
          fontFamily: "'Playfair Display', serif",
          margin: 0,
        }}>
          {review.text}
        </p>
      </div>
      <p style={{
        color: '#000000',
        fontWeight: 700,
        opacity: 1,
        fontSize: '0.85rem',
        letterSpacing: '0.04em',
        marginTop: 'auto',
      }}>
        — {review.name}
      </p>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" style={{ background: '#F3F5F7', padding: '6rem 1.5rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 className="gold-underline font-serif" style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 700,
            color: '#1F262D',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            display: 'inline-block',
            paddingBottom: '0.8rem',
          }}>
            Lo Dicen Nuestros Clientes
          </h2>
        </div>
        <p className="section-subtitle" style={{ margin: '1.5rem auto 3.5rem', color: '#000000' }}>
          La mejor prueba de lo que hacemos, en palabras de quienes ya nos visitaron
        </p>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}
        className="reviews-grid">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
        /* Override gold-underline for dark-on-cream context */
        #reviews .gold-underline::after {
          background-color: ${ACCENT} !important;
        }
      `}</style>
    </section>
  );
}
