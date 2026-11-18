// src/components/MenuDestacado.jsx
import React, { useState } from 'react';
import { ShoppingBag, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductDetailModal from './ProductDetailModal';


const ACCENT = 'var(--vadano-primary)';
const ACCENT2 = 'var(--vadano-secondary)';

function DishCard({ dish, onOpenModal, onAddToCart, onBuyNow }) {
  const [hovered, setHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isOutOfStock = Number(dish.stock) <= 0;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    onOpenModal(dish, 'quick_add');
  };

  return (
    <div
      id={`dish-${dish.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#000000',
        borderRadius: '18px',
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'var(--vadano-primary)' : 'rgba(255, 255, 255, 0.2)'}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 50px rgba(255, 255, 255, 0.2), 0 0 0 1px var(--vadano-primary)`
          : '0 4px 20px rgba(0,0,0,0.35)',
        cursor: 'pointer',
        zIndex: hovered ? 10 : 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* ── Photo ── */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          flexShrink: 0,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#000000',
        }}
      >
        <img
          src={dish.img}
          alt={dish.name}
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            transition: 'transform 0.45s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            filter: isOutOfStock ? 'grayscale(70%) opacity(0.7)' : 'none',
          }}
        />
        {/* Hover shimmer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, rgba(255, 255, 255, 0.12), transparent)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Tag badge or Out of stock badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: isOutOfStock ? 'rgba(239, 68, 68, 0.85)' : 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            borderRadius: '6px',
            padding: '4px 10px',
            color: isOutOfStock ? '#ffffff' : 'var(--vadano-primary)',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            border: isOutOfStock ? '1px solid #EF4444' : '1px solid var(--vadano-primary)',
          }}
        >
          {isOutOfStock ? 'SIN STOCK' : dish.tag || 'COLECCIÓN'}
        </div>

        {/* Category label */}
        {dish.category && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(6px)',
              borderRadius: '6px',
              padding: '4px 8px',
              color: '#D1D5DB',
              fontSize: '0.58rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {dish.category}
          </div>
        )}
      </div>

      {/* ── Text area ── */}
      <div
        style={{
          flex: 1,
          background: '#000000',
          borderTop: `1px solid rgba(255, 255, 255, 0.18)`,
          padding: '1.2rem 1.4rem 1.3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Name */}
        <h3
          className="font-serif"
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.3rem',
            lineHeight: 1.2,
            flexShrink: 0,
          }}
        >
          {dish.name}
        </h3>

        {/* Price display */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem', flexShrink: 0 }}>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--vadano-primary)' }}>
            {formatPrice(dish.price)}
          </span>
          {dish.originalPrice > dish.price && (
            <span style={{ fontSize: '0.8rem', color: '#6B7280', textDecoration: 'line-through' }}>
              {formatPrice(dish.originalPrice)}
            </span>
          )}
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: '32px',
            height: '2px',
            background: `linear-gradient(90deg, var(--vadano-primary), var(--vadano-secondary))`,
            marginBottom: '0.5rem',
            flexShrink: 0,
            borderRadius: '1px',
          }}
        />

        {/* Description */}
        <p
          style={{
            color: '#FFFFFF',
            opacity: 1,
            fontSize: '0.78rem',
            lineHeight: 1.5,
            margin: 0,
            flexGrow: 1,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {dish.description}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            width: '100%',
            marginTop: '0.8rem',
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={handleAdd}
            disabled={isOutOfStock}
            style={{
              flex: 1.4,
              background: isOutOfStock
                ? 'rgba(255,255,255,0.05)'
                : justAdded
                ? '#10B981'
                : 'var(--vadano-primary)',
              border: isOutOfStock ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--vadano-primary)',
              color: isOutOfStock ? '#6B7280' : '#FFFFFF',
              borderRadius: '8px',
              padding: '0.55rem 0.6rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
            }}
            onMouseEnter={(e) => {
              if (!isOutOfStock && !justAdded) {
                e.currentTarget.style.background = 'var(--vadano-primary-hover)';
                e.currentTarget.style.borderColor = 'var(--vadano-primary-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isOutOfStock && !justAdded) {
                e.currentTarget.style.background = 'var(--vadano-primary)';
                e.currentTarget.style.borderColor = 'var(--vadano-primary)';
              }
            }}
          >
            {justAdded ? (
              <>
                <Check size={14} />
                <span>AGREGADO</span>
              </>
            ) : isOutOfStock ? (
              <span>AGOTADO</span>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>COMPRAR</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: '1px solid var(--vadano-secondary)',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '0.55rem 0.6rem',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--vadano-primary)';
              e.currentTarget.style.borderColor = 'var(--vadano-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'var(--vadano-secondary)';
            }}
          >
            VER DETALLES
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MenuDestacado() {
  const {
    filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    startDirectCheckout,
    config,
    setSearchQuery,
  } = useStore();

  const [selectedDish, setSelectedDish] = useState(null);
  const [modalMode, setModalMode] = useState('detail'); // 'detail' | 'quick_add'
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const INITIAL_VISIBLE_COUNT = 4;
  const mainCategories = categories.slice(0, INITIAL_VISIBLE_COUNT);
  const extraCategories = categories.slice(INITIAL_VISIBLE_COUNT);

  const displayedCategories = showAllCategories
    ? categories
    : extraCategories.includes(selectedCategory)
      ? [...mainCategories, selectedCategory]
      : mainCategories;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
  };

  const handleOpenDishModal = (dish, mode = 'detail') => {
    setSelectedDish(dish);
    setModalMode(mode);
    if (dish.sizes && dish.sizes.length > 0) {
      setSelectedSize(dish.sizes[0]);
    } else {
      setSelectedSize('37');
    }
    const availableColors = dish.colors && dish.colors.length > 0 ? dish.colors : ['Negro', 'Blanco', 'Suela'];
    setSelectedColor(availableColors[0]);
  };

  const handleWhatsAppInquiry = (dish) => {
    const phone = '5493844419650';
    const text = `*¡Hola Óptica Ribes Bandera!* Quiero consultar disponibilidad de *${dish.name}* (Precio: ${formatPrice(dish.price)}) en talle ${selectedSize || 'U'}${selectedColor ? ` y color ${selectedColor}` : ''}. ¿Tienen stock en el local?`;
    if (!phone) return;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section
      id="menu"
      style={{
        background: '#000000',
        padding: '7rem 1.5rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p
            style={{
              color: 'var(--vadano-primary)',
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
            }}
          >
            ✦ LO MEJOR DE ÓPTICA RIBES BANDERA ✦
          </p>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.9rem' }}>
            PRODUCTOS DESTACADOS
          </h2>
          <p className="section-subtitle" style={{ color: '#FFFFFF' }}>
            Una selección de armazones y lentes para acompañar tu estilo y cuidar tu visión
          </p>
        </div>

        {/* Category Pills Filter */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.6rem',
            flexWrap: 'wrap',
            margin: '2rem 0 2.5rem',
          }}
        >
          {displayedCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.55rem 1.3rem',
                  borderRadius: '50px',
                  background: isActive ? 'var(--vadano-primary)' : '#000000',
                  color: '#FFFFFF',
                  border: `1px solid ${isActive ? 'var(--vadano-primary)' : 'rgba(255, 255, 255, 0.35)'}`,
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 0 15px var(--vadano-primary-glow)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(217, 61, 98, 0.15)';
                    e.currentTarget.style.borderColor = 'var(--vadano-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#000000';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}

          {categories.length > INITIAL_VISIBLE_COUNT && (
            <button
              onClick={() => setShowAllCategories((prev) => !prev)}
              aria-label={showAllCategories ? 'Ver menos categorías' : 'Ver más categorías'}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '50px',
                background: showAllCategories ? 'rgba(255, 255, 255, 0.15)' : '#000000',
                color: 'var(--vadano-primary)',
                border: '1px solid var(--vadano-primary)',
                fontSize: '0.76rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = showAllCategories ? 'rgba(255, 255, 255, 0.15)' : '#000000';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>{showAllCategories ? 'Ver menos' : '+ Más categorías'}</span>
              {showAllCategories ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          )}
        </div>

        {/* Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <>
            <div
              className="menu-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.6rem',
                margin: '1.5rem 0 2.5rem',
              }}
            >
              {filteredProducts.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  onOpenModal={handleOpenDishModal}
                  onAddToCart={(p) => addToCart(p, 1)}
                  onBuyNow={(p) => startDirectCheckout(p)}
                />
              ))}
            </div>

            {/* Centered CTA button: VER CATÁLOGO COMPLETO */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => {
                  setSelectedCategory('Todos');
                  setSearchQuery('');
                  const el = document.querySelector('#menu');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 68;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="gold-pill-btn"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.65rem 2rem',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                }}
                id="ver-catalogo-completo-btn"
              >
                VER CATÁLOGO COMPLETO
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem 4rem', color: '#9CA3AF' }}>
            <p style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '0.8rem', fontWeight: 600 }}>
              Próximamente nuevos productos en esta categoría
            </p>
            <p style={{ fontSize: '0.85rem', color: '#FFFFFF', opacity: 1, marginBottom: '1.5rem' }}>
              Estamos preparando la nueva colección. Te invitamos a explorar las demás categorías.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className="gold-pill-btn"
              style={{ fontSize: '0.75rem', padding: '0.6rem 1.6rem' }}
            >
              VER TODOS LOS PRODUCTOS
            </button>
          </div>
        )}
      </div>

      {/* Dish / Product Detail Modal */}
      <ProductDetailModal
        selectedDish={selectedDish}
        onClose={() => setSelectedDish(null)}
        modalMode={modalMode}
      />

      <style>{`
        @media (max-width: 960px) {
          .menu-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .menu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
