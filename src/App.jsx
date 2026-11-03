import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NuestraHistoria from './components/NuestraHistoria';
import MenuDestacado from './components/MenuDestacado';
import Reviews from './components/Reviews';
import Experiencia from './components/Experiencia';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

import { FloatingWhatsApp, ReservationModal } from './components/UI';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Navbar 
        onReserve={() => setModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      <main>
        <Hero onReserve={() => setModalOpen(true)} />
        <NuestraHistoria />
        <MenuDestacado 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Experiencia />
        <Reviews />
        <Contacto onReserve={() => setModalOpen(true)} />
      </main>
      <Footer />

      {/* Global floating elements */}
      <FloatingWhatsApp />
      <ReservationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
