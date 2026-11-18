// src/components/admin/CategoriesManager.jsx
import React, { useState } from 'react';
import { Plus, Trash2, Tag, Layers, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function CategoriesManager() {
  const { categories, addCategory, deleteCategory, products, showToast } = useStore();
  const [newCatName, setNewCatName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    showToast('[Vista Previa] Las categorías no pueden modificarse en modo decorativo.', 'info');
    setNewCatName('');
  };

  const handleDelete = (name) => {
    showToast(`[Vista Previa] La categoría "${name}" no puede eliminarse en modo decorativo.`, 'info');
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Add Category Card */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <h4
          className="font-serif"
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#FFFFFF',
            margin: '0 0 0.8rem',
            textTransform: 'uppercase',
          }}
        >
          Crear Nueva Categoría
        </h4>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.8rem' }}>
          <input
            type="text"
            placeholder="Ej: Abrigos & Blazers"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            style={{
              flex: 1,
              padding: '0.7rem 0.9rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            className="gold-pill-btn"
            style={{
              padding: '0.7rem 1.4rem',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Plus size={16} />
            <span>AGREGAR</span>
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1rem 1.2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.02)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Layers size={16} color="#FFFFFF" />
          <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Categorías Activas ({categories.filter((c) => c !== 'Todos').length})
          </h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {categories
            .filter((c) => c !== 'Todos')
            .map((cat, idx) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.2rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                      }}
                    >
                      <Tag size={15} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, color: '#FFFFFF', fontSize: '0.88rem' }}>{cat}</p>
                      <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                        {count} {count === 1 ? 'prenda vinculada' : 'prendas vinculadas'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(cat)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      color: '#EF4444',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Eliminar</span>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
