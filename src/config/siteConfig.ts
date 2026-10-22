export interface MinimalProduct {
  id: string;
  name: string;
  category: string;
  iconifyIcon: string;
  whatsappMessage: string;
}

export const siteConfig = {
  name: "TECHPOINT",
  fullName: "TECHPOINT",
  subtitle: "Soluciones Tecnológicas & Electrónicos",
  slogan: "Tu punto en tecnología.",
  location: {
    city: "Culiacán",
    state: "Sinaloa",
    country: "México",
    full: "Culiacán, Sinaloa",
  },
  divisions: {
    soluciones: {
      name: "TECHPOINT Soluciones Tecnológicas",
      shortName: "Soluciones Tecnológicas",
      role: "Reparación de PC, laptops, celulares, páginas web y software",
      phoneDisplay: "+1 (432) 423-9392",
      whatsappNumber: "14324239392",
      whatsappUrl: "https://wa.me/14324239392",
      defaultMessage:
        "Hola TECHPOINT Soluciones Tecnológicas, quiero preguntar sin compromiso por una reparación o servicio.",
    },
    electronicos: {
      name: "TECHPOINT Electrónicos",
      shortName: "Electrónicos",
      role: "Venta de AirPods, cargadores rápidos y artículos",
      phoneDisplay: "667 475 2676",
      whatsappNumber: "5216674752676",
      whatsappUrl: "https://wa.me/5216674752676",
      defaultMessage:
        "Hola TECHPOINT Electrónicos, me interesa comprar o cotizar un artículo del catálogo.",
    },
  },
  contact: {
    phone: "14324239392",
    phoneDisplay: "+1 (432) 423-9392",
    whatsappNumber: "14324239392",
    whatsappUrl: "https://wa.me/14324239392",
    defaultMessage: "Hola TECHPOINT, quiero hacer una consulta sin compromiso.",
    social: {
      facebook: {
        name: "TechPoint",
        url: "https://facebook.com/TechPoint",
      },
      instagram: {
        name: "TechPoint",
        url: "https://instagram.com/TechPoint",
      },
    },
  },
  navigation: [
    { label: "Inicio", href: "#inicio" },
    { label: "Soluciones Tecnológicas", href: "#servicios" },
    { label: "Electrónicos", href: "#accesorios" },
    { label: "Contacto", href: "#contacto" },
  ],
  products: [
    {
      id: "airpods-pro",
      name: "AirPods Pro",
      category: "Calidad Original",
      iconifyIcon: "fluent-emoji-flat:headphone",
      whatsappMessage:
        "Hola TECHPOINT Electrónicos, me interesa comprar / consultar disponibilidad de los AirPods Pro calidad original.",
    },
    {
      id: "airpods-3",
      name: "AirPods 3",
      category: "Calidad Original",
      iconifyIcon: "fluent-emoji-flat:musical-notes",
      whatsappMessage:
        "Hola TECHPOINT Electrónicos, quisiera consultar precio y disponibilidad de los AirPods 3 calidad original.",
    },
    {
      id: "cargador-iphone",
      name: "Cargador 20W USB-C",
      category: "iPhone • Calidad Original",
      iconifyIcon: "fluent-emoji-flat:high-voltage",
      whatsappMessage:
        "Hola TECHPOINT Electrónicos, me interesa comprar el cargador rápido 20W USB-C para iPhone. ¿Tienen disponible?",
    },
    {
      id: "cables-iphone",
      name: "Cable USB-C / Lightning",
      category: "Carga Rápida",
      iconifyIcon: "fluent-emoji-flat:electric-plug",
      whatsappMessage:
        "Hola TECHPOINT Electrónicos, quisiera comprar un cable de carga rápida para iPhone.",
    },
  ] as MinimalProduct[],
};

export const getSolucionesWhatsAppUrl = (message?: string): string => {
  const text = encodeURIComponent(
    message || siteConfig.divisions.soluciones.defaultMessage
  );
  return `${siteConfig.divisions.soluciones.whatsappUrl}?text=${text}`;
};

export const getElectronicosWhatsAppUrl = (message?: string): string => {
  const text = encodeURIComponent(
    message || siteConfig.divisions.electronicos.defaultMessage
  );
  return `${siteConfig.divisions.electronicos.whatsappUrl}?text=${text}`;
};

export const getWhatsAppUrl = (message?: string): string => {
  return getSolucionesWhatsAppUrl(message);
};
