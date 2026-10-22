import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { jsPDF } from 'jspdf';
import { siteConfig } from '../config/siteConfig';

interface ServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const loadImageAsBase64 = (url: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

export const ServiceOrderModal: React.FC<ServiceOrderModalProps> = ({ isOpen, onClose }) => {
  const [folio] = useState(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `TP-${random}`;
  });

  const today = new Date().toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // 1. Tipo: 'servicio' o 'venta'
  const [orderType, setOrderType] = useState<'servicio' | 'venta'>('servicio');

  // 2. Datos del cliente
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // 3A. Campos si es Venta
  const [selectedProductId, setSelectedProductId] = useState(siteConfig.products[0].id);
  const [salePrice, setSalePrice] = useState(String(siteConfig.products[0].defaultPrice));

  // 3B. Campos si es Servicio
  const [selectedService, setSelectedService] = useState(siteConfig.serviceTypes[0]);
  const [deviceReceived, setDeviceReceived] = useState('');
  const [serviceTotal, setServiceTotal] = useState('');
  const [serviceAdvance, setServiceAdvance] = useState('');

  const [generating, setGenerating] = useState(false);

  if (!isOpen) return null;

  const isVenta = orderType === 'venta';
  const activeDivision = isVenta
    ? siteConfig.divisions.electronicos
    : siteConfig.divisions.soluciones;

  const selectedProductObj =
    siteConfig.products.find((p) => p.id === selectedProductId) || siteConfig.products[0];

  const handleProductChange = (prodId: string) => {
    setSelectedProductId(prodId);
    const found = siteConfig.products.find((p) => p.id === prodId);
    if (found) {
      setSalePrice(String(found.defaultPrice));
    }
  };

  const totalNum = isVenta ? parseFloat(salePrice) || 0 : parseFloat(serviceTotal) || 0;
  const advanceNum = isVenta ? totalNum : parseFloat(serviceAdvance) || 0;
  const remainingNum = isVenta ? 0 : Math.max(0, totalNum - advanceNum);

  const buildPdfDocument = async (): Promise<jsPDF> => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
    });

    const baseUrl = window.location.origin + import.meta.env.BASE_URL;
    const [iconData, wordmarkData] = await Promise.all([
      loadImageAsBase64(`${baseUrl}logo-icon.png`),
      loadImageAsBase64(`${baseUrl}logo-wordmark.png`),
    ]);

    // Header Logo
    if (iconData) {
      doc.addImage(iconData, 'PNG', 18, 16, 14, 14);
    }
    if (wordmarkData) {
      doc.addImage(wordmarkData, 'PNG', 35, 18, 42, 6);
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(7, 22, 46);
      doc.text('TECHPOINT', 35, 23);
    }

    // Division Subtitle under Logo
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(8, 102, 232);
    doc.text(
      isVenta ? 'ELECTRÓNICOS • VENTA DE ARTÍCULOS' : 'SOLUCIONES TECNOLÓGICAS • SERVICIOS',
      35,
      27.5
    );

    // Right Header Folio Box
    doc.setFillColor(245, 245, 247);
    doc.roundedRect(142, 15, 56, 20, 4, 4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(134, 134, 139);
    doc.text(isVenta ? 'NOTA DE VENTA' : 'ORDEN DE SERVICIO', 193, 21, { align: 'right' });

    doc.setFontSize(14);
    doc.setTextColor(8, 102, 232);
    doc.text(`#${folio}`, 193, 27.5, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(134, 134, 139);
    doc.text(`${today} • Culiacán, Sin.`, 193, 32.5, { align: 'right' });

    // Divider Line
    doc.setDrawColor(229, 229, 234);
    doc.setLineWidth(0.4);
    doc.line(18, 41, 198, 41);

    // Client Card & Division Card
    doc.setFillColor(245, 245, 247);
    doc.roundedRect(18, 48, 87, 26, 4, 4, 'F');
    doc.roundedRect(111, 48, 87, 26, 4, 4, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(134, 134, 139);
    doc.text('CLIENTE', 24, 55);
    doc.text('ATENDIDO POR', 117, 55);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(29, 29, 31);
    doc.text(clientName || 'Cliente Mostrador', 24, 62);
    doc.text(activeDivision.name, 117, 62);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(134, 134, 139);
    doc.text(`WhatsApp: ${clientPhone || 'No registrado'}`, 24, 68.5);
    doc.text(`Tel Oficial: ${activeDivision.phoneDisplay}`, 117, 68.5);

    // Details Box
    doc.setDrawColor(229, 229, 234);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(18, 82, 180, 42, 4, 4, 'FD');

    if (isVenta) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(134, 134, 139);
      doc.text('ARTÍCULO VENDIDO', 25, 91);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(29, 29, 31);
      doc.text(selectedProductObj.name, 25, 100);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(8, 102, 232);
      doc.text(`Categoría: ${selectedProductObj.category}`, 25, 107);

      doc.setTextColor(134, 134, 139);
      doc.setFontSize(9);
      doc.text('Artículo entregado revisado y funcionando correctamente.', 25, 115);
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(134, 134, 139);
      doc.text('EQUIPO RECIBIDO', 25, 91);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(29, 29, 31);
      doc.text(deviceReceived || 'Equipo en taller', 25, 98);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(134, 134, 139);
      doc.text('SERVICIO A REALIZAR', 25, 108);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(8, 102, 232);
      doc.text(selectedService, 25, 115);
    }

    // Financial Summary Cards
    if (isVenta) {
      doc.setFillColor(7, 22, 46);
      doc.roundedRect(18, 132, 180, 24, 4, 4, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(125, 211, 252);
      doc.text('TOTAL PAGADO', 26, 141);

      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text(`$${totalNum.toLocaleString('es-MX')} MXN`, 190, 147, { align: 'right' });
    } else {
      // 3 boxes: Total, Anticipo, Restante
      doc.setFillColor(245, 245, 247);
      doc.roundedRect(18, 132, 56, 24, 4, 4, 'F');
      doc.roundedRect(80, 132, 56, 24, 4, 4, 'F');

      doc.setFillColor(7, 22, 46);
      doc.roundedRect(142, 132, 56, 24, 4, 4, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(134, 134, 139);
      doc.text('COSTO TOTAL', 24, 140);
      doc.text('ANTICIPO', 86, 140);

      doc.setTextColor(125, 211, 252);
      doc.text('SALDO A LIQUIDAR', 148, 140);

      doc.setFontSize(13);
      doc.setTextColor(29, 29, 31);
      doc.text(`$${totalNum.toLocaleString('es-MX')} MXN`, 24, 149);
      doc.text(`$${advanceNum.toLocaleString('es-MX')} MXN`, 86, 149);

      doc.setTextColor(255, 255, 255);
      doc.text(`$${remainingNum.toLocaleString('es-MX')} MXN`, 148, 149);
    }

    // Terms & Conditions Box
    doc.setFillColor(245, 245, 247);
    doc.roundedRect(18, 166, 180, 26, 4, 4, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(29, 29, 31);
    doc.text('Condiciones y Garantía:', 24, 173);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(134, 134, 139);
    if (isVenta) {
      doc.text(
        '• Artículo verificado en su funcionamiento al momento de la entrega.\n• Conserve esta nota digital para cualquier aclaración con TECHPOINT Electrónicos.',
        24,
        179
      );
    } else {
      doc.text(
        '• TECHPOINT Soluciones Tecnológicas no se responsabiliza por pérdida de datos si no se solicitó respaldo previo.\n• En pedidos de refacciones, el anticipo cubre el componente solicitado. Equipos deben recogerse dentro de 30 días.',
        24,
        179
      );
    }

    // Footer
    doc.setDrawColor(229, 229, 234);
    doc.line(18, 206, 198, 206);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(134, 134, 139);
    doc.text(
      `${activeDivision.name} • Culiacán, Sinaloa, México • WhatsApp: ${activeDivision.phoneDisplay}`,
      108,
      212,
      { align: 'center' }
    );

    return doc;
  };

  const handleDownloadPdfOnly = async () => {
    setGenerating(true);
    try {
      const doc = await buildPdfDocument();
      doc.save(`TECHPOINT-${folio}.pdf`);
    } finally {
      setGenerating(false);
    }
  };

  const handleShareWhatsAppWithPdf = async () => {
    setGenerating(true);
    try {
      const doc = await buildPdfDocument();
      const fileName = `TECHPOINT-${folio}.pdf`;

      const cleanPhone = clientPhone.replace(/\D/g, '');
      const targetPhone = cleanPhone.length === 10 ? `52${cleanPhone}` : cleanPhone;

      const message = isVenta
        ? [
            `*${activeDivision.name}*`,
            `📍 Culiacán, Sinaloa | WhatsApp: ${activeDivision.phoneDisplay}`,
            `────────────────────`,
            `🧾 *NOTA DE VENTA #${folio}*`,
            `📅 *Fecha:* ${today}`,
            `👤 *Cliente:* ${clientName || 'Cliente'}`,
            `🎧 *Artículo:* ${selectedProductObj.name} (${selectedProductObj.category})`,
            `💰 *Total:* $${totalNum.toLocaleString('es-MX')} MXN`,
            `────────────────────`,
            `_¡Gracias por tu compra en TECHPOINT Electrónicos! Te adjunto tu nota en PDF._`,
          ].join('\n')
        : [
            `*${activeDivision.name}*`,
            `📍 Culiacán, Sinaloa | WhatsApp: ${activeDivision.phoneDisplay}`,
            `────────────────────`,
            `📋 *ORDEN DE SERVICIO #${folio}*`,
            `📅 *Fecha:* ${today}`,
            `👤 *Cliente:* ${clientName || 'Cliente'}`,
            `💻 *Equipo recibido:* ${deviceReceived || 'Equipo en revisión'}`,
            `🛠️ *Servicio:* ${selectedService}`,
            `────────────────────`,
            `💰 *Total:* $${totalNum.toLocaleString('es-MX')} MXN`,
            `✅ *Anticipo:* $${advanceNum.toLocaleString('es-MX')} MXN`,
            `📌 *Restante:* $${remainingNum.toLocaleString('es-MX')} MXN`,
            `────────────────────`,
            `_Gracias por confiar en TECHPOINT. Te adjunto tu orden de servicio en PDF._`,
          ].join('\n');

      // 1. Download the PDF file automatically so it's saved & ready to drop in chat
      doc.save(fileName);

      // 2. Open WhatsApp directly to the client's phone number entered in the form
      const encoded = encodeURIComponent(message);
      const waUrl = targetPhone
        ? `https://wa.me/${targetPhone}?text=${encoded}`
        : `https://wa.me/?text=${encoded}`;

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl my-auto apple-fade-1">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0866E8]">
              Folio #{folio}
            </p>
            <h3 className="text-xl font-semibold text-[#1D1D1F] tracking-tight">
              Generar Orden / Nota
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Seleccionar Tipo (Servicio o Venta) */}
        <div className="mt-5">
          <label className="block text-xs font-medium text-[#86868B] mb-1.5">
            1. Tipo de movimiento
          </label>
          <div className="p-1 rounded-2xl bg-[#F5F5F7] grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setOrderType('servicio')}
              className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                !isVenta
                  ? 'bg-white text-[#0866E8] shadow-sm'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Servicio
            </button>
            <button
              type="button"
              onClick={() => setOrderType('venta')}
              className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isVenta
                  ? 'bg-white text-[#0866E8] shadow-sm'
                  : 'text-[#86868B] hover:text-[#1D1D1F]'
              }`}
            >
              Venta
            </button>
          </div>
        </div>

        {/* Step 2: Nombre y Número del Cliente */}
        <div className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-[#86868B] mb-1">
              Nombre del cliente
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ej. Juan Pérez"
              className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#86868B] mb-1">
              Número de WhatsApp del cliente
            </label>
            <input
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="Ej. 6671234567"
              className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
            />
          </div>

          {/* Step 3: Conditional Fields */}
          {isVenta ? (
            <>
              <div>
                <label className="block text-xs font-medium text-[#86868B] mb-1">
                  Producto del catálogo
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm font-medium text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
                >
                  {siteConfig.products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name} — {prod.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868B] mb-1">
                  Precio ($ MXN)
                </label>
                <input
                  type="number"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm font-semibold text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium text-[#86868B] mb-1">
                  Tipo de servicio
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm font-medium text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
                >
                  {siteConfig.serviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868B] mb-1">
                  Equipo recibido
                </label>
                <input
                  type="text"
                  value={deviceReceived}
                  onChange={(e) => setDeviceReceived(e.target.value)}
                  placeholder="Ej. Laptop HP Pavilion / iPhone 13"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#86868B] mb-1">
                    Total ($ MXN)
                  </label>
                  <input
                    type="number"
                    value={serviceTotal}
                    onChange={(e) => setServiceTotal(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm font-semibold text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#86868B] mb-1">
                    Anticipo ($ MXN)
                  </label>
                  <input
                    type="number"
                    value={serviceAdvance}
                    onChange={(e) => setServiceAdvance(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm font-semibold text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons (No preview clutter) */}
        <div className="mt-7 space-y-2.5">
          <button
            type="button"
            disabled={generating}
            onClick={handleShareWhatsAppWithPdf}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#0866E8] hover:bg-[#0055D4] text-white font-medium text-xs sm:text-sm transition-colors disabled:opacity-50"
          >
            <Icon icon="logos:whatsapp-icon" className="w-4 h-4" />
            <span>Enviar a su WhatsApp + Bajar PDF</span>
          </button>

          <button
            type="button"
            disabled={generating}
            onClick={handleDownloadPdfOnly}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] font-medium text-xs sm:text-sm transition-colors disabled:opacity-50"
          >
            <Icon icon="solar:file-download-bold-duotone" className="w-4 h-4 text-[#0866E8]" />
            <span>Solo descargar PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceOrderModal;
