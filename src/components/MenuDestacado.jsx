import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ACCENT = '#E87008';

const originalDishes = [
  {
    id: 'black-red',
    name: 'Black & Red',
    price: '',
    tag: 'Diseño',
    description: 'Armazón negro con detalles rojos en las patillas, de estilo moderno y llamativo.',
    images: [
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791568653/5_ek6eve.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791568652/8_lqmy5d.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791568649/6_sd4enp.jpg'
    ]
  },
  {
    id: 'blue-orange',
    name: 'Blue Orange',
    price: '',
    tag: 'Diseño',
    description: 'Armazón geométrico en azul petróleo con detalles naranja y patillas estampadas. Un diseño original, colorido y moderno para destacar tu estilo.',
    images: [
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791575206/11_exsxh1.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791575206/7_w0tzfu.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791575206/10_fwqzpy.jpg'
    ]
  },
  {
    id: 'black-gold',
    name: 'Black Gold',
    price: '',
    tag: 'Diseño',
    description: 'Armazón rectangular en negro y carey oscuro con detalles dorados. Un diseño clásico, elegante y sofisticado.',
    images: [
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791571143/34_lvtnot.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791571143/29_cqsmzq.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791571143/33_pxoo4t.jpg'
    ]
  },
  {
    id: 'green-contrast',
    name: 'Green Contrast',
    price: '',
    tag: 'Diseño',
    description: 'Armazón geométrico en tono ámbar translúcido con detalles verde neón y patillas estampadas. Un diseño audaz, moderno y lleno de personalidad.',
    images: [
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570539/12_ekleha.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570538/15_i0hqwj.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570537/14_wva2un.jpg'
    ]
  },
  {
    id: 'gray-leopard',
    name: 'Gray Leopard',
    price: '',
    tag: 'Diseño',
    description: 'Armazón rectangular en gris translúcido con detalles estilo animal print. Un diseño moderno, elegante y con mucha personalidad.',
    images: [
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570737/24_uxcnv9.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570737/23_oujqi8.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570736/21_dm9zfz.jpg'
    ]
  },
  {
    id: 'green-crystal',
    name: 'Green Crystal',
    price: '',
    tag: 'Diseño',
    description: 'Armazón rectangular translúcido en tonos verde y gris, con un diseño moderno, elegante y versátil.',
    images: [
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570953/30_vcai8f.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570952/31_hpkij1.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570952/32_cg3dof.jpg'
    ]
  }
];

const fullCatalogModels = [
  {
    id: 'full-crystal-iridiscente',
    name: 'Crystal Iridiscente',
    price: '',
    tag: 'Diseño',
    description: 'Armazón geométrico translúcido con reflejos iridiscentes, un diseño moderno, elegante y llamativo.',
    images: [
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570275/16_waapuv.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570274/13_y3otk4.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791570275/9_jqedrl.jpg'
    ]
  },
  {
    id: 'brown-oversize',
    name: 'Brown Oversize',
    price: '',
    tag: 'Diseño',
    description: 'Armazón grande en tono marrón carey, con un diseño elegante, moderno y sofisticado.',
    images: [
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791571667/28_zjlbf5.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791571667/27_bmuron.jpg',
      'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791571666/26_qcnxde.jpg'
    ]
  }
];

const optimizeImageUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  if (url.includes('/upload/f_auto')) return url;
  return url.replace('/upload/', '/upload/f_auto,q_auto:best/');
};

function OriginalDishCard({ dish }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#181F25',
        borderRadius: '18px',
        overflow: 'hidden',
        border: `1.5px solid ${ACCENT}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 50px rgba(232,112,8,0.18), 0 0 0 1px rgba(232,112,8,0.4)`
          : '0 4px 20px rgba(0,0,0,0.35)',
        cursor: 'default',
        zIndex: hovered ? 10 : 1,
        position: 'relative',
        height: '520px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: '312px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
        <img
          src={optimizeImageUrl(dish.img)}
          alt={dish.name}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block',
            transition: 'transform 0.45s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, rgba(232,112,8,0.15), transparent)`,
          opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: 'none',
        }} />
      </div>

      <div style={{
        flex: 1, background: '#181F25', borderTop: `1px solid rgba(255,255,255,0.08)`,
        padding: '1.4rem 1.6rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', overflow: 'hidden',
      }}>
        <h3 className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', lineHeight: 1.2, flexShrink: 0 }}>
          {dish.name}
        </h3>
        {dish.price && (
          <span style={{ color: ACCENT, fontSize: '1.25rem', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '0.6rem', flexShrink: 0, display: 'block' }}>
            {dish.price}
          </span>
        )}
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0, flexGrow: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {dish.description}
        </p>
        <a
          href="https://wa.me/5493426487738?text=Hola%2C%20quisiera%20consultar%20por%20este%20anteojo."
          target="_blank" rel="noopener noreferrer"
          style={{
            marginTop: '0.9rem', flexShrink: 0, background: hovered ? '#D06000' : ACCENT,
            border: 'none', color: '#ffffff', borderRadius: '8px', padding: '0.55rem 1rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s ease, transform 0.2s ease', width: '100%', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
          }}
        >
          CONSULTAR
        </a>
      </div>
    </div>
  );
}

