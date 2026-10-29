import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ACCENT = '#E87008';

function useNearViewport(ref, rootMargin = '300px 0px') {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isNear;
}

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

const cleanCloudinaryUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  const match = url.match(/(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)(.*)/);
  if (!match) return url;
  const prefix = match[1];
  const rest = match[2];
  const versionIndex = rest.search(/v\d+\//);
  if (versionIndex !== -1) {
    return prefix + rest.slice(versionIndex);
  }
  return url;
};

const optimizeImageUrl = (url, width = 800) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  const base = cleanCloudinaryUrl(url);
  return base.replace('/upload/', `/upload/f_auto,q_auto:good,w_${width},c_limit/`);
};

const getCloudinarySrcSet = (url) => {
  if (!url || !url.includes('cloudinary.com')) return undefined;
  const base = cleanCloudinaryUrl(url);
  return [
    `${base.replace('/upload/', '/upload/f_auto,q_auto:good,w_400,c_limit/')} 400w`,
    `${base.replace('/upload/', '/upload/f_auto,q_auto:good,w_600,c_limit/')} 600w`,
    `${base.replace('/upload/', '/upload/f_auto,q_auto:good,w_800,c_limit/')} 800w`,
    `${base.replace('/upload/', '/upload/f_auto,q_auto:good,w_1000,c_limit/')} 1000w`,
  ].join(', ');
};

const getPlaceholderUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) return '';
  const base = cleanCloudinaryUrl(url);
  return base.replace('/upload/', '/upload/f_auto,q_auto:low,w_30,c_limit/');
};

