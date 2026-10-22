import React from 'react';
import { Icon } from '@iconify/react';
import { getSolucionesWhatsAppUrl, getElectronicosWhatsAppUrl } from '../config/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="pt-28 pb-14 sm:pt-36 sm:pb-20 bg-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Apple Eyebrow with Location Indicator */}
        <div className="apple-fade-1 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0866E8] tracking-wide mb-3">
          <Icon icon="solar:map-point-bold-duotone" className="w-4 h-4 shrink-0" />
          <span>Ubicados en Culiacán, Sinaloa</span>
        </div>

        {/* Apple Giant Headline */}
        <h1 className="apple-fade-1 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F] leading-[1.08] px-1">
          Tu punto en tecnología.
        </h1>

        {/* Apple Neutral Gray Subtitle explaining the 2 divisions */}
        <p className="apple-fade-2 mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-[#86868B] max-w-2xl mx-auto font-normal leading-relaxed px-2">
          Dos divisiones especializadas para atenderte directamente según lo que necesites:
        </p>

        {/* 2 Apple Division Selector Cards (Soluciones Tecnológicas vs Electrónicos) */}
        <div className="apple-fade-2 mt-7 sm:mt-9 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
          
          {/* Division 1: Soluciones Tecnológicas */}
          <div className="rounded-3xl bg-[#F5F5F7] p-5 sm:p-6 flex flex-col justify-between border border-black/[0.04]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0866E8]">
                  División Servicios
                </span>
                <Icon icon="solar:laptop-minimalistic-bold-duotone" className="w-5 h-5 text-[#0866E8]" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] tracking-tight">
                TECHPOINT <span className="text-[#0866E8]">Soluciones Tecnológicas</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#86868B] mt-1.5 leading-relaxed">
                Reparación y mantenimiento de PC, laptops, celulares, páginas web y software.
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-black/[0.06] flex items-center justify-between gap-2">
              <a
                href="#servicios"
                className="text-xs font-medium text-[#1D1D1F] hover:text-[#0866E8] transition-colors"
              >
                Ver servicios ↓
              </a>
              <a
                href={getSolucionesWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0866E8] hover:bg-[#0055D4] text-white text-xs font-medium transition-colors"
              >
                <span>WhatsApp Servicios</span>
                <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Division 2: Electrónicos */}
          <div className="rounded-3xl bg-[#F5F5F7] p-5 sm:p-6 flex flex-col justify-between border border-black/[0.04]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D1D1F]">
                  División Tienda
                </span>
                <Icon icon="solar:headphones-round-sound-bold-duotone" className="w-5 h-5 text-[#1D1D1F]" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-[#1D1D1F] tracking-tight">
                TECHPOINT <span className="text-[#0866E8]">Electrónicos</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#86868B] mt-1.5 leading-relaxed">
                Venta de artículos: AirPods Pro, AirPods 3, cargadores rápidos 20W y accesorios.
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-black/[0.06] flex items-center justify-between gap-2">
              <a
                href="#accesorios"
                className="text-xs font-medium text-[#1D1D1F] hover:text-[#0866E8] transition-colors"
              >
                Ver catálogo ↓
              </a>
              <a
                href={getElectronicosWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1D1D1F] hover:bg-[#0866E8] text-white text-xs font-medium transition-colors"
              >
                <span>WhatsApp Compras</span>
                <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Minimalist Apple Hardware Lineup Stage */}
        <div className="apple-fade-3 mt-10 sm:mt-14 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-2">
          <svg
            viewBox="0 0 760 240"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="380" cy="224" rx="310" ry="8" fill="#07162E" fillOpacity="0.05" />

            {/* Center MacBook Pro Silhouette */}
            <g>
              <rect x="200" y="16" width="320" height="196" rx="14" fill="#1D1D1F" />
              <rect x="208" y="24" width="304" height="180" rx="8" fill="#07162E" />
              <rect x="342" y="24" width="36" height="6" rx="3" fill="#1D1D1F" />
              <circle cx="360" cy="114" r="50" fill="#0866E8" fillOpacity="0.22" />
              <circle cx="360" cy="114" r="24" stroke="#0866E8" strokeWidth="2.5" />
              <ellipse cx="360" cy="114" rx="62" ry="17" transform="rotate(-16 360 114)" stroke="#38BDF8" strokeWidth="2" />
              <path d="M164 212H556C556 218.627 550.627 224 544 224H176C169.373 224 164 218.627 164 212Z" fill="#D2D2D7" />
              <rect x="330" y="212" width="60" height="4" rx="2" fill="#86868B" />
            </g>

            {/* Right iPhone Silhouette */}
            <g>
              <rect x="556" y="78" width="72" height="146" rx="14" fill="#1D1D1F" />
              <rect x="561" y="83" width="62" height="136" rx="10" fill="#F5F7FA" />
              <rect x="581" y="88" width="22" height="6" rx="3" fill="#1D1D1F" />
              <circle cx="592" cy="150" r="18" stroke="#0866E8" strokeWidth="2.5" />
              <circle cx="592" cy="150" r="5" fill="#0866E8" />
            </g>

            {/* Left AirPods Case Silhouette */}
            <g>
              <rect x="116" y="142" width="68" height="82" rx="22" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="2" />
              <line x1="117" y1="168" x2="183" y2="168" stroke="#E5E5EA" strokeWidth="2" />
              <circle cx="150" cy="190" r="2.5" fill="#34C759" />
            </g>
          </svg>
        </div>

      </div>
    </section>
  );
};

export default Hero;
