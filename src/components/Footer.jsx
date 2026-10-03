import React from 'react';

const ACCENT = '#E87008';

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: '38px', height: '38px',
        borderRadius: '50%',
        border: `1px solid rgba(255,255,255,0.2)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: ACCENT,
        textDecoration: 'none',
        transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = ACCENT;
        e.currentTarget.style.borderColor = ACCENT;
        e.currentTarget.style.transform = 'translateY(-2px)';
        const svg = e.currentTarget.querySelector('svg');
        if (svg) svg.style.color = '#ffffff';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = `rgba(255,255,255,0.2)`;
        e.currentTarget.style.transform = 'translateY(0)';
        const svg = e.currentTarget.querySelector('svg');
        if (svg) svg.style.color = ACCENT;
      }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="footer" style={{
      background: '#0F1316',
      borderTop: `1px solid rgba(255,255,255,0.1)`,
      padding: '2.5rem 1.5rem',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}>
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <img
            src="https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789432276/715455875_18414692269197629_5872524684382421791_n_u1sti6.jpg"
            alt="Óptica Gisela Logo"
            loading="lazy"
            decoding="async"
            style={{ height: '48px', width: '48px', borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${ACCENT}` }}
          />
          <div>
            <p className="font-serif" style={{
              color: '#ffffff', fontSize: '1.1rem',
              fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', lineHeight: 1.2,
            }}>
              Óptica Gisela
            </p>
            <p style={{
              color: ACCENT, fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
            }}>
              Salud Visual & Estilo
            </p>
          </div>
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <SocialIcon href="https://www.instagram.com/optica.gisela/" label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
          </SocialIcon>
          <SocialIcon href="https://wa.me/5493426487738" label="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
            </svg>
          </SocialIcon>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: `rgba(255,255,255,0.08)` }} />

        {/* Copyright */}
        <p style={{
          color: '#9CA3AF', fontSize: '0.78rem',
          letterSpacing: '0.05em', textAlign: 'center',
        }}>
          © {new Date().getFullYear()} Óptica Gisela — Todos los derechos reservados.
          <span style={{ color: `rgba(255,255,255,0.15)`, margin: '0 0.5rem' }}>|</span>
          López y Planes 4638, Santa Fe, Argentina
        </p>
      </div>
    </footer>
  );
}
