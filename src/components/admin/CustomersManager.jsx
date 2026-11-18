// src/components/admin/CustomersManager.jsx
import React, { useState } from 'react';
import { Search, User, MessageCircle, Phone, Mail, ShoppingBag, DollarSign } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function CustomersManager() {
  const { customers } = useStore();
  const [search, setSearch] = useState('');

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return '-';
    return new Date(isoStr).toLocaleDateString('es-AR');
  };

  const filtered = customers.filter((c) => {
    return (
      !search.trim() ||
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.dni?.includes(search)
    );
  });

  const handleWhatsApp = (phone, name) => {
    // Vista previa decorativa: no abre enlaces externos
  };

  return (
    <div>
      {/* Search and count */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Buscar por nombre, email o teléfono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem 0.65rem 2.3rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
          Total compradores registrados: <strong style={{ color: '#FFFFFF' }}>{customers.length}</strong>
        </span>
      </div>

      {/* Customers Table */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cliente</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contacto</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dirección / DNI</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Compras</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Gastado</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Contacto Rápido</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '2.5rem', textAlign: 'center', color: '#9CA3AF' }}>
                    No se encontraron clientes registrados.
                  </td>
                </tr>
              ) : (
                filtered.map((cust) => (
                  <tr
                    key={cust.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {/* Cliente */}
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                          }}
                        >
                          {cust.fullName ? cust.fullName.charAt(0).toUpperCase() : 'C'}
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: '#FFFFFF', fontSize: '0.86rem' }}>{cust.fullName}</p>
                          <span style={{ fontSize: '0.68rem', color: '#9CA3AF' }}>Última compra: {formatDate(cust.lastOrderDate)}</span>
                        </div>
                      </div>
                    </td>

                    {/* Contacto */}
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <p style={{ margin: 0, color: '#FFFFFF', fontSize: '0.8rem' }}>{cust.email || '-'}</p>
                      <p style={{ margin: 0, color: '#9CA3AF', fontSize: '0.75rem' }}>{cust.phone || '-'}</p>
                    </td>

                    {/* Dirección */}
                    <td style={{ padding: '0.9rem 1rem', color: '#D1D5DB' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem' }}>{cust.address || 'San Jorge, Santa Fe'}</p>
                      {cust.dni && <p style={{ margin: 0, fontSize: '0.72rem', color: '#9CA3AF' }}>DNI: {cust.dni}</p>}
                    </td>

                    {/* Compras */}
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                        }}
                      >
                        {cust.ordersCount || 1} {cust.ordersCount === 1 ? 'pedido' : 'pedidos'}
                      </span>
                    </td>

                    {/* Total Gastado */}
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span style={{ fontWeight: 800, color: '#10B981', fontSize: '0.88rem' }}>
                        {formatPrice(cust.totalSpent)}
                      </span>
                    </td>

                    {/* Botones de contacto */}
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        {cust.phone && (
                          <button
                            onClick={() => handleWhatsApp(cust.phone, cust.fullName)}
                            title="Escribir por WhatsApp"
                            style={{
                              background: '#25D366',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 10px',
                              color: '#FFFFFF',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                            }}
                          >
                            <MessageCircle size={14} />
                            <span>WhatsApp</span>
                          </button>
                        )}
                        {cust.email && (
                          <div
                            title="Enviar Email"
                            style={{
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 8px',
                              color: '#FFFFFF',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <Mail size={14} />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
