import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/https?:\/\/[^\s]+/g, "[enlace eliminado]")
    .replace(/[*_~`]/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/\r?\n\s*\r?\n/g, "\n\n")
    .replace(/^\s+|\s+$/g, "")
    .slice(0, 2000);
}

export function formatWhatsAppMessage(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  const lines = [
    `*Nuevo contacto desde WebSolutions*`,
    ``,
    `*Nombre:* ${sanitize(data.name)}`,
    `*Empresa:* ${sanitize(data.company)}`,
    `*Email:* ${sanitize(data.email)}`,
    `*Teléfono:* ${sanitize(data.phone)}`,
    `*Servicio:* ${sanitize(data.service)}`,
    ``,
    `*Mensaje:*`,
    sanitize(data.message),
  ];
  return encodeURIComponent(lines.join("\n"));
}

export function openWhatsApp(phone: string, text: string): boolean {
  const url = `https://wa.me/${phone}?text=${text}`;
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win || win.closed || typeof win.closed === "undefined") {
    return false;
  }
  return true;
}

export function getWhatsAppUrl(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${text}`;
}
