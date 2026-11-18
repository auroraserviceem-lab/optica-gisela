import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingBag, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function WhatsAppIcon({ size = 17, color = '#FFFFFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function ProductDetailModal({
  selectedDish,
  onClose,
  modalMode = 'detail',
}) {
  const { addToCart, startDirectCheckout, config } = useStore();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const dialogRef = useRef(null);

  // Lock background body & html scroll when product details modal is open
  useEffect(() => {
    if (selectedDish) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalBodyOverflow || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
        document.body.style.touchAction = originalBodyTouchAction || '';
      };
    }
  }, [selectedDish]);

  useEffect(() => {
    if (selectedDish) {
      if (selectedDish.sizes && selectedDish.sizes.length > 0) {
        setSelectedSize(selectedDish.sizes[0]);
      } else {
        setSelectedSize('37');
      }
      const availableColors = selectedDish.colors && selectedDish.colors.length > 0
        ? selectedDish.colors
        : ['Negro', 'Blanco', 'Suela'];
      setSelectedColor(availableColors[0]);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedDish, onClose]);

  if (!selectedDish) return null;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
  };

  const handleWhatsAppInquiry = (dish) => {
    const phone = '5493844419650';
    const text = `*¡Hola Óptica Ribes Bandera!* Quiero consultar disponibilidad de *${dish.name}* (Precio: ${formatPrice(dish.price)}) en talle ${selectedSize || 'U'}${selectedColor ? ` y color ${selectedColor}` : ''}. ¿Tienen stock en el local?`;
    if (!phone) return;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const modalContent = (
    <div
      className="product-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 9999,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.2rem',
        animation: 'fadeIn 0.2s ease',
        overscrollBehavior: 'contain',
        touchAction: 'none',
      }}
      onClick={onClose}
      onWheel={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      {/* Modal Relative Wrapper for Floating Close Button */}
      <div
        className="product-modal-wrapper"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: modalMode === 'quick_add' ? '460px' : '520px',
          maxHeight: 'calc(100dvh - 24px)',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3501,
        }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Pinned / Floating Close Button - Always visible without scrolling */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          title="Cerrar (Esc)"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 3600,
            background: 'rgba(0, 0, 0, 0.85)',
            border: '1.5px solid var(--vadano-primary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.3)',
            transition: 'all 0.25s ease',
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--vadano-primary)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1.08) rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          <X size={19} />
        </button>

        {/* Scrollable Dialog Body */}
        <div
          ref={dialogRef}
          onScroll={(e) => {
            setShowScrollTop(e.currentTarget.scrollTop > 120);
          }}
          onWheel={(e) => e.stopPropagation()}
          className="product-modal-dialog"
          style={{
            background: '#000000',
            border: `1px solid rgba(255, 255, 255, 0.4)`,
            borderRadius: '20px',
            overflow: 'hidden',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            width: '100%',
            maxWidth: modalMode === 'quick_add' ? '460px' : '520px',
            maxHeight: 'calc(100dvh - 24px)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideUp 0.3s ease',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.2)',
          }}
        >
          {modalMode === 'quick_add' ? (
            /* ─── QUICK ADD MODE (Fast, compact, size selection + confirm) ─── */
            <div className="product-modal-body" style={{ padding: '1.6rem 1.8rem 1.8rem' }}>
              {/* Product Summary Header with Small Image */}
              <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'center', marginBottom: '1.4rem', paddingRight: '2rem' }}>
                <img
                  src={selectedDish.img}
                  alt={selectedDish.name}
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--vadano-primary)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {selectedDish.tag || selectedDish.category}
                  </span>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: '1.15rem',
                      color: '#ffffff',
                      margin: '0 0 0.3rem',
                      textTransform: 'uppercase',
                      lineHeight: 1.2,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {selectedDish.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--vadano-primary)' }}>
                      {formatPrice(selectedDish.price)}
                    </span>
                    {selectedDish.originalPrice > selectedDish.price && (
                      <span style={{ fontSize: '0.8rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        {formatPrice(selectedDish.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Sizes Selector */}
              {selectedDish.sizes && selectedDish.sizes.length > 0 && (
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.45rem' }}>
                    Seleccionar Número / Talle:
                  </label>
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    {selectedDish.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        style={{
                          padding: '0.45rem 0.95rem',
                          borderRadius: '8px',
                          background: selectedSize === s ? 'var(--vadano-primary)' : 'rgba(255,255,255,0.06)',
                          color: '#FFFFFF',
                          border: `1px solid ${selectedSize === s ? 'var(--vadano-primary)' : 'rgba(255, 255, 255, 0.3)'}`,
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors Selector */}
              {((selectedDish.colors && selectedDish.colors.length > 0) ? selectedDish.colors : ['Negro', 'Blanco', 'Suela']).length > 0 && (
                <div style={{ marginBottom: '1.6rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.45rem' }}>
                    Seleccionar Color:
                  </label>
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    {((selectedDish.colors && selectedDish.colors.length > 0) ? selectedDish.colors : ['Negro', 'Blanco', 'Suela']).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        style={{
                          padding: '0.45rem 0.95rem',
                          borderRadius: '8px',
                          background: selectedColor === c ? 'var(--vadano-primary)' : 'rgba(255,255,255,0.06)',
                          color: '#FFFFFF',
                          border: `1px solid ${selectedColor === c ? 'var(--vadano-primary)' : 'rgba(255, 255, 255, 0.3)'}`,
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fast Confirm Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                disabled={Number(selectedDish.stock) <= 0}
                className="gold-pill-btn"
                style={{
                  width: '100%',
                  padding: '0.9rem 1.4rem',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  opacity: Number(selectedDish.stock) <= 0 ? 0.5 : 1,
                }}
              >
                <ShoppingBag size={17} />
                <span>AGREGAR AL CARRITO</span>
              </button>
            </div>
          ) : (
            /* ─── DETAIL MODE (Full image, extended description, buy & whatsapp options) ─── */
            <>
              {/* Edge-to-edge 100% width proportional image */}
              <div
                style={{
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#000000',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  flexShrink: 0,
                }}
              >
                <img
                  src={selectedDish.img}
                  alt={selectedDish.name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1 / 1',
                    objectFit: 'contain',
                    display: 'block',
                    background: '#000000',
                  }}
                />
              </div>

              <div className="product-modal-body" style={{ padding: '1.5rem 1.6rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.8rem',
                  }}
                >
                  <div>
                    <h3 className="font-serif" style={{ fontSize: '1.45rem', color: '#fff', margin: '0 0 0.3rem', textTransform: 'uppercase', lineHeight: 1.2 }}>
                      {selectedDish.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--vadano-primary)',
                          background: `rgba(255, 255, 255, 0.15)`,
                          borderRadius: '6px',
                          padding: '3px 8px',
                          border: `1px solid var(--vadano-primary)`,
                        }}
                      >
                        {selectedDish.tag || selectedDish.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: Number(selectedDish.stock) > 0 ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                        {Number(selectedDish.stock) > 0 ? `Stock disponible (${selectedDish.stock} u.)` : 'Sin stock disponible'}
                      </span>
                    </div>
                  </div>

                  {/* Big Price */}
                  <div style={{ textAlign: 'right' }}>
                    <p className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--vadano-primary)', margin: 0 }}>
                      {formatPrice(selectedDish.price)}
                    </p>
                    {selectedDish.originalPrice > selectedDish.price && (
                      <span style={{ fontSize: '0.85rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        {formatPrice(selectedDish.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sizes selector */}
                {selectedDish.sizes && selectedDish.sizes.length > 0 && (
                  <div style={{ marginBottom: '1.1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      Seleccionar Número / Talle:
                    </label>
                    <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                      {selectedDish.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedSize(s);
                          }}
                          style={{
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            background: selectedSize === s ? 'var(--vadano-primary)' : 'rgba(255,255,255,0.06)',
                            color: '#FFFFFF',
                            border: `1px solid ${selectedSize === s ? 'var(--vadano-primary)' : 'rgba(255, 255, 255, 0.3)'}`,
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors Selector */}
                {((selectedDish.colors && selectedDish.colors.length > 0) ? selectedDish.colors : ['Negro', 'Blanco', 'Suela']).length > 0 && (
                  <div style={{ marginBottom: '1.3rem' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                      Seleccionar Color:
                    </label>
                    <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                      {((selectedDish.colors && selectedDish.colors.length > 0) ? selectedDish.colors : ['Negro', 'Blanco', 'Suela']).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedColor(c);
                          }}
                          style={{
                            padding: '0.4rem 0.85rem',
                            borderRadius: '8px',
                            background: selectedColor === c ? 'var(--vadano-primary)' : 'rgba(255,255,255,0.06)',
                            color: '#FFFFFF',
                            border: `1px solid ${selectedColor === c ? 'var(--vadano-primary)' : 'rgba(255, 255, 255, 0.3)'}`,
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <p style={{ color: '#e5e7eb', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {selectedDish.description}
                </p>

                {/* Action buttons inside Modal */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.8rem',
                    flexWrap: 'wrap',
                    borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                    paddingTop: '1.5rem',
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(selectedDish, 1, selectedSize, selectedColor);
                      onClose();
                    }}
                    disabled={Number(selectedDish.stock) <= 0}
                    className="gold-pill-btn"
                    style={{
                      flex: 1.2,
                      padding: '0.85rem 1.4rem',
                      fontSize: '0.82rem',
                      opacity: Number(selectedDish.stock) <= 0 ? 0.5 : 1,
                    }}
                  >
                    <ShoppingBag size={16} />
                    <span>AGREGAR AL CARRITO</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      startDirectCheckout(selectedDish, selectedSize, selectedColor);
                      onClose();
                    }}
                    disabled={Number(selectedDish.stock) <= 0}
                    style={{
                      flex: 1,
                      padding: '0.85rem 1.2rem',
                      background: '#009EE3',
                      border: 'none',
                      borderRadius: '50px',
                      color: '#FFFFFF',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      cursor: Number(selectedDish.stock) <= 0 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      opacity: Number(selectedDish.stock) <= 0 ? 0.5 : 1,
                    }}
                  >
                    <span>COMPRAR AHORA</span>
                    <ArrowRight size={16} />
                  </button>

                  {/* WhatsApp button */}
                  <button
                    onClick={() => handleWhatsAppInquiry(selectedDish)}
                    style={{
                      flex: 1,
                      padding: '0.85rem 1.2rem',
                      background: '#25D366',
                      border: 'none',
                      borderRadius: '50px',
                      color: '#FFFFFF',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    <WhatsAppIcon size={17} color="#FFFFFF" />
                    <span>WHATSAPP</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Floating Desktop Navigation Controls (Subir y Bajar) */}
        <div
          className="modal-scroll-nav-controls"
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '-56px',
            zIndex: 3400,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {/* Scroll Up Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dialogRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="Volver arriba"
            title="Volver arriba"
            style={{
              background: 'rgba(0, 0, 0, 0.88)',
              border: '1.5px solid var(--vadano-primary)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.3)',
              transition: 'all 0.2s ease',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--vadano-primary)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.88)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <ChevronUp size={18} />
          </button>

          {/* Scroll Down Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (dialogRef.current) {
                dialogRef.current.scrollTo({ top: dialogRef.current.scrollHeight, behavior: 'smooth' });
              }
            }}
            aria-label="Desplazarse hacia abajo"
            title="Desplazarse hacia abajo"
            style={{
              background: 'rgba(0, 0, 0, 0.88)',
              border: '1.5px solid var(--vadano-primary)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 18px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.3)',
              transition: 'all 0.2s ease',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--vadano-primary)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(2px) scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.88)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .product-modal-backdrop {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          overscroll-behavior: contain !important;
          overscroll-behavior-y: contain !important;
          -webkit-overflow-scrolling: touch !important;
        }
        .product-modal-wrapper {
          margin: auto !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .product-modal-dialog {
          margin: 0 auto !important;
          overscroll-behavior: contain !important;
          overscroll-behavior-y: contain !important;
          -webkit-overflow-scrolling: touch !important;
          touch-action: pan-y !important;
        }
        @media (max-width: 767px) {
          .product-modal-backdrop {
            padding: 0.75rem 0.5rem !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .product-modal-wrapper {
            margin: auto !important;
            width: 100% !important;
            max-width: 480px !important;
            max-height: calc(100dvh - 16px) !important;
          }
          .product-modal-dialog {
            width: 100% !important;
            max-height: calc(100dvh - 16px) !important;
            border-radius: 16px !important;
          }
          .product-modal-body {
            padding: 1.2rem 1.1rem 2.2rem !important;
          }
          .modal-scroll-nav-controls {
            display: none !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
