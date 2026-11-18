// src/components/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { Lock, User, KeyRound, X, ArrowLeft, Shield } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function AdminLogin() {
  const { isAdminLoginOpen, setIsAdminLoginOpen, loginAdmin } = useStore();
  const [username, setUsername] = useState('juanacalzados');
  const [password, setPassword] = useState('juanasanjorge2026');
  const [loading, setLoading] = useState(false);

  if (!isAdminLoginOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginAdmin(username, password);
      setLoading(false);
    }, 400);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 4000,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAdminLoginOpen(false);
      }}
    >
      <div
        style={{
          background: '#000000',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '420px',
          padding: '2.5rem',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9)',
          position: 'relative',
          animation: 'slideUp 0.3s ease',
          color: '#FFFFFF',
        }}
      >
        <button
          onClick={() => setIsAdminLoginOpen(false)}
          aria-label="Cerrar"
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9CA3AF',
            cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>

        {/* Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src="https://res.cloudinary.com/dkc39tw6r/image/upload/v1794093058/670445968_18075495884636317_1744709116251245082_n_rxunyn.jpg"
            alt="Óptica Ribes Logo"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--vadano-primary)',
              display: 'inline-block',
              marginBottom: '1rem',
              backgroundColor: '#000000',
            }}
          />
          <h3
            className="font-serif"
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: '0 0 0.4rem',
            }}
          >
            Panel Administrativo
          </h3>
          <p style={{ color: '#9CA3AF', fontSize: '0.78rem', margin: 0 }}>
            Acceso exclusivo para gestión de tienda y pedidos
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', color: '#9CA3AF', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Usuario
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario admin"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', color: '#9CA3AF', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem 0.75rem 2.4rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Quick Demo Hint */}
          <div
            style={{
              padding: '0.6rem 0.8rem',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '8px',
              border: '1px dashed rgba(255,255,255,0.15)',
              fontSize: '0.72rem',
              color: '#9CA3AF',
            }}
          >
            <span>Credenciales por defecto: <strong>juanacalzados</strong> / <strong>juanasanjorge2026</strong></span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="gold-pill-btn"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              marginTop: '0.5rem',
            }}
          >
            {loading ? 'INGRESANDO...' : 'INGRESAR AL PANEL'}
          </button>
        </form>
      </div>
    </div>
  );
}
