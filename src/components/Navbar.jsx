// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Search,
  User,
  LogIn,
  UserPlus,
  ShoppingBag,
  Sparkles,
  Bed,
  Camera,
  Phone,
  CreditCard,
  Truck,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const ACCENT = 'var(--vadano-primary)';
const ACCENT_HOVER = 'var(--vadano-primary-hover)';

const navLinks = [
  { label: 'QUIÉNES SOMOS', href: '#historia' },
  { label: 'HABITACIONES', href: '#habitaciones' },
  { label: 'DISPONIBILIDAD', href: '#disponibilidad' },
  { label: 'SERVICIOS', href: '#servicios' },
  { label: 'GALERÍA', href: '#galeria' },
  { label: 'POLÍTICAS', href: '#politicas' },
  { label: 'CÓMO LLEGAR', href: '#comollegar' },
  { label: 'FAQ', href: '#faq' },
  { label: 'CONTACTO', href: '#contacto' },
];

export default function Navbar({ onReserve }) {
  const {
    searchQuery,
    setSearchQuery,
    customerSession,
    setIsCustomerModalOpen,
    setCustomerModalTab,
    logoutCustomer,
  } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body & document scroll when mobile hamburger drawer is open
  useEffect(() => {
    if (menuOpen) {
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
  }, [menuOpen]);

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 840) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Smooth scroll with offset for fixed navbar
  const handleNavClick = (e, href) => {
    if (e && e.preventDefault) e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 68;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(0,0,0,0.97)' : '#000000',
          borderBottom: `1px solid rgba(255,255,255,0.12)`,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'box-shadow 0.3s ease, background 0.3s ease',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.7)' : 'none',
        }}
      >
        <div
          className="navbar-inner-container"
          style={{
            maxWidth: '100%',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px',
          }}
        >
          {/* LEFT: Logo + INICIO */}
          <div className="nav-left-group" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
              aria-label="La Posada - Inicio"
            >
              <img
                className="nav-logo-img"
                src="https://res.cloudinary.com/dkc39tw6r/image/upload/v1794953562/623094690_18072172646621205_5760723134202809334_n_w3ytjj.jpg"
                alt="La Posada Logo"
                style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--vadano-primary)',
                }}
              />
            </a>
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="gold-pill-btn nav-inicio-btn"
              style={{ fontSize: '0.75rem', padding: '0.42rem 1.1rem', letterSpacing: '0.1em' }}
            >
              INICIO
            </a>
          </div>

          {/* CENTER: Nav links (desktop) */}
          <div className="nav-links-desktop" style={{ display: 'flex', gap: '2.2rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <NavLink key={link.label} link={link} onClick={handleNavClick} />
            ))}
          </div>

          {/* RIGHT: User/Admin + RESERVAR (desktop) + Hamburger (mobile) */}
          <div className="nav-right-group" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            
            {/* Customer Account / Mi Cuenta Icon with Dropdown */}
            <div ref={userMenuRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  aria-label="Mi Cuenta de Usuario"
                  title={customerSession ? `Hola, ${customerSession.fullName || 'Usuario'}` : 'Mi Cuenta'}
                  className="nav-circle-btn"
                  style={{
                    width: '38px',
                    height: '38px',
                    background: userMenuOpen ? 'rgba(237, 28, 36, 0.2)' : '#000000',
                    border: '1px solid var(--vadano-primary)',
                    color: 'var(--vadano-primary)',
                    cursor: 'pointer',
                    padding: 0,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(237, 28, 36, 0.2)';
                    e.currentTarget.style.borderColor = 'var(--vadano-primary)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    if (!userMenuOpen) {
                      e.currentTarget.style.background = '#000000';
                      e.currentTarget.style.borderColor = 'var(--vadano-primary)';
                    }
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <User size={18} color="var(--vadano-primary)" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      right: 0,
                      minWidth: '190px',
                      background: '#111111',
                      border: '1px solid rgba(255, 255, 255, 0.35)',
                      borderRadius: '12px',
                      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.85), 0 0 15px rgba(255, 255, 255, 0.15)',
                      padding: '0.4rem 0',
                      zIndex: 1100,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {customerSession ? (
                      <>
                        <div
                          style={{
                            padding: '0.55rem 1rem 0.45rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            marginBottom: '0.2rem',
                          }}
                        >
                          <p style={{ margin: 0, fontSize: '0.7rem', color: '#9CA3AF' }}>Conectada como</p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: 'var(--vadano-primary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {customerSession.fullName || customerSession.email}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            setCustomerModalTab('account');
                            setIsCustomerModalOpen(true);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#FFFFFF',
                            padding: '0.6rem 1rem',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            transition: 'background 0.2s ease, color 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                            e.currentTarget.style.color = 'var(--vadano-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none';
                            e.currentTarget.style.color = '#FFFFFF';
                          }}
                        >
                          Mi cuenta
                        </button>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            setCustomerModalTab('orders');
                            setIsCustomerModalOpen(true);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#FFFFFF',
                            padding: '0.6rem 1rem',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            transition: 'background 0.2s ease, color 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                            e.currentTarget.style.color = 'var(--vadano-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none';
                            e.currentTarget.style.color = '#FFFFFF';
                          }}
                        >
                          Mis pedidos
                        </button>

                        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '0.25rem 0' }} />

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logoutCustomer();
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            padding: '0.6rem 1rem',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            transition: 'background 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                        >
                          Cerrar sesión
                        </button>
                      </>
                    ) : (
                      <div style={{ padding: '0.6rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            setCustomerModalTab('login');
                            setIsCustomerModalOpen(true);
                          }}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#FFFFFF',
                            borderRadius: '50px',
                            padding: '0.55rem 0.9rem',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            textAlign: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            transition: 'all 0.2s ease',
                            letterSpacing: '0.04em',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.borderColor = 'var(--vadano-primary)';
                            e.currentTarget.style.color = 'var(--vadano-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.color = '#FFFFFF';
                          }}
                        >
                          <LogIn size={14} />
                          <span>Iniciar Sesión</span>
                        </button>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            setCustomerModalTab('register');
                            setIsCustomerModalOpen(true);
                          }}
                          style={{
                            background: 'var(--vadano-primary)',
                            border: '1px solid var(--vadano-primary)',
                            color: '#FFFFFF',
                            borderRadius: '50px',
                            padding: '0.55rem 0.9rem',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            transition: 'all 0.2s ease',
                            letterSpacing: '0.04em',
                            boxShadow: '0 2px 10px var(--vadano-primary-glow)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--vadano-primary-hover)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 15px var(--vadano-primary-glow)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--vadano-primary)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 10px var(--vadano-primary-glow)';
                          }}
                        >
                          <UserPlus size={14} />
                          <span>Registrarme</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

            {/* CTA RESERVAR (Desktop only) */}
            <a
              href="#disponibilidad"
              onClick={(e) => handleNavClick(e, '#disponibilidad')}
              className="gold-pill-btn nav-cta-desktop"
              style={{
                fontSize: '0.75rem',
                padding: '0.42rem 1.15rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                fontWeight: 700,
              }}
              id="navbar-reservar-btn"
            >
              RESERVAR
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-menu-toggle"
              className="hamburger-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Cerrar menú secundario" : "Abrir menú secundario"}
              style={{
                display: 'none',
                background: menuOpen ? 'rgba(255, 255, 255, 0.15)' : 'none',
                border: menuOpen ? '1px solid var(--vadano-primary)' : '1px solid transparent',
                borderRadius: '8px',
                color: ACCENT,
                cursor: 'pointer',
                padding: '6px',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease',
              }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE HAMBURGER DRAWER (CENTERED, FULL-HEIGHT, ISOLATED SCROLL) ── */}
        <div
          className={`mobile-menu-drawer ${menuOpen ? 'is-open' : ''}`}
          style={{
            position: 'fixed',
            top: '62px',
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: 'calc(100dvh - 62px)',
            maxHeight: 'calc(100dvh - 62px)',
            background: 'rgba(10, 10, 10, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.9)',
            zIndex: 1300,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            boxSizing: 'border-box',
            padding: '1.2rem 1.2rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.1rem',
            transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
            visibility: menuOpen ? 'visible' : 'hidden',
            pointerEvents: menuOpen ? 'auto' : 'none',
          }}
        >
          {/* Drawer Header with Title and Centered Brand */}
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                color: 'var(--vadano-secondary)',
                textTransform: 'uppercase',
                display: 'block',
              }}
            >
              HOTEL DE MONTAÑA
            </span>
            <h3
              style={{
                margin: '3px 0 0',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#FAF4EC',
                fontFamily: 'Playfair Display, serif',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}
            >
              LA POSADA
            </h3>
          </div>

          {/* 1. Mobile Search Bar (Centered) */}
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#161616',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '50px',
                padding: '0.55rem 1rem',
                gap: '0.6rem',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5)',
              }}
            >
              <Search size={17} color="var(--vadano-primary)" style={{ flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Buscar por modelo, color o taco..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  const el = document.querySelector('#menu');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 68;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  width: '100%',
                  textAlign: 'center',
                  fontFamily: 'inherit',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    flexShrink: 0,
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* 2. Secondary Services & Store Information Cards (Centered) */}
          <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: 'var(--vadano-primary)',
                textTransform: 'uppercase',
                textAlign: 'center',
                padding: '0.2rem 0',
              }}
            >
              Atención & Servicios Exclusivos
            </div>

            {/* Payment Info Card (Centered) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: '#151515',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                gap: '0.45rem',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vadano-primary)',
                }}
              >
                <CreditCard size={20} strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                3 Cuotas Sin Interés
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', lineHeight: 1.4 }}>
                Todas las tarjetas bancarias • 20% OFF en Transferencia
              </div>
            </div>

            {/* Shipping Info Card (Centered) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: '#151515',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                gap: '0.45rem',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vadano-primary)',
                }}
              >
                <Truck size={20} strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                Envíos a Todo el País
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', lineHeight: 1.4 }}>
                Despachos vía Correo Argentino a sucursal y a domicilio
              </div>
            </div>

            {/* WhatsApp Direct Advisory (Centered with official WhatsApp icon) */}
            <a
              href="https://wa.me/5493844419650"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'rgba(37, 211, 102, 0.08)',
                border: '1px solid rgba(37, 211, 102, 0.25)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                textDecoration: 'none',
                gap: '0.45rem',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                Asesoramiento WhatsApp
              </div>
              <div style={{ fontSize: '0.75rem', color: '#86EFAC', lineHeight: 1.4 }}>
                Atención personalizada y consultas
              </div>
            </a>

            {/* Showroom & Store Info (Centered) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: '#151515',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                gap: '0.45rem',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vadano-primary)',
                }}
              >
                <MapPin size={20} strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                Showroom San Jorge, SF
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', lineHeight: 1.4 }}>
                San Martín 1234 • Lun a Sáb 9:00 a 12:30 / 16:30 a 20:30 hs
              </div>
            </div>

            {/* Quality Guarantee (Centered) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: '#151515',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                gap: '0.45rem',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vadano-primary)',
                }}
              >
                <ShieldCheck size={20} strokeWidth={1.8} />
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                100% Cuero Vacuno & Calidad
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', lineHeight: 1.4 }}>
                Confección artesanal y calce de máxima comodidad
              </div>
            </div>
          </div>

          {/* 3. Single Close Button at Bottom (Centered & Professional) */}
          <div style={{ width: '100%', maxWidth: '420px', display: 'flex', justifyContent: 'center', paddingTop: '0.4rem' }}>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                color: 'var(--vadano-primary)',
                borderRadius: '50px',
                padding: '0.62rem 1.4rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              <X size={15} />
              <span>Cerrar</span>
            </button>
          </div>

          {/* Drawer Footer info (Centered) */}
          <div style={{ textAlign: 'center', paddingTop: '0.3rem', paddingBottom: '0.5rem' }}>
            <p style={{ margin: 0, fontSize: '0.68rem', color: '#6B7280', letterSpacing: '0.08em', textAlign: 'center' }}>
              ÓPTICA RIBES © 2026 • PREVIEW VISUAL
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 840px) {
            .navbar-inner-container {
              padding: 0 0.85rem !important;
              height: 62px !important;
            }
            .nav-links-desktop { display: none !important; }
            .nav-search-desktop { display: none !important; }
            .nav-cta-desktop { display: none !important; }
            .hamburger-btn { display: flex !important; }
            .mobile-menu-drawer {
              overscroll-behavior: contain !important;
              overscroll-behavior-y: contain !important;
              -webkit-overflow-scrolling: touch !important;
              touch-action: pan-y !important;
            }
            .mobile-menu-drawer:not(.is-open) {
              display: none !important;
              visibility: hidden !important;
              pointer-events: none !important;
              opacity: 0 !important;
            }
            .mobile-menu-drawer.is-open {
              display: flex !important;
              visibility: visible !important;
              pointer-events: auto !important;
            }
          }
          @media (max-width: 480px) {
            .navbar-inner-container {
              padding: 0 0.65rem !important;
            }
            .nav-left-group {
              gap: 0.45rem !important;
            }
            .nav-right-group {
              gap: 0.45rem !important;
            }
            .nav-logo-img {
              width: 42px !important;
              height: 42px !important;
            }
            .nav-inicio-btn {
              font-size: 0.68rem !important;
              padding: 0.32rem 0.7rem !important;
              letter-spacing: 0.06em !important;
            }
            .nav-circle-btn {
              width: 35px !important;
              height: 35px !important;
            }
          }
          @media (min-width: 841px) {
            .mobile-menu-drawer { display: none !important; }
            .hamburger-btn { display: none !important; }
          }
        `}</style>
      </nav>

      {/* ── FLOATING BOTTOM NAVIGATION BAR (MOBILE ONLY) ── */}
      <nav
        id="mobile-bottom-nav"
        className="mobile-bottom-bar"
        aria-label="Navegación principal inferior"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'rgba(8, 8, 8, 0.96)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.32)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.7)',
          zIndex: 1200,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 4px',
        }}
      >
        {/* 1. Habitaciones */}
        <a
          href="#habitaciones"
          onClick={(e) => handleNavClick(e, '#habitaciones')}
          className="bottom-nav-item"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            color: '#FAF4EC',
            textDecoration: 'none',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            padding: '4px 0',
            transition: 'color 0.2s ease',
          }}
        >
          <Bed size={17} color="var(--vadano-secondary)" />
          <span>Habitaciones</span>
        </a>

        {/* 2. Quiénes Somos */}
        <a
          href="#historia"
          onClick={(e) => handleNavClick(e, '#historia')}
          className="bottom-nav-item"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            color: '#D5DFD8',
            textDecoration: 'none',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            padding: '4px 0',
            transition: 'color 0.2s ease',
          }}
        >
          <Sparkles size={17} color="var(--vadano-secondary)" />
          <span>El Hotel</span>
        </a>

        {/* 3. Galería */}
        <a
          href="#galeria"
          onClick={(e) => handleNavClick(e, '#galeria')}
          className="bottom-nav-item"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            color: '#D5DFD8',
            textDecoration: 'none',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            padding: '4px 0',
            transition: 'color 0.2s ease',
          }}
        >
          <Camera size={17} color="var(--vadano-secondary)" />
          <span>Galería</span>
        </a>

        {/* 4. Ubicación */}
        <a
          href="#comollegar"
          onClick={(e) => handleNavClick(e, '#comollegar')}
          className="bottom-nav-item"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            color: '#D5DFD8',
            textDecoration: 'none',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            padding: '4px 0',
            transition: 'color 0.2s ease',
          }}
        >
          <MapPin size={17} color="var(--vadano-secondary)" />
          <span>Ubicación</span>
        </a>

        {/* 5. Reservar */}
        <a
          href="#disponibilidad"
          onClick={(e) => handleNavClick(e, '#disponibilidad')}
          className="bottom-nav-buy-btn"
          style={{
            background: 'var(--vadano-primary)',
            color: '#FAF4EC',
            border: '1px solid var(--vadano-secondary)',
            borderRadius: '50px',
            padding: '0.42rem 0.9rem',
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.45)',
            whiteSpace: 'nowrap',
            marginLeft: '4px',
            marginRight: '4px',
          }}
        >
          Reservar
        </a>
      </nav>

      <style>{`
        @media (max-width: 840px) {
          .mobile-bottom-bar {
            display: flex !important;
          }
          .bottom-nav-buy-btn {
            background-color: #E5E7EB !important;
            color: #000000 !important;
            border: 1px solid #D1D5DB !important;
          }
        }
        @media (min-width: 841px) {
          .mobile-bottom-bar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

function NavLink({ link, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={link.href}
      onClick={(e) => onClick(e, link.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? 'var(--vadano-primary)' : '#ffffff',
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
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: `translateX(-50%) scale(${hovered ? 1.3 : 1})`,
          width: '5px',
          height: '5px',
          background: 'var(--vadano-primary)',
          borderRadius: '50%',
          display: 'block',
          boxShadow: `0 0 6px 1px rgba(255, 255, 255,0.45)`,
          transition: 'transform 0.25s ease',
        }}
      />
    </a>
  );
}

