// src/components/PaymentMethodsShowcase.jsx
import React from 'react';

// 1. Galicia Más
export const LogoGaliciaMas = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '26px' }}>
    <span style={{ fontWeight: 900, fontSize: '0.95rem', color: '#111827', letterSpacing: '-0.02em', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      Galicia <span style={{ fontStyle: 'italic', fontWeight: 800 }}>Más</span>
    </span>
    <span style={{ fontWeight: 900, fontSize: '1.05rem', color: '#111827', marginLeft: '1px', lineHeight: 1 }}>›</span>
  </div>
);

// 2. Supervielle Mastercard
export const LogoSupervielle = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M4 18L14 4L18 9L8 20L4 18Z" fill="#E11932" />
        <path d="M12 18L18 10L21 13L15 20L12 18Z" fill="#E11932" />
      </svg>
      <span style={{ fontWeight: 800, fontSize: '0.68rem', color: '#111827', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        SUPERVIELLE
      </span>
    </div>
    <span style={{ fontSize: '0.58rem', color: '#6B7280', marginTop: '1px', fontWeight: 500 }}>
      Mastercard
    </span>
  </div>
);

// 3. BBVA con Black+
export const LogoBBVA = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
    <span style={{ fontWeight: 900, fontSize: '0.95rem', color: '#004481', letterSpacing: '0.02em', lineHeight: 1 }}>
      BBVA
    </span>
    <span style={{ fontSize: '0.62rem', color: '#004481', fontWeight: 600, marginTop: '2px' }}>
      con <strong style={{ color: '#004481' }}>Black +</strong>
    </span>
  </div>
);

// 4. Mercado Pago Circular Handshake (ícono negro circular)
export const LogoMPBlackCircle = () => (
  <div
    style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: '#1F2937',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
    }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
      <path d="M18.5 7.5c-.8-.8-2.2-.8-3 0l-4.5 4.5-1.5-1.5c-.8-.8-2.2-.8-3 0l-3 3c-.8.8-.8 2.2 0 3s2.2.8 3 0l1.5-1.5 4.5 4.5c.8.8 2.2.8 3 0l6-6c.8-.8.8-2.2 0-3l-3-3z" />
    </svg>
  </div>
);

// 5. Visa
export const LogoVisa = ({ isDebit = false }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '22px' }}>
    <svg width="44" height="15" viewBox="0 0 100 32" fill="#1434CB">
      <path d="M38.5 2.5L25.3 30.5H16.8L10.3 8.3C9.9 6.8 9.5 6.2 8.3 5.4C6.3 4.2 3 3.1 0 2.5L0.2 1.3H14.5C16.3 1.3 18 2.6 18.4 4.8L21.9 23.3L30.1 2.5H38.5ZM72.6 21.6C72.7 13.4 60.9 12.9 61 9.2C61.1 7.9 62.3 6.6 65 6.2C66.4 6 70.1 5.8 74 7.6L75.5 0.9C73.4 0.2 70.7 0 67.2 0C59 0 53.2 4.4 53.1 10.6C53 15.3 57.2 17.9 60.4 19.5C63.6 21.1 64.7 22.1 64.7 23.6C64.6 25.8 62 26.8 59.5 26.8C55.4 26.8 53 26.1 49.3 24.5L47.7 31.5C49.9 32.5 53.9 33.3 58.1 33.3C66.8 33.3 72.5 29 72.6 21.6ZM93.4 30.5H100L94.3 2.5H88.3C87 2.5 85.9 3.2 85.4 4.4L73 30.5H81.3L83 25.8H92.3L93.4 30.5ZM85.2 19.7L88.9 9.3L91 19.7H85.2ZM51.3 2.5L44.7 30.5H36.9L43.5 2.5H51.3Z" />
    </svg>
    {isDebit && (
      <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#6B7280', letterSpacing: '0.04em' }}>
        DÉBITO
      </span>
    )}
  </div>
);

// 6. Mastercard
export const LogoMastercard = ({ isDebit = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '36px', height: '22px' }}>
      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EB001B', position: 'absolute', left: 0 }} />
      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F79E1B', position: 'absolute', right: 0, opacity: 0.9 }} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
      <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1 }}>
        mastercard
      </span>
      {isDebit && (
        <span style={{ fontSize: '0.5rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
          DÉBITO
        </span>
      )}
    </div>
  </div>
);

// 7. Argencard
export const LogoArgencard = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
    <div
      style={{
        width: '18px',
        height: '18px',
        borderRadius: '5px',
        border: '3.5px solid #D9252A',
        borderRightColor: 'transparent',
        transform: 'rotate(-45deg)',
        marginBottom: '2px',
      }}
    />
    <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>
      Argencard
    </span>
  </div>
);

// 8. Cabal
export const LogoCabal = ({ isDebit = false }) => (
  <div
    style={{
      background: '#005CA9',
      borderRadius: '4px',
      padding: isDebit ? '2px 7px' : '3px 7px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '40px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '0.65rem', lineHeight: 1 }}>
        &lt;&gt;
      </span>
      <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '0.62rem', letterSpacing: '0.04em', lineHeight: 1 }}>
        CABAL
      </span>
    </div>
    {isDebit && (
      <span style={{ color: '#FFFFFF', fontSize: '0.45rem', fontWeight: 700, letterSpacing: '0.04em', marginTop: '2px' }}>
        DÉBITO
      </span>
    )}
  </div>
);

