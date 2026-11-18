// src/components/OrderSuccessModal.jsx
import React from 'react';
import { CheckCircle2, PackageCheck, MessageCircle, ArrowRight, Printer, MapPin, CreditCard, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function OrderSuccessModal() {
  const { completedOrder, setCompletedOrder, config } = useStore();

  if (!completedOrder) return null;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);
  };

  const handleClose = () => {
    setCompletedOrder(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppContact = () => {
    const phoneNum = '5493844419650';
    const text = `*¡Hola Óptica Ribes Bandera!* Consulto por el estado de mi pedido *%23${completedOrder.id}* realizado a nombre de *${completedOrder.customer.fullName}*.`;
    if (!phoneNum) return;
    window.open(`https://wa.me/${phoneNum}?text=${text}`, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3700,
        background: 'rgba(0, 0, 0, 0.92)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.2rem',
        animation: 'fadeIn 0.25s ease',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          background: '#000000',
          border: '1px solid var(--vadano-primary)',
          borderRadius: '22px',
          width: '100%',
          maxWidth: '650px',
          padding: '2.5rem',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 35px var(--vadano-primary-glow)',
          position: 'relative',
          animation: 'slideUp 0.35s ease',
          color: '#FFFFFF',
        }}
      >
        {/* Success Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'rgba(217, 61, 98, 0.15)',
              border: '2px solid var(--vadano-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: 'var(--vadano-primary)',
              boxShadow: '0 0 30px var(--vadano-primary-glow)',
            }}
          >
            <CheckCircle2 size={38} />
          </div>
          <p
            style={{
              color: 'var(--vadano-primary)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              margin: '0 0 0.4rem',
            }}
          >
            ¡COMPRA CONFIRMADA!
          </p>
          <h2
            className="font-serif"
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Pedido #{completedOrder.id}
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '0.86rem', marginTop: '0.4rem' }}>
            Hemos recibido tu pedido y ya está registrado en nuestro local de San Jorge, Santa Fe.
          </p>
        </div>

        {/* Order Details Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '1.4rem',
            marginBottom: '1.8rem',
            fontSize: '0.84rem',
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '0.8rem',
              marginBottom: '0.8rem',
            }}
          >
            <div>
              <span style={{ color: '#9CA3AF', fontSize: '0.72rem', textTransform: 'uppercase' }}>Comprador</span>
              <p style={{ margin: 0, fontWeight: 700, color: '#FFFFFF' }}>{completedOrder.customer.fullName}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: '#9CA3AF', fontSize: '0.72rem', textTransform: 'uppercase' }}>Estado</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: completedOrder.paymentStatus === 'pagado' ? '#10B981' : '#F59E0B',
                  }}
                />
                <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.76rem' }}>
                  {completedOrder.status}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '0.8rem' }}>
            {completedOrder.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '32px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                  <span>
                    {item.quantity}x {item.name} <small style={{ color: '#9CA3AF' }}>(Talle {item.selectedSize || 'U'})</small>
                  </span>
                </div>
                <span style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Delivery & Payment Info */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '0.8rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.8rem',
              color: '#9CA3AF',
              fontSize: '0.78rem',
            }}
          >
            <div>
              <span style={{ color: '#FFFFFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} /> Entrega:
              </span>
              <p style={{ margin: '2px 0 0' }}>{completedOrder.shippingTitle || 'Retiro en Local'}</p>
            </div>
            <div>
              <span style={{ color: '#FFFFFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CreditCard size={13} /> Pago:
              </span>
              <p style={{ margin: '2px 0 0', textTransform: 'capitalize' }}>
                {completedOrder.paymentMethod === 'mercadopago'
                  ? 'Mercado Pago (Acreditado)'
                  : completedOrder.paymentMethod === 'tarjeta_directa'
                  ? 'Tarjeta Directa (Acreditado)'
                  : completedOrder.paymentMethod === 'transferencia'
                  ? 'Transferencia Bancaria'
                  : completedOrder.paymentMethod === 'billeteras_virtuales'
                  ? 'Billeteras Virtuales (MODO / Ualá)'
                  : completedOrder.paymentMethod === 'efectivo'
                  ? 'Efectivo al Retirar en Local'
                  : 'Coordinar por WhatsApp'}
              </p>
            </div>
          </div>

          {/* Total */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              marginTop: '0.8rem',
              paddingTop: '0.8rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>
              {completedOrder.paymentStatus === 'pagado' ? 'Total Abonado' : 'Total a Abonar'}
            </span>
            <span className="font-serif" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>
              {formatPrice(completedOrder.total)}
            </span>
          </div>
        </div>

        {/* Transfer / Virtual Wallet Payment Instructions */}
        {(completedOrder.paymentMethod === 'transferencia' || completedOrder.paymentMethod === 'billeteras_virtuales') && (
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '14px',
              padding: '1.2rem',
              marginBottom: '1.5rem',
              fontSize: '0.82rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', color: '#10B981', fontWeight: 700 }}>
              <CheckCircle2 size={16} />
              <span>
                {completedOrder.paymentMethod === 'transferencia'
                  ? 'Datos para realizar la Transferencia Bancaria:'
                  : 'Datos para transferir desde tu Billetera Virtual:'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: '#E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9CA3AF' }}>Alias:</span>
                <strong style={{ color: '#10B981' }}>{config?.bankDetails?.alias || 'SUSSAN.BOUTIQUE'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9CA3AF' }}>CBU / CVU:</span>
                <span style={{ color: '#FFFFFF' }}>{config?.bankDetails?.cbu || '0000003100098472910482'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#9CA3AF' }}>Titular:</span>
                <span style={{ color: '#FFFFFF' }}>{config?.bankDetails?.accountHolder || 'Sussan Boutique'}</span>
              </div>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.74rem', color: '#9CA3AF', fontStyle: 'italic' }}>
                💡 Por favor envianos el comprobante por WhatsApp para preparar y despachar tu pedido.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={handleWhatsAppContact}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: '#25D366',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              transition: 'filter 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
          >
            <MessageCircle size={18} />
            <span>Consultar Pedido por WhatsApp</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              style={{
                flex: 1,
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50px',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
              }}
            >
              <Printer size={15} />
              <span>Imprimir Recibo</span>
            </button>

            <button
              onClick={handleClose}
              className="gold-pill-btn"
              style={{
                flex: 1.2,
                padding: '0.75rem',
                fontSize: '0.78rem',
              }}
            >
              <span>SEGUIR COMPRANDO</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
