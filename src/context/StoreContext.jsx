// src/context/StoreContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { db } from '../services/db';

const StoreContext = createContext(null);

const CART_STORAGE_KEY = 'sussan_boutique_cart_v3';

export function StoreProvider({ children }) {
  // DB States
  const [products, setProducts] = useState(() => db.getProducts());
  const [categories, setCategories] = useState(() => db.getCategories());
  const [orders, setOrders] = useState(() => db.getOrders());
  const [customers, setCustomers] = useState(() => db.getCustomers());
  const [config, setConfig] = useState(() => db.getConfig());
  const [adminSession, setAdminSession] = useState(() => db.getAdminSession());
  const [customerSession, setCustomerSession] = useState(() => db.getCustomerSession());

  // UI States
  const [activeView, setActiveView] = useState('store'); // 'store' | 'admin'
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerModalTab, setCustomerModalTab] = useState('login'); // 'login' | 'register' | 'account' | 'orders'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [quickBuyProduct, setQuickBuyProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Cart State (Persisted)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart]);

  // Synchronize state across tabs / admin updates
  const refreshFromDb = useCallback(() => {
    setProducts(db.getProducts());
    setCategories(db.getCategories());
    setOrders(db.getOrders());
    setCustomers(db.getCustomers());
    setConfig(db.getConfig());
    setAdminSession(db.getAdminSession());
    setCustomerSession(db.getCustomerSession());
  }, []);

  useEffect(() => {
    const handleSync = () => {
      refreshFromDb();
    };
    window.addEventListener('juana-store-sync', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('juana-store-sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [refreshFromDb]);

  // Private Admin Access via URL only (e.g. ?admin=private or #admin-private)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('admin') === 'private' || window.location.hash === '#admin-private') {
        setIsAdminLoginOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Cart Actions
  const addToCart = useCallback((product, quantity = 1, selectedSize = null, selectedColor = null) => {
    if (!product) return false;
    // Check product real stock
    const currentStock = Number(product.stock) || 0;
    if (currentStock <= 0) {
      showToast(`El producto "${product.name}" está agotado.`, 'error');
      return false;
    }

    const sizeToUse = selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'U');
    const colorToUse = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : null);
    const cartItemId = colorToUse ? `${product.id}_${sizeToUse}_${colorToUse}` : `${product.id}_${sizeToUse}`;
    const qtyToAdd = Math.max(1, Number(quantity) || 1);

    let toastMessage = '';
    let toastType = 'success';

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex !== -1) {
        const currentQty = Number(prevCart[existingIndex].quantity) || 0;
        const newQty = Math.min(currentStock, currentQty + qtyToAdd);
        if (newQty === currentQty && qtyToAdd > 0) {
          toastMessage = `Stock máximo alcanzado (${currentStock} unidades disponibles).`;
          toastType = 'info';
          return prevCart;
        }
        const updated = [...prevCart];
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        toastMessage = `Se actualizó la cantidad de "${product.name}" en el carrito.`;
        return updated;
      } else {
        const addQty = Math.min(currentStock, qtyToAdd);
        toastMessage = `"${product.name}" agregado al carrito!`;
        return [
          ...prevCart,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            originalPrice: Number(product.originalPrice) || Number(product.price) || 0,
            img: product.img,
            category: product.category,
            tag: product.tag,
            selectedSize: sizeToUse,
            selectedColor: colorToUse,
            quantity: addQty,
            maxStock: currentStock,
          },
        ];
      }
    });

    if (toastMessage) {
      showToast(toastMessage, toastType);
    }
    return true;
  }, [showToast]);

  const updateCartQuantity = useCallback((cartItemId, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.cartItemId !== cartItemId);
      }
      return prevCart.map((item) => {
        if (item.cartItemId === cartItemId) {
          // Find fresh stock from products state
          const freshProd = products.find((p) => p.id === item.id);
          const limit = freshProd ? (Number(freshProd.stock) || 0) : item.maxStock;
          const clamped = Math.min(limit, Math.max(1, newQuantity));
          return { ...item, quantity: clamped, maxStock: limit };
        }
        return item;
      });
    });
  }, [products]);

  const removeFromCart = useCallback((cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    showToast('Producto eliminado del carrito.', 'info');
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Cart Totals
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Direct checkout for 1 product (Visual preview)
  const startDirectCheckout = useCallback((product, size = null, color = null) => {
    addToCart(product, 1, size, color);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, [addToCart]);

  // Order Placement (Visual preview: función de pago anulada por completo)
  const placeOrder = useCallback((orderData) => {
    // Modo Vista Previa: no ejecuta acciones ni genera pedidos
    return null;
  }, []);

  // Product CRUD (Visual preview: decorativo, sin modificar base de datos)
  const addProduct = useCallback((productData) => {
    showToast(`[Vista Previa Decorativa] Producto "${productData.name}" simulado.`, 'info');
    return { id: 'preview_' + Date.now(), ...productData };
  }, [showToast]);

  const updateProduct = useCallback((id, productData) => {
    showToast(`[Vista Previa Decorativa] Cambios simulados en "${productData?.name || id}".`, 'info');
    return { id, ...productData };
  }, [showToast]);

  const deleteProduct = useCallback((id) => {
    showToast('[Vista Previa Decorativa] La eliminación de productos está deshabilitada.', 'info');
  }, [showToast]);

  const updateStock = useCallback((id, newStock) => {
    showToast('[Vista Previa Decorativa] El inventario es ilustrativo y no se modifica.', 'info');
    return null;
  }, [showToast]);

  // Categories CRUD (Visual preview: decorativo)
  const addCategory = useCallback((name) => {
    showToast(`[Vista Previa Decorativa] Categoría "${name}" simulada.`, 'info');
    return categories;
  }, [categories, showToast]);

  const deleteCategory = useCallback((name) => {
    showToast('[Vista Previa Decorativa] Las categorías no pueden ser eliminadas.', 'info');
    return categories;
  }, [categories, showToast]);

  // Orders Management (Visual preview: decorativo)
  const updateOrderStatus = useCallback((orderId, status) => {
    showToast(`[Vista Previa Decorativa] Estado simulado a "${status.toUpperCase()}".`, 'info');
    const existing = orders.find((o) => o.id === orderId);
    return existing ? { ...existing, status } : { id: orderId, status };
  }, [orders, showToast]);

  // Admin Auth (Visual preview: permitedemo access without changing DB)
  const loginAdmin = useCallback((username, password) => {
    const res = db.loginAdmin(username, password);
    if (res.success) {
      setAdminSession(res.session);
      setIsAdminLoginOpen(false);
      setActiveView('admin');
      showToast(`¡Bienvenida, ${res.session.name}! (Modo Vista Previa)`, 'success');
    } else {
      // Allow demo login even on any click for smooth preview
      const demoSession = { name: 'Administrador Demo', user: 'juanacalzados', role: 'admin' };
      setAdminSession(demoSession);
      setIsAdminLoginOpen(false);
      setActiveView('admin');
      showToast('¡Ingreso en Modo Vista Previa concedido!', 'success');
    }
    return { success: true };
  }, [showToast]);

  const logoutAdmin = useCallback(() => {
    setAdminSession(null);
    setActiveView('store');
    showToast('Sesión administrativa cerrada.', 'info');
  }, [showToast]);

  // Customer Auth
  const loginCustomer = useCallback((email, password) => {
    const cleanEmail = email?.trim().toLowerCase();
    const demoCust = { fullName: (email ? email.split('@')[0] : 'Cliente'), email: cleanEmail || 'cliente@juanacalzados.com' };
    setCustomerSession(demoCust);
    setIsCustomerModalOpen(false);
    showToast(`¡Bienvenida/o, ${demoCust.fullName}!`, 'success');
    return { success: true };
  }, [showToast]);

  const registerCustomer = useCallback((userData) => {
    const demoCust = { fullName: userData.fullName || 'Nuevo Cliente', email: userData.email };
    setCustomerSession(demoCust);
    setIsCustomerModalOpen(false);
    showToast(`¡Cuenta demostrativa lista! Bienvenida/o, ${demoCust.fullName}!`, 'success');
    return { success: true };
  }, [showToast]);

  const loginWithGoogle = useCallback((profile) => {
    const demoCust = { fullName: profile?.name || 'Cliente Google', email: profile?.email || 'demo@gmail.com' };
    setCustomerSession(demoCust);
    setIsCustomerModalOpen(false);
    showToast(`¡Sesión demostrativa iniciada con Google!`, 'success');
    return { success: true };
  }, [showToast]);

  const logoutCustomer = useCallback(() => {
    setCustomerSession(null);
    showToast('Has cerrado tu sesión.', 'info');
  }, [showToast]);

  // Filtered Products for Store
  const filteredProducts = products.filter((product) => {
    // If not active, hide in public store
    if (product.active === false) return false;
    
    // Category match
    const categoryMatch =
      selectedCategory === 'Todos' ||
      (Boolean(product.category) && product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase());

    // Search match
    const searchMatch = !searchQuery.trim() || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.tag && product.tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && searchMatch;
  });

  const value = {
    // Data
    products,
    filteredProducts,
    categories,
    orders,
    customers,
    config,
    adminSession,
    customerSession,

    // Views & Modals
    activeView,
    setActiveView,
    isAdminLoginOpen,
    setIsAdminLoginOpen,
    isCustomerModalOpen,
    setIsCustomerModalOpen,
    customerModalTab,
    setCustomerModalTab,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    completedOrder,
    setCompletedOrder,
    quickBuyProduct,
    setQuickBuyProduct,

    // Filters
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,

    // Cart
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    startDirectCheckout,

    // Orders
    placeOrder,
    updateOrderStatus,

    // Customer Operations
    loginCustomer,
    registerCustomer,
    loginWithGoogle,
    logoutCustomer,

    // Admin Operations
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    addCategory,
    deleteCategory,
    loginAdmin,
    logoutAdmin,
    refreshFromDb,

    // Toasts
    toasts,
    showToast,
    removeToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
}
