import React from 'react';
import TechPointLogo from './TechPointLogo';
import { siteConfig } from '../config/siteConfig';

interface FooterProps {
  onOpenOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F7] text-[#86868B] pt-8 pb-24 sm:py-10 border-t border-black/[0.08]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-center sm:text-left">
        <TechPointLogo size="sm" variant="default" showSubtitle={false} />

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
          <span>
            Copyright © {currentYear} {siteConfig.name}. {siteConfig.location.full}.
          </span>
          <button
            type="button"
            onClick={onOpenOrderModal}
            className="text-[#86868B] hover:text-[#1D1D1F] underline underline-offset-2 transition-colors"
          >
            Orden de Servicio
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
