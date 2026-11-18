import React, { useState } from 'react';
import { Clock, ShieldAlert, Heart, CreditCard, Check } from 'lucide-react';

const politicasList = [
  {
    icon: Clock,
    title: 'Horarios de estadía',
    items: [
      { label: 'Check-in', value: 'Desde las 14:00 hs' },
      { label: 'Check-out', value: 'Hasta las 10:00 hs' },
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Política de cancelación',
    text: 'Cancelación gratuita hasta 48 hs antes de la fecha de llegada. Pasado ese plazo, se cobra el valor de la primera noche.',
  },
  {
    icon: Heart,
    title: 'Mascotas',
    text: 'Se aceptan mascotas pequeñas con aviso previo al momento de realizar la reserva.',
  },
  {
    icon: CreditCard,
    title: 'Formas de pago',
    text: 'Aceptamos pagos en efectivo, transferencia bancaria y tarjetas de crédito o débito.',
  },
];

function PolicyCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = item.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem 1.8rem',
        border: `2px solid ${hovered ? 'var(--vadano-primary)' : 'rgba(27, 82, 48, 0.12)'}`,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 18px 40px rgba(22, 73, 40, 0.12)'
          : '0 6px 20px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          background: 'rgba(27, 82, 48, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--vadano-primary)',
        }}
      >
        <IconComponent size={24} />
      </div>

      <h3
        className="font-serif"
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#163520',
          margin: 0,
        }}
      >
        {item.title}
      </h3>

      {item.items ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {item.items.map((it, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--vadano-primary)' }} />
              <span style={{ fontWeight: 700, color: '#163520', fontSize: '0.9rem' }}>{it.label}:</span>
              <span style={{ color: '#284130', fontSize: '0.9rem' }}>{it.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#284130', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
          {item.text}
        </p>
      )}
    </div>
  );
}

export default function Politicas() {
  return (
    <section id="politicas" style={{ background: '#FAF5EE', padding: '7rem 1.5rem', color: '#163520' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.8rem' }}>
          <p
            style={{
              color: 'var(--vadano-primary)',
              fontSize: '0.88rem',
              letterSpacing: '0.28em',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
            }}
          >
            ✦ INFORMACIÓN CLAVE ✦
          </p>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
              fontWeight: 800,
              color: '#163520',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              margin: '0 0 1rem',
            }}
          >
            Antes de llegar
          </h2>
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              color: '#284130',
              fontSize: '1.05rem',
              maxWidth: '650px',
              margin: '0 auto',
            }}
          >
            Detalles y pautas para que disfrutes de tu estadía con total tranquilidad
          </p>
        </div>

        {/* Policies Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.8rem',
          }}
        >
          {politicasList.map((item, i) => (
            <PolicyCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
