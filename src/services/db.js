// src/services/db.js

const STORAGE_KEYS = {
  PRODUCTS: 'ribes_bandera_optical_products_v1',
  CATEGORIES: 'ribes_bandera_optical_categories_v1',
  ORDERS: 'ribes_bandera_optical_orders_v1',
  CUSTOMERS: 'ribes_bandera_optical_customers_v1',
  CONFIG: 'ribes_bandera_optical_config_v1',
  ADMIN_SESSION: 'ribes_bandera_optical_admin_session_v1',
  CUSTOMER_SESSION: 'ribes_bandera_optical_customer_session_v1',
  REGISTERED_CUSTOMERS: 'ribes_bandera_optical_registered_customers_v1',
};

// Initial Seed Products — Óptica Ribes Bandera
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Armazón infantil 360 Felix',
    price: 58000,
    originalPrice: 68000,
    category: 'Lentes Recetados',
    tag: 'INFANTIL',
    description: 'Diseño liviano y moderno, con detalles verdes para darle un toque de color a su estilo',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794095404/opticaribes.bandera____Qui%C3%A9n_dijo_que_los_lentes_para_chicos_tienen_que_ser_abu_2026-06-05_DZNPr1zkUii_3_DZNPr1zkUii_03_zxo2kn.jpg',
    stock: 10,
    active: true,
    sizes: ['Único'],
    colors: ['Verde'],
  },
  {
    id: 'prod-2',
    name: 'Armazón 360 Dexter RX',
    price: 64000,
    originalPrice: 75000,
    category: 'Lentes Recetados',
    tag: 'DESTACADO',
    description: 'Montura liviana en rosa translúcido, con varillas violetas y un diseño moderno para todos los días.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794095523/2_e9yaep.jpg',
    stock: 8,
    active: true,
    sizes: ['Único'],
    colors: ['Rosa'],
  },
  {
    id: 'prod-3',
    name: 'Armazón 360 Dexter RX cristal',
    price: 62000,
    originalPrice: 72000,
    category: 'Lentes Recetados',
    tag: 'CRISTAL',
    description: 'Montura transparente de líneas suaves con varillas amarillas que suman un toque vibrante y moderno',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794095602/3_j1hvq3.jpg',
    stock: 10,
    active: true,
    sizes: ['Único'],
    colors: ['Transparente'],
  },
  {
    id: 'prod-4',
    name: 'Anteojos de sol Ribes Rosa',
    price: 78000,
    originalPrice: 88000,
    category: 'Anteojos de Sol',
    tag: 'SOL',
    description: 'Montura rosa translúcida de diseño moderno, con cristales oscuros para sumar estilo y protección a tus días',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794095731/4_vlipeq.jpg',
    stock: 6,
    active: true,
    sizes: ['Único'],
    colors: ['Rosa'],
  },
  {
    id: 'prod-5',
    name: 'Anteojos de sol Tascani',
    price: 74000,
    originalPrice: 85000,
    category: 'Anteojos de Sol',
    tag: 'TASCANI',
    description: 'Diseño clásico con montura negra y cristales marrones. Un modelo versátil que combina estilo y comodidad para todos los días.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794095855/5_oovdxg.jpg',
    stock: 7,
    active: true,
    sizes: ['Único'],
    colors: ['Negro'],
  },
  {
    id: 'prod-6',
    name: 'Anteojos de sol Sarkany',
    price: 69000,
    originalPrice: 79000,
    category: 'Anteojos de Sol',
    tag: 'SARKANY',
    description: 'Diseño contemporáneo con montura negra de líneas marcadas y cristales oscuros. Un modelo elegante y versátil para completar distintos estilos.',
    img: 'https://res.cloudinary.com/dkc39tw6r/image/upload/v1794096059/6_pknqn2.jpg',
    stock: 5,
    active: true,
    sizes: ['Único'],
    colors: ['Negro'],
  },
];

