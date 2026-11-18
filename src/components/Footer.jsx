// src/components/Footer.jsx
import React from 'react';

const ACCENT = 'var(--vadano-primary)';

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href || '#contacto'}
      target={href && href !== '#contacto' ? '_blank' : undefined}
      rel={href && href !== '#contacto' ? 'noopener noreferrer' : undefined}
      onClick={(e) => {
        if (!href || href === '#contacto') e.preventDefault();
      }}
      aria-label={label}
      style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        border: `1px solid rgba(255, 255, 255, 0.25)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        textDecoration: 'none',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#FFFFFF';
        e.currentTarget.style.borderColor = '#FFFFFF';
        e.currentTarget.querySelector('svg').style.color = '#000000';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = `rgba(255, 255, 255, 0.25)`;
        e.currentTarget.querySelector('svg').style.color = '#FFFFFF';
      }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: '#000000',
        borderTop: `1px solid rgba(255,255,255,0.15)`,
        padding: '3rem 1.5rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem' }}>
          <img
            src="https://res.cloudinary.com/dkc39tw6r/image/upload/v1794953562/623094690_18072172646621205_5760723134202809334_n_w3ytjj.jpg"
            alt="La Posada Logo"
            decoding="async"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--vadano-primary)',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <p
              className="font-serif"
              style={{
                color: '#FAF4EC',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
                margin: 0,
                textAlign: 'center',
              }}
            >
              LA POSADA
            </p>
            <p
              style={{
                color: 'var(--vadano-secondary)',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                margin: '0.4rem 0 0',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              Hotel de montaña · Av. Eva Duarte 180, Merlo, San Luis
            </p>
          </div>
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <SocialIcon href="https://www.instagram.com/opticaribes.bandera/" label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </SocialIcon>
          <SocialIcon href="https://wa.me/5493844419650" label="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </SocialIcon>
        </div>

        {/* Payment Methods Logos Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            maxWidth: '680px',
          }}
        >
          {/* 1. Visa */}
          <div
            title="Visa"
            style={{
              background: '#FFFFFF',
              borderRadius: '5px',
              padding: '3px 8px',
              height: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              boxSizing: 'border-box',
            }}
          >
            <svg width="34" height="11" viewBox="0 0 100 32" fill="#1434CB">
              <path d="M38.5 2.5L25.3 30.5H16.8L10.3 8.3C9.9 6.8 9.5 6.2 8.3 5.4C6.3 4.2 3 3.1 0 2.5L0.2 1.3H14.5C16.3 1.3 18 2.6 18.4 4.8L21.9 23.3L30.1 2.5H38.5ZM72.6 21.6C72.7 13.4 60.9 12.9 61 9.2C61.1 7.9 62.3 6.6 65 6.2C66.4 6 70.1 5.8 74 7.6L75.5 0.9C73.4 0.2 70.7 0 67.2 0C59 0 53.2 4.4 53.1 10.6C53 15.3 57.2 17.9 60.4 19.5C63.6 21.1 64.7 22.1 64.7 23.6C64.6 25.8 62 26.8 59.5 26.8C55.4 26.8 53 26.1 49.3 24.5L47.7 31.5C49.9 32.5 53.9 33.3 58.1 33.3C66.8 33.3 72.5 29 72.6 21.6ZM93.4 30.5H100L94.3 2.5H88.3C87 2.5 85.9 3.2 85.4 4.4L73 30.5H81.3L83 25.8H92.3L93.4 30.5ZM85.2 19.7L88.9 9.3L91 19.7H85.2ZM51.3 2.5L44.7 30.5H36.9L43.5 2.5H51.3Z" />
            </svg>
          </div>

          {/* 2. Mastercard */}
          <div
            title="Mastercard"
            style={{
              background: '#FFFFFF',
              borderRadius: '5px',
              padding: '3px 8px',
              height: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '28px', height: '17px' }}>
              <div style={{ width: '17px', height: '17px', borderRadius: '50%', background: '#EB001B', position: 'absolute', left: 0 }} />
              <div style={{ width: '17px', height: '17px', borderRadius: '50%', background: '#F79E1B', position: 'absolute', right: 0, opacity: 0.92 }} />
            </div>
          </div>

          {/* 3. American Express */}
          <div
            title="American Express"
            style={{
              background: '#0070CE',
              borderRadius: '5px',
              padding: '2px 6px',
              height: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              boxSizing: 'border-box',
            }}
          >
            <svg width="30" height="15" viewBox="0 0 60 30" fill="none">
              <rect width="60" height="30" rx="3" fill="#0070CE" />
              <path d="M7 23L12 8H17L22 23H17.5L16.2 19H12.8L11.5 23H7ZM13.8 15.5H15.2L14.5 12.5L13.8 15.5Z" fill="#FFFFFF" />
              <path d="M22.5 8H26.5L30 16L33.5 8H37.5V23H34V13.5L30.8 20.5H29.2L26 13.5V23H22.5V8Z" fill="#FFFFFF" />
              <path d="M39 8H48.5V11.5H42.5V13.8H47.5V17H42.5V19.5H48.5V23H39V8Z" fill="#FFFFFF" />
              <path d="M49 8H53L55.5 12.5L58 8H62L58 15.5L62 23H58L55.5 18.5L53 23H49L53 15.5L49 8Z" fill="#FFFFFF" />
            </svg>
          </div>

          {/* 4. Cabal */}
          <div
            title="Cabal"
            style={{
              background: '#005CA9',
              borderRadius: '5px',
              padding: '2px 7px',
              height: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              boxSizing: 'border-box',
            }}
          >
            <svg width="34" height="14" viewBox="0 0 70 28" fill="none">
              <path d="M6 14L14 6L16.5 8.5L11 14L16.5 19.5L14 22L6 14Z" fill="#FFFFFF" />
              <path d="M26 14L18 6L15.5 8.5L21 14L15.5 19.5L18 22L26 14Z" fill="#FFFFFF" />
              <path d="M34 8C30.5 8 28 10.7 28 14.2C28 17.7 30.5 20.4 34 20.4C36.8 20.4 38.8 19 39.5 16.8H36.7C36.2 17.7 35.2 18.2 34 18.2C32.1 18.2 30.8 16.7 30.8 14.2C30.8 11.7 32.1 10.2 34 10.2C35.2 10.2 36.2 10.7 36.7 11.6H39.5C38.8 9.4 36.8 8 34 8Z" fill="#FFFFFF" />
              <path d="M43.5 8.3H40.8L44.8 20.1H47.8L51.8 8.3H49.1L46.3 17.2L43.5 8.3Z" fill="#FFFFFF" />
              <path d="M53 8.3H55.8V17.9H61V20.1H53V8.3Z" fill="#FFFFFF" />
            </svg>
          </div>

          {/* 5. Diners Club */}
          <div
            title="Diners Club"
            style={{
              background: '#FFFFFF',
              borderRadius: '5px',
              padding: '3px 8px',
              height: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              boxSizing: 'border-box',
            }}
          >
            <svg width="26" height="16" viewBox="0 0 40 25" fill="none">
              <rect width="40" height="25" rx="3" fill="#FFFFFF" />
              <circle cx="20" cy="12.5" r="9" stroke="#004B87" strokeWidth="2.5" fill="none" />
              <path d="M20 4V21" stroke="#004B87" strokeWidth="2.5" />
              <path d="M14 8C14 8 16 9.5 16 12.5C16 15.5 14 17 14 17" stroke="#004B87" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M26 8C26 8 24 9.5 24 12.5C24 15.5 26 17 26 17" stroke="#004B87" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* 6. Argencard */}
          <div
            title="Argencard"
            style={{
              background: '#FFFFFF',
              borderRadius: '5px',
              padding: '3px 8px',
              height: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              boxSizing: 'border-box',
            }}
          >
            <svg width="22" height="16" viewBox="0 0 32 24" fill="none">
              <rect x="5" y="4" width="14" height="14" rx="3" transform="rotate(45 12 11)" stroke="#D9252A" strokeWidth="3" fill="none" />
              <path d="M16 7L24 15" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* 7. Naranja X */}
          <div
            title="Naranja X"
            style={{
              background: '#FFFFFF',
              borderRadius: '5px',
              padding: '3px 8px',
              height: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              boxSizing: 'border-box',
            }}
          >
            <svg width="26" height="15" viewBox="0 0 45 25" fill="none">
              <circle cx="12" cy="12.5" r="10" fill="#FF5A00" />
              <path d="M8 8V17M8 8L16 17M16 8V17" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M28 6L38 19M38 6L28 19" stroke="#5B2C6F" strokeWidth="3.2" strokeLinecap="round" />
            </svg>
          </div>

          {/* 8. Mercado Pago */}
          <div
            title="Mercado Pago"
            style={{
              background: '#009EE3',
              borderRadius: '5px',
              padding: '2px 7px',
              height: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              boxSizing: 'border-box',
            }}
          >
            <svg width="22" height="15" viewBox="0 0 100 70" fill="none">
              <path d="M68.5 28.5c-2.8-2.8-7.8-2.8-10.6 0l-16 16-5.3-5.3c-2.8-2.8-7.8-2.8-10.6 0s-2.8 7.8 0 10.6l10.6 10.6c2.8 2.8 7.8 2.8 10.6 0l21.3-21.3c2.9-2.9 2.9-7.8 0-10.6z" fill="#FFFFFF" />
            </svg>
          </div>

          {/* 9. MODO */}
          <div
            title="MODO"
            style={{
              background: '#00D1B2',
              borderRadius: '5px',
              padding: '2px 8px',
              height: '24px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              boxSizing: 'border-box',
            }}
          >
            <svg width="24" height="14" viewBox="0 0 50 28" fill="none">
              <path d="M6 14C6 9.5 9.5 6 14 6C18.5 6 22 9.5 22 14C22 18.5 18.5 22 14 22C9.5 22 6 18.5 6 14ZM28 14C28 9.5 31.5 6 36 6C40.5 6 44 9.5 44 14C44 18.5 40.5 22 36 22C31.5 22 28 18.5 28 14Z" stroke="#FFFFFF" strokeWidth="3" fill="none" />
              <path d="M20 14H30" stroke="#FFFFFF" strokeWidth="3" />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: `rgba(255, 255, 255, 0.2)` }} />

        {/* Footer bottom */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              color: '#9CA3AF',
              fontSize: '0.78rem',
              letterSpacing: '0.05em',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} La Posada — Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
