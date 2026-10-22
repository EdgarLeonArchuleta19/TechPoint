import React from 'react';
import { Icon } from '@iconify/react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

const ProductVisual: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'airpods-pro':
      return (
        <svg viewBox="0 0 240 200" className="w-32 h-32 sm:w-36 sm:h-36 group-hover:scale-105 transition-transform duration-500">
          <g transform="translate(46, 26) rotate(-14)">
            <rect x="18" y="34" width="11" height="36" rx="5.5" fill="#F5F5F7" stroke="#D2D2D7" strokeWidth="1.5" />
            <ellipse cx="28" cy="24" rx="18" ry="15" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="1.5" />
            <ellipse cx="43" cy="24" rx="7" ry="10" fill="#F5F5F7" stroke="#D2D2D7" strokeWidth="1.2" />
            <rect x="24" y="18" width="6" height="3" rx="1.5" fill="#1D1D1F" />
          </g>
          <g transform="translate(136, 16) rotate(14)">
            <rect x="21" y="34" width="11" height="36" rx="5.5" fill="#F5F5F7" stroke="#D2D2D7" strokeWidth="1.5" />
            <ellipse cx="22" cy="24" rx="18" ry="15" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="1.5" />
            <ellipse cx="7" cy="24" rx="7" ry="10" fill="#F5F5F7" stroke="#D2D2D7" strokeWidth="1.2" />
            <rect x="20" y="18" width="6" height="3" rx="1.5" fill="#1D1D1F" />
          </g>
          <rect x="52" y="76" width="136" height="96" rx="34" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="2" />
          <line x1="53" y1="108" x2="187" y2="108" stroke="#E5E5EA" strokeWidth="1.5" />
          <circle cx="120" cy="134" r="3" fill="#34C759" />
        </svg>
      );

    case 'airpods-3':
      return (
        <svg viewBox="0 0 240 200" className="w-32 h-32 sm:w-36 sm:h-36 group-hover:scale-105 transition-transform duration-500">
          <g transform="translate(52, 24) rotate(-10)">
            <rect x="18" y="32" width="10" height="38" rx="5" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="1.5" />
            <ellipse cx="27" cy="22" rx="17" ry="15" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="1.5" />
            <ellipse cx="32" cy="21" rx="4" ry="7" fill="#1D1D1F" />
          </g>
          <g transform="translate(134, 18) rotate(10)">
            <rect x="22" y="32" width="10" height="38" rx="5" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="1.5" />
            <ellipse cx="23" cy="22" rx="17" ry="15" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="1.5" />
            <ellipse cx="18" cy="21" rx="4" ry="7" fill="#1D1D1F" />
          </g>
          <rect x="60" y="78" width="120" height="94" rx="32" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="2" />
          <line x1="61" y1="110" x2="179" y2="110" stroke="#E5E5EA" strokeWidth="1.5" />
          <circle cx="120" cy="136" r="3" fill="#34C759" />
        </svg>
      );

    case 'cargador-iphone':
      return (
        <svg viewBox="0 0 240 200" className="w-32 h-32 sm:w-36 sm:h-36 group-hover:scale-105 transition-transform duration-500">
          <rect x="98" y="28" width="9" height="34" rx="3" fill="#86868B" />
          <rect x="133" y="28" width="9" height="34" rx="3" fill="#86868B" />
          <rect x="68" y="58" width="104" height="114" rx="26" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="2" />
          <rect x="78" y="68" width="84" height="94" rx="20" fill="#F5F5F7" />
          <rect x="106" y="136" width="28" height="9" rx="4.5" fill="#1D1D1F" />
          <text x="120" y="112" textAnchor="middle" fill="#1D1D1F" fontSize="16" fontWeight="600" fontFamily="sans-serif">
            20W
          </text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 240 200" className="w-32 h-32 sm:w-36 sm:h-36 group-hover:scale-105 transition-transform duration-500">
          <ellipse cx="120" cy="110" rx="56" ry="44" fill="none" stroke="#D2D2D7" strokeWidth="9" />
          <ellipse cx="120" cy="110" rx="56" ry="44" fill="none" stroke="#FFFFFF" strokeWidth="5" />
          <rect x="52" y="42" width="24" height="36" rx="6" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="2" />
          <rect x="57" y="28" width="14" height="15" rx="3" fill="#86868B" />
          <rect x="164" y="42" width="24" height="36" rx="6" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="2" />
          <rect x="169" y="28" width="14" height="15" rx="3" fill="#86868B" />
        </svg>
      );
  }
};

export const AccessoriesSection: React.FC = () => {
  return (
    <section id="accesorios" className="py-12 sm:py-20 bg-[#F5F5F7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Classic Apple Two-Tone Section Headline */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
            <span className="text-[#1D1D1F]">Productos. </span>
            <span className="text-[#86868B]">Accesorios calidad original.</span>
          </h2>
        </div>

        {/* Clean 4-Card Apple Store Shelf: Title at Top, Product in Center */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {siteConfig.products.map((item) => (
            <a
              key={item.id}
              href={getWhatsAppUrl(item.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-card p-6 flex flex-col justify-between group"
            >
              {/* Apple Top-Left Typography */}
              <div>
                <p className="text-[11px] font-semibold text-[#86868B]">
                  {item.category}
                </p>
                <h3 className="text-base sm:text-lg font-semibold text-[#1D1D1F] mt-0.5 tracking-tight">
                  {item.name}
                </h3>
              </div>

              {/* Center Hardware Graphic */}
              <div className="my-5 flex items-center justify-center">
                <ProductVisual id={item.id} />
              </div>

              {/* Subtle Bottom Row */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-normal text-[#0866E8] group-hover:underline">
                  Preguntar
                </span>
                <div className="w-7 h-7 rounded-full bg-[#F5F5F7] group-hover:bg-[#0866E8] text-[#1D1D1F] group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AccessoriesSection;
