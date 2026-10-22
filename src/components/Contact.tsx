import React from 'react';
import { Icon } from '@iconify/react';
import { siteConfig, getSolucionesWhatsAppUrl, getElectronicosWhatsAppUrl } from '../config/siteConfig';

export const Contact: React.FC = () => {
  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#F5F5F7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Classic Apple Two-Tone Section Headline */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
            <span className="text-[#1D1D1F]">Contacto. </span>
            <span className="text-[#86868B]">Elige con qué división hablar en {siteConfig.location.city}.</span>
          </h2>
        </div>

        {/* Top Row: 2 Distinct WhatsApp Division Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
          
          {/* Division 1 WhatsApp: Soluciones Tecnológicas */}
          <a
            href={getSolucionesWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card p-7 sm:p-8 flex flex-col justify-between min-h-[220px] group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-2xl bg-[#F5F5F7] flex items-center justify-center">
                  <Icon icon="logos:whatsapp-icon" className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0866E8] text-[11px] font-semibold">
                  Reparaciones, Web & Software
                </span>
              </div>
              <p className="text-xs font-medium text-[#86868B]">
                TECHPOINT Soluciones Tecnológicas
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] mt-0.5 tracking-tight">
                Servicios y Reparaciones
              </h3>
              <p className="text-sm text-[#0866E8] font-medium mt-1">
                WhatsApp: {siteConfig.divisions.soluciones.phoneDisplay}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs font-medium text-[#0866E8] group-hover:underline">
              <span>Escribir a Soluciones Tecnológicas</span>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </div>
          </a>

          {/* Division 2 WhatsApp: Electrónicos */}
          <a
            href={getElectronicosWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card p-7 sm:p-8 flex flex-col justify-between min-h-[220px] group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-2xl bg-[#F5F5F7] flex items-center justify-center">
                  <Icon icon="logos:whatsapp-icon" className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-[11px] font-semibold">
                  Venta de Artículos
                </span>
              </div>
              <p className="text-xs font-medium text-[#86868B]">
                TECHPOINT Electrónicos
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] mt-0.5 tracking-tight">
                Compra de Artículos
              </h3>
              <p className="text-sm text-[#0866E8] font-medium mt-1">
                WhatsApp: {siteConfig.divisions.electronicos.phoneDisplay}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs font-medium text-[#0866E8] group-hover:underline">
              <span>Escribir a Electrónicos (Compras)</span>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </div>
          </a>

        </div>

        {/* Bottom Row: 2 Separated Social Cards (Facebook & Instagram) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Facebook (Separated) */}
          <a
            href={siteConfig.contact.social.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card p-6 sm:p-7 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F5F7] flex items-center justify-center shrink-0">
                <Icon icon="logos:facebook" className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#86868B]">Página oficial</p>
                <h3 className="text-lg font-semibold text-[#1D1D1F] tracking-tight">
                  Facebook • {siteConfig.contact.social.facebook.name}
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 text-xs font-medium text-[#0866E8] group-hover:underline">
              <span className="hidden sm:inline">Visitar</span>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </div>
          </a>

          {/* Instagram (Separated) */}
          <a
            href={siteConfig.contact.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card p-6 sm:p-7 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F5F7] flex items-center justify-center shrink-0">
                <Icon icon="skill-icons:instagram" className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#86868B]">Perfil oficial</p>
                <h3 className="text-lg font-semibold text-[#1D1D1F] tracking-tight">
                  Instagram • @{siteConfig.contact.social.instagram.name}
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 text-xs font-medium text-[#0866E8] group-hover:underline">
              <span className="hidden sm:inline">Ver perfil</span>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};

export default Contact;
