// src/components/admin/AdminPanel.jsx
import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  DollarSign,
  AlertTriangle,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Award,
  Flame,
  PackageX,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { db } from '../../services/db';
import brandLogo from '../../assets/logo.jpg';

import ProductsManager from './ProductsManager';
import OrdersManager from './OrdersManager';
import CategoriesManager from './CategoriesManager';
import CustomersManager from './CustomersManager';
import StockManager from './StockManager';

export default function AdminPanel() {
  const {
    adminSession,
    logoutAdmin,
    setActiveView,
    orders,
    products,
    customers,
    categories,
    refreshFromDb,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'products' | 'orders' | 'categories' | 'customers' | 'stock' | 'settings'
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null); // 'revenue' | 'orders' | 'catalog' | 'stock' | null

  const formatPrice = (val) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val || 0);
  };

  // Base Metrics
  const activeOrders = useMemo(() => orders.filter((o) => o.status !== 'cancelado'), [orders]);

  const totalRevenue = useMemo(() => {
    return activeOrders.reduce((acc, o) => acc + (o.total || 0), 0);
  }, [activeOrders]);

  const pendingOrders = useMemo(() => {
    return orders.filter((o) => o.status === 'pendiente').length;
  }, [orders]);

  // Stock Threshold Metrics (Low Stock <= 3 units, Out of Stock = 0 units)
  const LOW_STOCK_THRESHOLD = 3;
  const outOfStockCount = useMemo(() => products.filter((p) => Number(p.stock) === 0).length, [products]);
  const lowStockCount = useMemo(
    () => products.filter((p) => Number(p.stock) > 0 && Number(p.stock) <= LOW_STOCK_THRESHOLD).length,
    [products]
  );

  // Top Selling Product Calculation (Real time from active orders)
  const topProduct = useMemo(() => {
    const productStats = {};
    activeOrders.forEach((order) => {
      (order.items || []).forEach((item) => {
        if (!productStats[item.id]) {
          productStats[item.id] = {
            id: item.id,
            name: item.name,
            img: item.img,
            unitsSold: 0,
            revenue: 0,
          };
        }
        productStats[item.id].unitsSold += Number(item.quantity) || 1;
        productStats[item.id].revenue += (Number(item.price) || 0) * (Number(item.quantity) || 1);
      });
    });

    const list = Object.values(productStats);
    if (list.length === 0) {
      const first = products[0];
      return first ? { name: first.name, img: first.img, unitsSold: 0, revenue: 0 } : null;
    }
    list.sort((a, b) => b.unitsSold - a.unitsSold);
    return list[0];
  }, [activeOrders, products]);

  // Top Category Calculation (Real time from active orders & products)
  const topCategory = useMemo(() => {
    const categoryStats = {};
    activeOrders.forEach((order) => {
      (order.items || []).forEach((item) => {
        const prod = products.find((p) => p.id === item.id);
        const cat = prod?.category || item.category || 'Urban & Tendencias';
        if (!categoryStats[cat]) {
          categoryStats[cat] = { name: cat, unitsSold: 0, revenue: 0 };
        }
        categoryStats[cat].unitsSold += Number(item.quantity) || 1;
        categoryStats[cat].revenue += (Number(item.price) || 0) * (Number(item.quantity) || 1);
      });
    });

    const list = Object.values(categoryStats);
    if (list.length === 0) {
      return { name: categories[1] || 'Colección General', unitsSold: 0, revenue: 0, percentage: 0 };
    }
    list.sort((a, b) => b.unitsSold - a.unitsSold);
    const top = list[0];
    const totalUnits = list.reduce((acc, c) => acc + c.unitsSold, 0);
    const percentage = totalUnits > 0 ? Math.round((top.unitsSold / totalUnits) * 100) : 0;
    return { ...top, percentage };
  }, [activeOrders, products, categories]);

  // Sales Evolution Data (Last 7 Days)
  const salesChartData = useMemo(() => {
    const days = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayKey = d.toISOString().slice(0, 10);
      const dayName = d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'numeric' });

      const dayOrders = activeOrders.filter((o) => {
        if (!o.createdAt) return false;
        return o.createdAt.slice(0, 10) === dayKey;
      });

      const dayTotal = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      const orderCount = dayOrders.length;

      days.push({
        date: dayKey,
        label: dayName.toUpperCase(),
        total: dayTotal,
        orderCount,
      });
    }
    return days;
  }, [activeOrders]);

  const maxDailySales = useMemo(() => {
    const max = Math.max(...salesChartData.map((d) => d.total), 100000);
    return max;
  }, [salesChartData]);

  const chartSummary = useMemo(() => {
    const total = salesChartData.reduce((acc, d) => acc + d.total, 0);
    const totalOrders = salesChartData.reduce((acc, d) => acc + d.orderCount, 0);
    const avg = salesChartData.length > 0 ? Math.round(total / salesChartData.length) : 0;
    const peak = Math.max(...salesChartData.map((d) => d.total), 0);
    return { total, totalOrders, avg, peak };
  }, [salesChartData]);

  const cardExtraStats = useMemo(() => {
    // 1. Facturación
    const avgTicket = activeOrders.length > 0 ? Math.round(totalRevenue / activeOrders.length) : 0;
    const totalUnitsSold = activeOrders.reduce((acc, o) => {
      return acc + (o.items || []).reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    }, 0);

    // 2. Pedidos
    const deliveredOrders = orders.filter((o) => o.status === 'entregado').length;
    const shippedOrders = orders.filter((o) => o.status === 'enviado').length;
    const paidOrders = orders.filter((o) => o.status === 'pagado').length;
    const canceledOrders = orders.filter((o) => o.status === 'cancelado').length;
    const successRate = orders.length > 0 ? Math.round(((orders.length - canceledOrders) / orders.length) * 100) : 100;

    // 3. Catálogo
    const totalStockUnits = products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
    const avgProductPrice = products.length > 0 ? Math.round(products.reduce((acc, p) => acc + (Number(p.price) || 0), 0) / products.length) : 0;

    // 4. Control de Stock
    const healthyStockCount = Math.max(0, products.length - outOfStockCount - lowStockCount);
    const availabilityRate = products.length > 0 ? Math.round(((products.length - outOfStockCount) / products.length) * 100) : 100;

    return {
      avgTicket,
      totalUnitsSold,
      deliveredOrders,
      shippedOrders,
      paidOrders,
      canceledOrders,
      successRate,
      totalStockUnits,
      avgProductPrice,
      healthyStockCount,
      availabilityRate,
    };
  }, [activeOrders, orders, products, totalRevenue, outOfStockCount, lowStockCount]);

  // Handlers for Backup & Import (Modo Vista Previa Decorativo)
  const handleExportBackup = () => {
    const data = db.exportFullData();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `juana_calzados_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('[Modo Vista Previa] Copia de respaldo demostrativa exportada.');
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast('[Modo Vista Previa Decorativo] Carga de archivo simulada correctamente.', 'info');
      e.target.value = '';
    }
  };

  const handleResetDefaults = () => {
    showToast('[Modo Vista Previa Decorativo] El catálogo de demostración se encuentra fijo y protegido.', 'info');
  };

  // Operational Navigation Items
  const operationalNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Productos', icon: ShoppingBag, count: products.length },
    { id: 'orders', label: 'Pedidos', icon: Package, badge: pendingOrders > 0 ? pendingOrders : null },
    { id: 'stock', label: 'Control de Stock', icon: BarChart3, alert: outOfStockCount > 0, warning: lowStockCount > 0 },
    { id: 'categories', label: 'Categorías', icon: Layers },
    { id: 'customers', label: 'Clientes', icon: Users, count: customers.length },
  ];

  // System Navigation Items (Separated)
  const systemNav = [
    { id: 'settings', label: 'Base de Datos & Backup', icon: Settings },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navigation Bar */}
      <header
        className="admin-header"
        style={{
          background: '#000000',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0 2rem',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="admin-header-left" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <img
            src="https://res.cloudinary.com/dkc39tw6r/image/upload/v1794093058/670445968_18075495884636317_1744709116251245082_n_rxunyn.jpg"
            alt="Óptica Ribes Logo"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--vadano-primary)',
              backgroundColor: '#000000',
              display: 'block',
              flexShrink: 0,
            }}
          />
          <div className="admin-header-brand-text">
            <span
              className="font-serif"
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Juana Calzados
            </span>
            <span
              style={{
                marginLeft: '0.5rem',
                background: 'rgba(255,255,255,0.1)',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--vadano-primary)',
              }}
            >
              PANEL ADMIN
            </span>
          </div>
        </div>

        {/* Right buttons */}
        <div className="admin-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setActiveView('store')}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              padding: '0.45rem 1rem',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            <ExternalLink size={14} />
            <span className="admin-header-btn-text">Ver Tienda Pública</span>
          </button>

          <button
            onClick={logoutAdmin}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50px',
              padding: '0.45rem 1rem',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            <LogOut size={14} />
            <span className="admin-header-btn-text">Salir</span>
          </button>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '240px',
            background: '#000000',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            flexShrink: 0,
          }}
          className="admin-sidebar"
        >
          {/* Section: Operaciones */}
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0 0.6rem 0.4rem',
            }}
          >
            Gestión de Tienda
          </span>

          {operationalNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#000000' : '#9CA3AF',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={17} color={isActive ? '#000000' : '#9CA3AF'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    style={{
                      background: isActive ? '#000000' : '#F59E0B',
                      color: isActive ? '#FFFFFF' : '#000000',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.badge}
                  </span>
                )}

                {item.alert ? (
                  <span
                    style={{
                      background: '#EF4444',
                      color: '#FFFFFF',
                      borderRadius: '4px',
                      padding: '1px 5px',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                    }}
                  >
                    0
                  </span>
                ) : item.warning ? (
                  <span
                    style={{
                      background: '#F59E0B',
                      color: '#000000',
                      borderRadius: '4px',
                      padding: '1px 5px',
                      fontSize: '0.62rem',
                      fontWeight: 800,
                    }}
                  >
                    !
                  </span>
                ) : null}
              </button>
            );
          })}

          {/* Elegant Divider between Operational & Technical System */}
          <div style={{ margin: '1.2rem 0 0.8rem', padding: '0 0.4rem' }}>
            <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.12)', marginBottom: '0.8rem' }} />
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#6B7280',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'block',
                paddingLeft: '0.2rem',
              }}
            >
              Configuración & Datos
            </span>
          </div>

          {/* Section: Sistema / Backup */}
          {systemNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#000000' : '#9CA3AF',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={17} color={isActive ? '#000000' : '#9CA3AF'} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}

          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.72rem', color: '#6B7280', textAlign: 'center' }}>
            San Jorge, Santa Fe, Argentina • v2.0
          </div>
        </aside>

        {/* Content View */}
        <main className="admin-main" style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
              {/* Header Section */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.8rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                    <h2
                      className="font-serif"
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        margin: 0,
                        letterSpacing: '0.04em',
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                      }}
                    >
                      Resumen General
                    </h2>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '1px solid rgba(16, 185, 129, 0.35)',
                        color: '#10B981',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '20px',
                        letterSpacing: '0.06em',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#10B981',
                          boxShadow: '0 0 6px #10B981',
                        }}
                      />
                      EN VIVO
                    </span>
                  </div>
                  <p style={{ color: '#9CA3AF', fontSize: '0.84rem', margin: 0 }}>
                    Métricas de facturación, pedidos y disponibilidad de calzados en tiempo real
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '10px',
                    fontSize: '0.76rem',
                    color: '#D1D5DB',
                  }}
                >
                  <Calendar size={14} color="var(--vadano-primary)" />
                  <span>Últimos 7 días sincronizados</span>
                </div>
              </div>

              {/* Metric Cards Row with Modern Dark Cards & Ambient Colored Accents */}
              <div
                className="admin-kpi-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1.2rem',
                  marginBottom: '1.8rem',
                }}
              >
                {/* 1. Facturación Total */}
                <div
                  className="dashboard-stat-card"
                  onMouseEnter={() => setHoveredCard('revenue')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    ...statCardBaseStyle,
                    border: hoveredCard === 'revenue' ? '1px solid #10B981' : '1px solid rgba(16, 185, 129, 0.35)',
                    background: hoveredCard === 'revenue'
                      ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.12) 0%, rgba(0, 0, 0, 0.7) 100%)'
                      : 'linear-gradient(145deg, rgba(16, 185, 129, 0.06) 0%, rgba(0, 0, 0, 0.4) 100%)',
                    transform: hoveredCard === 'revenue' ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hoveredCard === 'revenue' ? '0 12px 30px rgba(16, 185, 129, 0.2), 0 0 15px rgba(16, 185, 129, 0.1)' : 'none',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: hoveredCard === 'revenue' ? '#FFFFFF' : '#9CA3AF', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em', transition: 'color 0.2s' }}>
                      Facturación Total
                    </span>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: hoveredCard === 'revenue' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        transform: hoveredCard === 'revenue' ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      <DollarSign size={16} color="#10B981" />
                    </div>
                  </div>
                  <p className="font-serif" style={{ fontSize: '1.85rem', fontWeight: 700, color: '#FFFFFF', margin: '0.75rem 0 0.4rem', letterSpacing: '0.02em' }}>
                    {formatPrice(totalRevenue)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#10B981' }}>
                    <CheckCircle2 size={13} />
                    <span>{activeOrders.length} órdenes aprobadas</span>
                  </div>

                  {/* Smooth Hover Expandable Detail */}
                  <div
                    style={{
                      maxHeight: hoveredCard === 'revenue' ? '65px' : '0px',
                      opacity: hoveredCard === 'revenue' ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginTop: hoveredCard === 'revenue' ? '0.75rem' : '0px',
                      paddingTop: hoveredCard === 'revenue' ? '0.65rem' : '0px',
                      borderTop: hoveredCard === 'revenue' ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      fontSize: '0.72rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D1D5DB' }}>
                      <span style={{ color: '#9CA3AF' }}>Ticket Promedio:</span>
                      <strong style={{ color: '#10B981' }}>{formatPrice(cardExtraStats.avgTicket)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D1D5DB' }}>
                      <span style={{ color: '#9CA3AF' }}>Volumen vendido:</span>
                      <strong style={{ color: '#FFFFFF' }}>{cardExtraStats.totalUnitsSold} pares</strong>
                    </div>
                  </div>
                </div>

                {/* 2. Pedidos Registrados */}
                <div
                  className="dashboard-stat-card"
                  onMouseEnter={() => setHoveredCard('orders')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    ...statCardBaseStyle,
                    border: hoveredCard === 'orders' ? '1px solid #60A5FA' : '1px solid rgba(59, 130, 246, 0.35)',
                    background: hoveredCard === 'orders'
                      ? 'linear-gradient(145deg, rgba(59, 130, 246, 0.12) 0%, rgba(0, 0, 0, 0.7) 100%)'
                      : 'linear-gradient(145deg, rgba(59, 130, 246, 0.06) 0%, rgba(0, 0, 0, 0.4) 100%)',
                    transform: hoveredCard === 'orders' ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hoveredCard === 'orders' ? '0 12px 30px rgba(59, 130, 246, 0.2), 0 0 15px rgba(59, 130, 246, 0.1)' : 'none',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: hoveredCard === 'orders' ? '#FFFFFF' : '#9CA3AF', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em', transition: 'color 0.2s' }}>
                      Pedidos Registrados
                    </span>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: hoveredCard === 'orders' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.15)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        transform: hoveredCard === 'orders' ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      <Package size={16} color="#60A5FA" />
                    </div>
                  </div>
                  <p className="font-serif" style={{ fontSize: '1.85rem', fontWeight: 700, color: '#FFFFFF', margin: '0.75rem 0 0.4rem', letterSpacing: '0.02em' }}>
                    {orders.length}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem' }}>
                    <span
                      style={{
                        background: pendingOrders > 0 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(59, 130, 246, 0.15)',
                        color: pendingOrders > 0 ? '#FBBF24' : '#60A5FA',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 700,
                      }}
                    >
                      {pendingOrders} {pendingOrders === 1 ? 'pendiente' : 'pendientes'}
                    </span>
                  </div>

                  {/* Smooth Hover Expandable Detail */}
                  <div
                    style={{
                      maxHeight: hoveredCard === 'orders' ? '65px' : '0px',
                      opacity: hoveredCard === 'orders' ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginTop: hoveredCard === 'orders' ? '0.75rem' : '0px',
                      paddingTop: hoveredCard === 'orders' ? '0.65rem' : '0px',
                      borderTop: hoveredCard === 'orders' ? '1px solid rgba(59, 130, 246, 0.25)' : '1px solid transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      fontSize: '0.72rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D1D5DB' }}>
                      <span style={{ color: '#9CA3AF' }}>Entregados / Enviados:</span>
                      <strong style={{ color: '#60A5FA' }}>{cardExtraStats.deliveredOrders + cardExtraStats.shippedOrders} pedidos</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D1D5DB' }}>
                      <span style={{ color: '#9CA3AF' }}>Tasa de efectividad:</span>
                      <strong style={{ color: '#10B981' }}>{cardExtraStats.successRate}% concretados</strong>
                    </div>
                  </div>
                </div>

                {/* 3. Calzados en Catálogo */}
                <div
                  className="dashboard-stat-card"
                  onMouseEnter={() => setHoveredCard('catalog')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    ...statCardBaseStyle,
                    border: hoveredCard === 'catalog' ? '1px solid #C084FC' : '1px solid rgba(168, 85, 247, 0.35)',
                    background: hoveredCard === 'catalog'
                      ? 'linear-gradient(145deg, rgba(168, 85, 247, 0.12) 0%, rgba(0, 0, 0, 0.7) 100%)'
                      : 'linear-gradient(145deg, rgba(168, 85, 247, 0.06) 0%, rgba(0, 0, 0, 0.4) 100%)',
                    transform: hoveredCard === 'catalog' ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hoveredCard === 'catalog' ? '0 12px 30px rgba(168, 85, 247, 0.2), 0 0 15px rgba(168, 85, 247, 0.1)' : 'none',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: hoveredCard === 'catalog' ? '#FFFFFF' : '#9CA3AF', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em', transition: 'color 0.2s' }}>
                      Calzados en Catálogo
                    </span>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: hoveredCard === 'catalog' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.15)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        transform: hoveredCard === 'catalog' ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      <ShoppingBag size={16} color="#C084FC" />
                    </div>
                  </div>
                  <p className="font-serif" style={{ fontSize: '1.85rem', fontWeight: 700, color: '#FFFFFF', margin: '0.75rem 0 0.4rem', letterSpacing: '0.02em' }}>
                    {products.length}
                  </p>
                  <div style={{ fontSize: '0.72rem', color: '#C084FC' }}>
                    En {Math.max(1, categories.length - 1)} categorías activas
                  </div>

                  {/* Smooth Hover Expandable Detail */}
                  <div
                    style={{
                      maxHeight: hoveredCard === 'catalog' ? '65px' : '0px',
                      opacity: hoveredCard === 'catalog' ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginTop: hoveredCard === 'catalog' ? '0.75rem' : '0px',
                      paddingTop: hoveredCard === 'catalog' ? '0.65rem' : '0px',
                      borderTop: hoveredCard === 'catalog' ? '1px solid rgba(168, 85, 247, 0.25)' : '1px solid transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      fontSize: '0.72rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D1D5DB' }}>
                      <span style={{ color: '#9CA3AF' }}>Stock físico total:</span>
                      <strong style={{ color: '#C084FC' }}>{cardExtraStats.totalStockUnits} pares</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D1D5DB' }}>
                      <span style={{ color: '#9CA3AF' }}>Precio promedio:</span>
                      <strong style={{ color: '#FFFFFF' }}>{formatPrice(cardExtraStats.avgProductPrice)}</strong>
                    </div>
                  </div>
                </div>

                {/* 4. Control de Stock */}
                <div
                  className="dashboard-stat-card"
                  onMouseEnter={() => setHoveredCard('stock')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    ...statCardBaseStyle,
                    border:
                      hoveredCard === 'stock'
                        ? outOfStockCount > 0
                          ? '1px solid #EF4444'
                          : lowStockCount > 0
                          ? '1px solid #F59E0B'
                          : '1px solid #10B981'
                        : outOfStockCount > 0
                        ? '1px solid rgba(239, 68, 68, 0.45)'
                        : lowStockCount > 0
                        ? '1px solid rgba(245, 158, 11, 0.45)'
                        : '1px solid rgba(16, 185, 129, 0.35)',
                    background:
                      hoveredCard === 'stock'
                        ? outOfStockCount > 0
                          ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.12) 0%, rgba(0, 0, 0, 0.7) 100%)'
                          : lowStockCount > 0
                          ? 'linear-gradient(145deg, rgba(245, 158, 11, 0.12) 0%, rgba(0, 0, 0, 0.7) 100%)'
                          : 'linear-gradient(145deg, rgba(16, 185, 129, 0.12) 0%, rgba(0, 0, 0, 0.7) 100%)'
                        : outOfStockCount > 0
                        ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.06) 0%, rgba(0, 0, 0, 0.4) 100%)'
                        : lowStockCount > 0
                        ? 'linear-gradient(145deg, rgba(245, 158, 11, 0.06) 0%, rgba(0, 0, 0, 0.4) 100%)'
                        : 'linear-gradient(145deg, rgba(16, 185, 129, 0.06) 0%, rgba(0, 0, 0, 0.4) 100%)',
                    transform: hoveredCard === 'stock' ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow:
                      hoveredCard === 'stock'
                        ? outOfStockCount > 0
                          ? '0 12px 30px rgba(239, 68, 68, 0.25), 0 0 15px rgba(239, 68, 68, 0.1)'
                          : lowStockCount > 0
                          ? '0 12px 30px rgba(245, 158, 11, 0.25), 0 0 15px rgba(245, 158, 11, 0.1)'
                          : '0 12px 30px rgba(16, 185, 129, 0.2), 0 0 15px rgba(16, 185, 129, 0.1)'
                        : 'none',
                    cursor: 'default',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: hoveredCard === 'stock' ? '#FFFFFF' : '#9CA3AF', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.06em', transition: 'color 0.2s' }}>
                      Control de Stock
                    </span>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background:
                          outOfStockCount > 0
                            ? 'rgba(239, 68, 68, 0.15)'
                            : lowStockCount > 0
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(16, 185, 129, 0.15)',
                        border:
                          outOfStockCount > 0
                            ? '1px solid rgba(239, 68, 68, 0.3)'
                            : lowStockCount > 0
                            ? '1px solid rgba(245, 158, 11, 0.3)'
                            : '1px solid rgba(16, 185, 129, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        transform: hoveredCard === 'stock' ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      {outOfStockCount > 0 ? (
                        <PackageX size={16} color="#EF4444" />
                      ) : lowStockCount > 0 ? (
                        <AlertTriangle size={16} color="#F59E0B" />
                      ) : (
                        <CheckCircle2 size={16} color="#10B981" />
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.7rem', margin: '0.75rem 0 0.4rem' }}>
                    <div>
                      <span className="font-serif" style={{ fontSize: '1.85rem', fontWeight: 700, color: outOfStockCount > 0 ? '#EF4444' : '#FFFFFF' }}>
                        {outOfStockCount}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#9CA3AF', marginLeft: '4px' }}>agotados</span>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                    <div>
                      <span className="font-serif" style={{ fontSize: '1.85rem', fontWeight: 700, color: lowStockCount > 0 ? '#F59E0B' : '#FFFFFF' }}>
                        {lowStockCount}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#9CA3AF', marginLeft: '4px' }}>stock bajo</span>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: outOfStockCount > 0 ? '#EF4444' : lowStockCount > 0 ? '#F59E0B' : '#10B981' }}>
                    {outOfStockCount > 0
                      ? 'Modelos sin stock inhabilitados'
                      : lowStockCount > 0
                      ? `Modelos con ≤ ${LOW_STOCK_THRESHOLD} unidades`
                      : 'Stock óptimo en todo el catálogo'}
                  </div>

                  {/* Smooth Hover Expandable Detail */}
                  <div
                    style={{
                      maxHeight: hoveredCard === 'stock' ? '65px' : '0px',
                      opacity: hoveredCard === 'stock' ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginTop: hoveredCard === 'stock' ? '0.75rem' : '0px',
                      paddingTop: hoveredCard === 'stock' ? '0.65rem' : '0px',
                      borderTop:
                        hoveredCard === 'stock'
                          ? outOfStockCount > 0
                            ? '1px solid rgba(239, 68, 68, 0.25)'
                            : lowStockCount > 0
                            ? '1px solid rgba(245, 158, 11, 0.25)'
                            : '1px solid rgba(16, 185, 129, 0.25)'
                          : '1px solid transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      fontSize: '0.72rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D1D5DB' }}>
                      <span style={{ color: '#9CA3AF' }}>Disponibilidad:</span>
                      <strong style={{ color: '#10B981' }}>{cardExtraStats.availabilityRate}% activo</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D1D5DB' }}>
                      <span style={{ color: '#9CA3AF' }}>Nivel óptimo:</span>
                      <strong style={{ color: '#FFFFFF' }}>{cardExtraStats.healthyStockCount} modelos</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Insights Row: Producto Más Vendido & Categoría Líder */}
              <div
                className="admin-insights-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1.2rem',
                  marginBottom: '1.8rem',
                }}
              >
                {/* Producto Más Vendido */}
                <div
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '16px',
                    padding: '1.3rem 1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '90px',
                      height: '90px',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {topProduct?.img ? (
                    <img
                      src={topProduct.img}
                      alt={topProduct.name}
                      style={{
                        width: '68px',
                        height: '78px',
                        borderRadius: '10px',
                        objectFit: 'cover',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        flexShrink: 0,
                        backgroundColor: '#111',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '68px',
                        height: '78px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Award size={28} color="var(--vadano-primary)" />
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <Flame size={14} color="#F59E0B" />
                      <span style={{ fontSize: '0.7rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Producto Más Vendido
                      </span>
                    </div>

                    <h4
                      className="font-serif"
                      style={{
                        margin: 0,
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {topProduct?.name || 'Aún sin ventas'}
                    </h4>

                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          fontSize: '0.74rem',
                          color: '#D1D5DB',
                        }}
                      >
                        Ventas: <strong style={{ color: '#FFFFFF' }}>{topProduct?.unitsSold || 0} u.</strong>
                      </span>
                      <span
                        style={{
                          background: 'rgba(16, 185, 129, 0.1)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          fontSize: '0.74rem',
                          color: '#10B981',
                          fontWeight: 700,
                        }}
                      >
                        {formatPrice(topProduct?.revenue || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Categoría Líder */}
                <div
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(96, 165, 250, 0.25)',
                    borderRadius: '16px',
                    padding: '1.3rem 1.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '90px',
                      height: '90px',
                      background: 'radial-gradient(circle, rgba(96, 165, 250, 0.12) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />

                  <div
                    style={{
                      width: '68px',
                      height: '78px',
                      borderRadius: '10px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Award size={30} color="#60A5FA" />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <Sparkles size={14} color="#60A5FA" />
                      <span style={{ fontSize: '0.7rem', color: '#60A5FA', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Categoría Líder
                      </span>
                    </div>

                    <h4
                      className="font-serif"
                      style={{
                        margin: 0,
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {topCategory?.name || 'General'}
                    </h4>

                    {/* Progress Bar for Category Share */}
                    <div style={{ marginTop: '0.45rem', marginBottom: '0.35rem' }}>
                      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${Math.min(100, Math.max(8, topCategory?.percentage || 0))}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #60A5FA, var(--vadano-primary))',
                            borderRadius: '2px',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.25)',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          fontSize: '0.74rem',
                          color: '#60A5FA',
                          fontWeight: 700,
                        }}
                      >
                        {topCategory?.percentage || 0}% del volumen
                      </span>
                      <span
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          padding: '2px 8px',
                          fontSize: '0.74rem',
                          color: '#D1D5DB',
                        }}
                      >
                        {topCategory?.unitsSold || 0} u. vendidas
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico Moderno de Evolución de Ventas (Últimos 7 Días) */}
              <div
                className="admin-chart-container"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '1.5rem 1.6rem',
                  marginBottom: '2.2rem',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.4rem',
                    flexWrap: 'wrap',
                    gap: '0.8rem',
                  }}
                >
                  <div>
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        margin: '0 0 0.2rem',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        letterSpacing: '0.04em',
                      }}
                    >
                      <TrendingUp size={18} color="var(--vadano-primary)" />
                      <span>Evolución de Ventas (7 Días)</span>
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.76rem', color: '#9CA3AF' }}>
                      Facturación diaria y frecuencia de pedidos completados
                    </p>
                  </div>

                  {/* Summary Chips */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '8px',
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                      }}
                    >
                      <span style={{ color: '#9CA3AF' }}>Total 7d: </span>
                      <strong style={{ color: 'var(--vadano-primary)' }}>{formatPrice(chartSummary.total)}</strong>
                    </div>

                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                      }}
                    >
                      <span style={{ color: '#9CA3AF' }}>Promedio diario: </span>
                      <strong style={{ color: '#FFFFFF' }}>{formatPrice(chartSummary.avg)}</strong>
                    </div>

                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                      }}
                    >
                      <span style={{ color: '#9CA3AF' }}>Pico: </span>
                      <strong style={{ color: '#10B981' }}>{formatPrice(chartSummary.peak)}</strong>
                    </div>
                  </div>
                </div>

                {/* Bars Chart Canvas with Guide Lines */}
                <div
                  style={{
                    position: 'relative',
                    height: '210px',
                    padding: '1.2rem 0.5rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  {/* Background Grid Guide Lines */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      pointerEvents: 'none',
                      opacity: 0.15,
                    }}
                  >
                    <div style={{ borderTop: '1px dashed #FFFFFF', width: '100%' }} />
                    <div style={{ borderTop: '1px dashed #FFFFFF', width: '100%' }} />
                    <div style={{ borderTop: '1px dashed #FFFFFF', width: '100%' }} />
                    <div style={{ borderTop: '1px dashed #FFFFFF', width: '100%' }} />
                  </div>

                  {/* Columns Grid */}
                  <div
                    className="admin-chart-bars"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${salesChartData.length}, 1fr)`,
                      gap: '0.85rem',
                      alignItems: 'flex-end',
                      height: '100%',
                      zIndex: 1,
                    }}
                  >
                    {salesChartData.map((item, idx) => {
                      const heightPercent = maxDailySales > 0 ? Math.max(10, Math.round((item.total / maxDailySales) * 100)) : 10;
                      const isHovered = hoveredBarIndex === idx;

                      return (
                        <div
                          key={item.date}
                          onMouseEnter={() => setHoveredBarIndex(idx)}
                          onMouseLeave={() => setHoveredBarIndex(null)}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '100%',
                            justifyContent: 'flex-end',
                            position: 'relative',
                            cursor: 'pointer',
                          }}
                        >
                          {/* Tooltip on hover */}
                          {isHovered && (
                            <div
                              style={{
                                position: 'absolute',
                                bottom: `calc(${heightPercent}% + 14px)`,
                                background: '#111111',
                                border: '1px solid var(--vadano-primary)',
                                borderRadius: '10px',
                                padding: '0.5rem 0.75rem',
                                color: '#FFFFFF',
                                fontSize: '0.72rem',
                                whiteSpace: 'nowrap',
                                zIndex: 20,
                                boxShadow: '0 10px 30px rgba(0,0,0,0.9), 0 0 15px rgba(255, 255, 255, 0.25)',
                                textAlign: 'center',
                                pointerEvents: 'none',
                                animation: 'fadeIn 0.15s ease',
                              }}
                            >
                              <p style={{ margin: 0, fontWeight: 800, color: 'var(--vadano-primary)' }}>{formatPrice(item.total)}</p>
                              <p style={{ margin: '2px 0 0', color: '#9CA3AF', fontSize: '0.68rem' }}>
                                {item.orderCount} {item.orderCount === 1 ? 'pedido completado' : 'pedidos completados'}
                              </p>
                            </div>
                          )}

                          {/* Top Amount Label */}
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: isHovered ? 800 : 700,
                              color: isHovered ? 'var(--vadano-primary)' : item.total > 0 ? '#FFFFFF' : '#6B7280',
                              marginBottom: '6px',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {item.total > 0 ? `$${Math.round(item.total / 1000)}k` : '$0'}
                          </span>

                          {/* Interactive Bar */}
                          <div
                            style={{
                              width: '100%',
                              maxWidth: '46px',
                              height: `${heightPercent}%`,
                              background:
                                item.total > 0
                                  ? isHovered
                                    ? 'linear-gradient(180deg, #FFFFFF 0%, var(--vadano-primary) 100%)'
                                    : 'linear-gradient(180deg, var(--vadano-primary) 0%, rgba(255, 255, 255, 0.35) 100%)'
                                  : 'rgba(255, 255, 255, 0.06)',
                              borderRadius: '6px 6px 2px 2px',
                              border: `1px solid ${
                                isHovered
                                  ? '#FFFFFF'
                                  : item.total > 0
                                  ? 'rgba(255, 255, 255, 0.6)'
                                  : 'rgba(255, 255, 255, 0.1)'
                              }`,
                              boxShadow: isHovered
                                ? '0 0 16px rgba(255, 255, 255, 0.45)'
                                : item.total > 0
                                ? '0 4px 12px rgba(0,0,0,0.3)'
                                : 'none',
                              transition: 'all 0.25s ease',
                              transform: isHovered ? 'scaleY(1.03)' : 'scaleY(1)',
                              transformOrigin: 'bottom',
                            }}
                          />

                          {/* Date Label on X Axis */}
                          <span
                            style={{
                              fontSize: '0.68rem',
                              color: isHovered ? '#FFFFFF' : '#9CA3AF',
                              marginTop: '8px',
                              letterSpacing: '0.04em',
                              fontWeight: isHovered ? 700 : 500,
                              transition: 'color 0.2s ease',
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.2rem',
                    flexWrap: 'wrap',
                    gap: '0.6rem',
                  }}
                >
                  <div>
                    <h3
                      className="font-serif admin-section-title"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: '#FFFFFF',
                      }}
                    >
                      Últimos Pedidos Registrados
                    </h3>
                    <p style={{ margin: '0.2rem 0 0', fontSize: '0.78rem', color: '#9CA3AF' }}>
                      Listado en tiempo real con accesos directos de gestión y WhatsApp
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="gold-pill-btn"
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.45rem 1rem',
                      letterSpacing: '0.05em',
                    }}
                  >
                    <span>VER TODOS LOS PEDIDOS</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
                <OrdersManager />
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 className="font-serif admin-section-title" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.4rem', textTransform: 'uppercase' }}>
                  Gestión de Productos
                </h2>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>
                  Creá, editá precios, talles, fotos y descripciones de las prendas.
                </p>
              </div>
              <ProductsManager />
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 className="font-serif admin-section-title" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.4rem', textTransform: 'uppercase' }}>
                  Gestión de Pedidos
                </h2>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>
                  Seguimiento de compras, cambios de estado y contacto por WhatsApp con clientes.
                </p>
              </div>
              <OrdersManager />
            </div>
          )}

          {/* Stock Tab */}
          {activeTab === 'stock' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 className="font-serif admin-section-title" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.4rem', textTransform: 'uppercase' }}>
                  Control de Inventario y Stock
                </h2>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>
                  Ajustá cantidades en tiempo real. Cuando una prenda llega a 0, se inhabilita en la tienda.
                </p>
              </div>
              <StockManager />
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 className="font-serif admin-section-title" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.4rem', textTransform: 'uppercase' }}>
                  Categorías de la Tienda
                </h2>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>
                  Organización de prendas por líneas y colecciones.
                </p>
              </div>
              <CategoriesManager />
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 className="font-serif admin-section-title" style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 0.4rem', textTransform: 'uppercase' }}>
                  Directorio de Clientes
                </h2>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0 }}>
                  Historial de compras y contacto directo con compradores.
                </p>
              </div>
              <CustomersManager />
            </div>
          )}

          {/* Settings & Backup Tab */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '340px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  borderRadius: '18px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                }}
              >
                <Settings size={44} color="rgba(255, 255, 255, 0.45)" strokeWidth={1.5} style={{ marginBottom: '1.2rem' }} />
                <h2
                  className="font-serif"
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    margin: '0 0 0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#FFFFFF',
                  }}
                >
                  Próximamente
                </h2>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem', margin: 0, maxWidth: '380px', lineHeight: '1.5' }}>
                  Las herramientas de respaldo, exportación y configuración estarán disponibles en una próxima versión.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        /* Bottom nav for mobile */
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            top: auto !important;
            width: 100% !important;
            height: 64px !important;
            flex-direction: row !important;
            padding: 0 0.5rem !important;
            border-right: none !important;
            border-top: 1px solid rgba(255, 255, 255, 0.12) !important;
            z-index: 1100 !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            gap: 0 !important;
            align-items: center !important;
            justify-content: space-around !important;
          }
          .admin-sidebar > span,
          .admin-sidebar > div {
            display: none !important;
          }
          .admin-sidebar > button {
            flex-direction: column !important;
            padding: 0.4rem 0.5rem !important;
            font-size: 0.6rem !important;
            gap: 0.15rem !important;
            min-width: 0 !important;
            border-radius: 8px !important;
            flex-shrink: 0 !important;
          }
          .admin-sidebar > button > div {
            gap: 0 !important;
          }
          .admin-sidebar > button > div > span {
            display: none !important;
          }
          .admin-sidebar > button > span {
            display: none !important;
          }
          .admin-header {
            padding: 0 1rem !important;
            height: 56px !important;
          }
          .admin-header-left img {
            width: 36px !important;
            height: 36px !important;
          }
          .admin-header-brand-text span:last-child {
            display: none !important;
          }
          .admin-header-brand-text span:first-child {
            font-size: 0.9rem !important;
          }
          .admin-header-actions {
            gap: 0.5rem !important;
          }
          .admin-header-btn-text {
            display: none !important;
          }
          .admin-header-actions button {
            padding: 0.4rem 0.6rem !important;
          }
          .admin-main {
            padding: 1.2rem 1rem 80px !important;
          }
          .admin-kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.8rem !important;
          }
          .admin-insights-grid {
            grid-template-columns: 1fr !important;
          }
          .admin-chart-container {
            padding: 1rem !important;
          }
          .admin-chart-bars {
            gap: 0.4rem !important;
          }
          .admin-section-title {
            font-size: 1.3rem !important;
          }
        }

        @media (max-width: 480px) {
          .admin-kpi-grid {
            grid-template-columns: 1fr !important;
          }
          .admin-header-brand-text span:first-child {
            font-size: 0.8rem !important;
          }
          .admin-chart-container {
            padding: 0.8rem !important;
          }
          .admin-section-title {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

const statCardBaseStyle = {
  background: 'rgba(255, 255, 255, 0.04)',
  borderRadius: '16px',
  padding: '1.4rem',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

const settingCardStyle = {
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderRadius: '14px',
  padding: '1.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
};
