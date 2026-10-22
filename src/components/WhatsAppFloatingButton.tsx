import React from 'react';
import { Icon } from '@iconify/react';
import { getWhatsAppUrl } from '../config/siteConfig';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <a
      href={getWhatsAppUrl("Hola TECHPOINT, quiero hacer una consulta sin compromiso.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg shadow-black/15 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-300"
    >
      <Icon icon="mdi:whatsapp" className="w-8 h-8 text-white" />
    </a>
  );
};

export default WhatsAppFloatingButton;
