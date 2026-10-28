<div align="center">

# 📍 TECHPOINT — Soluciones Tecnológicas

**Tu punto en tecnología • Culiacán, Sinaloa, México**

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Licencia](https://img.shields.io/badge/Licencia-Atribuci%C3%B3n--NoComercial-07162E?style=for-the-badge&logo=github&logoColor=white)](./LICENSE)

---

*Plataforma web corporativa de diseño minimalista estilo Apple (Bento Grid & Frosted Glass) para **TECHPOINT — Soluciones Tecnológicas**, enfocada en conversión directa, velocidad de carga instantánea y generación integrada de órdenes de servicio.*

</div>

---

## ✨ Características Principales

| Módulo | Descripción |
| :--- | :--- |
| **🍏 Apple-Grade Minimalist UI** | Interfaz inspirada en el sistema de diseño industrial de Apple (`#F5F5F7`, `#FFFFFF`, `#1D1D1F`, `#0866E8`), con encabezados bicolores, tarjetas Bento sin bordes ruidosos y barra superior *frosted glass*. |
| **🛠️ División 01: TECHPOINT Soluciones Tecnológicas** | Atención especializada en **Reparación y Mantenimiento** (PC, Laptops y Celulares), **Páginas Web y Software a Medida** y soporte técnico directo (`+1 (432) 423-9392`). |
| **🎧 División 02: TECHPOINT Electrónicos** | Venta directa de artículos y accesorios calidad original (**AirPods Pro**, **AirPods 3**, **Cargador 20W USB-C** y **Cables Lightning / USB-C**) con canal de ventas independiente (`+52 1 667 475 2676`). |
| **📋 Generador de Órdenes de Servicio (`#orden`)** | Herramienta interna integrada para ambas divisiones que genera folios automáticos (`#TP-XXXX`), calcula anticipos/restantes, envía la nota formateada directo al WhatsApp del cliente e imprime el recibo en PDF. |
| **🔒 Seguridad & SEO Local** | Configuración de cabeceras HTTP de seguridad (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) y datos estructurados JSON-LD (`LocalBusiness`) para posicionamiento en Culiacán, Sinaloa. |

---

## 🗂️ Arquitectura del Proyecto

```text
TechPoint/
├── .agents/
│   └── skills/
│       └── ui-craft/            # Skill de diseño UI/UX y sistema Bento
├── public/
│   ├── _headers                 # Cabeceras de seguridad HTTP para producción
│   ├── favicon.svg              # Favicon vectorial con el pin orbital
│   ├── logo-icon.png            # Símbolo orbital original con fondo transparente
│   ├── logo-wordmark.png        # Tipografía oficial TECHPOINT
│   └── logo-techpoint.png       # Logotipo completo con subtítulo Soluciones Tecnológicas
├── src/
│   ├── assets/                  # Recursos gráficos maestros de marca
│   ├── components/
│   │   ├── Header.tsx               # Barra fija translúcida con menú móvil adaptable
│   │   ├── Hero.tsx                 # Portada minimalista con lineup vectorial de hardware
│   │   ├── Services.tsx             # Bento Grid de servicios tecnológicos
│   │   ├── AccessoriesSection.tsx   # Vitrina limpia de productos calidad original
│   │   ├── Contact.tsx              # Tarjetas independientes (WhatsApp, Facebook, Instagram)
│   │   ├── Footer.tsx               # Pie de página con acceso al generador de órdenes
│   │   ├── ServiceOrderModal.tsx    # Generador de Órdenes de Servicio (WhatsApp + PDF)
│   │   ├── TechPointLogo.tsx        # Componente adaptable del logotipo oficial
│   │   └── WhatsAppFloatingButton.tsx # Botón flotante de contacto rápido
│   ├── config/
│   │   └── siteConfig.ts        # Fuente única de datos (teléfono, redes, catálogo, navegación)
│   ├── pages/
│   │   └── HomePage.tsx         # Vista principal ensamblada
│   ├── styles/
│   │   └── index.css            # Variables tipográficas, animaciones suaves y estilos de impresión
│   ├── App.tsx                  # Componente raíz
│   └── main.tsx                 # Punto de entrada de React 19
├── index.html                   # Metadatos SEO, Open Graph y Schema.org LocalBusiness
├── tailwind.config.js           # Configuración de paleta y tokens de diseño
└── vite.config.ts               # Configuración de empaquetado con Vite
```

---

## 🎨 Sistema de Diseño y Paleta de Marca

| Token | Color Hex | Uso en la Interfaz |
| :--- | :--- | :--- |
| **Apple Silver Canvas** | `#F5F5F7` | Fondo base del sitio y superficies secundarias |
| **Pure Studio White** | `#FFFFFF` | Tarjetas Bento principales y barra translúcida |
| **Space Black** | `#1D1D1F` | Titulares principales de alto contraste |
| **Titanium Gray** | `#86868B` | Subtítulos bicolores y textos descriptivos |
| **TechPoint Electric Blue** | `#0866E8` | Acentos de marca, botones principales e indicadores |
| **TechPoint Deep Navy** | `#07162E` | Tarjeta destacada de desarrollo digital y logotipo |

---

## 🚀 Instalación y Despliegue Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/EdgarLeonArchuleta19/TechPoint.git
cd TechPoint
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar servidor de desarrollo
```bash
npm run dev
```

### 4. Compilar para producción
```bash
npm run build
```
> El directorio `dist/` generado está optimizado y listo para desplegarse en **Vercel**, **Cloudflare Pages** o **Netlify**.

---

## 📋 Uso del Generador de Notas y Órdenes (`#orden`)

Para abrir el módulo de emisión de notas desde cualquier dispositivo:
1. Haz clic en el enlace **`Orden de Servicio`** ubicado en el pie de página, o navega directamente a `/#orden`.
2. Elige la modalidad (**`Servicio / Reparación`** o **`Venta de Artículo`**) y llena los datos del cliente.
3. Selecciona:
   - **`Compartir archivo PDF por WhatsApp`** para adjuntar y enviar directamente el archivo `.pdf` de la nota formal.
   - **`Descargar PDF`** para guardar o imprimir la nota membretada clásica de **TECHPOINT**.

---

## ⚖️ Licencia y Derechos de Autor

Este proyecto está protegido bajo una **[Licencia de Uso No Comercial con Atribución Obligatoria](./LICENSE)** (*Copyright © 2026 [Edgar Leon Archuleta](https://github.com/EdgarLeonArchuleta19) & TECHPOINT*).

- **✅ Atribución Obligatoria:** Cualquier referencia, estudio o bifurcación (*fork*) debe mantener de forma visible el crédito al autor original (**[@EdgarLeonArchuleta19](https://github.com/EdgarLeonArchuleta19)**) y el enlace a este repositorio.
- **🚫 Prohibido el Uso Comercial:** Queda **estrictamente prohibido** utilizar, copiar, distribuir, vender o implementar este sistema, su diseño o su generador de notas PDF para fines comerciales, lucro o negocios de terceros sin autorización previa y por escrito del autor.
- **🔒 Marca Registrada:** El nombre **TECHPOINT**, sus divisiones y logotipos son propiedad exclusiva y no pueden ser reutilizados.

---

<div align="center">

Desarrollado por [**Edgar Leon Archuleta (@EdgarLeonArchuleta19)**](https://github.com/EdgarLeonArchuleta19) para **TECHPOINT** • Culiacán, Sinaloa, México.  
*Todos los derechos reservados © 2026*

</div>
