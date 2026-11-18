import React, { useState, useEffect } from 'react';
import { Calendar, Users, User, Phone, MessageCircle, AlertCircle, ShieldCheck, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ConsultaDisponibilidad({ selectedRoomName }) {
  const { config } = useStore();
  const whatsappNumber = config?.contact?.whatsapp || config?.whatsappNumber || '5493844419650';

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

  const [llegada, setLlegada] = useState(todayStr);
  const [salida, setSalida] = useState(tomorrowStr);
  const [huespedes, setHuespedes] = useState('2');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [habitacion, setHabitacion] = useState(selectedRoomName || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedRoomName) {
      setHabitacion(selectedRoomName);
    }
  }, [selectedRoomName]);

  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!llegada || !salida) {
      setError('Por favor seleccioná las fechas de llegada y salida.');
      return;
    }

    if (new Date(salida) <= new Date(llegada)) {
      setError('La fecha de salida debe ser posterior a la fecha de llegada.');
      return;
    }

    if (!nombre.trim()) {
      setError('Por favor ingresá tu nombre completo.');
      return;
    }

    // Build the exact required WhatsApp text
    let message = `Hola, quiero consultar disponibilidad: llegada ${formatDateDisplay(llegada)}, salida ${formatDateDisplay(salida)}, ${huespedes} huéspedes. Mi nombre es ${nombre.trim()}.`;

    if (habitacion) {
      message += ` (Preferencia: ${habitacion})`;
    }
    if (telefono.trim()) {
      message += ` Teléfono: ${telefono.trim()}`;
    }

    const cleanNum = whatsappNumber.replace(/[^0-9]/g, '');
    const waUrl = cleanNum
      ? `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="disponibilidad" style={{ background: '#FAF5EE', padding: '7rem 1.5rem', color: '#163520' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p
            style={{
              color: 'var(--vadano-primary)',
              fontSize: '0.88rem',
              letterSpacing: '0.28em',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
            }}
          >
            ✦ RESERVÁ TU ESTADÍA ✦
          </p>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
              fontWeight: 800,
              color: '#163520',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              margin: '0 0 1rem',
            }}
          >
            Consulta de disponibilidad
          </h2>
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              color: '#284130',
              fontSize: '1.05rem',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Planificá tu descanso en las sierras de Merlo. Consultá fechas y te responderemos a la brevedad.
          </p>
        </div>

        {/* Form Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '2px solid rgba(27, 82, 48, 0.18)',
            boxShadow: '0 20px 50px rgba(22, 73, 40, 0.08)',
          }}
        >
          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: '#FEF2F2',
                border: '1px solid #F87171',
                color: '#991B1B',
                padding: '0.85rem 1.1rem',
                borderRadius: '12px',
                fontSize: '0.88rem',
                marginBottom: '1.8rem',
                fontWeight: 600,
              }}
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Row 1: Arrival & Departure */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.2rem',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#163520',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Calendar size={15} color="var(--vadano-primary)" />
                  <span>Fecha de llegada</span>
                </label>
                <input
                  type="date"
                  value={llegada}
                  min={todayStr}
                  onChange={(e) => {
                    setLlegada(e.target.value);
                    if (new Date(salida) <= new Date(e.target.value)) {
                      const next = new Date(e.target.value);
                      next.setDate(next.getDate() + 1);
                      setSalida(next.toISOString().split('T')[0]);
                    }
                  }}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #D5DFD8',
                    background: '#FAF7F2',
                    color: '#163520',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#163520',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Calendar size={15} color="var(--vadano-primary)" />
                  <span>Fecha de salida</span>
                </label>
                <input
                  type="date"
                  value={salida}
                  min={llegada || todayStr}
                  onChange={(e) => setSalida(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #D5DFD8',
                    background: '#FAF7F2',
                    color: '#163520',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Row 2: Guests & Room Preference */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.2rem',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#163520',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Users size={15} color="var(--vadano-primary)" />
                  <span>Cantidad de huéspedes</span>
                </label>
                <select
                  value={huespedes}
                  onChange={(e) => setHuespedes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #D5DFD8',
                    background: '#FAF7F2',
                    color: '#163520',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                >
                  <option value="1">1 huésped</option>
                  <option value="2">2 huéspedes</option>
                  <option value="3">3 huéspedes</option>
                  <option value="4">4 huéspedes</option>
                  <option value="5 o más">5 o más huéspedes</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#163520',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span>Habitación de interés</span>
                </label>
                <select
                  value={habitacion}
                  onChange={(e) => setHabitacion(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #D5DFD8',
                    background: '#FAF7F2',
                    color: '#163520',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Cualquier habitación disponible</option>
                  <option value="Habitación matrimonial">Habitación matrimonial (2 huéspedes)</option>
                  <option value="Habitación con dos camas">Habitación con dos camas (2 huéspedes)</option>
                  <option value="Habitación grupal">Habitación grupal (3 huéspedes)</option>
                </select>
              </div>
            </div>

            {/* Row 3: Name & Phone */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.2rem',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#163520',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  <User size={15} color="var(--vadano-primary)" />
                  <span>Tu nombre completo</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #D5DFD8',
                    background: '#FAF7F2',
                    color: '#163520',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#163520',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Phone size={15} color="var(--vadano-primary)" />
                  <span>Tu teléfono / WhatsApp</span>
                </label>
                <input
                  type="tel"
                  placeholder="Ej. 266 4123456"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #D5DFD8',
                    background: '#FAF7F2',
                    color: '#163520',
                    fontSize: '0.92rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {/* Submit Button: Consultar por WhatsApp */}
            <button
              type="submit"
              className="gold-pill-btn"
              style={{
                width: '100%',
                padding: '1.05rem',
                fontSize: '0.92rem',
                letterSpacing: '0.1em',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                cursor: 'pointer',
                marginTop: '0.5rem',
                backgroundColor: '#25D366',
                borderColor: '#25D366',
                color: '#FFFFFF',
                boxShadow: '0 8px 25px rgba(37, 211, 102, 0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <MessageCircle size={20} />
              <span>CONSULTAR POR WHATSAPP</span>
            </button>
          </form>

          {/* Clarifications required by user */}
          <div
            style={{
              marginTop: '1.8rem',
              paddingTop: '1.4rem',
              borderTop: '1px solid #E5ECE7',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              fontSize: '0.82rem',
              color: '#4A6352',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <MessageCircle size={15} color="var(--vadano-primary)" style={{ flexShrink: 0 }} />
              <span>La disponibilidad y las tarifas se confirman por WhatsApp.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Clock size={15} color="var(--vadano-primary)" style={{ flexShrink: 0 }} />
              <span>Te respondemos en el día.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <ShieldCheck size={15} color="var(--vadano-primary)" style={{ flexShrink: 0 }} />
              <span>Tus datos solo se usan para responder tu consulta.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
