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
    month: 'long',
    year: 'numeric',
  });

  // Only 5 essential fields for fast service order generation
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [device, setDevice] = useState('');
  const [serviceWork, setServiceWork] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [advancePayment, setAdvancePayment] = useState('');

  if (!isOpen) return null;

  const soluciones = siteConfig.divisions.soluciones;
  const totalNum = parseFloat(totalCost) || 0;
  const advanceNum = parseFloat(advancePayment) || 0;
  const remainingNum = Math.max(0, totalNum - advanceNum);

  const handleSendWhatsApp = () => {
    const cleanPhone = clientPhone.replace(/\D/g, '');
    const targetPhone = cleanPhone.length === 10 ? `52${cleanPhone}` : cleanPhone;

    const message = [
      `*TECHPOINT — Soluciones Tecnológicas*`,
      `📍 Culiacán, Sinaloa | WhatsApp: ${soluciones.phoneDisplay}`,
      `────────────────────`,
      `📋 *ORDEN DE SERVICIO #${folio}*`,
      `📅 *Fecha:* ${today}`,
      `👤 *Cliente:* ${clientName || 'Cliente'}`,
      `💻 *Equipo:* ${device || 'Equipo en revisión'}`,
      `🛠️ *Servicio:* ${serviceWork || 'Diagnóstico y servicio técnico'}`,
      `────────────────────`,
      `💰 *Total:* $${totalNum.toLocaleString('es-MX')} MXN`,
      `✅ *Anticipo:* $${advanceNum.toLocaleString('es-MX')} MXN`,
      `📌 *Restante a liquidar:* $${remainingNum.toLocaleString('es-MX')} MXN`,
      `────────────────────`,
      `_Gracias por confiar en TECHPOINT. No nos hacemos responsables por pérdida de información si no se solicitó respaldo previo._`,
    ].join('\n');

    const encoded = encodeURIComponent(message);
    const url = targetPhone
      ? `https://wa.me/${targetPhone}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGenerateProfessionalPdf = () => {
    const baseUrl = window.location.origin + import.meta.env.BASE_URL;
    const printWindow = window.open('', '_blank', 'width=850,height=950');
    if (!printWindow) return;

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Orden de Servicio ${folio} - TECHPOINT</title>
  <style>
    @page {
      size: letter;
      margin: 16mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1D1D1F;
      background: #FFFFFF;
      line-height: 1.5;
      padding: 12px;
    }
    .sheet {
      max-width: 720px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 24px;
      border-bottom: 1.5px solid #E5E5EA;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-icon {
      width: 44px;
      height: 44px;
      object-fit: contain;
    }
    .brand-wordmark {
      height: 22px;
      object-fit: contain;
      display: block;
    }
    .brand-sub {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.24em;
      color: #0866E8;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .folio-box {
      text-align: right;
    }
    .folio-tag {
      display: inline-block;
      background: #F5F5F7;
      color: #1D1D1F;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 999px;
      letter-spacing: 0.04em;
    }
    .folio-number {
      font-size: 24px;
      font-weight: 700;
      color: #0866E8;
      letter-spacing: -0.03em;
      margin-top: 4px;
    }
    .meta-date {
      font-size: 12px;
      color: #86868B;
      margin-top: 2px;
    }
    .grid-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 28px;
    }
    .info-card {
      background: #F5F5F7;
      border-radius: 18px;
      padding: 18px 20px;
    }
    .label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #86868B;
      margin-bottom: 4px;
    }
    .value {
      font-size: 15px;
      font-weight: 600;
      color: #1D1D1F;
    }
    .value-sub {
      font-size: 12px;
      color: #86868B;
      margin-top: 2px;
    }
    .service-section {
      margin-top: 20px;
      background: #FFFFFF;
      border: 1.5px solid #E5E5EA;
      border-radius: 18px;
      padding: 22px;
    }
    .service-desc {
      font-size: 15px;
      color: #1D1D1F;
      margin-top: 6px;
      white-space: pre-wrap;
    }
    .summary-row {
      margin-top: 24px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .summary-box {
      border-radius: 18px;
      padding: 16px 20px;
      background: #F5F5F7;
    }
    .summary-box.highlight {
      background: #07162E;
      color: #FFFFFF;
    }
    .summary-box.highlight .label {
      color: #7DD3FC;
    }
    .summary-box.highlight .amount {
      color: #FFFFFF;
    }
    .amount {
      font-size: 22px;
      font-weight: 700;
      color: #1D1D1F;
      letter-spacing: -0.02em;
      margin-top: 2px;
    }
    .terms {
      margin-top: 28px;
      padding: 16px 20px;
      border-radius: 14px;
      background: #F5F5F7;
      font-size: 10.5px;
      color: #86868B;
      line-height: 1.6;
    }
    .signatures {
      margin-top: 48px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      text-align: center;
    }
    .sig-line {
      border-top: 1px solid #D2D2D7;
      padding-top: 8px;
      font-size: 11px;
      font-weight: 600;
      color: #86868B;
    }
    .footer {
      margin-top: 36px;
      text-align: center;
      font-size: 11px;
      color: #86868B;
      border-top: 1px solid #E5E5EA;
      padding-top: 16px;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="header">
      <div class="brand">
        <img src="${baseUrl}logo-icon.png" class="brand-icon" alt="TECHPOINT" />
        <div>
          <img src="${baseUrl}logo-wordmark.png" class="brand-wordmark" alt="TECHPOINT" />
          <div class="brand-sub">SOLUCIONES TECNOLÓGICAS</div>
        </div>
      </div>
      <div class="folio-box">
        <span class="folio-tag">ORDEN DE SERVICIO</span>
        <div class="folio-number">#${folio}</div>
        <div class="meta-date">${today} • Culiacán, Sinaloa</div>
      </div>
    </div>

    <div class="grid-info">
      <div class="info-card">
        <div class="label">Datos del Cliente</div>
        <div class="value">${clientName || 'Cliente Mostrador'}</div>
        <div class="value-sub">WhatsApp / Tel: ${clientPhone || 'No especificado'}</div>
      </div>
      <div class="info-card">
        <div class="label">Equipo Recibido</div>
        <div class="value">${device || 'Equipo en revisión'}</div>
        <div class="value-sub">Atención: TECHPOINT Soluciones Tecnológicas</div>
      </div>
    </div>

    <div class="service-section">
      <div class="label">Descripción del Servicio / Diagnóstico</div>
      <div class="service-desc">${serviceWork || 'Revisión, diagnóstico y mantenimiento técnico.'}</div>
    </div>

    <div class="summary-row">
      <div class="summary-box">
        <div class="label">Costo Total</div>
        <div class="amount">$${totalNum.toLocaleString('es-MX')} <span style="font-size:12px;font-weight:500;">MXN</span></div>
      </div>
      <div class="summary-box">
        <div class="label">Anticipo Recibido</div>
        <div class="amount">$${advanceNum.toLocaleString('es-MX')} <span style="font-size:12px;font-weight:500;">MXN</span></div>
      </div>
      <div class="summary-box highlight">
        <div class="label">Saldo a Liquidar</div>
        <div class="amount">$${remainingNum.toLocaleString('es-MX')} <span style="font-size:12px;font-weight:500;">MXN</span></div>
      </div>
    </div>

    <div class="terms">
      <strong>Condiciones de Servicio:</strong><br/>
      1. TECHPOINT Soluciones Tecnológicas no se hace responsable por pérdida de datos o información si el cliente no solicitó respaldo previo.<br/>
      2. En caso de requerir piezas o refacciones, el anticipo cubre el pedido del componente y no es reembolsable una vez solicitado.<br/>
      3. Todo equipo debe ser recogido dentro de los 30 días posteriores al aviso de terminación.
    </div>

    <div class="signatures">
      <div class="sig-line">Conformidad del Cliente (${clientName || 'Firma'})</div>
      <div class="sig-line">TECHPOINT Soluciones Tecnológicas</div>
    </div>

    <div class="footer">
      <strong>TECHPOINT — Soluciones Tecnológicas</strong> • Culiacán, Sinaloa, México • WhatsApp: ${soluciones.phoneDisplay}
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 250);
    };
  </script>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-[28px] max-w-xl w-full p-6 sm:p-8 shadow-2xl my-auto apple-fade-1">
        
        {/* Minimal Apple Header */}
        <div className="flex items-center justify-between pb-5 border-b border-black/[0.06]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0866E8]">
              TECHPOINT Soluciones Tecnológicas
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] tracking-tight mt-0.5">
              Orden de Servicio <span className="text-[#86868B] font-normal">#{folio}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
          </button>
        </div>

        {/* Streamlined 5-Field Form */}
        <div className="space-y-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1.5">
                Nombre del cliente
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej. Carlos Mendoza"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1.5">
                WhatsApp del cliente (opcional)
              </label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="10 dígitos (ej. 6671234567)"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#86868B] mb-1.5">
              Equipo recibido
            </label>
            <input
              type="text"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              placeholder="Ej. Laptop HP Pavilion 15 (con cargador)"
              className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#86868B] mb-1.5">
              Servicio a realizar o falla
            </label>
            <textarea
              rows={2}
              value={serviceWork}
              onChange={(e) => setServiceWork(e.target.value)}
              placeholder="Ej. Mantenimiento interno, pasta térmica e instalación de SSD"
              className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1.5">
                Total ($ MXN)
              </label>
              <input
                type="number"
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm font-semibold text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#86868B] mb-1.5">
                Anticipo ($ MXN)
              </label>
              <input
                type="number"
                value={advancePayment}
                onChange={(e) => setAdvancePayment(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-2xl bg-[#F5F5F7] text-sm font-semibold text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0866E8]"
              />
            </div>
          </div>
        </div>

        {/* Apple-Style Compact Summary Strip */}
        <div className="rounded-2xl bg-[#F5F5F7] px-5 py-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TechPointLogo size="sm" variant="icon-only" />
            <div>
              <p className="text-xs font-semibold text-[#1D1D1F]">
                {clientName || 'Cliente'} • {device || 'Equipo'}
              </p>
              <p className="text-[11px] text-[#86868B]">
                Total: ${totalNum.toLocaleString('es-MX')} | Anticipo: ${advanceNum.toLocaleString('es-MX')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold uppercase text-[#86868B] block">
              Restante
            </span>
            <span className="text-base font-bold text-[#0866E8]">
              ${remainingNum.toLocaleString('es-MX')}
            </span>
          </div>
        </div>

        {/* Two Equal Action Buttons: PDF Profesional or Mensaje WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGenerateProfessionalPdf}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#1D1D1F] hover:bg-[#0866E8] text-white font-medium text-xs sm:text-sm transition-colors"
          >
            <Icon icon="solar:document-text-bold-duotone" className="w-4 h-4" />
            <span>Generar PDF Profesional</span>
          </button>

          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#0866E8] hover:bg-[#0055D4] text-white font-medium text-xs sm:text-sm transition-colors"
          >
            <Icon icon="logos:whatsapp-icon" className="w-4 h-4" />
            <span>Mandar por WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceOrderModal;
