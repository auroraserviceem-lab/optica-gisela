import React, { useState } from 'react';
import { X } from 'lucide-react';

const ACCENT = '#E87008';

/* ── Floating WhatsApp Button ── */
export function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://wa.me/5493426487738?text=Hola%2C%20quisiera%20hacer%20una%20consulta%20en%20%C3%93ptica%20Gisela"
      target="_blank"
      rel="noopener noreferrer"
      id="floating-whatsapp"
      aria-label="Contactar por WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 900,
        width: '58px', height: '58px',
        borderRadius: '50%',
        background: hovered ? '#1ebe5d' : '#25D366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
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
  );
}

/* ── Consultation Modal ── */
export function ReservationModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'Receta', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    color: '#ffffff',
    fontSize: '0.88rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    fontFamily: "'Inter', sans-serif",
  };

  const labelStyle = {
    color: '#E5E7EB', fontSize: '0.68rem',
    fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', display: 'block',
    marginBottom: '0.4rem',
  };

  return (
    <div
      id="reservation-modal-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div id="reservation-modal" style={{
        background: '#181F25',
        border: `1px solid rgba(232,112,8,0.3)`,
        borderRadius: '20px',
        padding: '2.5rem',
        width: '100%', maxWidth: '520px',
        maxHeight: '90vh', overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 30px rgba(232,112,8,0.15)',
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
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,112,8,0.2)'; e.currentTarget.style.color = ACCENT; }}
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
            Consultar Asesoramiento
          </h3>
          <p style={{ color: '#9ca3af', fontSize: '0.82rem' }}>
            Completá el formulario y nos comunicaremos a la brevedad
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h4 className="font-serif" style={{ color: '#FFFFFF', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
              ¡Consulta Recibida!
            </h4>
            <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: 1.7 }}>
              Gracias <strong style={{ color: '#fff' }}>{form.name}</strong>, hemos recibido tu consulta.
              Te contactaremos pronto al <strong style={{ color: '#fff' }}>{form.phone}</strong>.
            </p>
            <button onClick={onClose} className="gold-pill-btn"
              style={{ marginTop: '1.5rem', padding: '0.7rem 2rem' }}>
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* Name */}
            <div>
              <label style={labelStyle}>Nombre completo *</label>
              <input name="name" required value={form.name} onChange={handleChange}
                placeholder="Ej: María González" style={inputStyle}
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
            </div>

            {/* Email + Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Email *</label>
                <input name="email" type="email" required value={form.email} onChange={handleChange}
                  placeholder="tu@email.com" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Teléfono / WhatsApp *</label>
                <input name="phone" type="tel" required value={form.phone} onChange={handleChange}
                  placeholder="+54 342 ..." style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                />
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label style={labelStyle}>Tipo de consulta / interés *</label>
              <select name="service" value={form.service} onChange={handleChange}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              >
                <option value="Receta">Anteojos de Receta / Graduación</option>
                <option value="Sol">Anteojos de Sol Polarizados</option>
                <option value="ClipOn">Modelos Clip On</option>
                <option value="Cristales">Cambio o calibración de cristales</option>
                <option value="General">Consulta general</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Mensaje o consulta</label>
              <textarea name="notes" value={form.notes} onChange={handleChange}
                rows={3} placeholder="Detallanos qué modelo o graduación buscás..."
                style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
            </div>

            <button type="submit" className="gold-pill-btn"
              style={{ padding: '0.9rem', fontSize: '0.85rem', letterSpacing: '0.12em', width: '100%', marginTop: '0.5rem' }}>
              ENVIAR CONSULTA
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
