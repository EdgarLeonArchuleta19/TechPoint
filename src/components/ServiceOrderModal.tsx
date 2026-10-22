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
    month: '2-digit',
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

  const formatMoney = (n: number) =>
    `$${n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  /**
   * Genera una Nota de Remisión / Orden de Servicio con diseño CLÁSICO, FORMAL y LIMPIO
   * (Tablas con bordes definidos, cuadro de Folio tradicional, desglose contable a la derecha)
   */
  const buildClassicPdfDocument = async (): Promise<jsPDF> => {
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

    // Marco exterior sutil de la nota (Media carta superior bien proporcionada)
    doc.setDrawColor(180, 188, 198);
    doc.setLineWidth(0.35);
    doc.rect(14, 12, 188, 158);

    // 1. ENCABEZADO IZQUIERDO: Logo + Datos del Negocio
    if (iconData) {
      doc.addImage(iconData, 'PNG', 18, 16, 16, 16);
    }
    if (wordmarkData) {
      doc.addImage(wordmarkData, 'PNG', 36, 17.5, 46, 6.5);
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(7, 22, 46);
      doc.text('TECHPOINT', 36, 23);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(7, 22, 46);
    doc.text(
      isVenta ? 'DIVISIÓN ELECTRÓNICOS' : 'DIVISIÓN SOLUCIONES TECNOLÓGICAS',
      36,
      27.5
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(80, 86, 96);
    doc.text(`Culiacán, Sinaloa, México  |  WhatsApp: ${activeDivision.phoneDisplay}`, 36, 32);

    // 2. ENCABEZADO DERECHO: Cuadro Clásico de Folio y Fecha
    const boxX = 144;
    const boxY = 15;
    const boxW = 54;
    doc.setDrawColor(7, 22, 46);
    doc.setLineWidth(0.4);
    doc.rect(boxX, boxY, boxW, 22);

    // Franja superior azul marino del cuadro de folio
    doc.setFillColor(7, 22, 46);
    doc.rect(boxX, boxY, boxW, 6.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(isVenta ? 'NOTA DE VENTA' : 'ORDEN DE SERVICIO', boxX + boxW / 2, boxY + 4.5, {
      align: 'center',
    });

    // Folio en el centro
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(8, 102, 232);
    doc.text(`FOLIO: ${folio}`, boxX + boxW / 2, boxY + 12.5, { align: 'center' });

    // Línea divisoria de fecha
    doc.setDrawColor(200, 206, 214);
    doc.line(boxX, boxY + 15, boxX + boxW, boxY + 15);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(60, 64, 72);
    doc.text(`FECHA: ${today}`, boxX + boxW / 2, boxY + 19.8, { align: 'center' });

    // 3. TABLA DE DATOS DEL CLIENTE (Clásica con bordes)
    const clientY = 42;
    doc.setDrawColor(7, 22, 46);
    doc.setLineWidth(0.35);
    doc.rect(18, clientY, 180, 16);

    // Franja gris clara para etiquetas
    doc.setFillColor(242, 245, 249);
    doc.rect(18, clientY, 28, 16, 'F');
    doc.rect(118, clientY, 28, 16, 'F');

    // Líneas internas de la tabla de cliente
    doc.setDrawColor(190, 198, 208);
    doc.line(18, clientY + 8, 198, clientY + 8);
    doc.line(46, clientY, 46, clientY + 16);
    doc.line(118, clientY, 118, clientY + 16);
    doc.line(146, clientY, 146, clientY + 16);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(7, 22, 46);
    doc.text('CLIENTE:', 20, clientY + 5.3);
    doc.text('CIUDAD:', 20, clientY + 13.3);
    doc.text('TELÉFONO:', 120, clientY + 5.3);
    doc.text('MODALIDAD:', 120, clientY + 13.3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(20, 24, 32);
    doc.text(clientName || 'Mostrador', 49, clientY + 5.3);
    doc.text('Culiacán, Sinaloa', 49, clientY + 13.3);
    doc.text(clientPhone || '—', 149, clientY + 5.3);
    doc.text(isVenta ? 'Venta de Artículo' : 'Servicio Técnico', 149, clientY + 13.3);

    // 4. TABLA PRINCIPAL DE CONCEPTOS (Estilo Nota de Remisión Formal)
    const tableY = 63;
    const tableH = 44;
    doc.setDrawColor(7, 22, 46);
    doc.setLineWidth(0.35);
    doc.rect(18, tableY, 180, tableH);

    // Cabecera azul marino de la tabla
    doc.setFillColor(7, 22, 46);
    doc.rect(18, tableY, 180, 7.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);

    if (isVenta) {
      // Columnas Venta: CANT. (18..36) | DESCRIPCIÓN DEL ARTÍCULO (36..158) | IMPORTE (158..198)
      doc.text('CANT.', 27, tableY + 5, { align: 'center' });
      doc.text('DESCRIPCIÓN DEL ARTÍCULO', 40, tableY + 5);
      doc.text('IMPORTE', 178, tableY + 5, { align: 'center' });

      doc.setDrawColor(190, 198, 208);
      doc.line(36, tableY + 7.5, 36, tableY + tableH);
      doc.line(158, tableY + 7.5, 158, tableY + tableH);

      // Renglones guía clásicos
      doc.line(18, tableY + 19, 198, tableY + 19);
      doc.line(18, tableY + 31, 198, tableY + 31);

      // Datos del producto
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(20, 24, 32);
      doc.text('1', 27, tableY + 14.5, { align: 'center' });
      doc.text(`${selectedProductObj.name} (${selectedProductObj.category})`, 40, tableY + 14.5);
      doc.text(formatMoney(totalNum), 194, tableY + 14.5, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(90, 96, 106);
      doc.text('Artículo revisado y entregado en óptimas condiciones.', 40, tableY + 26);
    } else {
      // Columnas Servicio: EQUIPO RECIBIDO (18..76) | CONCEPTO / SERVICIO A REALIZAR (76..158) | IMPORTE (158..198)
      doc.text('EQUIPO RECIBIDO', 21, tableY + 5);
      doc.text('SERVICIO / TRABAJO A REALIZAR', 79, tableY + 5);
      doc.text('IMPORTE', 178, tableY + 5, { align: 'center' });

      doc.setDrawColor(190, 198, 208);
      doc.line(76, tableY + 7.5, 76, tableY + tableH);
      doc.line(158, tableY + 7.5, 158, tableY + tableH);

      // Renglones guía clásicos
      doc.line(18, tableY + 20, 198, tableY + 20);
      doc.line(18, tableY + 32, 198, tableY + 32);

      // Datos del servicio
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(20, 24, 32);
      doc.text(deviceReceived || 'Equipo en revisión', 21, tableY + 15);
      doc.text(selectedService, 79, tableY + 15);
      doc.text(formatMoney(totalNum), 194, tableY + 15, { align: 'right' });
    }

    // 5. SECCIÓN INFERIOR: Condiciones a la izquierda + Cuadro Clásico de Totales a la derecha
    const bottomY = 112;

    // Cuadro de Totales a la derecha (128..198)
    doc.setDrawColor(7, 22, 46);
    doc.setLineWidth(0.35);

    if (isVenta) {
      doc.setFillColor(242, 245, 249);
      doc.rect(128, bottomY, 30, 10, 'FD');
      doc.rect(158, bottomY, 40, 10, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(7, 22, 46);
      doc.text('TOTAL:', 131, bottomY + 6.5);
      doc.setFontSize(10.5);
      doc.text(`${formatMoney(totalNum)} MXN`, 195, bottomY + 6.5, { align: 'right' });
    } else {
      // 3 filas clásicas: TOTAL | ANTICIPO | RESTA
      doc.rect(128, bottomY, 70, 24);
      doc.setFillColor(242, 245, 249);
      doc.rect(128, bottomY, 32, 24, 'F');

      doc.setDrawColor(190, 198, 208);
      doc.line(160, bottomY, 160, bottomY + 24);
      doc.line(128, bottomY + 8, 198, bottomY + 8);
      doc.line(128, bottomY + 16, 198, bottomY + 16);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(7, 22, 46);
      doc.text('TOTAL:', 131, bottomY + 5.5);
      doc.text('ANTICIPO:', 131, bottomY + 13.5);
      doc.setTextColor(8, 102, 232);
      doc.text('RESTA:', 131, bottomY + 21.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(20, 24, 32);
      doc.text(`${formatMoney(totalNum)} MXN`, 195, bottomY + 5.5, { align: 'right' });
      doc.text(`${formatMoney(advanceNum)} MXN`, 195, bottomY + 13.5, { align: 'right' });

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(8, 102, 232);
      doc.text(`${formatMoney(remainingNum)} MXN`, 195, bottomY + 21.5, { align: 'right' });
    }

    // Condiciones a la izquierda (18..122)
    doc.setDrawColor(190, 198, 208);
    doc.rect(18, bottomY, 105, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(7, 22, 46);
    doc.text('CONDICIONES Y NOTAS:', 21, bottomY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(80, 86, 96);
    const termsText = isVenta
      ? '1. Producto entregado y verificado en su correcto funcionamiento.\n2. Conserve esta nota para cualquier aclaración o garantía.\n3. Gracias por su preferencia en TECHPOINT Electrónicos.'
      : '1. TECHPOINT no se responsabiliza por pérdida de datos si no se pidió respaldo.\n2. En pedido de refacciones, el anticipo cubre la pieza solicitada.\n3. Todo equipo debe recogerse dentro de los 30 días posteriores al aviso.';
    doc.text(termsText, 21, bottomY + 10);

    // 6. FIRMAS Y PIE DE PÁGINA
    doc.setDrawColor(140, 148, 160);
    doc.line(32, 156, 92, 156);
    doc.line(124, 156, 184, 156);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(90, 96, 106);
    doc.text('Firma de Conformidad del Cliente', 62, 160.5, { align: 'center' });
    doc.text(activeDivision.name, 154, 160.5, { align: 'center' });

    return doc;
  };

  /**
   * Comparte el archivo PDF directamente (sin texto largo)
   * - En celular / navegadores compatibles: Abre el menú nativo con el archivo .PDF adjunto listo para enviar por WhatsApp.
   * - En PC de escritorio: Descarga el .PDF y abre la ventana de WhatsApp del número del cliente para soltar el archivo.
   */
  const handleSharePdfFile = async () => {
    setGenerating(true);
    try {
      const doc = await buildClassicPdfDocument();
      const fileName = `Nota-${folio}-${(clientName || 'Cliente').replace(/\s+/g, '_')}.pdf`;
      const pdfBlob = doc.output('blob');
      const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

      // Si el dispositivo soporta compartir archivos directamente (iPhone, Android, etc.)
      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          files: [pdfFile],
          title: `Nota ${folio} - TECHPOINT`,
        });
        return;
      }

      // En PC de escritorio donde el navegador no tiene menú nativo de compartir archivos a WhatsApp:
      // 1. Descarga el PDF automáticamente
      doc.save(fileName);

      // 2. Si puso número de cliente, abre directamente la ventana de chat de ese número (sin texto estorboso) para arrastrar el PDF
      const cleanPhone = clientPhone.replace(/\D/g, '');
      if (cleanPhone.length >= 10) {
        const targetPhone = cleanPhone.length === 10 ? `52${cleanPhone}` : cleanPhone;
        window.open(`https://wa.me/${targetPhone}`, '_blank', 'noopener,noreferrer');
      }
    } catch {
      // Si el usuario cancela el cuadro de compartir, no mostrar error
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadPdfOnly = async () => {
    setGenerating(true);
    try {
      const doc = await buildClassicPdfDocument();
      const fileName = `Nota-${folio}-${(clientName || 'Cliente').replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
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
              Generar Nota en PDF
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
            1. Selecciona el tipo
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
              Número del cliente
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
                  Producto vendido
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

        {/* Action Buttons: Share PDF File directly or Download PDF */}
        <div className="mt-7 space-y-2.5">
          <button
            type="button"
            disabled={generating}
            onClick={handleSharePdfFile}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#0866E8] hover:bg-[#0055D4] text-white font-medium text-xs sm:text-sm transition-colors disabled:opacity-50"
          >
            <Icon icon="logos:whatsapp-icon" className="w-4 h-4" />
            <span>Compartir archivo PDF por WhatsApp</span>
          </button>

          <button
            type="button"
            disabled={generating}
            onClick={handleDownloadPdfOnly}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] font-medium text-xs sm:text-sm transition-colors disabled:opacity-50"
          >
            <Icon icon="solar:file-download-bold-duotone" className="w-4 h-4 text-[#0866E8]" />
            <span>Descargar PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceOrderModal;