const OriginalDishCard = React.memo(function OriginalDishCard({ dish, isPriority = false }) {
  const cardRef = useRef(null);
  const near = useNearViewport(cardRef, '350px 0px');
  const isNearViewport = isPriority || near;
  const [hovered, setHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      ref={cardRef}
      className="catalog-model-card"
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
        contain: 'layout paint',
      }}
    >
      <div 
        className="catalog-image-container"
        style={{ 
          height: '312px', flexShrink: 0, overflow: 'hidden', position: 'relative',
          backgroundColor: '#181F25',
          contain: 'strict'
        }}
      >
        {/* Shimmer Placeholder */}
        <div 
          className="catalog-placeholder-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #181F25 0%, #20272F 50%, #181F25 100%)',
            backgroundSize: '200% 100%',
            animation: 'placeholderShimmer 1.8s infinite ease-in-out',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: isLoaded ? 0 : 1,
            transition: 'opacity 0.4s ease'
          }}
        />

        {/* LQIP Micro-placeholder */}
        {isNearViewport && dish.img && (
          <img
            src={getPlaceholderUrl(dish.img)}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'blur(10px)',
              transform: 'scale(1.04)',
              opacity: isLoaded ? 0 : 0.85,
              transition: 'opacity 0.4s ease',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />
        )}

        {isNearViewport && (
          <img
            src={optimizeImageUrl(dish.img, 800)}
            srcSet={getCloudinarySrcSet(dish.img)}
            sizes="(max-width: 600px) 92vw, (max-width: 960px) 46vw, 360px"
            alt={`${dish.name} - Anteojos en Óptica Gisela Santa Fe`}
            loading={isPriority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={isPriority ? "high" : "low"}
            onLoad={() => setIsLoaded(true)}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block',
              transition: 'opacity 0.4s ease, transform 0.45s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)',
              opacity: isLoaded ? 1 : 0,
              pointerEvents: 'none',
              position: 'relative',
              zIndex: 1
            }}
          />
        )}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, rgba(232,112,8,0.15), transparent)`,
          opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: 'none',
          zIndex: 2
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
});

const CatalogModelCard = React.memo(function CatalogModelCard({ model, isPriority = false }) {
  const cardRef = useRef(null);
  const near = useNearViewport(cardRef, '350px 0px');
  const isNearViewport = isPriority || near;
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [renderedIndices, setRenderedIndices] = useState(() => new Set([0]));
  const [loadedMap, setLoadedMap] = useState({});

  const handleImageLoaded = (idx) => {
    setLoadedMap(prev => (prev[idx] ? prev : { ...prev, [idx]: true }));
  };

  useEffect(() => {
    if (hovered || currentIndex !== 0) {
      setRenderedIndices(prev => {
        if (prev.size === model.images.length) return prev;
        return new Set(model.images.map((_, i) => i));
      });
    }
  }, [hovered, currentIndex, model.images.length]);

  useEffect(() => {
    if (!isNearViewport) return;

    const loadRemaining = () => {
      setRenderedIndices(new Set(model.images.map((_, i) => i)));
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(loadRemaining, { timeout: 2500 });
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(loadRemaining, 1500);
      return () => clearTimeout(timer);
    }
  }, [isNearViewport, model.images.length]);

  const nextImage = (e) => {
    e.stopPropagation();
    setRenderedIndices(new Set(model.images.map((_, i) => i)));
    setCurrentIndex((prev) => (prev + 1) % model.images.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setRenderedIndices(new Set(model.images.map((_, i) => i)));
    setCurrentIndex((prev) => (prev - 1 + model.images.length) % model.images.length);
  };

  const textWhatsApp = encodeURIComponent(`Hola, quisiera consultar por este anteojo.`);

  return (
    <div
      ref={cardRef}
      className="catalog-model-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#181F25', borderRadius: '18px', overflow: 'hidden',
        border: `1.5px solid ${ACCENT}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 50px rgba(232,112,8,0.18), 0 0 0 1px rgba(232,112,8,0.4)` : '0 4px 20px rgba(0,0,0,0.35)',
        position: 'relative', display: 'flex', flexDirection: 'column', height: '520px',
        contain: 'layout paint',
      }}
    >
      <div 
        className="catalog-image-container"
        style={{ 
          height: '312px', flexShrink: 0, overflow: 'hidden', position: 'relative', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#181F25',
          contain: 'strict'
        }}
      >
        {/* Shimmer Placeholder */}
        <div 
          className="catalog-placeholder-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #181F25 0%, #20272F 50%, #181F25 100%)',
            backgroundSize: '200% 100%',
            animation: 'placeholderShimmer 1.8s infinite ease-in-out',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: loadedMap[currentIndex] ? 0 : 1,
            transition: 'opacity 0.4s ease'
          }}
        />

        {/* LQIP Micro-placeholder */}
        {isNearViewport && model.images[currentIndex] && (
          <img
            src={getPlaceholderUrl(model.images[currentIndex])}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'blur(10px)',
              transform: 'scale(1.04)',
              opacity: loadedMap[currentIndex] ? 0 : 0.85,
              transition: 'opacity 0.4s ease',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />
        )}

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

        {isNearViewport && model.images.map((imgSrc, idx) => {
          if (!renderedIndices.has(idx)) return null;
          const isVisible = idx === currentIndex;
          const isImgPriority = isPriority && idx === 0;

          return (
            <img 
              key={idx} 
              src={optimizeImageUrl(imgSrc, 800)} 
              srcSet={getCloudinarySrcSet(imgSrc)}
              sizes="(max-width: 600px) 92vw, (max-width: 960px) 46vw, 360px"
              alt={`${model.name} - Anteojos en Óptica Gisela Santa Fe - Vista ${idx + 1}`} 
              loading={isImgPriority ? "eager" : "lazy"} 
              decoding="async"
              fetchPriority={isImgPriority ? "high" : "low"}
              onLoad={() => handleImageLoaded(idx)}
              style={{ 
                position: 'absolute', inset: 0, width: '100%', height: '100%', 
                objectFit: 'cover', objectPosition: 'center', display: 'block', 
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out, transform 0.45s ease', 
                transform: hovered && isVisible ? 'scale(1.05)' : 'scale(1)',
                zIndex: isVisible ? 2 : 1,
                pointerEvents: 'none'
              }} 
            />
          );
        })}
        
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
              onClick={(e) => { 
                e.stopPropagation(); 
                setRenderedIndices(new Set(model.images.map((_, i) => i)));
                setCurrentIndex(idx); 
              }}
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
});

const extraImages = [
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791576087/2_w8gmaa.jpg',
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791576089/3_tv9h19.jpg',
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791576076/5_m9mvl5.jpg',
  'https://res.cloudinary.com/dkc39tw6r/image/upload/v1791576077/6_otcq5m.jpg'
];

const ExtraGalleryCard = React.memo(function ExtraGalleryCard({ images }) {
  const cardRef = useRef(null);
  const isNearViewport = useNearViewport(cardRef, '350px 0px');
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [renderedIndices, setRenderedIndices] = useState(() => new Set([0]));
  const [loadedMap, setLoadedMap] = useState({});

  const handleImageLoaded = (idx) => {
    setLoadedMap(prev => (prev[idx] ? prev : { ...prev, [idx]: true }));
  };

  useEffect(() => {
    if (hovered || currentIndex !== 0) {
      setRenderedIndices(prev => {
        if (prev.size === images.length) return prev;
        return new Set(images.map((_, i) => i));
      });
    }
  }, [hovered, currentIndex, images.length]);

  useEffect(() => {
    if (!isNearViewport) return;
    const loadRemaining = () => {
      setRenderedIndices(new Set(images.map((_, i) => i)));
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(loadRemaining, { timeout: 2500 });
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(loadRemaining, 1500);
      return () => clearTimeout(timer);
    }
  }, [isNearViewport, images.length]);

  const nextImage = (e) => {
    e.stopPropagation();
    setRenderedIndices(new Set(images.map((_, i) => i)));
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setRenderedIndices(new Set(images.map((_, i) => i)));
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      ref={cardRef}
      className="extra-gallery-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#181F25', borderRadius: '18px', overflow: 'hidden',
        border: `1.5px solid ${ACCENT}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 50px rgba(232,112,8,0.18), 0 0 0 1px rgba(232,112,8,0.4)` : '0 4px 20px rgba(0,0,0,0.35)',
        position: 'relative', display: 'flex', flexDirection: 'column', height: '600px', width: '100%', maxWidth: '900px', margin: '0 auto',
        contain: 'layout paint'
      }}
    >
      <div className="extra-gallery-wrapper" style={{ height: '100%', width: '100%', flexShrink: 0, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Shimmer Placeholder */}
        <div 
          className="catalog-placeholder-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #181F25 0%, #20272F 50%, #181F25 100%)',
            backgroundSize: '200% 100%',
            animation: 'placeholderShimmer 1.8s infinite ease-in-out',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: loadedMap[currentIndex] ? 0 : 1,
            transition: 'opacity 0.4s ease'
          }}
        />

        {/* Invisible image to naturally dictate the aspect ratio on mobile without forcing a fixed square */}
        <img src={optimizeImageUrl(images[0], 800)} alt="" style={{ width: '100%', height: 'auto', visibility: 'hidden', display: 'block' }} className="extra-gallery-dummy" />

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

        {isNearViewport && images.map((imgSrc, idx) => {
          if (!renderedIndices.has(idx)) return null;
          const isVisible = idx === currentIndex;
          return (
            <img 
              key={idx} 
              className="extra-gallery-image"
              src={optimizeImageUrl(imgSrc, 1000)} 
              srcSet={getCloudinarySrcSet(imgSrc)}
              sizes="(max-width: 768px) 94vw, 900px"
              alt={`Más modelos y accesorios de anteojos - Óptica Gisela Santa Fe - Vista ${idx + 1}`} 
              loading="lazy" 
              decoding="async"
              fetchPriority="low"
              onLoad={() => handleImageLoaded(idx)}
              style={{ 
                position: 'absolute', inset: 0, width: '100%', height: '100%', 
                objectFit: 'cover', objectPosition: 'center', display: 'block', 
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.4s ease-in-out', 
                zIndex: isVisible ? 2 : 1,
                pointerEvents: 'none'
              }} 
            />
          );
        })}
        
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
              onClick={(e) => { 
                e.stopPropagation(); 
                setRenderedIndices(new Set(images.map((_, i) => i)));
                setCurrentIndex(idx); 
              }}
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
});

export default function MenuDestacado() {
  const [isFullCatalogOpen, setIsFullCatalogOpen] = useState(false);

  const handleOpenCatalog = () => {
    setIsFullCatalogOpen(!isFullCatalogOpen);
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

        {/* 6 Original highlighted items with priority loading for the first 3 */}
        <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.6rem', margin: '3.5rem 0 3rem' }}>
          {originalDishes.map((dish, index) => (
            dish.images ? (
              <CatalogModelCard key={dish.id} model={dish} isPriority={index < 3} />
            ) : (
              <OriginalDishCard key={dish.id} dish={dish} isPriority={index < 3} />
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
                  <CatalogModelCard model={model} isPriority={false} />
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
            style={{ padding: '0.9rem 2.8rem', fontSize: '0.85rem', letterSpacing: '0.12em', cursor: 'pointer' }}>
            {isFullCatalogOpen ? 'OCULTAR CATÁLOGO COMPLETO' : 'VER CATÁLOGO COMPLETO'}
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
        .catalog-model-card { contain: layout paint; }
        .catalog-image-container { contain: strict; }
        .extra-gallery-dummy { display: none !important; }
        @media (max-width: 768px) {
          .extra-gallery-card { 
            height: auto !important;
            aspect-ratio: auto !important;
            max-height: none !important;
            width: 100% !important;
            background: #0F1316 !important;
          }
          .extra-gallery-wrapper {
            height: auto !important;
          }
          .extra-gallery-dummy {
            display: block !important;
          }
          .extra-gallery-image { object-fit: contain !important; }
        }
        @keyframes placeholderShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
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