// 9. Diners Club International
export const LogoDiners = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    <div
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: '2px solid #004B87',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div style={{ width: '2px', height: '100%', background: '#004B87' }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#004B87' }}>Diners Club</span>
      <span style={{ fontSize: '0.42rem', fontWeight: 600, color: '#6B7280', letterSpacing: '0.04em' }}>INTERNATIONAL</span>
    </div>
  </div>
);

// 10. American Express
export const LogoAmex = () => (
  <div
    style={{
      background: '#0070CE',
      borderRadius: '3px',
      padding: '3px 5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '38px',
      height: '24px',
      boxSizing: 'border-box',
    }}
  >
    <span style={{ color: '#FFFFFF', fontSize: '0.38rem', fontWeight: 900, letterSpacing: '0.02em', lineHeight: 1, textAlign: 'center' }}>
      AMERICAN
    </span>
    <span style={{ color: '#FFFFFF', fontSize: '0.38rem', fontWeight: 900, letterSpacing: '0.02em', lineHeight: 1, textAlign: 'center', marginTop: '1px' }}>
      EXPRESS
    </span>
  </div>
);

// 11. NaranjaX
export const LogoNaranjaX = () => (
  <div style={{ display: 'flex', alignItems: 'center', height: '22px' }}>
    <span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#FF5A00', letterSpacing: '-0.02em', fontFamily: 'system-ui, sans-serif' }}>
      Naranja
    </span>
    <span style={{ fontWeight: 900, fontSize: '0.95rem', color: '#5B2C6F', marginLeft: '1px' }}>
      X
    </span>
  </div>
);

// 12. Sucredito
export const LogoSucredito = () => (
  <div style={{ display: 'flex', alignItems: 'center', height: '22px' }}>
    <span style={{ fontWeight: 700, fontSize: '0.78rem', color: '#1F2937', letterSpacing: '-0.02em' }}>
      Sucredito
    </span>
  </div>
);

// 13. Maestro Débito
export const LogoMaestro = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '36px', height: '22px' }}>
      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EB001B', position: 'absolute', left: 0 }} />
      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#0099DF', position: 'absolute', right: 0, opacity: 0.95 }} />
    </div>
    <span style={{ fontSize: '0.55rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', marginTop: '2px', lineHeight: 1 }}>
      maestro.
    </span>
  </div>
);

// 14. Pago Fácil
export const LogoPagoFacil = () => (
  <div
    style={{
      width: '36px',
      height: '36px',
      background: '#FFDE00',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #E5C200',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        background: '#D91882',
        width: '90%',
        padding: '2px 0',
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: 'rotate(-4deg)',
      }}
    >
      <span style={{ color: '#FFFFFF', fontSize: '0.45rem', fontWeight: 900, lineHeight: 1, letterSpacing: '0.02em' }}>
        PAGO
      </span>
      <span style={{ color: '#FFDE00', fontSize: '0.42rem', fontWeight: 900, lineHeight: 1, fontStyle: 'italic' }}>
        Fácil
      </span>
    </div>
  </div>
);

// 15. Rapipago
export const LogoRapipago = () => (
  <div style={{ display: 'flex', alignItems: 'baseline', height: '26px' }}>
    <span style={{ fontWeight: 900, fontSize: '1.05rem', color: '#192A56', letterSpacing: '-0.03em', fontFamily: 'system-ui, sans-serif' }}>
      rapipago
    </span>
    <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#D91882', lineHeight: 1, marginLeft: '1px' }}>
      ,
    </span>
  </div>
);

// 16. Mercado Pago Logo
export const LogoMercadoPagoFull = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <svg width="28" height="20" viewBox="0 0 100 70" fill="none">
      <path d="M50 0C22.4 0 0 15.7 0 35c0 19.3 22.4 35 50 35s50-15.7 50-35C100 15.7 77.6 0 50 0z" fill="#009EE3" />
      <path d="M68.5 28.5c-2.8-2.8-7.8-2.8-10.6 0l-16 16-5.3-5.3c-2.8-2.8-7.8-2.8-10.6 0s-2.8 7.8 0 10.6l10.6 10.6c2.8 2.8 7.8 2.8 10.6 0l21.3-21.3c2.9-2.9 2.9-7.8 0-10.6z" fill="#FFFFFF" />
    </svg>
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#002F6C', letterSpacing: '-0.01em' }}>
        mercado
      </span>
      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#009EE3', letterSpacing: '-0.01em' }}>
        pago
      </span>
    </div>
  </div>
);

