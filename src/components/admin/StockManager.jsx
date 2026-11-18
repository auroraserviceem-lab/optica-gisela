// src/components/admin/StockManager.jsx
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Plus, Minus, Search, PackageX, TrendingDown, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function StockManager() {
  const { products, updateStock, showToast } = useStore();
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'low' | 'out'

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
  };

  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 3).length;
  const totalStockUnits = products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());

    if (filterMode === 'out') return matchSearch && p.stock === 0;
    if (filterMode === 'low') return matchSearch && p.stock > 0 && p.stock <= 3;
    return matchSearch;
  });

  return (
    <div>
      {/* Metric Cards Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div style={cardMetricStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF', fontSize: '0.74rem', textTransform: 'uppercase' }}>
            <span>Unidades en Inventario</span>
            <RefreshCw size={15} color="#FFFFFF" />
          </div>
          <p className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF', margin: '0.4rem 0 0' }}>
            {totalStockUnits}
          </p>
          <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>En {products.length} productos</span>
        </div>

        <div
          style={{ ...cardMetricStyle, borderColor: lowStockCount > 0 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255,255,255,0.12)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F59E0B', fontSize: '0.74rem', textTransform: 'uppercase' }}>
            <span>Stock Bajo (≤ 3 unid.)</span>
            <AlertTriangle size={15} color="#F59E0B" />
          </div>
          <p className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F59E0B', margin: '0.4rem 0 0' }}>
            {lowStockCount}
          </p>
          <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Requieren reposición pronto</span>
        </div>

        <div
          style={{ ...cardMetricStyle, borderColor: outOfStockCount > 0 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255,255,255,0.12)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#EF4444', fontSize: '0.74rem', textTransform: 'uppercase' }}>
            <span>Agotados (0 unid.)</span>
            <PackageX size={15} color="#EF4444" />
          </div>
          <p className="font-serif" style={{ fontSize: '1.8rem', fontWeight: 700, color: '#EF4444', margin: '0.4rem 0 0' }}>
            {outOfStockCount}
          </p>
          <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Deshabilitados en tienda automáticamente</span>
        </div>
      </div>

      {/* Filter and Search Row */}
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
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => setFilterMode('all')}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: '8px',
              background: filterMode === 'all' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
              color: filterMode === 'all' ? '#000000' : '#9CA3AF',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Todos ({products.length})
          </button>
          <button
            onClick={() => setFilterMode('low')}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: '8px',
              background: filterMode === 'low' ? '#F59E0B' : 'rgba(255, 255, 255, 0.05)',
              color: filterMode === 'low' ? '#000000' : '#F59E0B',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Stock Bajo ({lowStockCount})
          </button>
          <button
            onClick={() => setFilterMode('out')}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: '8px',
              background: filterMode === 'out' ? '#EF4444' : 'rgba(255, 255, 255, 0.05)',
              color: filterMode === 'out' ? '#FFFFFF' : '#EF4444',
              border: 'none',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Agotados ({outOfStockCount})
          </button>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Filtrar por prenda o categoría..."
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
      </div>

      {/* Stock Table */}
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
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prenda</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categoría</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Precio</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nivel de Stock</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Ajuste Rápido</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => {
                const isOut = prod.stock === 0;
                const isLow = prod.stock > 0 && prod.stock <= 3;
                return (
                  <tr
                    key={prod.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      background: isOut ? 'rgba(239, 68, 68, 0.04)' : isLow ? 'rgba(245, 158, 11, 0.03)' : 'transparent',
                      transition: 'background 0.2s',
                    }}
                  >
                    {/* Prenda */}
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img
                          src={prod.img}
                          alt={prod.name}
                          style={{
                            width: '40px',
                            height: '48px',
                            borderRadius: '6px',
                            objectFit: 'cover',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: '#FFFFFF' }}>{prod.name}</p>
                          <span style={{ fontSize: '0.68rem', color: '#9CA3AF' }}>Talles: {Array.isArray(prod.sizes) ? prod.sizes.join(', ') : prod.sizes}</span>
                        </div>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td style={{ padding: '0.9rem 1rem', color: '#D1D5DB' }}>{prod.category}</td>

                    {/* Precio */}
                    <td style={{ padding: '0.9rem 1rem', color: '#FFFFFF', fontWeight: 700 }}>
                      {formatPrice(prod.price)}
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '0.9rem 1rem' }}>
                      {isOut ? (
                        <span
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#EF4444',
                            border: '1px solid #EF4444',
                            padding: '3px 8px',
                            borderRadius: '20px',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                          }}
                        >
                          SIN STOCK (AGOTADO)
                        </span>
                      ) : isLow ? (
                        <span
                          style={{
                            background: 'rgba(245, 158, 11, 0.15)',
                            color: '#FBBF24',
                            border: '1px solid #F59E0B',
                            padding: '3px 8px',
                            borderRadius: '20px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                          }}
                        >
                          STOCK CRÍTICO ({prod.stock} u.)
                        </span>
                      ) : (
                        <span
                          style={{
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#10B981',
                            border: '1px solid #10B981',
                            padding: '3px 8px',
                            borderRadius: '20px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                          }}
                        >
                          DISPONIBLE ({prod.stock} u.)
                        </span>
                      )}
                    </td>

                    {/* Inline Quick Adjustment */}
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => updateStock(prod.id, Math.max(0, prod.stock - 1))}
                          style={{
                            width: '28px',
                            height: '28px',
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '6px',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Minus size={13} />
                        </button>

                        <input
                          type="number"
                          min="0"
                          value={prod.stock}
                          onChange={(e) => updateStock(prod.id, e.target.value)}
                          style={{
                            width: '55px',
                            padding: '4px 6px',
                            background: '#000000',
                            border: '1px solid rgba(255,255,255,0.25)',
                            borderRadius: '6px',
                            color: '#FFFFFF',
                            fontWeight: 800,
                            textAlign: 'center',
                            fontSize: '0.84rem',
                          }}
                        />

                        <button
                          onClick={() => updateStock(prod.id, prod.stock + 1)}
                          style={{
                            width: '28px',
                            height: '28px',
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '6px',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const cardMetricStyle = {
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '14px',
  padding: '1.2rem',
};
