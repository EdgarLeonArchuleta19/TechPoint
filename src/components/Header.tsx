import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TechPointLogo from './TechPointLogo';
import { siteConfig } from '../config/siteConfig';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 apple-glass-header border-b border-black/[0.06]">
      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        
        {/* Brand Logo with SOLUCIONES TECNOLÓGICAS subtitle */}
        <a
          href="#inicio"
          onClick={closeMenu}
          className="flex items-center focus:outline-none min-w-0"
          aria-label="TECHPOINT inicio"
        >
          <TechPointLogo size="sm" variant="default" showSubtitle={true} />
        </a>

        {/* Apple.com Ultra-Clean Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-[#1D1D1F]/80 hover:text-[#0866E8] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Minimal Pill CTA (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center shrink-0">
          <a
            href="#contacto"
            className="px-4 py-1.5 rounded-full bg-[#0866E8] hover:bg-[#0055D4] text-white text-xs font-medium transition-colors"
          >
            Preguntar
          </a>
        </div>

        {/* Mobile Toggle (44x44px touch target) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-black/5 active:bg-black/10 transition-colors shrink-0"
          aria-label="Menú"
        >
          <Icon
            icon={mobileMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"}
            className="w-6 h-6"
          />
        </button>

      </div>

      {/* Apple-style Clean Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-black/[0.08] px-6 py-5 space-y-1 apple-fade-1 shadow-xl">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="flex items-center justify-between py-3 text-base font-semibold text-[#1D1D1F] active:text-[#0866E8] border-b border-black/[0.05]"
            >
              <span>{item.label}</span>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 text-[#86868B]" />
            </a>
          ))}
          <div className="pt-4">
            <a
              href="#contacto"
              onClick={closeMenu}
              className="w-full flex items-center justify-center py-3 rounded-full bg-[#0866E8] text-white font-semibold text-sm"
            >
              Preguntar sin compromiso
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
