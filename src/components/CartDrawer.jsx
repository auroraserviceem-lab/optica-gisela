// src/components/CartDrawer.jsx
import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartCount,
    setIsCheckoutOpen,
    clearCart,
  } = useStore();

  React.useEffect(() => {
    if (isCartOpen) {
      const origOverflow = document.body.style.overflow;
      const origHtmlOverflow = document.documentElement.style.overflow;
      const origTouch = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = origOverflow || '';
        document.documentElement.style.overflow = origHtmlOverflow || '';
        document.body.style.touchAction = origTouch || '';
      };
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3500,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCartOpen(false);
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: '#000000',
          borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.9)',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.4rem 1.6rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3
                className="font-serif"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.04em',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                Tu Carrito
              </h3>
              <p style={{ margin: 0, fontSize: '0.72rem', color: '#9CA3AF' }}>
                {cartCount} {cartCount === 1 ? 'artículo seleccionado' : 'artículos seleccionados'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar Carrito"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9CA3AF',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#9CA3AF';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping / Promo Ribbon */}
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(255, 255, 255,0.08), rgba(255, 255, 255,0.18), rgba(255, 255, 255,0.08))',
            padding: '0.6rem 1.2rem',
            borderBottom: '1px solid rgba(255, 255, 255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.74rem',
            color: 'var(--vadano-primary)',
            fontWeight: 600,
          }}
        >
          <Tag size={13} color="var(--vadano-primary)" />
          <span>Retiro gratis en San Jorge • 3 Cuotas sin interés • 20% OFF Transferencia o Débito</span>
        </div>

        {/* Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem 1rem',
                color: '#9CA3AF',
              }}
            >
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px dashed var(--vadano-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.2rem',
                  color: 'var(--vadano-primary)',
                }}
              >
                <ShoppingBag size={30} />
              </div>
              <h4
                className="font-serif"
                style={{
                  color: '#FFFFFF',
                  fontSize: '1.3rem',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                }}
              >
                El carrito está vacío
              </h4>
              <p style={{ fontSize: '0.84rem', lineHeight: 1.6, maxWidth: '280px', marginBottom: '1.8rem' }}>
                Descubrí nuestra exclusiva colección de calzado femenino y sumá tus modelos favoritos.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById('menu');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="gold-pill-btn"
                style={{ padding: '0.7rem 1.8rem', fontSize: '0.8rem' }}
              >
                EXPLORAR CATÁLOGO
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
              >
                {/* Photo */}
                <div
                  style={{
                    width: '80px',
                    height: '96px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#111',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                {/* Info */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4
                        className="font-serif"
                        style={{
                          fontSize: '0.95rem',
                          color: '#FFFFFF',
                          margin: '0 0 0.2rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          paddingRight: '1rem',
                        }}
                      >
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        aria-label="Quitar producto"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#6B7280',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          color: '#A1A1AA',
                          background: 'rgba(255, 255, 255, 0.08)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                        }}
                      >
                        Talle: {item.selectedSize || 'Único'}
                      </span>
                      {item.selectedColor && (
                        <span
                          style={{
                            fontSize: '0.65rem',
                            color: 'var(--vadano-primary)',
                            background: 'rgba(255, 255, 255, 0.12)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                          }}
                        >
                          Color: {item.selectedColor}
                        </span>
                      )}
                      {item.tag && (
                        <span
                          style={{
                            fontSize: '0.62rem',
                            color: '#FFFFFF',
                            background: 'rgba(255, 255, 255, 0.15)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontWeight: 600,
                          }}
                        >
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span style={{ fontSize: '0.78rem', color: '#6B7280', textDecoration: 'line-through' }}>
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '0.6rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: 'rgba(0,0,0,0.6)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                      }}
                    >
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#FFFFFF',
                          padding: '4px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Minus size={13} />
                      </button>
                      <span
                        style={{
                          padding: '0 8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          minWidth: '24px',
                          textAlign: 'center',
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: item.quantity >= item.maxStock ? '#4B5563' : '#FFFFFF',
                          padding: '4px 8px',
                          cursor: item.quantity >= item.maxStock ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Totals and Checkout CTA */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.4rem 1.6rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(10, 10, 10, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Subtotal line */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#9CA3AF', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Subtotal
              </span>
              <span
                className="font-serif"
                style={{ color: '#FFFFFF', fontSize: '1.4rem', fontWeight: 700 }}
              >
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '0.72rem', color: '#6B7280', textAlign: 'center' }}>
              Los costos de envío y descuentos se calculan en el siguiente paso.
            </p>

            {/* Buttons */}
            <button
              onClick={handleProceedToCheckout}
              className="gold-pill-btn"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: '0 8px 24px rgba(255,255,255,0.2)',
              }}
            >
              <span>INICIAR COMPRA</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={clearCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6B7280',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  padding: '4px 0',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
              >
                Vaciar carrito
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#9CA3AF', fontSize: '0.72rem' }}>
                <ShieldCheck size={14} color="#FFFFFF" />
                <span>Compra 100% Segura</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