function CatalogModelCard({ model }) {
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    if (loadedImages[currentIndex]) {
      setDisplayIndex(currentIndex);
    }
  }, [currentIndex, loadedImages]);

  const handleImageLoad = (idx) => {
    setLoadedImages(prev => ({ ...prev, [idx]: true }));
    if (idx === currentIndex) {
      setDisplayIndex(idx);
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % model.images.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + model.images.length) % model.images.length);
  };

  const textWhatsApp = encodeURIComponent(`Hola, quisiera consultar por este anteojo.`);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#181F25', borderRadius: '18px', overflow: 'hidden',
        border: `1.5px solid ${ACCENT}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 50px rgba(232,112,8,0.18), 0 0 0 1px rgba(232,112,8,0.4)` : '0 4px 20px rgba(0,0,0,0.35)',
        position: 'relative', display: 'flex', flexDirection: 'column', height: '520px'
      }}
    >
      <div style={{ height: '312px', flexShrink: 0, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={prevImage} style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px', background: 'rgba(15,19,22,0.6)', border: `1px solid ${ACCENT}50`, color: ACCENT,
            cursor: 'pointer', padding: '0.4rem', borderRadius: '50%', zIndex: 20, backdropFilter: 'blur(2px)', transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,19,22,0.95)'; e.currentTarget.style.borderColor = ACCENT; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,19,22,0.6)'; e.currentTarget.style.borderColor = `${ACCENT}50`; }}
        >
          <ChevronLeft size={20} />
        </button>

        {model.images.map((imgSrc, idx) => {
          if (idx !== displayIndex && idx !== currentIndex && idx !== 0) return null;
          const isVisible = idx === displayIndex;
          return (
            <img 
              key={idx} 
              src={optimizeImageUrl(imgSrc)} 
              alt={`${model.name} - Vista ${idx + 1}`} 
              loading={idx === 0 ? "eager" : "lazy"} 
              fetchPriority={idx === 0 ? "high" : "auto"} 
              onLoad={() => handleImageLoad(idx)}
              style={{ 
                position: 'absolute', inset: 0, width: '100%', height: '100%', 
                objectFit: 'cover', objectPosition: 'center', display: 'block', 
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out, transform 0.45s ease', 
                transform: hovered && isVisible ? 'scale(1.05)' : 'scale(1)',
                zIndex: isVisible ? 2 : 1 
              }} 
            />
          );
        })}

        {currentIndex !== displayIndex && (
          <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 15 }}>
            <div style={{ width: '16px', height: '16px', border: `2px solid rgba(232,112,8,0.3)`, borderTop: `2px solid ${ACCENT}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        )}
        
        <button onClick={nextImage} style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px', background: 'rgba(15,19,22,0.6)', border: `1px solid ${ACCENT}50`, color: ACCENT,
            cursor: 'pointer', padding: '0.4rem', borderRadius: '50%', zIndex: 20, backdropFilter: 'blur(2px)', transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,19,22,0.95)'; e.currentTarget.style.borderColor = ACCENT; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,19,22,0.6)'; e.currentTarget.style.borderColor = `${ACCENT}50`; }}
        >
          <ChevronRight size={20} />
        </button>

        <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 15 }}>
          {model.images.map((_, idx) => (
            <div
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
              style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: currentIndex === idx ? ACCENT : 'rgba(255,255,255,0.4)',
                cursor: 'pointer', transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>

        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(232,112,8,0.15), transparent)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: 'none', zIndex: 5 }} />
      </div>

      <div style={{ flex: 1, background: '#181F25', borderTop: `1px solid rgba(255,255,255,0.08)`, padding: '1.4rem 1.6rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h3 className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', lineHeight: 1.2 }}>{model.name}</h3>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{model.description}</p>
        
        <a
          href={`https://wa.me/5493426487738?text=${textWhatsApp}`}
          target="_blank" rel="noopener noreferrer"
          style={{
            marginTop: '0.9rem', flexShrink: 0, background: hovered ? '#D06000' : ACCENT,
            border: 'none', color: '#ffffff', borderRadius: '8px', padding: '0.55rem 1rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s ease, transform 0.2s ease', width: '100%', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
          }}
        >
          CONSULTAR
        </a>
      </div>
    </div>
  );
}