const INITIAL_CATEGORIES = [
  'Todos',
  'Lentes Recetados',
  'Anteojos de Sol',
  'Lentes de Contacto',
  'Accesorios',
];

const INITIAL_CONFIG = {
  storeName: 'Óptica Ribes Bandera',
  phone: '0384 441 9650',
  rawPhone: '5493844419650',
  address: 'Bandera, Santiago del Estero',
  instagram: 'https://www.instagram.com/opticaribes.bandera/',
  mapsUrl: 'https://maps.app.goo.gl/ndEffysk9VTZ4E9N9',
  email: '',
  shipping: {
    pickup: { id: 'pickup', name: 'Retiro en Local Sussan Boutique (Sarmiento 1080 - local 16, San Jorge, Santa Fe)', price: 0, time: 'Inmediato / Horario comercial' },
    local: { id: 'local', name: 'Envío Local - San Jorge y Alrededores', price: 2500, time: '24 hs hábiles' },
    national: { id: 'national', name: 'Envío Nacional a Todo el País - Correo Argentino / Andreani', price: 6500, time: '3 a 6 días hábiles' },
  },
  bankDetails: {
    bank: 'Banco Santander / Galicia',
    accountHolder: 'Sussan Boutique',
    cbu: '0720026788000036214589',
    alias: 'SUSSAN.BOUTIQUE',
    cuit: '27-24892019-4',
    discountPercentage: 20,
  },
  mercadoPago: {
    publicKey: 'TEST-98234-sussan-boutique-public-key',
    sandbox: true,
  },
};

const INITIAL_ORDERS = [
  {
    id: 'JC-1001',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    customer: {
      fullName: 'Sofía Martínez',
      email: 'sofia.martinez@gmail.com',
      phone: '+5493406411223',
      dni: '38.452.190',
      address: 'Sarmiento 1080 - local 16',
      city: 'San Jorge',
      postalCode: '2452',
      province: 'Santa Fe',
      notes: 'Paso a retirar por la tarde.',
    },
    items: [
      {
        id: 'prod-2',
        name: 'ZAPATILLAS CALIX METALIZADO',
        price: 58000,
        quantity: 1,
        selectedSize: '37',
      },
    ],
    shippingMethod: 'pickup',
    shippingCost: 0,
    paymentMethod: 'transferencia',
    paymentStatus: 'pagado',
    status: 'entregado',
    subtotal: 58000,
    discount: 11600,
    total: 46400,
  },
];

const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    fullName: 'Sofía Martínez',
    email: 'sofia.martinez@gmail.com',
    phone: '+5493406411223',
    dni: '38.452.190',
    address: 'Sarmiento 1080 - local 16, San Jorge, Santa Fe',
    ordersCount: 1,
    totalSpent: 46400,
    lastOrderDate: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

