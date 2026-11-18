import React from 'react';

// Seis tarjetas con opinión, nombre y fecha de estadía: [AGREGAR].
// Siguiendo la instrucción: "No inventar opiniones ni nombres si no fueron proporcionados.
// Si un dato no está cargado, ocultar esa parte en vez de mostrar un texto de relleno."
const reviews = [];

export default function Reviews() {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" style={{ background: '#0A130D', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2 className="section-title gold-underline" style={{ display: 'inline-block', paddingBottom: '0.8rem' }}>
            Lo dicen nuestros huéspedes
          </h2>
        </div>
        <p className="section-subtitle" style={{ marginBottom: '3.5rem', color: '#EEDFCC' }}>
          Experiencias reales de quienes eligieron descansar en La Posada
        </p>

        <div
          className="reviews-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                background: '#101F15',
                borderRadius: '16px',
                padding: '1.6rem',
                border: '1.5px solid rgba(238, 223, 204, 0.15)',
              }}
            >
              <p style={{ color: '#FAF4EC', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 1rem' }}>
                “{review.text}”
              </p>
              <h4 style={{ color: 'var(--vadano-secondary)', fontSize: '0.95rem', margin: 0, fontWeight: 700 }}>
                {review.name}
              </h4>
              {review.date && (
                <span style={{ color: '#889B8F', fontSize: '0.78rem' }}>{review.date}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