const extraImages = [
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791576087/2_w8gmaa.jpg',
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791576089/3_tv9h19.jpg',
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791576076/5_m9mvl5.jpg',
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791576077/6_otcq5m.jpg'
];

function ExtraGalleryCard({ images }) {
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    if (loadedImages[currentIndex]) {
      setDisplayIndex(currentIndex);
    }
  }, [currentIndex, loadedImages]);

  const handleImageLoad = (idx) => {
    setLoadedImages(prev => ({ ...prev, [idx]: true }));
    if (idx === currentIndex) {
      setDisplayIndex(idx);
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="extra-gallery-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#181F25', borderRadius: '18px', overflow: 'hidden',
        border: `1.5px solid ${ACCENT}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 50px rgba(232,112,8,0.18), 0 0 0 1px rgba(232,112,8,0.4)` : '0 4px 20px rgba(0,0,0,0.35)',
        position: 'relative', display: 'flex', flexDirection: 'column', height: '600px', width: '100%', maxWidth: '900px', margin: '0 auto'
      }}
    >
      <div style={{ height: '100%', width: '100%', flexShrink: 0, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={prevImage} style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '15px', background: 'rgba(15,19,22,0.8)', border: `1px solid ${ACCENT}50`, color: ACCENT,
            cursor: 'pointer', padding: '0.6rem', borderRadius: '50%', zIndex: 20, backdropFilter: 'blur(4px)', transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,19,22,1)'; e.currentTarget.style.borderColor = ACCENT; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,19,22,0.8)'; e.currentTarget.style.borderColor = `${ACCENT}50`; }}
        >
          <ChevronLeft size={28} />
        </button>

        {images.map((imgSrc, idx) => {
          if (idx !== displayIndex && idx !== currentIndex && idx !== 0) return null;
          const isVisible = idx === displayIndex;
          return (
            <img 
              key={idx} 
              className="extra-gallery-image"
              src={optimizeImageUrl(imgSrc)} 
              alt="Más modelos y accesorios" 
              loading={idx === 0 ? "eager" : "lazy"} 
              fetchPriority={idx === 0 ? "high" : "auto"} 
              onLoad={() => handleImageLoad(idx)}
              style={{ 
                position: 'absolute', inset: 0, width: '100%', height: '100%', 
                objectFit: 'cover', objectPosition: 'center', display: 'block', 
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out', 
                zIndex: isVisible ? 2 : 1 
              }} 
            />
          );
        })}

        {currentIndex !== displayIndex && (
          <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 15 }}>
            <div style={{ width: '20px', height: '20px', border: `2px solid rgba(232,112,8,0.3)`, borderTop: `2px solid ${ACCENT}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        )}
        
        <button onClick={nextImage} style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '15px', background: 'rgba(15,19,22,0.8)', border: `1px solid ${ACCENT}50`, color: ACCENT,
            cursor: 'pointer', padding: '0.6rem', borderRadius: '50%', zIndex: 20, backdropFilter: 'blur(4px)', transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,19,22,1)'; e.currentTarget.style.borderColor = ACCENT; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,19,22,0.8)'; e.currentTarget.style.borderColor = `${ACCENT}50`; }}
        >
          <ChevronRight size={28} />
        </button>

        <div style={{ position: 'absolute', bottom: '20px', display: 'flex', gap: '8px', zIndex: 15 }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
              style={{
                width: currentIndex === idx ? '24px' : '10px',
                height: '10px', borderRadius: '5px',
                backgroundColor: currentIndex === idx ? ACCENT : 'rgba(255,255,255,0.5)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0
              }}
              aria-label={`Ir a la imagen ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MenuDestacado() {
  const [isFullCatalogOpen, setIsFullCatalogOpen] = useState(false);
  const [isFullCatalogLoading, setIsFullCatalogLoading] = useState(false);

  const handleOpenCatalog = () => {
    if (isFullCatalogOpen) {
      setIsFullCatalogOpen(false);
      return;
    }
    
    setIsFullCatalogLoading(true);
    const imagesToPreload = fullCatalogModels.map(m => optimizeImageUrl(m.images[0]));
    let loadedCount = 0;
    
    if (imagesToPreload.length === 0) {
      setIsFullCatalogLoading(false);
      setIsFullCatalogOpen(true);
      return;
    }
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      const checkDone = () => {
        loadedCount++;
        if (loadedCount === imagesToPreload.length) {
          setIsFullCatalogLoading(false);
          setIsFullCatalogOpen(true);
        }
      };
      img.onload = checkDone;
      img.onerror = checkDone;
      img.src = src;
    });
  };

  return (
    <section id="menu" style={{ background: '#0F1316', padding: '7rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <p style={{ color: ACCENT, fontSize: '0.7rem', letterSpacing: '0.3em', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.8rem' }}>
            ❖ COLECCIÓN EXCLUSIVA ❖
          </p>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.9rem' }}>
            CATÁLOGO DESTACADO
          </h2>
          <p className="section-subtitle" style={{ color: '#FFFFFF' }}>
            Descubrí nuestra selección, con calidad y estilo para cada mirada
          </p>
        </div>

        {/* 6 Original highlighted items */}
        <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.6rem', margin: '3.5rem 0 3rem' }}>
          {originalDishes.map((dish) => (
            dish.images ? (
              <CatalogModelCard key={dish.id} model={dish} />
            ) : (
              <OriginalDishCard key={dish.id} dish={dish} />
            )
          ))}
        </div>

        {isFullCatalogOpen && (
          <div style={{ animation: 'modalFadeIn 0.5s ease' }}>
            <div style={{ textAlign: 'center', margin: '5rem 0 2rem' }}>
              <h2 className="section-title" style={{ display: 'inline-block', fontSize: '2rem', marginBottom: '0.6rem' }}>
                CATÁLOGO COMPLETO
              </h2>
              <div style={{ width: '80px', height: '2px', backgroundColor: ACCENT, margin: '0 auto' }}></div>
            </div>
            <div className="menu-grid full-catalog-flex" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.6rem', marginBottom: '4rem' }}>
              {fullCatalogModels.map((model) => (
                <div key={model.id} className="catalog-centered-card">
                  <CatalogModelCard model={model} />
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 className="section-title" style={{ display: 'inline-block', fontSize: '1.6rem', color: ACCENT, marginBottom: '0.6rem' }}>
                MÁS MODELOS Y ACCESORIOS
              </h3>
              <div style={{ width: '60px', height: '2px', backgroundColor: ACCENT, margin: '0 auto' }}></div>
            </div>
            
            <div style={{ marginBottom: '4rem' }}>
              <ExtraGalleryCard images={extraImages} />
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button 
            className="gold-pill-btn" 
            id="ver-menu-completo"
            type="button"
            onClick={handleOpenCatalog}
            disabled={isFullCatalogLoading}
            style={{ padding: '0.9rem 2.8rem', fontSize: '0.85rem', letterSpacing: '0.12em', cursor: isFullCatalogLoading ? 'wait' : 'pointer', opacity: isFullCatalogLoading ? 0.7 : 1 }}>
            {isFullCatalogLoading ? 'CARGANDO...' : (isFullCatalogOpen ? 'OCULTAR CATÁLOGO COMPLETO' : 'VER CATÁLOGO COMPLETO')}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .menu-grid:not(.full-catalog-flex) { grid-template-columns: repeat(2, 1fr) !important; }
          .catalog-centered-card { width: calc((100% - 1.6rem) / 2) !important; }
        }
        @media (max-width: 600px) {
          .menu-grid:not(.full-catalog-flex) { grid-template-columns: 1fr !important; }
          .catalog-centered-card { width: 100% !important; }
        }
        .catalog-centered-card { width: calc((100% - 3.2rem) / 3); }
        @media (max-width: 768px) {
          .extra-gallery-card { 
            height: auto !important; 
            aspect-ratio: 1 / 1 !important;
            max-height: 450px !important;
            width: 100% !important;
          }
          .extra-gallery-image { object-fit: contain !important; }
        }
        @keyframes modalFadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes imageFade { from { opacity: 0.5; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
