"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!phone) return null;

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(
        "Hola! Me gustar\u00eda saber m\u00e1s sobre sus servicios de desarrollo web."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-[#25D366]/30 hover:scale-110 transition-all duration-300 animate-bounce"
      aria-label="Contactar por WhatsApp"
      style={{ animationDuration: "3s" }}
    >
      <MessageCircle className="w-7 h-7" fill="white" />
    </a>
  );
}
