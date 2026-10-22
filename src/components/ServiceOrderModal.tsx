import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import TechPointLogo from './TechPointLogo';
import { siteConfig } from '../config/siteConfig';

interface ServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceOrderModal: React.FC<ServiceOrderModalProps> = ({ isOpen, onClose }) => {
  const [folio] = useState(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `TP-${random}`;
  });

  const today = new Date().toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [deviceType, setDeviceType] = useState('Laptop');
  const [brandModel, setBrandModel] = useState('');
  const [accessoriesLeft, setAccessoriesLeft] = useState('Con cargador');
  const [physicalCondition, setPhysicalCondition] = useState('Uso normal / estética buena');
  const [serviceWork, setServiceWork] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [advancePayment, setAdvancePayment] = useState('0');

  if (!isOpen) return null;

  const totalNum = parseFloat(totalCost) || 0;
  const advanceNum = parseFloat(advancePayment) || 0;
  const remainingNum = Math.max(0, totalNum - advanceNum);

  const sendToClientWhatsApp = () => {
    const cleanPhone = clientPhone.replace(/\D/g, '');
    const targetPhone = cleanPhone.length === 10 ? `52${cleanPhone}` : cleanPhone;

    const message = [
      `*TECHPOINT — Soluciones Tecnológicas*`,
      `📍 Culiacán, Sinaloa | Tel: ${siteConfig.contact.phoneDisplay}`,
      `----------------------------------`,
      `📋 *ORDEN DE SERVICIO: #${folio}*`,
      `📅 *Fecha:* ${today}`,
      `👤 *Cliente:* ${clientName || 'Cliente'}`,
      `💻 *Equipo:* ${deviceType} - ${brandModel || 'Por especificar'}`,
      `🔌 *Accesorios recibidos:* ${accessoriesLeft}`,
      `🔍 *Estado físico:* ${physicalCondition}`,
      `🛠️ *Servicio / Falla:* ${serviceWork || 'Revisión y diagnóstico'}`,
      `----------------------------------`,
      `💰 *Total estimado:* $${totalNum.toLocaleString('es-MX')} MXN`,
      `✅ *Anticipo:* $${advanceNum.toLocaleString('es-MX')} MXN`,
      `📌 *Restante al entregar:* $${remainingNum.toLocaleString('es-MX')} MXN`,
      `----------------------------------`,
      `_Nota: TECHPOINT no se hace responsable por pérdida de información si no se solicitó respaldo previo. Equipos no recogidos después de 30 días causan cargo de almacenaje._`,
    ].join('\n');

    const encoded = encodeURIComponent(message);
    const url = targetPhone
      ? `https://wa.me/${targetPhone}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07162E]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-[28px] max-w-3xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0866E8] text-xs font-extrabold">
              Folio #{folio}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#07162E]">
              Generador de Orden de Servicio
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Cerrar"
          >
            <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Nombre del Cliente
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ej. Carlos Mendoza"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200 text-sm text-[#07162E] focus:outline-none focus:border-[#0866E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              WhatsApp del Cliente (10 dígitos)
            </label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="Ej. 6671234567"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200 text-sm text-[#07162E] focus:outline-none focus:border-[#0866E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Tipo de Equipo / Venta
            </label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200 text-sm text-[#07162E] focus:outline-none focus:border-[#0866E8]"
            >
              <option value="Laptop">Laptop</option>
              <option value="PC de Escritorio">PC de Escritorio</option>
              <option value="Celular">Celular</option>
              <option value="Accesorio (AirPods / Cargador)">Accesorio (AirPods / Cargador)</option>
              <option value="Proyecto Web / Software">Proyecto Web / Software</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Marca y Modelo
            </label>
            <input
              type="text"
              value={brandModel}
              onChange={(e) => setBrandModel(e.target.value)}
              placeholder="Ej. HP Pavilion 15 / iPhone 13"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200 text-sm text-[#07162E] focus:outline-none focus:border-[#0866E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Accesorios que deja
            </label>
            <input
              type="text"
              value={accessoriesLeft}
              onChange={(e) => setAccessoriesLeft(e.target.value)}
              placeholder="Ej. Con cargador original / Sin funda"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200 text-sm text-[#07162E] focus:outline-none focus:border-[#0866E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Estado físico al recibir
            </label>
            <input
              type="text"
              value={physicalCondition}
              onChange={(e) => setPhysicalCondition(e.target.value)}
              placeholder="Ej. Rayones leves en tapa"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200 text-sm text-[#07162E] focus:outline-none focus:border-[#0866E8]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Servicio a realizar o falla reportada
            </label>
            <textarea
              rows={2}
              value={serviceWork}
              onChange={(e) => setServiceWork(e.target.value)}
              placeholder="Ej. Mantenimiento preventivo, limpieza interna, cambio de pasta térmica MX-4 e instalación de SSD."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200 text-sm text-[#07162E] focus:outline-none focus:border-[#0866E8] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Costo Total ($ MXN)
            </label>
            <input
              type="number"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              placeholder="Ej. 650"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200 text-sm text-[#07162E] focus:outline-none focus:border-[#0866E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Anticipo recibido ($ MXN)
            </label>
            <input
              type="number"
              value={advancePayment}
              onChange={(e) => setAdvancePayment(e.target.value)}
              placeholder="Ej. 200"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-slate-200 text-sm text-[#07162E] focus:outline-none focus:border-[#0866E8]"
            />
          </div>
        </div>

        {/* Printable Live Preview Receipt Card */}
        <div
          id="printable-order"
          className="rounded-2xl bg-[#F5F7FA] border border-slate-200 p-5 mb-6 text-xs text-slate-700 space-y-3"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <TechPointLogo size="sm" variant="default" showSubtitle={true} />
            <div className="text-right">
              <div className="font-extrabold text-[#07162E] text-sm">ORDEN #{folio}</div>
              <div className="text-slate-500">{today} • Culiacán, Sin.</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <span className="text-slate-400 font-semibold">Cliente:</span>{' '}
              <strong className="text-[#07162E]">{clientName || '—'}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Tel:</span>{' '}
              <strong className="text-[#07162E]">{clientPhone || '—'}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Equipo:</span>{' '}
              <strong className="text-[#07162E]">{deviceType} {brandModel}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Accesorios:</span>{' '}
              <strong className="text-[#07162E]">{accessoriesLeft}</strong>
            </div>
          </div>

          <div className="pt-1">
            <span className="text-slate-400 font-semibold">Servicio / Diagnóstico:</span>{' '}
            <strong className="text-[#07162E]">{serviceWork || 'Revisión general'}</strong>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200 font-bold text-sm text-[#07162E]">
            <span>Total: ${totalNum.toLocaleString('es-MX')}</span>
            <span>Anticipo: ${advanceNum.toLocaleString('es-MX')}</span>
            <span className="text-[#0866E8]">Resta: ${remainingNum.toLocaleString('es-MX')} MXN</span>
          </div>

          <p className="text-[10px] text-slate-400 pt-1">
            Condiciones: TECHPOINT no se responsabiliza por pérdida de datos si el cliente no solicitó respaldo previo.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={sendToClientWhatsApp}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#0866E8] hover:bg-[#07162E] text-white font-bold text-xs sm:text-sm transition-colors"
          >
            <Icon icon="logos:whatsapp-icon" className="w-4 h-4" />
            <span>Mandar Nota por WhatsApp al Cliente</span>
          </button>

          <button
            type="button"
            onClick={handlePrintPdf}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#F5F7FA] hover:bg-slate-200 text-[#07162E] font-bold text-xs sm:text-sm transition-colors"
          >
            <Icon icon="solar:printer-minimalistic-bold-duotone" className="w-4 h-4 text-[#0866E8]" />
            <span>Guardar PDF / Imprimir</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceOrderModal;
