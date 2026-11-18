import React, { useState } from 'react';
import { Users, Bed, Check, Sparkles, ArrowRight } from 'lucide-react';

const habitacionesData = [
  {
    id: 'hab-1',
    name: 'Habitación matrimonial',
    foto: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794954856/laposada____Tu_descanso_ideal_es_en_la_Posada__%EF%B8%8F_____Cada_minuto_en_es_2024-09-16_C_1Q2FSxJ7_3458717292891411067_03_ryw15n.jpg',
    capacidad: '2 huéspedes',
    descripcion: 'Cama matrimonial, ambiente luminoso y ventana con vista al jardín.',
    tag: 'PAREJAS',
  },
  {
    id: 'hab-2',
    name: 'Habitación con dos camas',
    foto: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794955000/laposada______Tu_mejor_tiempo_de_descanso___En_La_Posada_del_Tiempo__sab_2024-12-19_DDwu1D2OvbH_3526524464633935559_02_yvzwn8.jpg',
    capacidad: '2 huéspedes',
    descripcion: 'Dos camas individuales, ambiente cálido y cortinas que dan privacidad.',
    tag: 'INDIVIDUALES',
  },
  {
    id: 'hab-3',
    name: 'Habitación grupal',
    foto: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794955125/laposada______Tu_mejor_tiempo_de_descanso___En_La_Posada_del_Tiempo__sab_2024-12-19_DDwu1D2OvbH_3526524464633935559_04_wnbnfz.jpg',
    capacidad: '3 huéspedes',
    descripcion: 'Dos camas dobles, ambiente cálido y amplio, ideal para familias o grupos de amigos.',
    tag: 'FAMILIAS / AMIGOS',
  },
];

function RoomCard({ room, onSelectRoom }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#101F15',
        borderRadius: '20px',
        overflow: 'hidden',
        border: `1.5px solid ${hovered ? 'var(--vadano-primary)' : 'rgba(238, 223, 204, 0.15)'}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 45px rgba(27, 82, 48, 0.35), 0 0 0 1px var(--vadano-primary)'
          : '0 8px 30px rgba(0, 0, 0, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* ── Photo ── */}
      <div
        style={{
          width: '100%',
          aspectRatio: '4 / 3',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#0A130D',
        }}
      >
        <img
          src={room.foto}
          alt={room.name}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Capacity badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            left: '14px',
            background: 'rgba(10, 19, 13, 0.88)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50px',
            padding: '5px 12px',
            color: 'var(--vadano-secondary)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            border: '1px solid rgba(238, 223, 204, 0.25)',
          }}
        >
          <Users size={13} color="var(--vadano-secondary)" />
          <span>{room.capacidad}</span>
        </div>

        {/* Tag badge */}
        {room.tag && (
          <div
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'var(--vadano-primary)',
              borderRadius: '6px',
              padding: '4px 10px',
              color: '#FAF4EC',
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            {room.tag}
          </div>
        )}
      </div>

      {/* ── Text Content ── */}
      <div
        style={{
          padding: '1.6rem 1.6rem 1.8rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h3
            className="font-serif"
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#FAF4EC',
              letterSpacing: '0.02em',
              marginBottom: '0.8rem',
              lineHeight: 1.25,
            }}
          >
            {room.name}
          </h3>

          <p
            style={{
              color: '#D5DFD8',
              fontSize: '0.9rem',
              lineHeight: 1.65,
              margin: '0 0 1.5rem',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
            }}
          >
            {room.descripcion}
          </p>
        </div>

        <a
          href="#disponibilidad"
          onClick={() => onSelectRoom && onSelectRoom(room.name)}
          className="gold-pill-btn"
          style={{
            width: '100%',
            padding: '0.75rem 1.4rem',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxSizing: 'border-box',
          }}
        >
          <span>CONSULTAR</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}

export default function Habitaciones({ onSelectRoom }) {
  return (
    <section id="habitaciones" style={{ background: '#0A130D', padding: '7rem 1.5rem', position: 'relative' }}>
      {/* Anchor for old #menu links */}
      <div id="menu" style={{ position: 'absolute', top: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
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
            ✦ TU DESCANSO EN LA SIERRA ✦
          </p>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.9rem' }}>
            Nuestras habitaciones
          </h2>
          <p className="section-subtitle" style={{ color: '#EEDFCC', maxWidth: '720px', margin: '1.2rem auto 0' }}>
            Habitaciones matrimoniales y grupales, pensadas para parejas, familias y grupos de amigos
          </p>
        </div>

        {/* 3 Rooms Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '2.2rem',
            alignItems: 'stretch',
          }}
        >
          {habitacionesData.map((room) => (
            <RoomCard key={room.id} room={room} onSelectRoom={onSelectRoom} />
          ))}
        </div>

        {/* CTA "Ver más habitaciones" */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
          <a
            href="#disponibilidad"
            className="gold-pill-btn"
            style={{
              padding: '0.85rem 2.2rem',
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textDecoration: 'none',
              background: 'transparent',
              border: '1.5px solid var(--vadano-secondary)',
              color: 'var(--vadano-secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--vadano-secondary)';
              e.currentTarget.style.color = '#0A130D';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--vadano-secondary)';
            }}
          >
            VER MÁS HABITACIONES
          </a>
        </div>
      </div>
    </section>
  );
}