// Helper for local storage
function getStorage(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('juana-store-sync', { detail: { key, value } }));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export const db = {
  // PRODUCTS
  getProducts() {
    const raw = getStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    return raw.map((p) => {
      const seed = INITIAL_PRODUCTS.find((init) => init.id === p.id);
      if (seed) {
        return {
          ...p,
          name: seed.name,
          description: seed.description,
          category: seed.category,
          tag: seed.tag,
          img: seed.img,
          colors: seed.colors,
          sizes: seed.sizes,
        };
      }
      const category = p.category || 'Lentes Recetados';
      const colors = (p.colors && Array.isArray(p.colors) && p.colors.length > 0)
        ? p.colors
        : ['Negro'];
      const img = p.img || '';
      return { ...p, category, colors, img };
    });
  },
  saveProducts(products) {
    setStorage(STORAGE_KEYS.PRODUCTS, products);
  },
  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      active: product.active !== undefined ? product.active : true,
      stock: Number(product.stock) || 0,
      price: Number(product.price) || 0,
      originalPrice: Number(product.originalPrice) || Number(product.price) || 0,
      sizes: product.sizes || ['U'],
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  },
  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updatedFields,
        stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : products[index].stock,
        price: updatedFields.price !== undefined ? Number(updatedFields.price) : products[index].price,
        originalPrice: updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : products[index].originalPrice,
      };
      this.saveProducts(products);
      return products[index];
    }
    return null;
  },
  deleteProduct(id) {
    const products = this.getProducts().filter((p) => p.id !== id);
    this.saveProducts(products);
    return true;
  },
  updateStock(id, newStock) {
    return this.updateProduct(id, { stock: Math.max(0, Number(newStock) || 0) });
  },

  // CATEGORIES
  getCategories() {
    const saved = getStorage(STORAGE_KEYS.CATEGORIES, null);
    if (!saved || !Array.isArray(saved) || !saved.includes('Botitas & Urban') || !saved.includes('Borcegos & Botas') || !saved.includes('Texanas & Botas')) {
      setStorage(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
      return INITIAL_CATEGORIES;
    }
    return saved;
  },
  saveCategories(categories) {
    setStorage(STORAGE_KEYS.CATEGORIES, categories);
  },
  addCategory(name) {
    const categories = this.getCategories();
    const trimmed = name.trim();
    if (trimmed && !categories.includes(trimmed)) {
      categories.push(trimmed);
      this.saveCategories(categories);
    }
    return categories;
  },
  deleteCategory(name) {
    if (name === 'Todos') return this.getCategories();
    const categories = this.getCategories().filter((c) => c !== name);
    this.saveCategories(categories);
    return categories;
  },

  // ORDERS
  getOrders() {
    return getStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  },
  saveOrders(orders) {
    setStorage(STORAGE_KEYS.ORDERS, orders);
  },
  createOrder(orderData) {
    const orders = this.getOrders();
    const orderId = `CA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      status: orderData.status || 'pendiente',
    };
    orders.unshift(newOrder);
    this.saveOrders(orders);

    // Auto deduct product stock
    const products = this.getProducts();
    let productsUpdated = false;
    newOrder.items.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        product.stock = Math.max(0, (product.stock || 0) - item.quantity);
        productsUpdated = true;
      }
    });
    if (productsUpdated) {
      this.saveProducts(products);
    }

    // Upsert customer record
    this.recordCustomerFromOrder(newOrder);

    return newOrder;
  },
  updateOrderStatus(orderId, newStatus, paymentStatus) {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = newStatus;
      if (paymentStatus) {
        order.paymentStatus = paymentStatus;
      }
      this.saveOrders(orders);
      return order;
    }
    return null;
  },

  // CUSTOMERS
  getCustomers() {
    return getStorage(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  },
  saveCustomers(customers) {
    setStorage(STORAGE_KEYS.CUSTOMERS, customers);
  },
  recordCustomerFromOrder(order) {
    const customers = this.getCustomers();
    const email = order.customer.email?.trim().toLowerCase();
    const phone = order.customer.phone?.trim();
    
    let existingIndex = -1;
    if (email) {
      existingIndex = customers.findIndex((c) => c.email?.toLowerCase() === email);
    }
    if (existingIndex === -1 && phone) {
      existingIndex = customers.findIndex((c) => c.phone === phone);
    }

    if (existingIndex !== -1) {
      const existing = customers[existingIndex];
      customers[existingIndex] = {
        ...existing,
        fullName: order.customer.fullName || existing.fullName,
        phone: phone || existing.phone,
        dni: order.customer.dni || existing.dni,
        address: `${order.customer.address || ''}, ${order.customer.city || 'San Jorge'}`,
        ordersCount: (existing.ordersCount || 1) + 1,
        totalSpent: (existing.totalSpent || 0) + (order.total || 0),
        lastOrderDate: order.createdAt,
      };
    } else {
      const newCustomer = {
        id: `cust-${Date.now()}`,
        fullName: order.customer.fullName,
        email: order.customer.email,
        phone: order.customer.phone,
        dni: order.customer.dni,
        address: `${order.customer.address || ''}, ${order.customer.city || 'San Jorge'}`,
        ordersCount: 1,
        totalSpent: order.total || 0,
        lastOrderDate: order.createdAt,
      };
      customers.unshift(newCustomer);
    }
    this.saveCustomers(customers);
  },

  // CONFIG
  getConfig() {
    return getStorage(STORAGE_KEYS.CONFIG, INITIAL_CONFIG);
  },
  saveConfig(config) {
    setStorage(STORAGE_KEYS.CONFIG, config);
  },

  // ADMIN AUTH & SESSION
  getAdminSession() {
    return getStorage(STORAGE_KEYS.ADMIN_SESSION, null);
  },
  loginAdmin(username, password) {
    const cleanUser = username?.trim().toLowerCase();
    const cleanPass = password?.trim();
    if (
      (cleanUser === 'sussan' && (cleanPass === 'sussan2026' || cleanPass === '1234' || cleanPass === 'admin123')) ||
      (cleanUser === 'sussanboutique' && cleanPass === 'sussan2026') ||
      (cleanUser === 'juanacalzados' && cleanPass === 'juanasanjorge2026') ||
      (cleanUser === 'admin' && (cleanPass === 'sussan2026' || cleanPass === 'juanasanjorge2026' || cleanPass === '1234' || cleanPass === 'admin123' || cleanPass === 'juana2026')) ||
      (cleanUser === 'admin@sussanboutique.com' && (cleanPass === 'sussan2026' || cleanPass === '1234' || cleanPass === 'admin123')) ||
      (cleanUser === 'juana' && (cleanPass === 'juanasanjorge2026' || cleanPass === '1234' || cleanPass === 'juana2026'))
    ) {
      const session = {
        username: cleanUser,
        name: 'Sussan Boutique Admin',
        role: 'superadmin',
        token: `auth_${Date.now()}`,
        loginTime: new Date().toISOString(),
      };
      setStorage(STORAGE_KEYS.ADMIN_SESSION, session);
      return { success: true, session };
    }
    return { success: false, error: 'Credenciales inválidas. Usa usuario: sussan / contraseña: sussan2026' };
  },
  logoutAdmin() {
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      window.dispatchEvent(new CustomEvent('juana-store-sync', { detail: { key: STORAGE_KEYS.ADMIN_SESSION, value: null } }));
    } catch (e) {
      console.error(e);
    }
  },

  // CUSTOMER AUTH & SESSION
  getCustomerSession() {
    return getStorage(STORAGE_KEYS.CUSTOMER_SESSION, null);
  },
  getRegisteredCustomers() {
    return getStorage(STORAGE_KEYS.REGISTERED_CUSTOMERS, []);
  },
  registerCustomer(userData) {
    const list = this.getRegisteredCustomers();
    const cleanEmail = userData.email?.trim().toLowerCase();
    if (!cleanEmail) return { success: false, error: 'Ingresa un correo electrónico válido.' };
    if (!userData.password || userData.password.length < 4) return { success: false, error: 'La contraseña debe tener al menos 4 caracteres.' };

    const exists = list.some((u) => u.email?.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: 'Ya existe una cuenta con este correo electrónico.' };
    }

    const newCustomer = {
      id: `user-${Date.now()}`,
      fullName: userData.fullName || 'Cliente Juana',
      email: cleanEmail,
      phone: userData.phone || '',
      password: userData.password,
      address: userData.address || '',
      city: userData.city || '',
      createdAt: new Date().toISOString(),
    };

    list.push(newCustomer);
    setStorage(STORAGE_KEYS.REGISTERED_CUSTOMERS, list);

    // Save session without password
    const session = {
      id: newCustomer.id,
      fullName: newCustomer.fullName,
      email: newCustomer.email,
      phone: newCustomer.phone,
      address: newCustomer.address,
      city: newCustomer.city,
      loginTime: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.CUSTOMER_SESSION, session);
    window.dispatchEvent(new CustomEvent('juana-store-sync', { detail: { key: STORAGE_KEYS.CUSTOMER_SESSION, value: session } }));
    return { success: true, session };
  },
  authGoogleCustomer(profile = {}) {
    const list = this.getRegisteredCustomers();
    const cleanEmail = (profile.email || 'usuario.google@gmail.com').trim().toLowerCase();
    let user = list.find((u) => u.email?.toLowerCase() === cleanEmail);
    if (!user) {
      user = {
        id: `user-google-${Date.now()}`,
        fullName: profile.fullName || 'Cliente Google',
        email: cleanEmail,
        phone: profile.phone || '',
        provider: 'google',
        createdAt: new Date().toISOString(),
      };
      list.push(user);
      setStorage(STORAGE_KEYS.REGISTERED_CUSTOMERS, list);
    }
    const session = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || '',
      provider: 'google',
      loginTime: new Date().toISOString(),
    };
    setStorage(STORAGE_KEYS.CUSTOMER_SESSION, session);
    window.dispatchEvent(new CustomEvent('juana-store-sync', { detail: { key: STORAGE_KEYS.CUSTOMER_SESSION, value: session } }));
    return { success: true, session };
  },
  loginCustomer(email, password) {
    const list = this.getRegisteredCustomers();
    const cleanEmail = email?.trim().toLowerCase();
    
    // Check registered customers
    const user = list.find((u) => u.email?.toLowerCase() === cleanEmail && u.password === password);
    if (user) {
      const session = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        loginTime: new Date().toISOString(),
      };
      setStorage(STORAGE_KEYS.CUSTOMER_SESSION, session);
      window.dispatchEvent(new CustomEvent('juana-store-sync', { detail: { key: STORAGE_KEYS.CUSTOMER_SESSION, value: session } }));
      return { success: true, session };
    }

    // Demo fast login if first time
    if (cleanEmail && password === '123456') {
      const demoUser = {
        id: `user-${Date.now()}`,
        fullName: cleanEmail.split('@')[0],
        email: cleanEmail,
        phone: '',
        password: '123456',
        createdAt: new Date().toISOString(),
      };
      list.push(demoUser);
      setStorage(STORAGE_KEYS.REGISTERED_CUSTOMERS, list);
      const session = {
        id: demoUser.id,
        fullName: demoUser.fullName,
        email: demoUser.email,
        loginTime: new Date().toISOString(),
      };
      setStorage(STORAGE_KEYS.CUSTOMER_SESSION, session);
      window.dispatchEvent(new CustomEvent('juana-store-sync', { detail: { key: STORAGE_KEYS.CUSTOMER_SESSION, value: session } }));
      return { success: true, session };
    }

    return { success: false, error: 'Correo o contraseña incorrectos. Si no tienes cuenta, selecciona "Registrarme".' };
  },
  logoutCustomer() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CUSTOMER_SESSION);
      window.dispatchEvent(new CustomEvent('juana-store-sync', { detail: { key: STORAGE_KEYS.CUSTOMER_SESSION, value: null } }));
    } catch (e) {
      console.error(e);
    }
  },

  // BACKUP & RESET
  exportFullData() {
    return {
      products: this.getProducts(),
      categories: this.getCategories(),
      orders: this.getOrders(),
      customers: this.getCustomers(),
      config: this.getConfig(),
      exportedAt: new Date().toISOString(),
    };
  },
  importFullData(jsonData) {
    if (jsonData.products) this.saveProducts(jsonData.products);
    if (jsonData.categories) this.saveCategories(jsonData.categories);
    if (jsonData.orders) this.saveOrders(jsonData.orders);
    if (jsonData.customers) this.saveCustomers(jsonData.customers);
    if (jsonData.config) this.saveConfig(jsonData.config);
    return true;
  },
  resetToDefaults() {
    this.saveProducts(INITIAL_PRODUCTS);
    this.saveCategories(INITIAL_CATEGORIES);
    this.saveOrders(INITIAL_ORDERS);
    this.saveCustomers(INITIAL_CUSTOMERS);
    this.saveConfig(INITIAL_CONFIG);
    return true;
  }
};
