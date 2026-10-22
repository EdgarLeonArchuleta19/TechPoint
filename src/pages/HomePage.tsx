import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import AccessoriesSection from '../components/AccessoriesSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';
import ServiceOrderModal from '../components/ServiceOrderModal';

export const HomePage: React.FC = () => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#orden') {
        setOrderModalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] text-[#1D1D1F]">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <AccessoriesSection />
        <Contact />
      </main>
      <Footer onOpenOrderModal={() => setOrderModalOpen(true)} />
      <WhatsAppFloatingButton />
      <ServiceOrderModal
        isOpen={orderModalOpen}
        onClose={() => {
          setOrderModalOpen(false);
          if (window.location.hash === '#orden') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
      />
    </div>
  );
};

export default HomePage;
