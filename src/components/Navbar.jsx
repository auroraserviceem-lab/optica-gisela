import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const ACCENT = '#E87008';
const ACCENT_HOVER = '#D06000';

const navLinks = [
  { label: 'QUIÉNES SOMOS', href: '#historia' },
  { label: 'CATÁLOGO', href: '#menu' },
  { label: 'EXPERIENCIA', href: '#experiencia' },
  { label: 'OPINIONES', href: '#reviews' },
];

export default function Navbar({ onReserve }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll with offset for fixed navbar
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="navbar"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(18,22,26,0.97)' : '#12161A',
        borderBottom: `1px solid rgba(255,255,255,0.12)`,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'box-shadow 0.3s ease, background 0.3s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.7)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '100%', margin: '0 auto',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
      }}>
        {/* LEFT: Logo + INICIO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <a href="#hero" onClick={e => handleNavClick(e, '#hero')}
             style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
             aria-label="Óptica Gisela - Inicio">
            <img
              src="https://res.cloudinary.com/dkc39tw6r/image/upload/f_auto,q_auto/v1789432276/715455875_18414692269197629_5872524684382421791_n_u1sti6.jpg"
              alt="Óptica Gisela Logo"
              decoding="async"
              style={{ height: '52px', width: '52px', borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${ACCENT}` }}
            />
          </a>
          <a href="#hero" onClick={e => handleNavClick(e, '#hero')}
             className="gold-pill-btn"
             style={{ fontSize: '0.75rem', padding: '0.42rem 1.1rem', letterSpacing: '0.1em' }}>
            INICIO
          </a>
        </div>

        {/* CENTER: Nav links (desktop) */}
        <div className="nav-links-desktop"
             style={{ display: 'flex', gap: '2.2rem', alignItems: 'center' }}>
          {navLinks.map(link => (
            <NavLink key={link.label} link={link} onClick={handleNavClick} />
          ))}
        </div>

        {/* RIGHT: CONSULTAR + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#contacto" onClick={e => handleNavClick(e, '#contacto')}
             className="gold-pill-btn"
             style={{ fontSize: '0.75rem', padding: '0.42rem 1.1rem', letterSpacing: '0.1em', textDecoration: 'none' }}
             id="navbar-reservar">
            CONTÁCTANOS
          </a>
          <button
             id="mobile-menu-toggle"
             className="hamburger-btn"
             onClick={() => setMenuOpen(o => !o)}
             aria-label="Abrir menú"
             style={{
               display: 'none', background: 'none', border: 'none',
               color: ACCENT, cursor: 'pointer', padding: '4px',
               transition: 'transform 0.2s ease',
             }}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="mobile-menu"
           style={{
             backgroundColor: '#0F1316',
             borderTop: `1px solid rgba(255,255,255,0.12)`,
             borderBottom: menuOpen ? `2px solid ${ACCENT}` : 'none',
             boxShadow: menuOpen ? '0 16px 36px rgba(0,0,0,0.85)' : 'none',
             padding: menuOpen ? '1.2rem 1.5rem 1.5rem' : '0 1.5rem',
             display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
             overflow: 'hidden',
             maxHeight: menuOpen ? '420px' : '0',
             transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), padding 0.35s ease',
           }}>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href}
             className="mobile-nav-link gold-pill-btn"
             onClick={e => handleNavClick(e, link.href)}
             style={{
               backgroundColor: ACCENT,
               color: '#ffffff',
               textDecoration: 'none',
               fontFamily: "'Inter', sans-serif",
               fontSize: '0.82rem',
               fontWeight: 700,
               letterSpacing: '0.1em',
               textTransform: 'uppercase',
               padding: '0.7rem 1.4rem',
               width: '100%',
               maxWidth: '300px',
               textAlign: 'center',
               borderRadius: '9999px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               transition: 'background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease',
             }}
             onMouseEnter={e => {
               e.currentTarget.style.backgroundColor = ACCENT_HOVER;
               e.currentTarget.style.transform = 'translateY(-1px)';
               e.currentTarget.style.boxShadow = '0 6px 20px rgba(232,112,8,0.4)';
             }}
             onMouseLeave={e => {
               e.currentTarget.style.backgroundColor = ACCENT;
               e.currentTarget.style.transform = 'translateY(0)';
               e.currentTarget.style.boxShadow = 'none';
             }}>
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 840px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .mobile-menu { display: flex !important; }
        }
        @media (min-width: 841px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

function NavLink({ link, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={link.href}
      onClick={e => onClick(e, link.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? ACCENT : '#ffffff',
        textDecoration: 'none',
        fontSize: '0.78rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        position: 'relative',
        paddingBottom: '6px',
        transition: 'color 0.2s ease',
      }}
    >
      {link.label}
      <span style={{
        position: 'absolute', bottom: 0, left: '50%',
        transform: `translateX(-50%) scale(${hovered ? 1.3 : 1})`,
        width: '5px', height: '5px',
        background: ACCENT, borderRadius: '50%',
        display: 'block',
        boxShadow: `0 0 6px 1px rgba(232,112,8,0.6)`,
        transition: 'transform 0.25s ease',
      }} />
    </a>
  );
}
