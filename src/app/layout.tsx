import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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

export const metadata: Metadata = {
  title: "WebSolutions | Desarrollo Web Profesional",
  description:
    "Creamos páginas web, aplicaciones web y automatizaciones para impulsar tu negocio. Soluciones digitales profesionales con tecnología moderna.",
  keywords: [
    "desarrollo web",
    "páginas web",
    "aplicaciones web",
    "automatización",
    "programación",
    "software a medida",
  ],
  openGraph: {
    title: "WebSolutions | Transformamos tu negocio con tecnología web",
    description:
      "Creamos páginas web, aplicaciones web y automatizaciones que optimizan tus procesos.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "WebSolutions",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebSolutions | Desarrollo Web Profesional",
    description:
      "Transformamos tu negocio con tecnología web. Páginas, aplicaciones y automatizaciones.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
