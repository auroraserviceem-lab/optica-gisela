import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';

export default function ComoLlegar() {
  const address = 'Av. Eva Duarte 180, Merlo, San Luis (CP 5881)';
  const mapQuery = 'Av. Eva Duarte 180, Merlo, San Luis';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="comollegar" style={{ background: '#0A130D', padding: '7rem 1.5rem', color: '#FAF4EC' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
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
            ✦ UBICACIÓN PRIVILEGIADA ✦
          </p>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.9rem' }}>
            Cómo llegar
          </h2>
          <p className="section-subtitle" style={{ color: '#EEDFCC', maxWidth: '650px', margin: '1.2rem auto 0' }}>
            Encontranos en una zona apacible y accesible, rodeada del imponente paisaje serrano
          </p>
        </div>

        {/* Grid: Info + Map */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Info Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div
              style={{
                background: '#101F15',
                borderRadius: '20px',
                padding: '2rem',
                border: '1.5px solid rgba(238, 223, 204, 0.15)',
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'rgba(27, 82, 48, 0.4)',
                  border: '1.5px solid var(--vadano-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vadano-secondary)',
                  flexShrink: 0,
                }}
              >
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--vadano-secondary)', fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.4rem', fontWeight: 700 }}>
                  Dirección
                </h4>
                <p style={{ color: '#FAF4EC', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                  {address}
                </p>
              </div>
            </div>

            <div
              style={{
                background: '#101F15',
                borderRadius: '20px',
                padding: '2rem',
                border: '1.5px solid rgba(238, 223, 204, 0.15)',
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'rgba(27, 82, 48, 0.4)',
                  border: '1.5px solid var(--vadano-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vadano-secondary)',
                  flexShrink: 0,
                }}
              >
                <Navigation size={24} />
              </div>
              <div>
                <h4 style={{ color: 'var(--vadano-secondary)', fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.4rem', fontWeight: 700 }}>
                  Referencias
                </h4>
                <p style={{ color: '#FAF4EC', fontSize: '1.02rem', lineHeight: 1.6, margin: 0 }}>
                  A 200 metros de la avenida principal de Merlo. Fácil acceso desde el centro comercial y las principales rutas de acceso a la villa turística.
                </p>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-pill-btn"
              style={{
                padding: '0.95rem 1.8rem',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <span>ABRIR EN GOOGLE MAPS</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Map Side */}
          <div
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid var(--vadano-primary)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
              height: '420px',
              position: 'relative',
              background: '#101F15',
            }}
          >
            <iframe
              title="Ubicación de La Posada del Tiempo en Merlo"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
