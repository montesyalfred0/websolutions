"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { formatWhatsAppMessage, openWhatsApp, getWhatsAppUrl } from "@/lib/utils";

const services = [
  "Página Web",
  "Aplicación Web",
  "Automatización",
  "Consulta General",
];

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_KEY = "ws_whatsapp_timestamps";

function getStoredTimestamps(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem(RATE_LIMIT_KEY);
    return stored ? (JSON.parse(stored) as number[]) : [];
  } catch {
    return [];
  }
}

function storeTimestamps(timestamps: number[]) {
  try {
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
  } catch {
    /* noop */
  }
}

function isRateLimited(): { limited: boolean; remainingSeconds: number } {
  const now = Date.now();
  const timestamps = getStoredTimestamps().filter(
    (t) => now - t < RATE_LIMIT_WINDOW
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    const oldest = timestamps[0] ?? now;
    const remainingSeconds = Math.ceil(
      (oldest + RATE_LIMIT_WINDOW - now) / 1000
    );
    return { limited: true, remainingSeconds };
  }

  return { limited: false, remainingSeconds: 0 };
}

function recordSubmission() {
  const timestamps = getStoredTimestamps().filter(
    (t) => Date.now() - t < RATE_LIMIT_WINDOW
  );
  timestamps.push(Date.now());
  storeTimestamps(timestamps);
}

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [rateError, setRateError] = useState("");
  const [popupBlocked, setPopupBlocked] = useState(false);

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const whatsAppUrl = useCallback(() => {
    if (!phone) return "";
    const text = formatWhatsAppMessage(form);
    return getWhatsAppUrl(phone, text);
  }, [form, phone]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.name || !form.message) return;
      if (form.name.length > 100 || form.message.length > 2000) return;

      const { limited, remainingSeconds } = isRateLimited();
      if (limited) {
        setRateError(
          `Has alcanzado el límite de envíos. Intenta de nuevo en ${remainingSeconds} segundos.`
        );
        return;
      }

      setRateError("");
      setPopupBlocked(false);
      setSending(true);
      recordSubmission();

      if (!phone) {
        setSending(false);
        return;
      }
      const text = formatWhatsAppMessage(form);
      const opened = openWhatsApp(phone, text);

      if (!opened) {
        setPopupBlocked(true);
        setSending(false);
        return;
      }

      setTimeout(() => {
        setSending(false);
        setForm(initialForm);
      }, 5000);
    },
    [form, phone]
  );

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-grid-white opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase">
            Contacto
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            ¿Listo para{" "}
            <span className="text-gradient">transformar tu negocio</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cuéntanos sobre tu proyecto de desarrollo web y te enviaremos una propuesta
            personalizada sin compromiso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Tu nombre"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Tu empresa"
                  maxLength={100}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="correo@ejemplo.com"
                  maxLength={200}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="+52 555 123 4567"
                  maxLength={30}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Servicio de interés
              </label>
              <select
                value={form.service}
                onChange={(e) => updateField("service", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="">Selecciona un servicio</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Cuéntanos sobre tu proyecto{" "}
                <span className="text-primary">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                placeholder="Describe tu proyecto, objetivos y cualquier detalle relevante..."
                maxLength={2000}
              />
            </div>

            {rateError && (
              <p className="text-sm text-red-500 text-center bg-red-500/10 rounded-xl px-4 py-3">
                {rateError}
              </p>
            )}

            {popupBlocked && (
              <div className="text-sm text-center bg-yellow-500/10 rounded-xl px-4 py-3 space-y-2">
                <p className="text-yellow-500">
                  El navegador bloqueó la ventana emergente.
                </p>
                <a
                  href={whatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <MessageCircle size={16} />
                  Haz clic aquí para abrir WhatsApp manualmente
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sending ? (
                "Abriendo WhatsApp..."
              ) : (
                <>
                  <MessageCircle size={20} />
                  Enviar por WhatsApp
                </>
              )}
            </button>

            <p className="text-xs text-center text-muted-foreground">
              Al enviar, se abrirá WhatsApp con tu mensaje prellenado.
              No almacenamos tus datos.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
