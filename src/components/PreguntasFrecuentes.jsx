import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: '¿Tienen estacionamiento incluido?',
    a: 'Sí, contamos con estacionamiento dentro del predio del hotel, seguro y sin costo adicional para nuestros huéspedes.',
  },
  {
    q: '¿La estadía incluye desayuno?',
    a: 'Sí, todas nuestras estadías incluyen un desayuno artesanal para que comiences tu día de descanso en las sierras con energía.',
  },
  {
    q: '¿Aceptan mascotas?',
    a: 'Sí, se aceptan mascotas pequeñas con aviso previo al momento de realizar la consulta o reserva.',
  },
  {
    q: '¿Cuáles son los horarios de check-in y check-out?',
    a: 'El horario de check-in es a partir de las 14:00 hs y el check-out es hasta las 10:00 hs.',
  },
  {
    q: '¿Cómo se confirman la disponibilidad y las tarifas?',
    a: 'Podés enviar tu consulta con las fechas deseadas desde el formulario de la web y te responderemos por WhatsApp en el día con la disponibilidad exacta y las tarifas vigentes.',
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: isOpen ? '#FFFFFF' : '#FAF7F2',
        borderRadius: '16px',
        border: `1.5px solid ${isOpen ? 'var(--vadano-primary)' : 'rgba(27, 82, 48, 0.15)'}`,
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        boxShadow: isOpen ? '0 8px 25px rgba(22, 73, 40, 0.08)' : 'none',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1.4rem 1.6rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          textAlign: 'left',
        }}
      >
        <span
          className="font-serif"
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#163520',
            letterSpacing: '0.01em',
          }}
        >
          {item.q}
        </span>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: isOpen ? 'var(--vadano-primary)' : 'rgba(27, 82, 48, 0.1)',
            color: isOpen ? '#FAF4EC' : 'var(--vadano-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'transform 0.3s ease, background 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          }}
        >
          <ChevronDown size={18} />
        </div>
      </button>

      {isOpen && (
        <div
          style={{
            padding: '0 1.6rem 1.4rem',
            color: '#284130',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            borderTop: '1px solid rgba(27, 82, 48, 0.08)',
            paddingTop: '1rem',
          }}
        >
          <p style={{ margin: 0 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" style={{ background: '#FAF5EE', padding: '7rem 1.5rem', color: '#163520' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
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
            ✦ DUDAS FRECUENTES ✦
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
            Preguntas frecuentes
          </h2>
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              color: '#284130',
              fontSize: '1.05rem',
              maxWidth: '550px',
              margin: '0 auto',
            }}
          >
            Respuestas a las consultas más habituales sobre tu estadía en La Posada
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
