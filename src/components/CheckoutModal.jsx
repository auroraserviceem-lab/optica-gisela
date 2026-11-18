// src/components/CheckoutModal.jsx
import React, { useState, useRef } from 'react';
import {
  X,
  CheckCircle,
  Truck,
  Store,
  CreditCard,
  Send,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Copy,
  Check,
  Wallet,
  Banknote,
  Smartphone,
  AlertCircle,
  Building2,
  QrCode,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MercadoPagoService } from '../services/mercadopago';
import PaymentMethodsShowcase from './PaymentMethodsShowcase';

export default function CheckoutModal() {
  const {
    cart,
    cartSubtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    config,
    placeOrder,
    showToast,
  } = useStore();

  const formScrollRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dni: '',
    address: '',
    city: 'San Jorge',
    postalCode: '2452',
    province: 'Santa Fe',
    notes: '',
  });

  const [shippingMethod, setShippingMethod] = useState('pickup'); // 'pickup' | 'local' | 'national'
  const [paymentMethod, setPaymentMethod] = useState('mercadopago'); // 'mercadopago' | 'transferencia' | 'billeteras_virtuales' | 'efectivo' | 'whatsapp'
  const [showInstallmentsDetail, setShowInstallmentsDetail] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [copiedWalletAlias, setCopiedWalletAlias] = useState(false);

  React.useEffect(() => {
    if (isCheckoutOpen) {
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
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Shipping Calculations
  const shippingOption = config?.shipping?.[shippingMethod] || { price: 0, name: 'Retiro en Local' };
  const shippingCost = shippingOption.price || 0;

  // Discount (20% on Bank Transfer or Debit)
  const discountRate = (paymentMethod === 'transferencia' || paymentMethod === 'billeteras_virtuales') ? (config?.bankDetails?.discountPercentage || 20) / 100 : 0;
  const discountAmount = Math.round(cartSubtotal * discountRate);
  const finalTotal = Math.max(0, cartSubtotal + shippingCost - discountAmount);

  const handleCopyAlias = () => {
    if (config?.bankDetails?.alias) {
      navigator.clipboard.writeText(config.bankDetails.alias);
      setCopiedAlias(true);
      showToast('Alias bancario copiado al portapapeles.');
      setTimeout(() => setCopiedAlias(false), 2500);
    }
  };

  const handleCopyWalletAlias = () => {
    const walletAlias = config?.bankDetails?.alias || 'SUSSAN.BOUTIQUE';
    navigator.clipboard.writeText(walletAlias);
    setCopiedWalletAlias(true);
    showToast('Alias de billetera virtual copiado.');
    setTimeout(() => setCopiedWalletAlias(false), 2500);
  };

  const handleSelectPaymentMethod = (method) => {
    setPaymentMethod(method);
    if (method === 'efectivo' && shippingMethod !== 'pickup') {
      setShippingMethod('pickup');
      showToast('Efectivo seleccionado: la entrega se configuró automáticamente en Retiro en Local.', 'info');
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    // Modo Vista Previa: la función de pago está completamente anulada. No se ejecutan cobros, registros, WhatsApp ni pantallas de confirmación.
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3600,
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) setIsCheckoutOpen(false);
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            background: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255,255,255,0.1)',
            position: 'relative',
            animation: 'slideUp 0.3s ease',
          }}
        >
        {/* Header */}
        <div
          style={{
            padding: '1.2rem 1.8rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsCartOpen(true);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#9CA3AF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.78rem',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
            >
              <ArrowLeft size={16} />
              <span>Volver al carrito</span>
            </button>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <h3
              className="font-serif"
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Finalizar Compra
            </h3>
          </div>

          <button
            onClick={() => !isProcessing && setIsCheckoutOpen(false)}
            aria-label="Cerrar Checkout"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9CA3AF',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body (Form + Summary Grid) */}
        <form
          ref={formScrollRef}
          onSubmit={handleSubmitOrder}
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: '0',
          }}
          className="checkout-grid"
        >
          {/* Left Column: Form Fields */}
          <div
            style={{
              padding: '1.8rem',
              borderRight: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.8rem',
            }}
          >
            {/* Step 1: Contact info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    color: '#000000',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  1
                </div>
                <h4
                  style={{
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    margin: 0,
                  }}
                >
                  Datos del Comprador
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Ej: Lucía Rodríguez"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="lucia@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+54 9 266 4..."
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    DNI / CUIT (Para facturación)
                  </label>
                  <input
                    type="text"
                    name="dni"
                    placeholder="Ej: 38.452.190"
                    value={formData.dni}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    color: '#000000',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  2
                </div>
                <h4
                  style={{
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    margin: 0,
                  }}
                >
                  Método de Entrega
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {/* Pickup option */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    background: shippingMethod === 'pickup' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${shippingMethod === 'pickup' ? '#FFFFFF' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="pickup"
                      checked={shippingMethod === 'pickup'}
                      onChange={() => setShippingMethod('pickup')}
                      style={{ accentColor: '#FFFFFF' }}
                    />
                    <Store size={18} color="#FFFFFF" />
                    <div>
                      <p style={{ margin: 0, color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                        Retiro en Local Sussan Boutique
                      </p>
                      <p style={{ margin: 0, color: '#9CA3AF', fontSize: '0.72rem' }}>
                        Sarmiento 1080 - local 16, San Jorge, Santa Fe • Inmediato
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10B981' }}>GRATIS</span>
                </label>

                {/* Local Delivery */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    background: shippingMethod === 'local' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${shippingMethod === 'local' ? '#FFFFFF' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="local"
                      checked={shippingMethod === 'local'}
                      onChange={() => setShippingMethod('local')}
                      style={{ accentColor: '#FFFFFF' }}
                    />
                    <Truck size={18} color="#FFFFFF" />
                    <div>
                      <p style={{ margin: 0, color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                        Envío Local - San Jorge y Alrededores
                      </p>
                      <p style={{ margin: 0, color: '#9CA3AF', fontSize: '0.72rem' }}>
                        24 a 48 hs hábiles
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {formatPrice(config?.shipping?.local?.price || 3000)}
                  </span>
                </label>

                {/* National Delivery */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    background: shippingMethod === 'national' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${shippingMethod === 'national' ? '#FFFFFF' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="national"
                      checked={shippingMethod === 'national'}
                      onChange={() => setShippingMethod('national')}
                      style={{ accentColor: '#FFFFFF' }}
                    />
                    <Truck size={18} color="#FFFFFF" />
                    <div>
                      <p style={{ margin: 0, color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                        Envío Nacional (Correo Argentino / Andreani)
                      </p>
                      <p style={{ margin: 0, color: '#9CA3AF', fontSize: '0.72rem' }}>
                        A todo el país (3 a 6 días)
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {formatPrice(config?.shipping?.national?.price || 6500)}
                  </span>
                </label>
              </div>

              {/* Address inputs if not pickup */}
              {shippingMethod !== 'pickup' && (
                <div style={{ marginTop: '0.9rem', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.8rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                      Dirección de entrega (Calle, Altura, Piso/Depto) *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required={shippingMethod !== 'pickup'}
                      placeholder="Ej: Av. Illia 450, Piso 3 Depto B"
                      value={formData.address}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                      Ciudad / Localidad *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required={shippingMethod !== 'pickup'}
                      value={formData.city}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#9CA3AF', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                      Código Postal
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      style={inputStyle}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment Method */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    color: '#000000',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  3
                </div>
                <h4
                  style={{
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    margin: 0,
                  }}
                >
                  Forma de Pago
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {/* 1. Mercado Pago */}
                <div
                  onClick={() => handleSelectPaymentMethod('mercadopago')}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: paymentMethod === 'mercadopago' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${paymentMethod === 'mercadopago' ? '#FFFFFF' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mercadopago"
                    checked={paymentMethod === 'mercadopago'}
                    onChange={() => handleSelectPaymentMethod('mercadopago')}
                    style={{ marginTop: '3px', accentColor: '#FFFFFF' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700 }}>
                          Mercado Pago
                        </span>
                        <span style={{ color: '#9CA3AF', fontSize: '0.76rem' }}>
                          (Crédito, Débito y Efectivo)
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span
                          style={{
                            background: '#009EE3',
                            color: '#FFFFFF',
                            fontSize: '0.62rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            letterSpacing: '0.05em',
                          }}
                        >
                          MERCADO PAGO
                        </span>
                      </div>
                    </div>
                    <p style={{ margin: '0.3rem 0 0.4rem', color: '#9CA3AF', fontSize: '0.74rem' }}>
                      Hasta 6 cuotas con bancos seleccionados y hasta 24 cuotas con todas las tarjetas. Acreditación instantánea.
                    </p>

                    {/* Logos discretos de tarjetas y medios incluidos */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '0.5rem 0 0.4rem', flexWrap: 'wrap' }}>
                      {/* Mercado Pago */}
                      <span title="Mercado Pago" style={{ background: '#009EE3', borderRadius: '4px', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', height: '20px' }}>
                        <svg width="18" height="12" viewBox="0 0 100 70" fill="none">
                          <path d="M68.5 28.5c-2.8-2.8-7.8-2.8-10.6 0l-16 16-5.3-5.3c-2.8-2.8-7.8-2.8-10.6 0s-2.8 7.8 0 10.6l10.6 10.6c2.8 2.8 7.8 2.8 10.6 0l21.3-21.3c2.9-2.9 2.9-7.8 0-10.6z" fill="#FFFFFF" />
                        </svg>
                      </span>
                      {/* Visa */}
                      <span title="Visa" style={{ background: '#FFF', borderRadius: '4px', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', height: '20px' }}>
                        <svg width="26" height="9" viewBox="0 0 100 32" fill="#1434CB">
                          <path d="M38.5 2.5L25.3 30.5H16.8L10.3 8.3C9.9 6.8 9.5 6.2 8.3 5.4C6.3 4.2 3 3.1 0 2.5L0.2 1.3H14.5C16.3 1.3 18 2.6 18.4 4.8L21.9 23.3L30.1 2.5H38.5ZM72.6 21.6C72.7 13.4 60.9 12.9 61 9.2C61.1 7.9 62.3 6.6 65 6.2C66.4 6 70.1 5.8 74 7.6L75.5 0.9C73.4 0.2 70.7 0 67.2 0C59 0 53.2 4.4 53.1 10.6C53 15.3 57.2 17.9 60.4 19.5C63.6 21.1 64.7 22.1 64.7 23.6C64.6 25.8 62 26.8 59.5 26.8C55.4 26.8 53 26.1 49.3 24.5L47.7 31.5C49.9 32.5 53.9 33.3 58.1 33.3C66.8 33.3 72.5 29 72.6 21.6ZM93.4 30.5H100L94.3 2.5H88.3C87 2.5 85.9 3.2 85.4 4.4L73 30.5H81.3L83 25.8H92.3L93.4 30.5ZM85.2 19.7L88.9 9.3L91 19.7H85.2ZM51.3 2.5L44.7 30.5H36.9L43.5 2.5H51.3Z" />
                        </svg>
                      </span>
                      {/* Mastercard */}
                      <span title="Mastercard" style={{ background: '#FFF', borderRadius: '4px', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', height: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '22px', height: '14px' }}>
                          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#EB001B', position: 'absolute', left: 0 }} />
                          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#F79E1B', position: 'absolute', right: 0, opacity: 0.92 }} />
                        </div>
                      </span>
                      {/* Cabal */}
                      <span title="Cabal" style={{ background: '#005CA9', borderRadius: '4px', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', height: '20px' }}>
                        <svg width="24" height="10" viewBox="0 0 70 28" fill="none">
                          <path d="M6 14L14 6L16.5 8.5L11 14L16.5 19.5L14 22L6 14Z" fill="#FFFFFF" />
                          <path d="M26 14L18 6L15.5 8.5L21 14L15.5 19.5L18 22L26 14Z" fill="#FFFFFF" />
                          <path d="M34 8C30.5 8 28 10.7 28 14.2C28 17.7 30.5 20.4 34 20.4C36.8 20.4 38.8 19 39.5 16.8H36.7C36.2 17.7 35.2 18.2 34 18.2C32.1 18.2 30.8 16.7 30.8 14.2C30.8 11.7 32.1 10.2 34 10.2C35.2 10.2 36.2 10.7 36.7 11.6H39.5C38.8 9.4 36.8 8 34 8Z" fill="#FFFFFF" />
                          <path d="M43.5 8.3H40.8L44.8 20.1H47.8L51.8 8.3H49.1L46.3 17.2L43.5 8.3Z" fill="#FFFFFF" />
                          <path d="M53 8.3H55.8V17.9H61V20.1H53V8.3Z" fill="#FFFFFF" />
                        </svg>
                      </span>
                      {/* Diners Club */}
                      <span title="Diners Club" style={{ background: '#FFF', borderRadius: '4px', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', height: '20px' }}>
                        <svg width="20" height="13" viewBox="0 0 40 25" fill="none">
                          <rect width="40" height="25" rx="3" fill="#FFFFFF" />
                          <circle cx="20" cy="12.5" r="9" stroke="#004B87" strokeWidth="2.5" fill="none" />
                          <path d="M20 4V21" stroke="#004B87" strokeWidth="2.5" />
                          <path d="M14 8C14 8 16 9.5 16 12.5C16 15.5 14 17 14 17" stroke="#004B87" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M26 8C26 8 24 9.5 24 12.5C24 15.5 26 17 26 17" stroke="#004B87" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                      {/* Argencard */}
                      <span title="Argencard" style={{ background: '#FFF', borderRadius: '4px', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', height: '20px' }}>
                        <svg width="18" height="13" viewBox="0 0 32 24" fill="none">
                          <rect x="5" y="4" width="14" height="14" rx="3" transform="rotate(45 12 11)" stroke="#D9252A" strokeWidth="3" fill="none" />
                          <path d="M16 7L24 15" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      </span>
                      {/* Naranja X */}
                      <span title="Naranja X" style={{ background: '#FFF', borderRadius: '4px', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', height: '20px' }}>
                        <svg width="22" height="13" viewBox="0 0 45 25" fill="none">
                          <circle cx="12" cy="12.5" r="10" fill="#FF5A00" />
                          <path d="M8 8V17M8 8L16 17M16 8V17" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M28 6L38 19M38 6L28 19" stroke="#5B2C6F" strokeWidth="3.2" strokeLinecap="round" />
                        </svg>
                      </span>
                      {/* American Express */}
                      <span title="American Express" style={{ background: '#0070CE', borderRadius: '4px', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', height: '20px' }}>
                        <svg width="24" height="12" viewBox="0 0 60 30" fill="none">
                          <rect width="60" height="30" rx="3" fill="#0070CE" />
                          <path d="M7 23L12 8H17L22 23H17.5L16.2 19H12.8L11.5 23H7ZM13.8 15.5H15.2L14.5 12.5L13.8 15.5Z" fill="#FFFFFF" />
                          <path d="M22.5 8H26.5L30 16L33.5 8H37.5V23H34V13.5L30.8 20.5H29.2L26 13.5V23H22.5V8Z" fill="#FFFFFF" />
                          <path d="M39 8H48.5V11.5H42.5V13.8H47.5V17H42.5V19.5H48.5V23H39V8Z" fill="#FFFFFF" />
                          <path d="M49 8H53L55.5 12.5L58 8H62L58 15.5L62 23H58L55.5 18.5L53 23H49L53 15.5L49 8Z" fill="#FFFFFF" />
                        </svg>
                      </span>
                      {/* MODO */}
                      <span title="MODO" style={{ background: '#00D1B2', borderRadius: '4px', padding: '2px 6px', display: 'inline-flex', alignItems: 'center', height: '20px' }}>
                        <svg width="24" height="12" viewBox="0 0 60 28" fill="none">
                          <rect width="60" height="28" rx="3" fill="#00D1B2" />
                          <path d="M8 20V8L14 15L20 8V20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="28" cy="14" r="5" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                          <path d="M38 8V20C42 20 45 17.5 45 14C45 10.5 42 8 38 8Z" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                          <circle cx="52" cy="14" r="5" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                        </svg>
                      </span>
                    </div>

                    {/* Botón desplegable para ver detalle de cuotas y bancos */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowInstallmentsDetail((prev) => !prev);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#38BDF8',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: '0.2rem 0',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'underline',
                      }}
                    >
                      <span>{showInstallmentsDetail ? 'Ocultar detalle de cuotas y bancos' : 'Ver detalle de cuotas'}</span>
                      {showInstallmentsDetail ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {showInstallmentsDetail && (
                      <div style={{ marginTop: '0.8rem', animation: 'fadeIn 0.2s ease' }}>
                        <PaymentMethodsShowcase />
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Transferencia Bancaria */}
                <div
                  onClick={() => handleSelectPaymentMethod('transferencia')}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: paymentMethod === 'transferencia' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${paymentMethod === 'transferencia' ? '#FFFFFF' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transferencia"
                    checked={paymentMethod === 'transferencia'}
                    onChange={() => handleSelectPaymentMethod('transferencia')}
                    style={{ marginTop: '3px', accentColor: '#FFFFFF' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700 }}>
                        Transferencia Bancaria o Débito
                      </span>
                      <span
                        style={{
                          background: '#10B981',
                          color: '#000000',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        20% OFF
                      </span>
                    </div>
                    <p style={{ margin: '0.3rem 0 0', color: '#9CA3AF', fontSize: '0.74rem' }}>
                      20% OFF transferencia o débito en todas tus compras online.
                    </p>

                    {paymentMethod === 'transferencia' && (
                      <div
                        style={{
                          marginTop: '0.8rem',
                          padding: '0.8rem',
                          background: 'rgba(0,0,0,0.5)',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.15)',
                          fontSize: '0.75rem',
                          lineHeight: 1.6,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span style={{ color: '#9CA3AF' }}>Alias Bancario:</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <strong style={{ color: '#FFFFFF' }}>{config?.bankDetails?.alias || 'SUSSAN.BOUTIQUE'}</strong>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyAlias();
                              }}
                              style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '2px 6px',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                                fontSize: '0.68rem',
                              }}
                            >
                              {copiedAlias ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                              <span>{copiedAlias ? 'Copiado' : 'Copiar'}</span>
                            </button>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                          <span>CBU:</span>
                          <span style={{ color: '#FFFFFF' }}>{config?.bankDetails?.cbu || '0000003100098472910482'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                          <span>Titular:</span>
                          <span style={{ color: '#FFFFFF' }}>{config?.bankDetails?.accountHolder || 'Sussan Boutique'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Billeteras Virtuales (MODO, Ualá, etc.) */}
                <div
                  onClick={() => handleSelectPaymentMethod('billeteras_virtuales')}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: paymentMethod === 'billeteras_virtuales' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${paymentMethod === 'billeteras_virtuales' ? '#FFFFFF' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="billeteras_virtuales"
                    checked={paymentMethod === 'billeteras_virtuales'}
                    onChange={() => handleSelectPaymentMethod('billeteras_virtuales')}
                    style={{ marginTop: '3px', accentColor: '#FFFFFF' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700 }}>
                        Billeteras Virtuales (MODO, Ualá, Personal Pay, etc.)
                      </span>
                      <span
                        style={{
                          background: '#00D1B2',
                          color: '#FFFFFF',
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          letterSpacing: '0.05em',
                        }}
                      >
                        MODO / QR / CVU
                      </span>
                    </div>
                    <p style={{ margin: '0.3rem 0 0', color: '#9CA3AF', fontSize: '0.74rem' }}>
                      Transferencia inmediata por Alias / CVU o QR desde cualquier billetera virtual (MODO, Ualá, Personal Pay, Cuenta DNI, Mercado Pago).
                    </p>

                    {paymentMethod === 'billeteras_virtuales' && (
                      <div
                        style={{
                          marginTop: '0.8rem',
                          padding: '0.8rem',
                          background: 'rgba(0,0,0,0.5)',
                          borderRadius: '8px',
                          border: '1px solid rgba(0,209,178,0.25)',
                          fontSize: '0.75rem',
                          lineHeight: 1.6,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span style={{ color: '#9CA3AF' }}>Alias CVU / Billeteras:</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <strong style={{ color: '#00D1B2' }}>{config?.bankDetails?.alias || 'SUSSAN.BOUTIQUE'}</strong>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyWalletAlias();
                              }}
                              style={{
                                background: 'rgba(0,209,178,0.15)',
                                border: '1px solid rgba(0,209,178,0.3)',
                                borderRadius: '4px',
                                padding: '2px 6px',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                                fontSize: '0.68rem',
                              }}
                            >
                              {copiedWalletAlias ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                              <span>{copiedWalletAlias ? 'Copiado' : 'Copiar'}</span>
                            </button>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                          <span>CVU Interoperable:</span>
                          <span style={{ color: '#FFFFFF' }}>0000003100098472910482</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                          <span>Titular:</span>
                          <span style={{ color: '#FFFFFF' }}>Sussan Boutique</span>
                        </div>
                        <p style={{ margin: '0.4rem 0 0', fontSize: '0.7rem', color: '#9CA3AF', fontStyle: 'italic' }}>
                          💡 Transferí desde la app que elijas y podés enviar el comprobante por WhatsApp para agilizar el despacho.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Efectivo (pago al retirar) */}
                <div
                  onClick={() => handleSelectPaymentMethod('efectivo')}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: paymentMethod === 'efectivo' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${paymentMethod === 'efectivo' ? '#FFFFFF' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="efectivo"
                    checked={paymentMethod === 'efectivo'}
                    onChange={() => handleSelectPaymentMethod('efectivo')}
                    style={{ marginTop: '3px', accentColor: '#FFFFFF' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700 }}>
                        Efectivo (Pago al Retirar en Local)
                      </span>
                      <span
                        style={{
                          background: '#F59E0B',
                          color: '#000000',
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          letterSpacing: '0.05em',
                        }}
                      >
                        SOLO RETIRO
                      </span>
                    </div>
                    <p style={{ margin: '0.3rem 0 0', color: '#9CA3AF', fontSize: '0.74rem' }}>
                      Aboná en efectivo billete al momento de retirar tus productos en nuestro local de San Jorge. <strong style={{ color: '#FBBF24' }}>No aplica para envíos a domicilio, solo retiro en persona.</strong>
                    </p>

                    {paymentMethod === 'efectivo' && (
                      <div
                        style={{
                          marginTop: '0.8rem',
                          padding: '0.8rem',
                          background: 'rgba(245,158,11,0.06)',
                          borderRadius: '8px',
                          border: '1px solid rgba(245,158,11,0.25)',
                          fontSize: '0.75rem',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.6rem',
                        }}
                      >
                        <Store size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: '#FFFFFF' }}>
                            Local Sussan Boutique • Sarmiento 1080 - local 16, San Jorge, Santa Fe
                          </p>
                          <p style={{ margin: '0.2rem 0 0', color: '#9CA3AF', fontSize: '0.72rem' }}>
                            Tus productos quedarán reservados a tu nombre por 48 hs para que pases a abonar y retirar en persona.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. WhatsApp */}
                <div
                  onClick={() => handleSelectPaymentMethod('whatsapp')}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    background: paymentMethod === 'whatsapp' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${paymentMethod === 'whatsapp' ? '#FFFFFF' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="whatsapp"
                    checked={paymentMethod === 'whatsapp'}
                    onChange={() => handleSelectPaymentMethod('whatsapp')}
                    style={{ marginTop: '3px', accentColor: '#FFFFFF' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 700 }}>
                        Confirmar y Coordinar por WhatsApp
                      </span>
                      <span
                        style={{
                          background: '#25D366',
                          color: '#FFFFFF',
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        WHATSAPP
                      </span>
                    </div>
                    <p style={{ margin: '0.3rem 0 0', color: '#9CA3AF', fontSize: '0.74rem' }}>
                      Tu pedido se registra en la tienda y se abre un chat de WhatsApp con el resumen listo para coordinar el pago o retiro con una asesora.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Confirm Button (Sticky on Desktop) */}
          <div
            className="checkout-summary-col"
            style={{
              padding: '1.8rem',
              background: 'rgba(255, 255, 255, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              alignSelf: 'start',
            }}
          >
            <div>
              <h4
                className="font-serif"
                style={{
                  color: '#FFFFFF',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '1.2rem',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  paddingBottom: '0.6rem',
                }}
              >
                Resumen del Pedido
              </h4>

              {/* Items preview */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  paddingRight: '0.4rem',
                  marginBottom: '1.2rem',
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.8rem',
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: '42px',
                        height: '48px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                        flexShrink: 0,
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, color: '#FFFFFF', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </p>
                      <p style={{ margin: 0, color: '#9CA3AF', fontSize: '0.72rem' }}>
                        Cant: {item.quantity} • Talle: {item.selectedSize || 'U'}
                      </p>
                    </div>
                    <span style={{ fontWeight: 700, color: '#FFFFFF', flexShrink: 0 }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '1rem',
                  fontSize: '0.82rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                  <span>Subtotal prendas</span>
                  <span style={{ color: '#FFFFFF' }}>{formatPrice(cartSubtotal)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                  <span>Costo de entrega ({shippingOption.name.split('-')[0]})</span>
                  <span style={{ color: shippingCost === 0 ? '#10B981' : '#FFFFFF' }}>
                    {shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                    <span>Descuento Transferencia / Débito (-20%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                    paddingTop: '0.9rem',
                    marginTop: '0.4rem',
                  }}
                >
                  <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    Total a Pagar
                  </span>
                  <span
                    className="font-serif"
                    style={{ color: '#FFFFFF', fontSize: '1.6rem', fontWeight: 700 }}
                  >
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button
                type="submit"
                disabled={isProcessing}
                className="gold-pill-btn"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.92rem',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 8px 30px var(--vadano-primary-glow)',
                  background: 'var(--vadano-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 800,
                  cursor: isProcessing ? 'wait' : 'pointer',
                  opacity: isProcessing ? 0.7 : 1,
                  transition: 'all 0.2s ease',
                }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>PROCESANDO PEDIDO...</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={18} />
                    <span>PAGAR</span>
                  </>
                )}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: '#6B7280', fontSize: '0.72rem' }}>
                <ShieldCheck size={14} color="#FFFFFF" />
                <span>Tus datos están protegidos con encriptación SSL</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Floating Desktop Navigation Controls (Subir y Bajar) */}
      <div
        className="modal-scroll-nav-controls"
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '-56px',
          zIndex: 3700,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {/* Scroll Up Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            formScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Volver arriba"
          title="Volver arriba"
          style={{
            background: 'rgba(0, 0, 0, 0.88)',
            border: '1.5px solid var(--vadano-primary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.3)',
            transition: 'all 0.2s ease',
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--vadano-primary)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.88)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <ChevronUp size={18} />
        </button>

        {/* Scroll Down Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (formScrollRef.current) {
              formScrollRef.current.scrollTo({ top: formScrollRef.current.scrollHeight, behavior: 'smooth' });
            }
          }}
          aria-label="Desplazarse hacia abajo"
          title="Desplazarse hacia abajo"
          style={{
            background: 'rgba(0, 0, 0, 0.88)',
            border: '1.5px solid var(--vadano-primary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 255, 255, 0.3)',
            transition: 'all 0.2s ease',
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--vadano-primary)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(2px) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.88)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </div>

      <style>{`
        @media (max-width: 1040px) {
          .modal-scroll-nav-controls {
            display: none !important;
          }
        }
        @media (max-width: 800px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
          .checkout-summary-col {
            position: static !important;
            border-top: 1px solid rgba(255, 255, 255, 0.12);
          }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '0.84rem',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};
