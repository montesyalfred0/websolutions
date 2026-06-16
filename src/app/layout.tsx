import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://websolutions.yal99.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WebSolutions | Desarrollo Web Profesional en México y Latinoamérica",
    template: "%s | WebSolutions",
  },
  description:
    "Expertos en desarrollo web, aplicaciones web y automatización de procesos. Creamos páginas web profesionales, sistemas CRM, paneles de control y soluciones digitales a medida para impulsar tu negocio en México y Latinoamérica.",
  keywords: [
    "desarrollo web",
    "páginas web profesionales",
    "aplicaciones web a medida",
    "automatización de procesos",
    "crear página web",
    "diseño web",
    "programación web",
    "software a medida",
    "CRM personalizado",
    "paneles de control",
    "desarrollo web México",
    "desarrollo web Latinoamérica",
    "agencia digital",
    "transformación digital",
    "página web para negocio",
    "sistema web",
    "automatización inteligente",
    "Next.js",
    "React",
    "desarrollador web",
  ],
  authors: [{ name: "WebSolutions" }],
  creator: "WebSolutions",
  publisher: "WebSolutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "es": siteUrl,
      "es-MX": siteUrl,
      "es-AR": siteUrl,
      "es-CO": siteUrl,
      "es-CL": siteUrl,
      "es-PE": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "WebSolutions",
    title: "WebSolutions | Desarrollo Web Profesional para tu Negocio",
    description:
      "Creamos páginas web, aplicaciones web y automatizaciones que optimizan tus procesos y disparan tus resultados. Soluciones digitales para toda Latinoamérica.",
    url: siteUrl,
    countryName: "México",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebSolutions | Desarrollo Web Profesional",
    description:
      "Transformamos tu negocio con tecnología web. Páginas web, aplicaciones web y automatizaciones en toda Latinoamérica.",
  },
  category: "technology",
  classification: "Desarrollo Web y Software",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "WebSolutions",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.svg`,
  image: `${siteUrl}/images/logo.png`,
  description:
    "Agencia de desarrollo web especializada en páginas web profesionales, aplicaciones web a medida y automatización de procesos para negocios en México y Latinoamérica.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MX",
  },
  areaServed: [
    { "@type": "Country", name: "México" },
    { "@type": "Country", name: "Argentina" },
    { "@type": "Country", name: "Colombia" },
    { "@type": "Country", name: "Chile" },
    { "@type": "Country", name: "Perú" },
    { "@type": "Country", name: "Ecuador" },
    { "@type": "Country", name: "Venezuela" },
    { "@type": "Country", name: "América Latina" },
  ],
  serviceType: [
    "Desarrollo Web",
    "Aplicaciones Web",
    "Automatización de Procesos",
    "Páginas Web Profesionales",
    "Software a Medida",
  ],
  priceRange: "$$",
  telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  knowsLanguage: ["es", "en"],
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="alternate" hrefLang="es" href={siteUrl} />
        <link rel="alternate" hrefLang="es-MX" href={siteUrl} />
        <link rel="alternate" hrefLang="es-AR" href={siteUrl} />
        <link rel="alternate" hrefLang="es-CO" href={siteUrl} />
        <link rel="alternate" hrefLang="es-CL" href={siteUrl} />
        <link rel="alternate" hrefLang="es-PE" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <link rel="canonical" href={siteUrl} />
        <meta name="google-site-verification" content="PENDIENTE" />
        <meta name="geo.region" content="MX" />
        <meta name="geo.placename" content="México" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="skip-link"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
