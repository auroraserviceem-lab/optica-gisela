import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const ACCENT = '#FFFFFF';

const placeholderEvents = [
  {
    id: 1,
    title: 'TEQUEÑOS',
    subtitle: 'PROMOCIÓN',
    date: 'Disponible toda la semana',
    description: 'El clásico venezolano que no puede faltar. Queso derretido en masa crujiente, disponible toda la semana.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1783820041/catatumbo.beerfood_2021-07-23_CRrqPaghvlq_0_dhhx7t.jpg',
    badge: 'PROMOCIÓN',
    aspectRatio: '1/1',
  },
  {
    id: 2,
    title: 'POLLO KENTUCKY',
    subtitle: 'PROMOCIÓN',
    date: 'Disponible toda la semana',
    description: 'Pollo crujiente al mejor estilo, perfecto para disfrutar con buena música y amigos.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1783820041/catatumbo.beerfood_2021-10-02_CUixhDerBq8_0_dsvmgf.jpg',
    badge: 'PROMOCIÓN',
    aspectRatio: '1/1',
  },
  {
    id: 3,
    title: 'HAMBURGUESA MIXTA',
    subtitle: 'PROMOCIÓN',
    date: 'Disponible toda la semana',
    description: 'Carne seleccionada, queso derretido y los mejores ingredientes. Una burger que habla por sí sola.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1783820042/catatumbo.beerfood_2021-08-07_CSR56lLrImv_0_porqqq.jpg',
    badge: 'PROMOCIÓN',
    aspectRatio: '1/1',
  },
  {
    id: 4,
    title: 'TABLA CATATUMBO HOT',
    subtitle: 'PROMOCIÓN',
    date: 'Disponible toda la semana',
    description: 'La tabla ideal para compartir. Picante, abundante y perfecta para una noche con amigos.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1783820042/catatumbo.beerfood_2021-08-23_CS7iDROrKYF_0_wgerbv.jpg',
    badge: 'PROMOCIÓN',
    aspectRatio: '1/1',
  },
  {
    id: 5,
    title: 'PATACONES',
    subtitle: 'PROMOCIÓN',
    date: 'Disponible toda la semana',
    description: 'Plátano frito crujiente al mejor estilo venezolano. Disponible toda la semana.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1783820042/catatumbo.beerfood_2021-09-15_CT182wTLp40_0_vgiq0g.jpg',
    badge: 'PROMOCIÓN',
    aspectRatio: '1/1',
  },
  {
    id: 6,
    title: 'AREPA',
    subtitle: 'PROMOCIÓN',
    date: 'Disponible toda la semana',
    description: 'Arepa rellena con los sabores de Venezuela. Fresca, abundante y llena de identidad.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1783820043/catatumbo.beerfood_2021-09-17_CT7irhyL9l9_0_g3s7id.jpg',
    badge: 'PROMOCIÓN',
    aspectRatio: '1/1',
  },
];

function EventCard({ event }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111111',
        borderRadius: '18px',
        overflow: 'hidden',
        border: `1px solid rgba(255,255,255,0.15)`,
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 20px 50px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.15)`
          : '0 4px 20px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
      }}
    >
      {/* Visual Container for Flyer */}
      <div style={{
        width: '100%',
        aspectRatio: '1/1',
        background: 'transparent',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderBottom: `1px solid rgba(255,255,255,0.1)`,
      }}>
        <img
          src={event.img}
          alt={event.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
          }}
        />

        {/* Badge */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          background: 'rgba(26,26,26,0.85)',
          backdropFilter: 'blur(6px)',
          border: `1px solid rgba(255,255,255,0.25)`,
          borderRadius: '6px',
          padding: '4px 10px',
          color: ACCENT,
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          zIndex: 3,
        }}>
          {event.badge}
        </div>
      </div>

      {/* Info Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'center', alignItems: 'center' }}>
        <p style={{
          color: ACCENT, fontSize: '0.75rem',
          letterSpacing: '0.15em', fontWeight: 600,
          textTransform: 'uppercase', marginBottom: '0.4rem',
        }}>
          {event.subtitle}
        </p>
        <h3 className="font-serif" style={{
          fontSize: '1.3rem', fontWeight: 700,
          color: '#ffffff', textTransform: 'uppercase',
          letterSpacing: '0.05em', marginBottom: '0.8rem',
        }}>
          {event.title}
        </h3>

        {/* Date Row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          color: '#ffffff', fontSize: '0.72rem', fontWeight: 600,
          background: 'rgba(255,255,255,0.05)',
          padding: '0.4rem 0.8rem', borderRadius: '20px',
          marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.08)',
          whiteSpace: 'nowrap',
        }}>
          <Calendar size={14} style={{ color: ACCENT }} />
          <span>{event.date}</span>
        </div>

        {event.price && (
          <span style={{
            color: ACCENT,
            fontSize: '1.25rem',
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            marginBottom: '0.8rem',
            display: 'block',
          }}>
            {event.price}
          </span>
        )}

        <p style={{
          color: '#9ca3af', fontSize: '0.85rem',
          lineHeight: 1.6, flexGrow: 1, margin: 0, textAlign: 'center',
        }}>
          {event.description}
        </p>
      </div>
    </div>
  );
}

export default function Novedades() {
  return (
    <section id="novedades" style={{
      background: 'linear-gradient(180deg, #0F0E0D 0%, #0a0a0a 100%)',
      padding: '6rem 1.5rem',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3.5rem' }}>
          {/* Small Label with Underline */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.2rem' }}>
            <p style={{
              color: ACCENT, fontSize: '1.2rem',
              letterSpacing: '0.3em', fontWeight: 600,
              textTransform: 'uppercase', marginBottom: '0.4rem',
            }}>
              ✦ NO TE LO PIERDAS ✦
            </p>
            <div style={{ width: '40px', height: '2px', background: ACCENT, margin: '0 auto', borderRadius: '1px' }} />
          </div>

          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '1rem' }}>
            Últimas Novedades
          </h2>
          <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
            Enterate de nuestros eventos, música en vivo y promociones especiales
          </p>
        </div>

        {/* Grid */}
        <div className="novedades-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.6rem',
          marginBottom: '1rem',
        }}>
          {placeholderEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .novedades-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .novedades-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
