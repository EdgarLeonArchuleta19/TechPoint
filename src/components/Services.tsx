import React from 'react';
import { Icon } from '@iconify/react';
import { getWhatsAppUrl } from '../config/siteConfig';

export const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-12 sm:py-20 bg-[#F5F5F7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Classic Apple Two-Tone Section Headline */}
        <div className="mb-7 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-snug">
            <span className="text-[#1D1D1F]">Servicios. </span>
            <span className="text-[#86868B]">Todo lo que tus equipos necesitan.</span>
          </h2>
        </div>

        {/* Apple Bento Grid — Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Tile 1: Main Hardware Tile (PC, Laptops, Celulares) */}
          <a
            href={getWhatsAppUrl("Hola TECHPOINT, quiero preguntar sin compromiso por la reparación o mantenimiento de mi equipo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-7 apple-card p-6 sm:p-10 flex flex-col justify-between sm:min-h-[300px] group"
          >
            <div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#0866E8] mb-2">
                PC • Laptops • Celulares
              </p>
              <h3 className="text-xl sm:text-4xl font-semibold text-[#1D1D1F] tracking-tight leading-[1.15]">
                Reparación y mantenimiento.
              </h3>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#86868B] max-w-md leading-relaxed">
                Limpieza interna, cambio de pasta térmica, aumento de velocidad (SSD y RAM), formateo, Windows y solución de fallas.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-[#0866E8]">
                  <Icon icon="solar:laptop-minimalistic-bold-duotone" className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-[#5856D6]">
                  <Icon icon="solar:smartphone-bold-duotone" className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-[#34C759]">
                  <Icon icon="solar:cpu-bolt-bold-duotone" className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1D1D1F] group-hover:bg-[#0866E8] text-white flex items-center justify-center transition-colors shrink-0">
                <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </a>

          {/* Tile 2: Páginas Web y Software */}
          <a
            href={getWhatsAppUrl("Hola TECHPOINT, me gustaría cotizar una página web o sistema sin compromiso.")}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-5 apple-card-dark text-white p-6 sm:p-10 flex flex-col justify-between sm:min-h-[300px] group"
          >
            <div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
                Desarrollo Digital
              </p>
              <h3 className="text-xl sm:text-3xl font-semibold text-white tracking-tight leading-[1.15]">
                Páginas Web y Software.
              </h3>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
                Sitios web modernos, sistemas de punto de venta e inventario diseñados a la medida de tu negocio.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center justify-between">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/10 flex items-center justify-center text-sky-400">
                <Icon icon="solar:code-square-bold-duotone" className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 group-hover:bg-[#0866E8] text-white flex items-center justify-center transition-colors shrink-0">
                <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </a>

          {/* Tile 3: Otros Servicios */}
          <a
            href={getWhatsAppUrl("Hola TECHPOINT, tengo una duda sobre un servicio tecnológico sin compromiso.")}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-12 apple-card p-6 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group"
          >
            <div>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#0866E8] mb-1">
                Sin compromiso
              </p>
              <h4 className="text-lg sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight leading-snug">
                ¿Necesitas otro servicio tecnológico?{' '}
                <span className="text-[#86868B] font-normal block sm:inline mt-1 sm:mt-0 text-sm sm:text-xl">
                  Respaldos, impresoras, redes, armado de PC o cualquier falla.
                </span>
              </h4>
            </div>

            <div className="shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#0866E8] group-hover:underline pt-1 sm:pt-0">
              <span>Preguntar ahora</span>
              <Icon icon="solar:alt-arrow-right-linear" className="w-4 h-4" />
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};

export default Services;
