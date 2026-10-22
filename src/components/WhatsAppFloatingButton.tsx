import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { siteConfig, getSolucionesWhatsAppUrl, getElectronicosWhatsAppUrl } from '../config/siteConfig';

export const WhatsAppFloatingButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Apple-style Division Selector Popover */}
      {open && (
        <div className="mb-3 w-72 sm:w-80 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/[0.08] shadow-2xl p-3 space-y-2 apple-fade-1">
          <div className="px-2 pt-1 pb-1.5 flex items-center justify-between border-b border-black/[0.06]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
              ¿Qué necesitas hoy?
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[#86868B] hover:text-[#1D1D1F] p-0.5"
              aria-label="Cerrar selector"
            >
              <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
            </button>
          </div>

          {/* Option 1: Soluciones Tecnológicas */}
          <a
            href={getSolucionesWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-start gap-3 p-3 rounded-2xl bg-[#F5F5F7] hover:bg-blue-50 transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0866E8] shrink-0 shadow-sm">
              <Icon icon="solar:laptop-minimalistic-bold-duotone" className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-[#1D1D1F] group-hover:text-[#0866E8]">
                {siteConfig.divisions.soluciones.shortName}
              </div>
              <div className="text-[11px] text-[#86868B] leading-snug mt-0.5">
                Reparaciones, PC, celulares y software
              </div>
              <div className="text-[10px] font-semibold text-[#0866E8] mt-1">
                {siteConfig.divisions.soluciones.phoneDisplay}
              </div>
            </div>
          </a>

          {/* Option 2: Electrónicos */}
          <a
            href={getElectronicosWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-start gap-3 p-3 rounded-2xl bg-[#F5F5F7] hover:bg-blue-50 transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#1D1D1F] shrink-0 shadow-sm">
              <Icon icon="solar:headphones-round-sound-bold-duotone" className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-[#1D1D1F] group-hover:text-[#0866E8]">
                {siteConfig.divisions.electronicos.shortName}
              </div>
              <div className="text-[11px] text-[#86868B] leading-snug mt-0.5">
                Comprar AirPods, cargadores y artículos
              </div>
              <div className="text-[10px] font-semibold text-[#0866E8] mt-1">
                {siteConfig.divisions.electronicos.phoneDisplay}
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Floating WhatsApp Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Contactar por WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg shadow-black/15 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-300"
      >
        <Icon icon={open ? "solar:close-circle-linear" : "mdi:whatsapp"} className="w-8 h-8 text-white" />
      </button>
    </div>
  );
};

export default WhatsAppFloatingButton;
