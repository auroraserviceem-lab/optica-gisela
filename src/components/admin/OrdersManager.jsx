// src/components/admin/OrdersManager.jsx
import React, { useState } from 'react';
import {
  Search,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Building2,
  Wallet,
  Banknote,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

// Official WhatsApp Vector Icon
const WhatsAppIcon = ({ size = 16, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function OrdersManager() {
  const { orders, updateOrderStatus, config, showToast } = useStore();

  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return '-';
    const d = new Date(isoStr);
    return `${d.toLocaleDateString('es-AR')} ${d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'entregado':
        return { bg: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '#10B981', label: 'ENTREGADO' };
      case 'enviado':
        return { bg: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', border: '#3B82F6', label: 'ENVIADO' };
      case 'pagado':
        return { bg: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA', border: '#8B5CF6', label: 'PAGADO' };
      case 'cancelado':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: '#EF4444', border: '#EF4444', label: 'CANCELADO' };
      default:
        return { bg: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', border: '#F59E0B', label: 'PENDIENTE' };
    }
  };

  const handleWhatsAppCustomer = (order) => {
    if (!order.customer?.phone) {
      showToast('Este pedido no tiene número de teléfono registrado.', 'error');
      return;
    }
    const rawPhone = order.customer.phone.replace(/[^0-9]/g, '');
    const itemsList = (order.items || []).map((i) => `• ${i.quantity}x ${i.name}`).join('\n');
    const text = `¡Hola ${order.customer.fullName}! Te escribimos del equipo de *Juana Calzados* respecto a tu pedido *#${order.id}*.\n\nDetalle:\n${itemsList}\nTotal: ${formatPrice(order.total)}\n\n¿Tenés alguna consulta sobre el estado o entrega de tu pedido?`;
    window.open(`https://wa.me/${rawPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Render Payment Method Badge with Icon
  const renderPaymentMethod = (method) => {
    if (method === 'mercadopago') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.74rem',
            fontWeight: 600,
            color: '#009EE3',
            background: 'rgba(0, 158, 227, 0.1)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(0, 158, 227, 0.3)',
          }}
        >
          <CreditCard size={13} color="#009EE3" />
          <span>Mercado Pago</span>
        </span>
      );
    }
    if (method === 'tarjeta_directa') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.74rem',
            fontWeight: 600,
            color: '#C084FC',
            background: 'rgba(168, 85, 247, 0.1)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
          }}
        >
          <CreditCard size={13} color="#C084FC" />
          <span>Tarjeta Directa</span>
        </span>
      );
    }
    if (method === 'billeteras_virtuales') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.74rem',
            fontWeight: 600,
            color: '#22D3EE',
            background: 'rgba(6, 182, 212, 0.1)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(6, 182, 212, 0.3)',
          }}
        >
          <Wallet size={13} color="#22D3EE" />
          <span>Billetera (MODO/Ualá)</span>
        </span>
      );
    }
    if (method === 'efectivo') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.74rem',
            fontWeight: 600,
            color: '#F59E0B',
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <Banknote size={13} color="#F59E0B" />
          <span>Efectivo al Retirar</span>
        </span>
      );
    }
    if (method === 'whatsapp') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.74rem',
            fontWeight: 600,
            color: '#25D366',
            background: 'rgba(37, 211, 102, 0.1)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(37, 211, 102, 0.3)',
          }}
        >
          <WhatsAppIcon size={13} color="#25D366" />
          <span>WhatsApp</span>
        </span>
      );
    }
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '0.74rem',
          fontWeight: 600,
          color: '#10B981',
          background: 'rgba(16, 185, 129, 0.1)',
          padding: '3px 8px',
          borderRadius: '6px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        }}
      >
        <Building2 size={13} color="#10B981" />
        <span>Transferencia</span>
      </span>
    );
  };

  // Calculate status counts for filter tabs
  const statusCounts = {
    todos: orders.length,
    pendiente: orders.filter((o) => o.status === 'pendiente').length,
    pagado: orders.filter((o) => o.status === 'pagado').length,
    enviado: orders.filter((o) => o.status === 'enviado').length,
    entregado: orders.filter((o) => o.status === 'entregado').length,
    cancelado: orders.filter((o) => o.status === 'cancelado').length,
  };

  // Filters
  const filteredOrders = orders.filter((o) => {
    const matchStatus = selectedStatus === 'todos' || o.status === selectedStatus;
    const matchSearch =
      !search.trim() ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.email?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.phone?.includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <div>
      {/* Filters & Search bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.2rem',
        }}
      >
        {/* Status Tabs with Live Badges */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'pendiente', label: 'Pendientes' },
            { id: 'pagado', label: 'Pagados' },
            { id: 'enviado', label: 'Enviados' },
            { id: 'entregado', label: 'Entregados' },
            { id: 'cancelado', label: 'Cancelados' },
          ].map((tab) => {
            const isSelected = selectedStatus === tab.id;
            const count = statusCounts[tab.id] || 0;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.48rem 0.85rem',
                  borderRadius: '10px',
                  background: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#000000' : '#9CA3AF',
                  border: `1px solid ${isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.1)'}`,
                  fontSize: '0.78rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(255, 255, 255, 0.15)' : 'none',
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    background: isSelected ? '#000000' : 'rgba(255, 255, 255, 0.1)',
                    color: isSelected ? '#FFFFFF' : '#D1D5DB',
                    fontSize: '0.66rem',
                    fontWeight: 800,
                    borderRadius: '12px',
                    padding: '1px 6px',
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modern Search */}
        <div style={{ position: 'relative', width: '280px', minWidth: '220px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Buscar por ID, cliente, tel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 2.2rem 0.55rem 2.2rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '10px',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--vadano-primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.14)')}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#9CA3AF',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <th style={{ padding: '0.9rem 1.1rem', color: '#9CA3AF', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pedido</th>
                <th style={{ padding: '0.9rem 1.1rem', color: '#9CA3AF', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fecha</th>
                <th style={{ padding: '0.9rem 1.1rem', color: '#9CA3AF', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Comprador</th>
                <th style={{ padding: '0.9rem 1.1rem', color: '#9CA3AF', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Método Pago</th>
                <th style={{ padding: '0.9rem 1.1rem', color: '#9CA3AF', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total</th>
                <th style={{ padding: '0.9rem 1.1rem', color: '#9CA3AF', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Estado</th>
                <th style={{ padding: '0.9rem 1.1rem', color: '#9CA3AF', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '3rem 1.5rem', textAlign: 'center', color: '#9CA3AF' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1rem', color: '#D1D5DB' }}>No se encontraron pedidos</span>
                      <span style={{ fontSize: '0.76rem' }}>Probá cambiando los filtros o el término de búsqueda.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const badge = getStatusBadge(order.status);
                  return (
                    <tr
                      key={order.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {/* ID */}
                      <td style={{ padding: '0.95rem 1.1rem' }}>
                        <span style={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em', fontSize: '0.86rem' }}>
                          #{order.id}
                        </span>
                        <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '2px' }}>
                          {order.items?.length || 0} {order.items?.length === 1 ? 'modelo' : 'modelos'}
                        </div>
                      </td>

                      {/* Fecha */}
                      <td style={{ padding: '0.95rem 1.1rem', color: '#9CA3AF', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Cliente */}
                      <td style={{ padding: '0.95rem 1.1rem' }}>
                        <p style={{ margin: 0, fontWeight: 700, color: '#FFFFFF', fontSize: '0.84rem' }}>{order.customer?.fullName || 'Cliente'}</p>
                        <p style={{ margin: '1px 0 0', fontSize: '0.72rem', color: '#9CA3AF' }}>{order.customer?.phone || '-'}</p>
                      </td>

                      {/* Pago con Icono Visual */}
                      <td style={{ padding: '0.95rem 1.1rem' }}>
                        {renderPaymentMethod(order.paymentMethod)}
                      </td>

                      {/* Total */}
                      <td style={{ padding: '0.95rem 1.1rem' }}>
                        <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.9rem' }}>{formatPrice(order.total)}</span>
                      </td>

                      {/* Estado */}
                      <td style={{ padding: '0.95rem 1.1rem' }}>
                        <span
                          style={{
                            background: badge.bg,
                            color: badge.color,
                            border: `1px solid ${badge.border}`,
                            padding: '3px 10px',
                            borderRadius: '20px',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            letterSpacing: '0.05em',
                            display: 'inline-block',
                          }}
                        >
                          {badge.label}
                        </span>
                      </td>

                      {/* Acciones */}
                      <td style={{ padding: '0.95rem 1.1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.45rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                          <button
                            onClick={() => handleWhatsAppCustomer(order)}
                            title="Abrir chat de WhatsApp con el comprador"
                            style={{
                              background: '#25D366',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '7px 10px',
                              color: '#FFFFFF',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 2px 10px rgba(37, 211, 102, 0.3)',
                              transition: 'transform 0.15s ease, filter 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.filter = 'brightness(1.15)';
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.filter = 'brightness(1)';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            <WhatsAppIcon size={16} color="#FFFFFF" />
                          </button>

                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="gold-pill-btn"
                            style={{
                              padding: '0.42rem 0.85rem',
                              fontSize: '0.72rem',
                              letterSpacing: '0.04em',
                            }}
                          >
                            DETALLE
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 4200,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedOrder(null);
          }}
        >
          <div
            style={{
              background: '#0d0d0d',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.2rem',
              boxShadow: '0 25px 70px rgba(0,0,0,0.95), 0 0 20px rgba(255, 255, 255, 0.15)',
              position: 'relative',
              animation: 'slideUp 0.25s ease',
              color: '#FFFFFF',
            }}
          >
            <button
              onClick={() => setSelectedOrder(null)}
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

            {/* Header */}
            <div style={{ marginBottom: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#FFFFFF', margin: 0, textTransform: 'uppercase' }}>
                  Pedido #{selectedOrder.id}
                </h3>
                <span
                  style={{
                    background: getStatusBadge(selectedOrder.status).bg,
                    color: getStatusBadge(selectedOrder.status).color,
                    border: `1px solid ${getStatusBadge(selectedOrder.status).border}`,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                  }}
                >
                  {getStatusBadge(selectedOrder.status).label}
                </span>
              </div>
              <p style={{ margin: '0.3rem 0 0', fontSize: '0.78rem', color: '#9CA3AF' }}>
                Registrado el {formatDate(selectedOrder.createdAt)}
              </p>
            </div>

            {/* Change Status Fast Selector */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                padding: '0.9rem 1rem',
                marginBottom: '1.4rem',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.8rem',
              }}
            >
              <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Actualizar Estado:
              </span>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      const updated = updateOrderStatus(selectedOrder.id, st);
                      setSelectedOrder(updated);
                    }}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: selectedOrder.status === st ? '#FFFFFF' : 'rgba(255,255,255,0.06)',
                      color: selectedOrder.status === st ? '#000000' : '#FFFFFF',
                      border: 'none',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Buyer & Shipping Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.4rem' }}>
              {/* Buyer Box */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontSize: '0.74rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.6rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <User size={14} color="var(--vadano-primary)" /> Datos del Comprador
                </h4>
                <p style={{ margin: '0 0 0.2rem', fontWeight: 700, color: '#FFFFFF', fontSize: '0.9rem' }}>{selectedOrder.customer?.fullName}</p>
                <p style={{ margin: '0 0 0.2rem', fontSize: '0.78rem', color: '#9CA3AF' }}>Email: {selectedOrder.customer?.email}</p>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.78rem', color: '#9CA3AF' }}>Tel: {selectedOrder.customer?.phone}</p>
                {selectedOrder.customer?.dni && <p style={{ margin: 0, fontSize: '0.74rem', color: '#9CA3AF' }}>DNI: {selectedOrder.customer?.dni}</p>}

                <button
                  onClick={() => handleWhatsAppCustomer(selectedOrder)}
                  style={{
                    marginTop: '0.75rem',
                    background: '#25D366',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <WhatsAppIcon size={14} color="#FFFFFF" />
                  <span>Escribir por WhatsApp</span>
                </button>
              </div>

              {/* Shipping & Delivery */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h4 style={{ fontSize: '0.74rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.6rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Truck size={14} color="var(--vadano-primary)" /> Entrega y Pago
                </h4>
                <p style={{ margin: '0 0 0.3rem', fontWeight: 600, color: '#FFFFFF', fontSize: '0.84rem' }}>
                  {selectedOrder.shippingTitle || selectedOrder.shippingMethod}
                </p>
                {selectedOrder.customer?.address ? (
                  <p style={{ margin: '0 0 0.2rem', fontSize: '0.78rem', color: '#9CA3AF' }}>
                    {selectedOrder.customer.address}, {selectedOrder.customer.city} (CP: {selectedOrder.customer.postalCode || '5700'})
                  </p>
                ) : (
                  <p style={{ margin: 0, fontSize: '0.76rem', color: '#10B981' }}>Retiro directo en local (Sarmiento 1080 - local 16, San Jorge)</p>
                )}
                {selectedOrder.customer?.notes && (
                  <p style={{ margin: '0.4rem 0 0', fontSize: '0.72rem', color: '#FBBF24', fontStyle: 'italic' }}>
                    Nota: "{selectedOrder.customer.notes}"
                  </p>
                )}
                <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.74rem', color: '#9CA3AF' }}>Pago:</span>
                  {renderPaymentMethod(selectedOrder.paymentMethod)}
                </div>
              </div>
            </div>

            {/* Items list */}
            <div style={{ marginBottom: '1.4rem' }}>
              <h4 style={{ fontSize: '0.74rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>
                Modelos Comprados ({selectedOrder.items?.length || 0})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {selectedOrder.items?.map((it, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <img src={it.img} alt={it.name} style={{ width: '38px', height: '46px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, color: '#FFFFFF', fontSize: '0.84rem' }}>{it.name}</p>
                        <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                          Talle: {it.selectedSize || 'U'} • Cant: {it.quantity} x {formatPrice(it.price)}
                        </span>
                      </div>
                    </div>
                    <span style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.88rem' }}>
                      {formatPrice(it.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals Breakdown */}
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                fontSize: '0.82rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                <span>Subtotal calzados:</span>
                <span>{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                <span>Costo de envío:</span>
                <span>{selectedOrder.shippingCost === 0 ? 'GRATIS' : formatPrice(selectedOrder.shippingCost)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                  <span>Descuento aplicado:</span>
                  <span>-{formatPrice(selectedOrder.discount)}</span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderTop: '1px solid rgba(255,255,255,0.12)',
                  paddingTop: '0.75rem',
                  marginTop: '0.35rem',
                }}
              >
                <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total del Pedido:</span>
                <span className="font-serif" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--vadano-primary)' }}>
                  {formatPrice(selectedOrder.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
