// src/components/admin/ProductsManager.jsx
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Eye, EyeOff, Tag, Image as ImageIcon, Check, X, AlertTriangle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function ProductsManager() {
  const { products, categories, addProduct, updateProduct, deleteProduct, updateStock, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('Todos');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const initialFormState = {
    name: '',
    price: '',
    originalPrice: '',
    category: categories[1] || 'Urban & Tendencias',
    tag: 'TENDENCIA',
    description: '',
    img: '',
    stock: 10,
    sizes: 'S, M, L',
    active: true,
  };

  const [formData, setFormData] = useState(initialFormState);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialFormState);
    setIsEditing(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      category: product.category,
      tag: product.tag || '',
      description: product.description || '',
      img: product.img || '',
      stock: product.stock !== undefined ? product.stock : 0,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : (product.sizes || 'U'),
      active: product.active !== false,
    });
    setIsEditing(true);
  };

  const handleDelete = (id, name) => {
    showToast(`[Vista Previa] El producto "${name}" no puede eliminarse en modo decorativo.`, 'info');
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('El nombre del producto es obligatorio', 'error');
      return;
    }

    const sizesArray = formData.sizes.split(',').map((s) => s.trim()).filter(Boolean);

    const productPayload = {
      name: formData.name.trim(),
      price: Number(formData.price) || 0,
      originalPrice: Number(formData.originalPrice) || Number(formData.price) || 0,
      category: formData.category,
      tag: formData.tag.trim(),
      description: formData.description.trim(),
      img: formData.img.trim() || 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1784487930/claudiaaranega_2022-10-06_CjYtMkzpCFm_4_rwxpoh.webp',
      stock: Number(formData.stock) || 0,
      sizes: sizesArray.length > 0 ? sizesArray : ['U'],
      active: formData.active,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsEditing(false);
  };

  // Filter products
  const filtered = products.filter((p) => {
    const matchCat = selectedCat === 'Todos' || p.category === selectedCat;
    const matchSearch =
      !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.tag?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Top action bar */}
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
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flex: 1, minWidth: '280px' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Buscar por nombre o etiqueta..."
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

          {/* Category Filter */}
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            style={{
              padding: '0.65rem 0.85rem',
              background: '#111',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              outline: 'none',
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenAdd}
          className="gold-pill-btn"
          style={{
            padding: '0.65rem 1.4rem',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <Plus size={16} />
          <span>NUEVA PRENDA</span>
        </button>
      </div>

      {/* Products Table / Cards */}
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
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stock</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</th>
                <th style={{ padding: '1rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '2.5rem', textAlign: 'center', color: '#9CA3AF' }}>
                    No se encontraron productos coincidentes.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr
                    key={prod.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    {/* Prenda & Image */}
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img
                          src={prod.img}
                          alt={prod.name}
                          style={{
                            width: '44px',
                            height: '52px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: '#FFFFFF', fontSize: '0.86rem' }}>{prod.name}</p>
                          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '3px' }}>
                            {prod.tag && (
                              <span
                                style={{
                                  fontSize: '0.62rem',
                                  padding: '1px 6px',
                                  borderRadius: '4px',
                                  background: 'rgba(255,255,255,0.1)',
                                  color: '#FFFFFF',
                                  fontWeight: 600,
                                }}
                              >
                                {prod.tag}
                              </span>
                            )}
                            <span style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>
                              Talles: {Array.isArray(prod.sizes) ? prod.sizes.join(', ') : prod.sizes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td style={{ padding: '0.9rem 1rem', color: '#D1D5DB' }}>{prod.category}</td>

                    {/* Precio */}
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{formatPrice(prod.price)}</span>
                      {prod.originalPrice > prod.price && (
                        <div style={{ fontSize: '0.7rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                          {formatPrice(prod.originalPrice)}
                        </div>
                      )}
                    </td>

                    {/* Stock inline edit */}
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <input
                          type="number"
                          min="0"
                          value={prod.stock}
                          onChange={(e) => updateStock(prod.id, e.target.value)}
                          style={{
                            width: '54px',
                            padding: '3px 6px',
                            background: 'rgba(0,0,0,0.6)',
                            border: `1px solid ${prod.stock === 0 ? '#EF4444' : prod.stock <= 3 ? '#F59E0B' : 'rgba(255,255,255,0.2)'}`,
                            borderRadius: '6px',
                            color: prod.stock === 0 ? '#EF4444' : prod.stock <= 3 ? '#F59E0B' : '#FFFFFF',
                            fontWeight: 700,
                            textAlign: 'center',
                            fontSize: '0.8rem',
                          }}
                        />
                        {prod.stock === 0 ? (
                          <span style={{ fontSize: '0.65rem', color: '#EF4444', fontWeight: 700 }}>AGOTADO</span>
                        ) : prod.stock <= 3 ? (
                          <span style={{ fontSize: '0.65rem', color: '#F59E0B', fontWeight: 600 }}>BAJO</span>
                        ) : null}
                      </div>
                    </td>

                    {/* Estado activo / inactivo */}
                    <td style={{ padding: '0.9rem 1rem' }}>
                      <button
                        onClick={() => updateProduct(prod.id, { active: !prod.active })}
                        style={{
                          background: prod.active !== false ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          border: `1px solid ${prod.active !== false ? '#10B981' : '#EF4444'}`,
                          color: prod.active !== false ? '#10B981' : '#EF4444',
                          padding: '3px 8px',
                          borderRadius: '20px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {prod.active !== false ? 'PUBLICADO' : 'OCULTO'}
                      </button>
                    </td>

                    {/* Acciones */}
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          aria-label="Editar"
                          style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 8px',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id, prod.name)}
                          aria-label="Eliminar"
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 8px',
                            color: '#EF4444',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)')}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Product */}
      {isEditing && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 4200,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsEditing(false);
          }}
        >
          <div
            style={{
              background: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '18px',
              width: '100%',
              maxWidth: '620px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
              position: 'relative',
              animation: 'slideUp 0.25s ease',
            }}
          >
            <button
              onClick={() => setIsEditing(false)}
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

            <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#FFFFFF', margin: '0 0 1.5rem', textTransform: 'uppercase' }}>
              {editingProduct ? 'Editar Prenda' : 'Nueva Prenda'}
            </h3>

            <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={labelStyle}>Nombre de la prenda *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: PANTALÓN DE CUERO"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={labelStyle}>Precio ($ ARS) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="94000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Precio Original (Tachado)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="110000"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={labelStyle}>Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ ...inputStyle, background: '#111' }}
                  >
                    {categories
                      .filter((c) => c !== 'Todos')
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Etiqueta (Badge)</label>
                  <input
                    type="text"
                    placeholder="TENDENCIA / EXCLUSIVO"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '0.8rem' }}>
                <div>
                  <label style={labelStyle}>Stock Disponible</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Talles (separados por coma)</label>
                  <input
                    type="text"
                    placeholder="S, M, L, XL"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>URL de la Imagen</label>
                <input
                  type="url"
                  placeholder="https://res.cloudinary.com/..."
                  value={formData.img}
                  onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                  style={inputStyle}
                />
                {formData.img && (
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img
                      src={formData.img}
                      alt="Preview"
                      style={{ width: '40px', height: '48px', borderRadius: '4px', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Vista previa de imagen</span>
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>Descripción</label>
                <textarea
                  rows="3"
                  placeholder="Detalles sobre tela, corte y estilo..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', marginTop: '0.4rem' }}>
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  style={{ accentColor: '#FFFFFF', width: '16px', height: '16px' }}
                />
                <span style={{ fontSize: '0.82rem', color: '#FFFFFF' }}>Visible en el catálogo público</span>
              </label>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    flex: 1,
                    padding: '0.8rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50px',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  className="gold-pill-btn"
                  style={{
                    flex: 1.4,
                    padding: '0.8rem',
                    fontSize: '0.82rem',
                  }}
                >
                  {editingProduct ? 'GUARDAR CAMBIOS' : 'CREAR PRENDA'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.72rem',
  color: '#9CA3AF',
  marginBottom: '0.3rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '0.84rem',
  outline: 'none',
  boxSizing: 'border-box',
};
