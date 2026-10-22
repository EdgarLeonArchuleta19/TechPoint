import React from 'react';
import { Icon } from '@iconify/react';
import { getWhatsAppUrl } from '../config/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="pt-28 pb-14 sm:pt-36 sm:pb-24 bg-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Apple Eyebrow with Location Indicator */}
        <div className="apple-fade-1 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0866E8] tracking-wide mb-3">
          <Icon icon="solar:map-point-bold-duotone" className="w-4 h-4 shrink-0" />
          <span>Ubicados en Culiacán, Sinaloa</span>
        </div>

        {/* Apple Giant Headline — Mobile First Sizing */}
        <h1 className="apple-fade-1 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#1D1D1F] leading-[1.08] px-1">
          Tu punto en tecnología.
        </h1>

        {/* Apple Neutral Gray Subtitle */}
        <p className="apple-fade-2 mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-[#86868B] max-w-xl mx-auto font-normal leading-relaxed px-2">
          Reparación y mantenimiento de PC, laptops y celulares en Culiacán.{' '}
          <span className="text-[#1D1D1F] font-medium">Páginas web y accesorios calidad original.</span>
        </p>

        {/* Responsive Action Pair: Full-width stack on phones, inline on tablet/desktop */}
        <div className="apple-fade-2 mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-2">
          <a
            href={getWhatsAppUrl("Hola TECHPOINT, quiero preguntar por un servicio sin compromiso.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#0866E8] hover:bg-[#0055D4] text-white font-medium text-sm transition-colors active:scale-95"
          >
            Preguntar sin compromiso
          </a>

          <a
            href="#servicios"
            className="w-full sm:w-auto py-2 inline-flex items-center justify-center gap-1 text-[#0866E8] hover:underline font-medium text-sm"
          >
            <span>Explorar servicios</span>
            <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 mt-0.5" />
          </a>
        </div>

        {/* Minimalist Apple Hardware Lineup Stage — Responsive for Mobile & Desktop */}
        <div className="apple-fade-3 mt-8 sm:mt-12 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-2">
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
