// src/App.jsx
import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NuestraHistoria from './components/NuestraHistoria';
import Habitaciones from './components/Habitaciones';
import ConsultaDisponibilidad from './components/ConsultaDisponibilidad';
import Servicios from './components/Servicios';
import Experiencia from './components/Experiencia';
import Politicas from './components/Politicas';
import ComoLlegar from './components/ComoLlegar';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import Reviews from './components/Reviews';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

// Modals & Drawers (Lazy loaded for optimal initial bundle & fast TTI)
import CartDrawer from './components/CartDrawer';
import { FloatingWhatsApp, ReservationModal, ToastNotificationContainer } from './components/UI';

const CheckoutModal = React.lazy(() => import('./components/CheckoutModal'));
const OrderSuccessModal = React.lazy(() => import('./components/OrderSuccessModal'));
const CustomerModal = React.lazy(() => import('./components/CustomerModal'));
const AdminLogin = React.lazy(() => import('./components/admin/AdminLogin'));
const AdminPanel = React.lazy(() => import('./components/admin/AdminPanel'));

function StoreApp() {
  const { activeView } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');

  if (activeView === 'admin') {
    return (
      <React.Suspense fallback={<div style={{ minHeight: '100vh', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--vadano-primary)' }}>Cargando panel...</div>}>
        <AdminPanel />
        <ToastNotificationContainer />
      </React.Suspense>
    );
  }

  return (
    <>
      <Navbar onReserve={() => setModalOpen(true)} />
      <main>
        {/* 1. HERO */}
        <Hero onReserve={() => setModalOpen(true)} />

        {/* 2. QUIÉNES SOMOS */}
        <NuestraHistoria />

        {/* 3. HABITACIONES */}
        <Habitaciones onSelectRoom={(name) => setSelectedRoom(name)} />

        {/* 4. CONSULTA DE DISPONIBILIDAD */}
        <ConsultaDisponibilidad selectedRoomName={selectedRoom} />

        {/* 5. SERVICIOS */}
        <Servicios />

        {/* 6. GALERÍA */}
        <Experiencia />

        {/* 7. POLÍTICAS */}
        <Politicas />

        {/* 8. CÓMO LLEGAR */}
        <ComoLlegar />

        {/* 9. PREGUNTAS FRECUENTES */}
        <PreguntasFrecuentes />

        {/* 10. LO DICEN NUESTROS HUÉSPEDES */}
        <Reviews />

        {/* 11. CONTÁCTANOS */}
        <Contacto onReserve={() => setModalOpen(true)} />
      </main>
      <Footer />

      {/* Global E-commerce Modals & Drawers (On-demand asynchronous loading) */}
      <CartDrawer />
      <React.Suspense fallback={null}>
        <CheckoutModal />
        <OrderSuccessModal />
        <CustomerModal />
        <AdminLogin />
        <ReservationModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </React.Suspense>
      <ToastNotificationContainer />

      {/* Global Brand Elements */}
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreApp />
    </StoreProvider>
  );
}