// ── MAIN PAYMENT METHODS SHOWCASE COMPONENT ──
export default function PaymentMethodsShowcase() {
  return (
    <div
      className="payment-methods-showcase"
      style={{
        background: '#FFFFFF',
        color: '#111827',
        borderRadius: '16px',
        padding: '1.8rem 1.6rem',
        boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
        border: '1px solid #E5E7EB',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* ── SECTION 1: TARJETAS DE CRÉDITO ── */}
      <div style={{ marginBottom: '1.8rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: '0 0 2px' }}>
          Tarjetas de crédito
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '0 0 1.2rem' }}>
          Acreditación instantánea.
        </p>

        {/* Grupo 1: Mismo precio en hasta 6 cuotas con estos bancos */}
        <div style={{ marginBottom: '1.4rem' }}>
          <p style={{ fontSize: '0.92rem', margin: '0 0 1rem', color: '#111827', fontWeight: 500 }}>
            <span style={{ color: '#00A650', fontWeight: 600 }}>Mismo precio en hasta 6 cuotas</span> con estos bancos
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(88px, 1fr))',
              gap: '1.2rem 0.8rem',
              alignItems: 'flex-start',
            }}
          >
            {/* Galicia Más */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '36px', display: 'flex', alignItems: 'center' }}>
                <LogoGaliciaMas />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#00A650', marginTop: '6px' }}>
                6 cuotas
              </span>
            </div>

            {/* Supervielle */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '36px', display: 'flex', alignItems: 'center' }}>
                <LogoSupervielle />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#00A650', marginTop: '6px' }}>
                6 cuotas
              </span>
            </div>

            {/* BBVA */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '36px', display: 'flex', alignItems: 'center' }}>
                <LogoBBVA />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#00A650', marginTop: '6px' }}>
                6 cuotas
              </span>
            </div>

            {/* Ícono circular negro (Mercado Pago) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '36px', display: 'flex', alignItems: 'center' }}>
                <LogoMPBlackCircle />
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#00A650', marginTop: '6px' }}>
                2 cuotas
              </span>
            </div>
          </div>

          <div style={{ marginTop: '0.8rem' }}>
            <a
              href="https://www.mercadopago.com.ar/cuotas"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.82rem', color: '#3483FA', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Ver condiciones
            </a>
          </div>
        </div>

        {/* Grupo 2: O hasta 24 cuotas con interés */}
        <div style={{ marginTop: '1.6rem' }}>
          <p style={{ fontSize: '0.92rem', margin: '0 0 1rem', color: '#111827', fontWeight: 500 }}>
            O hasta 24 cuotas con interés
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
              gap: '1.2rem 0.8rem',
              alignItems: 'flex-start',
            }}
          >
            {/* Visa */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                <LogoVisa />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px' }}>
                24 cuotas
              </span>
            </div>

            {/* Mastercard */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                <LogoMastercard />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px' }}>
                24 cuotas
              </span>
            </div>

            {/* Argencard */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                <LogoArgencard />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px' }}>
                24 cuotas
              </span>
            </div>

            {/* Cabal */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                <LogoCabal />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px' }}>
                24 cuotas
              </span>
            </div>

            {/* Diners Club */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                <LogoDiners />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px' }}>
                24 cuotas
              </span>
            </div>

            {/* American Express */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                <LogoAmex />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px' }}>
                12 cuotas
              </span>
            </div>

            {/* NaranjaX */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                <LogoNaranjaX />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px' }}>
                6 cuotas
              </span>
            </div>

            {/* Sucredito */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                <LogoSucredito />
              </div>
              <span style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px' }}>
                3 cuotas
              </span>
            </div>
          </div>
        </div>

        {/* Mercado Pago Link */}
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <LogoMercadoPagoFull />
          <a
            href="https://www.mercadopago.com.ar/ayuda/medios-de-pago-cuotas-promociones_264"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.82rem', color: '#3483FA', textDecoration: 'none', fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            Conocé más
          </a>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '1.6rem 0' }} />

      {/* ── SECTION 2: TARJETAS DE DÉBITO ── */}
      <div style={{ marginBottom: '1.8rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: '0 0 2px' }}>
          Tarjetas de débito
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: '0 0 1.2rem' }}>
          Acreditación instantánea.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
            gap: '1.2rem 0.8rem',
            alignItems: 'center',
          }}
        >
          {/* Maestro */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LogoMaestro />
          </div>

          {/* Cabal Débito */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LogoCabal isDebit={true} />
          </div>

          {/* Mastercard Débito */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LogoMastercard isDebit={true} />
          </div>

          {/* Visa Débito */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LogoVisa isDebit={true} />
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '1.6rem 0' }} />

      {/* ── SECTION 3: EFECTIVO ── */}
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: '0 0 1.2rem' }}>
          Efectivo
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.2rem 1.5rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Pago Fácil */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ minHeight: '40px', display: 'flex', alignItems: 'center' }}>
              <LogoPagoFacil />
            </div>
            <span style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '8px', lineHeight: 1.3 }}>
              Acreditación instantánea.
            </span>
          </div>

          {/* Rapipago */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ minHeight: '40px', display: 'flex', alignItems: 'center' }}>
              <LogoRapipago />
            </div>
            <span style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '8px', lineHeight: 1.3 }}>
              Acreditación instantánea.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}