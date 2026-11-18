import React from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

const ACCENT = '#E87008';

const contactItems = [
  {
    icon: <MapPin size={18} color="#EA4335" />,
    bg: 'rgba(234, 67, 53, 0.15)',
    label: 'Dirección',
    value: 'Av. López y Planes 4638 Oeste, Santa Fe Capital',
  },
  {
    icon: <Phone size={18} color="#25D366" />,
    bg: 'rgba(37, 211, 102, 0.15)',
    label: 'Teléfono',
    value: '4563064 / 342-6487738',
  },
  {
    icon: <Clock size={18} color="#4285F4" />,
    bg: 'rgba(66, 133, 244, 0.15)',
    label: 'Horarios',
    value: 'Lunes a Sábado: 08:30 – 12:30 hs y 16:30 – 19:30 hs',
  },
];

export default function Contacto() {
  return (
    <section id="contacto" style={{ background: '#12161A', padding: '6rem 1.5rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.8rem' }}>
            Contáctanos
          </h2>
          <p className="section-subtitle" style={{ color: '#FFFFFF' }}>
            ¿Tenés ganas de visitarnos? Encontranos en López y Planes 4638, Santa Fe. Vení a descubrir nuestra colección de anteojos y recibí la mejor atención personalizada
          </p>
        </div>

        {/* Two columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}
        className="contact-grid">
          {/* Left: Map */}
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            border: `2px solid rgba(232,112,8,0.3)`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            height: '400px',
          }}>
            <iframe
              id="google-map"
              title="Óptica Gisela — Ubicación"
              src="https://maps.google.com/maps?q=Av.+L%C3%B3pez+y+Planes+4638+Oeste%2C+S3002DNY+Santa+Fe+de+la+Vera+Cruz%2C+Santa+Fe%2C+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', filter: 'grayscale(15%) contrast(1.05)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Right: Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.4rem 1.4rem',
                background: '#181F25',
                borderRadius: '12px',
                border: `1px solid rgba(255,255,255,0.08)`,
                textAlign: 'center',
              }}>
                <div style={{
                  background: item.bg || `rgba(232,112,8,0.15)`,
                  borderRadius: '8px',
                  padding: '0.6rem',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {item.icon}
                </div>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <p style={{
                    color: ACCENT, fontSize: '0.72rem',
                    fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase', marginBottom: '0.3rem',
                    textAlign: 'center',
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    color: '#ffffff', fontSize: '0.9rem',
                    lineHeight: 1.65, whiteSpace: 'pre-line',
                    textAlign: 'center',
                  }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Social Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', alignSelf: 'stretch', alignItems: 'center' }}>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/5493426487738?text=Hola%2C%20quisiera%20hacer%20una%20consulta%20en%20%C3%93ptica%20Gisela"
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-btn"
                style={{
                  padding: '0.9rem 1.8rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  background: '#25D366',
                  color: '#ffffff',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'filter 0.2s ease, transform 0.2s ease',
                  width: '100%',
                  maxWidth: '380px',
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                ESCRIBINOS POR WHATSAPP
              </a>

              {/* Instagram Button */}
              <a
                href="https://www.instagram.com/optica.gisela/"
                target="_blank"
                rel="noopener noreferrer"
                id="instagram-btn"
                style={{
                  padding: '0.9rem 1.8rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  color: '#ffffff',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'filter 0.2s ease, transform 0.2s ease',
                  width: '100%',
                  maxWidth: '380px',
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {/* Instagram SVG icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                SEGUINOS EN INSTAGRAM
              </a>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
