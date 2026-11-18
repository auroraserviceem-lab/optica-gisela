// src/components/CustomerModal.jsx
import React, { useState, useEffect } from 'react';
import { X, User, Lock, Mail, Package, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useStore } from '../context/StoreContext';

function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function CustomerModal() {
  const {
    isCustomerModalOpen,
    setIsCustomerModalOpen,
    customerModalTab,
    setCustomerModalTab,
    customerSession,
    logoutCustomer,
    orders,
    showToast,
  } = useStore();

  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (customerModalTab) {
      setTab(customerModalTab);
    }
  }, [customerModalTab]);

  useEffect(() => {
    if (isCustomerModalOpen) {
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
  }, [isCustomerModalOpen]);

  if (!isCustomerModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    showToast('[Modo Vista Previa] El inicio de sesión es demostrativo y no ejecuta acciones reales.', 'info');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    showToast('[Modo Vista Previa] El registro de cuenta es demostrativo y no ejecuta acciones reales.', 'info');
  };

  const handleGoogleAuth = () => {
    showToast('[Modo Vista Previa] El acceso con Google es demostrativo y no ejecuta acciones reales.', 'info');
  };

  const customerOrders = orders.filter((o) => {
    if (!customerSession) return false;
    return (
      o.customer?.email?.toLowerCase() === customerSession.email?.toLowerCase() ||
      (customerSession.phone && o.customer?.phone === customerSession.phone)
    );
  });

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={() => setIsCustomerModalOpen(false)}
    >
      <div
        style={{
          background: '#0D0D0D',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '460px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 25px rgba(255, 255, 255, 0.15)',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '1.4rem 1.8rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--vadano-primary)',
              }}
            >
              <User size={19} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                {customerSession
                  ? tab === 'orders'
                    ? 'Mis Pedidos'
                    : 'Mi Cuenta'
                  : tab === 'register'
                  ? 'Crear Cuenta'
                  : 'Iniciar Sesión'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#9CA3AF' }}>
                {customerSession ? customerSession.email : 'Sussan Boutique • Cuenta de Usuario'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCustomerModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#9CA3AF',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Auth Tabs: Iniciar Sesión / Registrarme */}
        {!customerSession && (
          <div
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.03)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '0.5rem 0.9rem',
              gap: '0.6rem',
            }}
          >
            <button
              type="button"
              onClick={() => setTab('login')}
              style={{
                flex: 1,
                padding: '0.6rem 0.8rem',
                borderRadius: '50px',
                border: tab === 'login' ? '1px solid var(--vadano-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: tab === 'login' ? 'var(--vadano-primary)' : 'rgba(255, 255, 255, 0.03)',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: tab === 'login' ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                letterSpacing: '0.04em',
                boxShadow: tab === 'login' ? '0 2px 10px var(--vadano-primary-glow)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <LogIn size={15} color={tab === 'login' ? '#FFFFFF' : 'var(--vadano-primary)'} />
              <span>INICIAR SESIÓN</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('register')}
              style={{
                flex: 1,
                padding: '0.6rem 0.8rem',
                borderRadius: '50px',
                border: tab === 'register' ? '1px solid var(--vadano-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
                background: tab === 'register' ? 'var(--vadano-primary)' : 'rgba(255, 255, 255, 0.03)',
                color: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: tab === 'register' ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                letterSpacing: '0.04em',
                boxShadow: tab === 'register' ? '0 2px 10px var(--vadano-primary-glow)' : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <UserPlus size={15} color={tab === 'register' ? '#FFFFFF' : 'var(--vadano-primary)'} />
              <span>REGISTRARME</span>
            </button>
          </div>
        )}

        <div style={{ padding: '1.8rem' }}>
          {!customerSession && tab === 'login' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Preview Notice */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '10px',
                  padding: '0.6rem 0.85rem',
                  fontSize: '0.73rem',
                  color: 'var(--vadano-primary)',
                  textAlign: 'center',
                  lineHeight: '1.45',
                }}
              >
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '2px' }}>✨ Vista Previa Visual Demostrativa</strong>
                Este formulario y el botón de Google son elementos decorativos de diseño. No ejecutan ninguna acción, registro ni inicio de sesión real.
              </div>

              {/* Google Login Option */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  color: '#1F2937',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F3F4F6';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <GoogleIcon size={18} />
                <span>Continuar con Google</span>
              </button>

              {/* Separator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', margin: '0.1rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.12)' }} />
                <span style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  o ingresa con tu email
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.12)' }} />
              </div>

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.4rem' }}>
                    Usuario o Correo Electrónico
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Mail size={16} color="var(--vadano-primary)" style={{ position: 'absolute', left: '12px' }} />
                    <input
                      type="text"
                      placeholder="tu@email.com o usuario admin"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#161616',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '10px',
                        padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.4rem' }}>
                    Contraseña
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Lock size={16} color="var(--vadano-primary)" style={{ position: 'absolute', left: '12px' }} />
                    <input
                      type="password"
                      placeholder="Tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#161616',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '10px',
                        padding: '0.65rem 0.85rem 0.65rem 2.4rem',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="gold-pill-btn"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '0.84rem',
                    letterSpacing: '0.08em',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <LogIn size={16} />
                  <span>INGRESAR A MI CUENTA</span>
                </button>

                <div style={{ textAlign: 'center', marginTop: '0.6rem' }}>
                  <p style={{ fontSize: '0.78rem', color: '#9CA3AF', margin: 0 }}>
                    ¿No tienes una cuenta aún?{' '}
                    <button
                      type="button"
                      onClick={() => setTab('register')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--vadano-primary)',
                        cursor: 'pointer',
                        fontWeight: 700,
                        textDecoration: 'underline',
                        padding: 0,
                      }}
                    >
                      Registrarme
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}

          {!customerSession && tab === 'register' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Preview Notice */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '10px',
                  padding: '0.6rem 0.85rem',
                  fontSize: '0.73rem',
                  color: 'var(--vadano-primary)',
                  textAlign: 'center',
                  lineHeight: '1.45',
                }}
              >
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '2px' }}>✨ Vista Previa Visual Demostrativa</strong>
                Este formulario y el botón de Google son elementos decorativos de diseño. No ejecutan ninguna acción, registro ni inicio de sesión real.
              </div>

              {/* Google Register Option */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  color: '#1F2937',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F3F4F6';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <GoogleIcon size={18} />
                <span>Continuar con Google</span>
              </button>

              {/* Separator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', margin: '0.1rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.12)' }} />
                <span style={{ fontSize: '0.72rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  o registrate con tu email
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.12)' }} />
              </div>

              {/* Manual Form */}
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.35rem' }}>
                    Nombre y Apellido
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="María Pérez"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#161616',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      padding: '0.6rem 0.85rem',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.35rem' }}>
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#161616',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '10px',
                      padding: '0.6rem 0.85rem',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.35rem' }}>
                      Teléfono (Opcional)
                    </label>
                    <input
                      type="tel"
                      placeholder="3406..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#161616',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '10px',
                        padding: '0.6rem 0.85rem',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.35rem' }}>
                      Contraseña
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Mínimo 4 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#161616',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '10px',
                        padding: '0.6rem 0.85rem',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="gold-pill-btn"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    fontSize: '0.84rem',
                    letterSpacing: '0.08em',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <UserPlus size={16} />
                  <span>CREAR MI CUENTA</span>
                </button>

                <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  <p style={{ fontSize: '0.78rem', color: '#9CA3AF', margin: 0 }}>
                    ¿Ya tienes una cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => setTab('login')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--vadano-primary)',
                        cursor: 'pointer',
                        fontWeight: 700,
                        textDecoration: 'underline',
                        padding: 0,
                      }}
                    >
                      Iniciar sesión
                    </button>
                  </p>
                </div>
              </form>
            </div>
          )}

          {customerSession && tab === 'account' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div
                style={{
                  background: '#161616',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'var(--vadano-primary)',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {customerSession.fullName ? customerSession.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: '1rem', fontWeight: 700 }}>
                      {customerSession.fullName || 'Cliente'}
                    </h4>
                    <p style={{ margin: 0, color: 'var(--vadano-primary)', fontSize: '0.8rem' }}>
                      {customerSession.email}
                    </p>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#9CA3AF', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.8rem' }}>
                  {customerSession.phone && <div>📞 <strong>Teléfono:</strong> {customerSession.phone}</div>}
                  <div>✨ <strong>Beneficio:</strong> Cliente Preferencial Sussan Boutique</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <button
                  onClick={() => setTab('orders')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid var(--vadano-primary)',
                    color: 'var(--vadano-primary)',
                    borderRadius: '10px',
                    padding: '0.7rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Package size={16} />
                  MIS PEDIDOS ({customerOrders.length})
                </button>

                <button
                  onClick={() => {
                    logoutCustomer();
                    setIsCustomerModalOpen(false);
                  }}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#EF4444',
                    borderRadius: '10px',
                    padding: '0.7rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <LogOut size={16} />
                  CERRAR SESIÓN
                </button>
              </div>
            </div>
          )}

          {customerSession && tab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => setTab('account')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--vadano-primary)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  ← Volver a Mi Cuenta
                </button>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                  {customerOrders.length} pedido(s)
                </span>
              </div>

              {customerOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', background: '#161616', borderRadius: '12px' }}>
                  <Package size={32} color="#6B7280" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ color: '#FFFFFF', fontSize: '0.9rem', margin: '0 0 0.3rem' }}>Aún no tienes pedidos registrados</p>
                  <p style={{ color: '#9CA3AF', fontSize: '0.75rem', margin: 0 }}>¡Explora nuestro catálogo y realiza tu primer pedido!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '280px', overflowY: 'auto' }}>
                  {customerOrders.map((order) => (
                    <div
                      key={order.id}
                      style={{
                        background: '#161616',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '10px',
                        padding: '0.9rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#FFFFFF' }}>
                          Pedido #{order.id}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '20px',
                            background: order.status === 'Entregado' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                            color: order.status === 'Entregado' ? '#10B981' : 'var(--vadano-primary)',
                          }}
                        >
                          {order.status || 'Pendiente'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.4rem' }}>
                        Fecha: {new Date(order.createdAt).toLocaleDateString('es-AR')}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.4rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#D1D5DB' }}>
                          {order.items?.length || 0} producto(s)
                        </span>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--vadano-primary)' }}>
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
