import React from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const InstagramIcon = ({ size = 18, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.5" fill={color} stroke="none" />
  </svg>
);

export default function Contacto() {
  const { config } = useStore();
  const address = 'Av. Eva Duarte 180, Merlo, San Luis (CP 5881)';
  const mapQuery = 'Av. Eva Duarte 180, Merlo, San Luis';
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const rawPhone = config?.contact?.whatsapp || config?.whatsappNumber || '5493844419650';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : `https://wa.me/`;
  const instagramUrl = config?.contact?.instagram || 'https://www.instagram.com/';

  // Fields with loaded data (unloaded [AGREGAR] items are hidden per user guideline)
  const contactItems = [
    {
      icon: <MapPin size={20} color="var(--vadano-secondary)" />,
      label: 'Dirección',
      value: address,
      href: mapLink,
    },
    {
      icon: <MessageCircle size={20} color="var(--vadano-secondary)" />,
      label: 'Consultas & Reservas',
      value: 'Atención por WhatsApp',
      href: whatsappUrl,
    },
  ];

  return (
    <section id="contacto" style={{ background: '#0A130D', padding: '7rem 1.5rem', color: '#FAF4EC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Title */}
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
            ✦ ESTAMOS A TU DISPOSICIÓN ✦
          </p>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.9rem' }}>
            Contáctanos
          </h2>
          <p className="section-subtitle" style={{ color: '#EEDFCC', maxWidth: '650px', margin: '1.2rem auto 0' }}>
            Comunicate con nosotros para consultar fechas, tarifas y planificar tu escapada a Merlo
          </p>
        </div>

        {/* Two columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'stretch',
          }}
          className="contact-grid"
        >
          {/* Left: Map */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: `2px solid var(--vadano-primary)`,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
              minHeight: '380px',
              height: '100%',
              background: '#101F15',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <iframe
              title="Ubicación de La Posada del Tiempo en Merlo"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '380px', width: '100%' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              id="google-maps-btn"
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(10, 19, 13, 0.92)',
                backdropFilter: 'blur(10px)',
                color: '#FAF4EC',
                border: '1.5px solid var(--vadano-secondary)',
                borderRadius: '50px',
                padding: '0.65rem 1.4rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 20px rgba(0,0,0,0.65)',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--vadano-primary)';
                e.currentTarget.style.borderColor = 'var(--vadano-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10, 19, 13, 0.92)';
                e.currentTarget.style.borderColor = 'var(--vadano-secondary)';
              }}
            >
              <MapPin size={14} color="var(--vadano-secondary)" />
              Abrir en Google Maps
            </a>
          </div>

          {/* Right: Contact info & Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', justifyContent: 'center' }}>
            {contactItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '1.2rem',
                  alignItems: 'center',
                  padding: '1.4rem 1.6rem',
                  background: '#101F15',
                  borderRadius: '18px',
                  border: `1.5px solid rgba(238, 223, 204, 0.15)`,
                }}
              >
                <div
                  style={{
                    background: 'rgba(27, 82, 48, 0.4)',
                    border: '1px solid var(--vadano-primary)',
                    borderRadius: '12px',
                    padding: '0.7rem',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    style={{
                      color: 'var(--vadano-secondary)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#FAF4EC',
                      fontSize: '1rem',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      textDecoration: 'none',
                    }}
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}

            {/* Action Buttons required: "Escribinos por WhatsApp" & "Seguinos en Instagram" */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-btn"
                style={{
                  padding: '1rem 1.8rem',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  background: '#25D366',
                  color: '#ffffff',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'filter 0.2s ease, transform 0.2s ease',
                  boxShadow: '0 8px 25px rgba(37, 211, 102, 0.35)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <MessageCircle size={20} />
                <span>ESCRIBINOS POR WHATSAPP</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="instagram-btn"
                style={{
                  padding: '1rem 1.8rem',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)',
                  color: '#ffffff',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'filter 0.2s ease, transform 0.2s ease',
                  boxShadow: '0 8px 25px rgba(221, 42, 123, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <InstagramIcon size={20} color="#FFFFFF" />
                <span>SEGUINOS EN INSTAGRAM</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
