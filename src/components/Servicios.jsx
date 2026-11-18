import React, { useState } from 'react';
import { Coffee, Waves, Car, Wifi, Trees, Compass } from 'lucide-react';

const serviciosList = [
  {
    icon: Coffee,
    title: 'Desayuno incluido',
    desc: 'Comenzá cada mañana con un desayuno completo, fresco y variado para empezar el día con energía.',
  },
  {
    icon: Waves,
    title: 'Pileta al aire libre',
    desc: 'Disfrutá del solárium y la pileta en nuestro predio con vistas abiertas a las sierras de Merlo.',
  },
  {
    icon: Car,
    title: 'Estacionamiento en el predio',
    desc: 'Espacio de estacionamiento seguro e incluido para la comodidad y tranquilidad de nuestros huéspedes.',
  },
  {
    icon: Wifi,
    title: 'Conexión Wi-Fi',
    desc: 'Acceso a internet inalámbrico en todas las habitaciones y áreas comunes del hotel.',
  },
  {
    icon: Trees,
    title: 'Parque y entorno serrano',
    desc: 'Amplios espacios verdes para desconectarse, leer, descansar y respirar el aire puro de montaña.',
  },
  {
    icon: Compass,
    title: 'Atención personalizada',
    desc: 'Te asesoramos con recomendaciones de paseos, circuitos turísticos, caminatas y gastronomía en Merlo.',
  },
];

function ServiceCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = item.icon;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#101F15',
        borderRadius: '18px',
        padding: '2rem 1.8rem',
        border: `1.5px solid ${hovered ? 'var(--vadano-primary)' : 'rgba(238, 223, 204, 0.12)'}`,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 18px 40px rgba(27, 82, 48, 0.3)'
          : '0 6px 20px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '14px',
          background: 'rgba(27, 82, 48, 0.45)',
          border: '1.5px solid var(--vadano-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--vadano-secondary)',
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        <IconComponent size={26} />
      </div>

      <div>
        <h3
          className="font-serif"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#FAF4EC',
            letterSpacing: '0.02em',
            marginBottom: '0.5rem',
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontSize: '0.88rem',
            lineHeight: 1.65,
            color: '#D5DFD8',
            margin: 0,
          }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function Servicios() {
  return (
    <section id="servicios" style={{ background: '#0A130D', padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            ✦ COMODIDADES & DESCANSO ✦
          </p>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.9rem' }}>
            Servicios del hotel
          </h2>
          <p className="section-subtitle" style={{ color: '#EEDFCC', maxWidth: '680px', margin: '1.2rem auto 0' }}>
            Todo lo necesario para que tu experiencia en La Posada sea tranquila, cómoda y reconfortante
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {serviciosList.map((item, i) => (
            <ServiceCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
