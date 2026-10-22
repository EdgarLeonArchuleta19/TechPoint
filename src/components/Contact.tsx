import React from 'react';
import { Icon } from '@iconify/react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

export const Contact: React.FC = () => {
  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#F5F5F7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Classic Apple Two-Tone Section Headline */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
            <span className="text-[#1D1D1F]">Contacto. </span>
            <span className="text-[#86868B]">Pregunta sin compromiso en {siteConfig.location.city}.</span>
          </h2>
        </div>

        {/* 3 Separated Apple Cards: WhatsApp, Facebook, Instagram */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Card 1: WhatsApp */}
          <a
            href={getWhatsAppUrl("Hola TECHPOINT, me gustaría hacer una consulta sin compromiso.")}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card p-7 sm:p-8 flex flex-col justify-between min-h-[210px] group"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mb-5">
                <Icon icon="logos:whatsapp-icon" className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-[#86868B]">
                Mensaje directo
              </p>
              <h3 className="text-xl font-semibold text-[#1D1D1F] mt-0.5 tracking-tight">
                WhatsApp
              </h3>
              <p className="text-sm text-[#0866E8] font-medium mt-1">
                {siteConfig.contact.phoneDisplay}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-normal text-[#0866E8] group-hover:underline">
              <span>Iniciar chat</span>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </div>
          </a>

          {/* Card 2: Facebook (Separated) */}
          <a
            href={siteConfig.contact.social.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card p-7 sm:p-8 flex flex-col justify-between min-h-[210px] group"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mb-5">
                <Icon icon="logos:facebook" className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-[#86868B]">
                Página oficial
              </p>
              <h3 className="text-xl font-semibold text-[#1D1D1F] mt-0.5 tracking-tight">
                Facebook
              </h3>
              <p className="text-sm text-[#86868B] font-normal mt-1">
                {siteConfig.contact.social.facebook.name}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-normal text-[#0866E8] group-hover:underline">
              <span>Visitar página</span>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </div>
          </a>

          {/* Card 3: Instagram (Separated) */}
          <a
            href={siteConfig.contact.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card p-7 sm:p-8 flex flex-col justify-between min-h-[210px] group"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mb-5">
                <Icon icon="skill-icons:instagram" className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-[#86868B]">
                Perfil oficial
              </p>
              <h3 className="text-xl font-semibold text-[#1D1D1F] mt-0.5 tracking-tight">
                Instagram
              </h3>
              <p className="text-sm text-[#86868B] font-normal mt-1">
                @{siteConfig.contact.social.instagram.name}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-normal text-[#0866E8] group-hover:underline">
              <span>Ver perfil</span>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};

export default Contact;
