"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 flex items-center justify-center shadow-lg transition-all duration-300"
      aria-label="Volver arriba"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
