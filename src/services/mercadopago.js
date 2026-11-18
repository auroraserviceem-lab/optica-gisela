// src/services/mercadopago.js

/**
 * Servicio de integración para Mercado Pago (Checkout Pro / Tarjeta / Débito)
 */
export const MercadoPagoService = {
  // Simular o crear preferencia de pago de Mercado Pago
  async createPreference(order, config) {
    // Simula una llamada a API / Endpoint Backend
    return new Promise((resolve) => {
      setTimeout(() => {
        const preferenceId = `MP-PREF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const initPoint = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
        const sandboxInitPoint = `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
        
        resolve({
          id: preferenceId,
          initPoint: config?.mercadoPago?.sandbox ? sandboxInitPoint : initPoint,
          sandbox: config?.mercadoPago?.sandbox ?? true,
          items: order.items.map((item) => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'ARS',
          })),
          payer: {
            name: order.customer.fullName,
            email: order.customer.email,
            phone: { number: order.customer.phone },
            identification: { number: order.customer.dni },
          },
        });
      }, 600);
    });
  },

  // Simulación de procesamiento de pago inmediato
  async processPayment(cardData, orderAmount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'approved',
          status_detail: 'accredited',
          id: Math.floor(1000000000 + Math.random() * 9000000000),
          date_approved: new Date().toISOString(),
          payment_method_id: cardData.paymentMethod || 'visa',
          payment_type_id: 'credit_card',
          transaction_amount: orderAmount,
        });
      }, 1200);
    });
  },
};
