// src/components/UI.jsx
import React from 'react';
import { X, MapPin, Phone, CheckCircle2, AlertCircle, Info, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

/* ── Toast Notifications ── */
export function ToastNotificationContainer() {
  const { toasts, removeToast } = useStore();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="toast-container"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 5000,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        maxWidth: '380px',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(0, 0, 0, 0.95)',
            border: `1px solid ${
              toast.type === 'error'
                ? '#EF4444'
                : toast.type === 'info'
                ? '#3B82F6'
                : 'rgba(255, 255, 255, 0.3)'
            }`,
            borderRadius: '12px',
            padding: '0.8rem 1rem',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.8)',
            animation: 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {toast.type === 'error' ? (
            <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
          ) : toast.type === 'info' ? (
            <Info size={18} color="#60A5FA" style={{ flexShrink: 0 }} />
          ) : (
            <CheckCircle2 size={18} color="#FFFFFF" style={{ flexShrink: 0 }} />
          )}

          <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 500, lineHeight: 1.4, flex: 1 }}>
            {toast.message}
          </p>

          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: '#9CA3AF',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @media (max-width: 840px) {
          .toast-container {
            bottom: 74px !important;
            left: 1rem !important;
            right: 1rem !important;
            max-width: calc(100% - 2rem) !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Floating WhatsApp Button ── */
export function FloatingWhatsApp() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <>
      <a
        href="https://wa.me/5493844419650"
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp"
        className="floating-whatsapp-btn"
        aria-label="Contactar por WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 900,
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: hovered ? '#1ebe5d' : '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered
            ? '0 8px 30px rgba(37,211,102,0.6), 0 0 0 6px rgba(37,211,102,0.12)'
            : '0 4px 20px rgba(37,211,102,0.4)',
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          textDecoration: 'none',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
      <style>{`
        @media (max-width: 840px) {
          .floating-whatsapp-btn {
            bottom: 74px !important;
            right: 1rem !important;
            width: 48px !important;
            height: 48px !important;
          }
          .floating-whatsapp-btn svg {
            width: 24px !important;
            height: 24px !important;
          }
        }
      `}</style>
    </>
  );
}

/* ── Contact Modal ── */
export function ReservationModal({ open, onClose }) {
  if (!open) return null;

  const contactLinks = [
    {
      id: 'modal-instagram',
      icon: <InstagramIcon />,
      label: 'Instagram',
      sub: '@opticaribes.bandera',
      href: 'https://www.instagram.com/opticaribes.bandera/',
      bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    },
    {
      id: 'modal-whatsapp',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      label: 'WhatsApp',
      sub: '0384 441 9650',
      href: 'https://wa.me/5493844419650',
      bg: '#25D366',
    },
    {
      id: 'modal-phone',
      icon: <Phone size={22} color="var(--vadano-primary)" />,
      label: 'Teléfono',
      sub: '0384 441 9650',
      href: 'tel:+5493844419650',
      bg: '#141414',
    },
    {
      id: 'modal-address',
      icon: <MapPin size={22} color="var(--vadano-primary)" />,
      label: 'Dirección',
      sub: 'Bandera, Santiago del Estero',
      href: 'https://maps.app.goo.gl/ndEffysk9VTZ4E9N9',
      bg: '#141414',
    },
  ];

  return (
    <div
      id="reservation-modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div id="reservation-modal" style={{
        background: '#000000',
        border: '1px solid var(--vadano-primary)',
        borderRadius: '20px',
        padding: '2.5rem',
        width: '100%', maxWidth: '440px',
        position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 25px rgba(255, 255, 255, 0.15)',
        animation: 'slideUp 0.3s ease',
      }}>
        {/* Close */}
        <button onClick={onClose} aria-label="Cerrar" style={{
          position: 'absolute', top: '1.2rem', right: '1.2rem',
          background: 'rgba(255,255,255,0.07)', border: 'none',
          borderRadius: '50%', width: '36px', height: '36px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#9ca3af', cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.color = '#FFFFFF'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#9ca3af'; }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👓</div>
          <h3 className="font-serif" style={{
            color: '#FFFFFF', fontSize: '1.6rem',
            fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase', marginBottom: '0.3rem',
          }}>
            Contáctanos
          </h3>
          <p style={{ color: '#9ca3af', fontSize: '0.82rem' }}>
            Estamos para ayudarte. Consultanos sobre nuestros productos, servicios, lentes, cristales y medios de pago.
          </p>
        </div>

        {/* Contact Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {contactLinks.map(item => (
            <a
              key={item.id}
              id={item.id}
              href={item.href}
              target={item.href && item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href && item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={e => {
                if (!item.href || item.href === '#contacto') e.preventDefault();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.9rem 1.2rem',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217, 61, 98, 0.12)'; e.currentTarget.style.borderColor = 'var(--vadano-primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: '42px', height: '42px',
                borderRadius: '10px',
                background: item.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{ color: '#9ca3af', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>
                  {item.label}
                </p>
                <p style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 500 }}>
                  {item.sub}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
