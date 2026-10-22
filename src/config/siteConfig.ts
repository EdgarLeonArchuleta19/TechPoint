export interface MinimalProduct {
  id: string;
  name: string;
  category: string;
  iconifyIcon: string;
  whatsappMessage: string;
}

export const siteConfig = {
  name: "TECHPOINT",
  fullName: "TECHPOINT — Soluciones Tecnológicas",
  subtitle: "Soluciones Tecnológicas",
  slogan: "Tu punto en tecnología.",
  location: {
    city: "Culiacán",
    state: "Sinaloa",
    country: "México",
    full: "Culiacán, Sinaloa",
  },
  contact: {
    phone: "6672675288",
    phoneDisplay: "667 267 5288",
    whatsappNumber: "526672675288",
    whatsappUrl: "https://wa.me/526672675288",
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
    { label: "Servicios", href: "#servicios" },
    { label: "Productos", href: "#accesorios" },
    { label: "Contacto", href: "#contacto" },
  ],
  products: [
    {
      id: "airpods-pro",
      name: "AirPods Pro",
      category: "Calidad Original",
      iconifyIcon: "fluent-emoji-flat:headphone",
      whatsappMessage: "Hola TECHPOINT, me interesa consultar precio y disponibilidad de los AirPods Pro calidad original.",
    },
    {
      id: "airpods-3",
      name: "AirPods 3",
      category: "Calidad Original",
      iconifyIcon: "fluent-emoji-flat:musical-notes",
      whatsappMessage: "Hola TECHPOINT, quisiera consultar disponibilidad de los AirPods 3 calidad original.",
    },
    {
      id: "cargador-iphone",
      name: "Cargador 20W USB-C",
      category: "iPhone • Calidad Original",
      iconifyIcon: "fluent-emoji-flat:high-voltage",
      whatsappMessage: "Hola TECHPOINT, me interesa el cargador rápido Tipo C para iPhone. ¿Tienen disponible?",
    },
    {
      id: "cables-iphone",
      name: "Cable USB-C / Lightning",
      category: "Carga Rápida",
      iconifyIcon: "fluent-emoji-flat:electric-plug",
      whatsappMessage: "Hola TECHPOINT, quisiera información sobre cables para iPhone.",
    },
  ] as MinimalProduct[],
};

export const getWhatsAppUrl = (message?: string): string => {
  const text = message ? encodeURIComponent(message) : encodeURIComponent(siteConfig.contact.defaultMessage);
  return `${siteConfig.contact.whatsappUrl}?text=${text}`;
};
