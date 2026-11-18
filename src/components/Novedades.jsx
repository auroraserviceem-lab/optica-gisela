import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductDetailModal from './ProductDetailModal';

const ACCENT = 'var(--vadano-primary)';
const ACCENT2 = 'var(--vadano-secondary)';

const placeholderEvents = [
  {
    id: 'nov-1',
    name: 'Lentes y Estilo Urbano',
    title: 'NUEVA COLECCIÓN',
    subtitle: 'TENDENCIAS',
    date: 'Nueva Temporada',
    description: 'Modelos y combinaciones exclusivas que marcan estilo con frescura y elegancia para todos los días.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794174177/opticaribes.bandera__Celebra_a_mam%C3%A1_bajo_el_sol_con_estilo____Este_D%C3%ADa_de_la_Mad_2023-10-05_CyCHetwPscc_3_CyCHetwPscc_02_vflfdg.jpg',
    badge: 'TENDENCIA',
    category: 'Lentes',
    tag: 'NUEVA COLECCIÓN',
    price: 68000,
    originalPrice: 78000,
    stock: 8,
    sizes: ['U'],
    colors: ['Negro', 'Carey', 'Plata'],
    aspectRatio: '1 / 1',
    fullBleed: true,
  },
  {
    id: 'nov-2',
    name: 'Promociones Imperdibles',
    title: 'PROMOS Y BENEFICIOS',
    subtitle: 'DESTACADOS',
    date: 'Imperdibles',
    description: 'Diseños cómodos, detalles cuidados y acabados únicos para que disfrutes cada ocasión con distinción.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794174280/opticaribes.bandera__Prep%C3%A1rate_para_el_regreso_a_clases_con_una_visi%C3%B3n_clara____2024-01-23_C2cSkORrINF_3_C2cSkORrINF_05_y2qgmb.jpg',
    badge: 'DESTACADO',
    category: 'Lentes de Sol',
    tag: 'PROMOS Y BENEFICIOS',
    price: 64000,
    originalPrice: 74000,
    stock: 10,
    sizes: ['U'],
    colors: ['Negro', 'Marrón', 'Gris'],
    aspectRatio: '1 / 1',
    fullBleed: true,
  },
  {
    id: 'nov-3',
    name: 'Atención Personalizada',
    title: 'CONSULTAS Y ASESORAMIENTO',
    subtitle: 'COMUNIDAD',
    date: 'Atención Óptica',
    description: 'Te asesoramos de forma personalizada para encontrar los lentes y cristales ideales para vos.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794174352/opticaribes.bandera_Con_todas_las_tarjetas_bancarizadas___hasta_3_cuotas_sin_int_2023-10-23_CywdOG7PoiS_3220_CywdOG7PoiS_ah5k1e.jpg',
    badge: 'ASESORAMIENTO',
    category: 'Recetados',
    tag: 'ASESORAMIENTO',
    price: 59000,
    originalPrice: 69000,
    stock: 12,
    sizes: ['U'],
    colors: ['Negro', 'Azul', 'Transparente'],
    aspectRatio: '1 / 1',
    fullBleed: true,
  },
  {
    id: 'nov-4',
    name: 'Servicio Posventa y Garantía',
    title: 'CALIDAD GARANTIZADA',
    subtitle: 'ESPECIAL',
    date: 'Servicio Óptico',
    description: 'Servicio posventa excepcional y garantía para asegurar el cuidado y confort de tu visión.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794174347/opticaribes.bandera__%EF%B8%8F_Que_no_se_te_pase_esta_informaci%C3%B3n__%EF%B8%8F_Llega_hasta_lo_%C3%BAlti_2024-03-13_C4eP32lPAZA_3_C4eP32lPAZA_07_yxlwhq.jpg',
    badge: 'GARANTÍA',
    category: 'Servicio',
    tag: 'CALIDAD GARANTIZADA',
    price: 72000,
    originalPrice: 84000,
    stock: 6,
    sizes: ['U'],
    colors: ['Negro', 'Gris', 'Dorado'],
    aspectRatio: '1 / 1',
    fullBleed: true,
  },
];

function EventCard({ event, onOpenModal }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpenModal && onOpenModal(event, 'detail')}
      style={{
        background: '#0d0d0d',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1.5px solid ${hovered ? 'var(--vadano-primary)' : 'rgba(255, 255, 255, 0.15)'}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 16px 40px var(--vadano-primary-glow), 0 0 15px var(--vadano-primary-glow)'
          : '0 4px 20px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '1 / 1',
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      <img
        src={event.img}
        alt={event.name || event.title || 'Novedades Óptica Ribes Bandera'}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          display: 'block',
          transition: 'transform 0.35s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      />
    </div>
  );
}

export default function Novedades() {
  const { products } = useStore();
  const [selectedDish, setSelectedDish] = useState(null);
  const [modalMode, setModalMode] = useState('detail');

  const getDishFromEvent = (event) => {
    const matched = products.find(p =>
      p.id === event.id ||
      p.name.toLowerCase() === (event.name || '').toLowerCase() ||
      (event.name && p.name.toLowerCase().includes(event.name.toLowerCase()))
    );

    if (matched) {
      return {
        ...matched,
        img: event.img || matched.img,
        sizes: Array.isArray(matched.sizes) && matched.sizes.length > 0 ? matched.sizes : (event.sizes || ['U']),
        colors: Array.isArray(matched.colors) && matched.colors.length > 0 ? matched.colors : (event.colors || ['Negro', 'Carey', 'Plata']),
      };
    }

    return {
      id: event.id || `nov-${Date.now()}`,
      name: event.name || event.title,
      price: event.price || 58000,
      originalPrice: event.originalPrice || 68000,
      category: event.category || event.subtitle || 'Lentes',
      tag: event.tag || event.badge || 'DESTACADO',
      img: event.img,
      stock: event.stock !== undefined ? event.stock : 10,
      sizes: Array.isArray(event.sizes) && event.sizes.length > 0 ? event.sizes : ['U'],
      colors: Array.isArray(event.colors) && event.colors.length > 0 ? event.colors : ['Negro', 'Carey', 'Plata'],
      description: event.description,
    };
  };

  const handleOpenModal = (event, mode = 'detail') => {
    const dish = getDishFromEvent(event);
    setSelectedDish(dish);
    setModalMode(mode);
  };

  return (
    <section id="novedades" style={{
      background: 'linear-gradient(180deg, #000000 0%, #000000 100%)',
      padding: '6rem 1.5rem',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3.5rem' }}>
          {/* Small Label */}
          <p style={{
            color: 'var(--vadano-primary)', fontSize: '1.2rem',
            letterSpacing: '0.3em', fontWeight: 600,
            textTransform: 'uppercase', marginBottom: '1.2rem',
          }}>
            ✦ NO TE LO PIERDAS ✦
          </p>

          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.9rem' }}>
            Últimas novedades
          </h2>
          <p className="section-subtitle" style={{ margin: '1rem auto 0', color: '#FFFFFF', maxWidth: '850px' }}>
            Conocé las novedades, promociones y nuevos productos de Óptica Ribes Bandera: lentes recetados, anteojos de sol, lentes de contacto y accesorios para cuidar tu visión y renovar tu estilo.
          </p>
        </div>

        {/* Grid */}
        <div className="novedades-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.6rem',
        }}>
          {placeholderEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        selectedDish={selectedDish}
        onClose={() => setSelectedDish(null)}
        modalMode={modalMode}
      />

      <style>{`
        @media (max-width: 1024px) {
          .novedades-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem !important;
          }
        }
        @media (max-width: 580px) {
          .novedades-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
