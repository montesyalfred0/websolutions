"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

type VideoState = "loading" | "ready" | "error";

const solutions = [
  {
    title: "Páginas Web Profesionales",
    description:
      "Sitios web modernos, responsivos y optimizados para SEO. Diseñados para posicionar tu negocio en línea y convertir visitantes en clientes desde cualquier dispositivo.",
    gradient: "from-blue-600 to-cyan-500",
    videoSrc: "/videos/web-pages-demo.mp4",
    videoAlt: "Demostración de página web profesional responsiva",
  },
  {
    title: "Registro de Datos",
    description:
      "Sistemas de captura y gestión de datos con formularios inteligentes, almacenamiento seguro en la nube y acceso inmediato a la información de tu negocio desde cualquier lugar.",
    gradient: "from-purple-600 to-pink-500",
    videoSrc: "/videos/data-registration-demo.mp4",
    videoAlt: "Demostración de sistema de registro y gestión de datos",
  },
  {
    title: "Reportes y Automatización",
    description:
      "Automatiza tus procesos repetitivos, genera reportes automáticos inteligentes y toma decisiones basadas en datos en tiempo real para hacer crecer tu empresa.",
    gradient: "from-emerald-600 to-teal-500",
    videoSrc: "/videos/reports-automation-demo.mp4",
    videoAlt: "Demostración de automatización de reportes y procesos",
  },
];

function SolutionCard({
  solution,
  index,
}: {
  solution: (typeof solutions)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [videoState, setVideoState] = useState<VideoState>("loading");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => setVideoState("ready");
    const handleError = () => setVideoState("error");

    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("error", handleError);

    if (video.readyState >= 2) setVideoState("ready");

    return () => {
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border"
    >
      <div
        className={`relative h-56 sm:h-64 flex items-center justify-center overflow-hidden bg-gradient-to-br ${solution.gradient}`}
      >
        {videoState === "error" ? (
          <div className="flex flex-col items-center gap-3 text-white/70">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm font-medium">{solution.title} — Video demo</p>
          </div>
        ) : (
          <>
            {videoState === "loading" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover ${videoState === "loading" ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
              src={solution.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              aria-label={solution.videoAlt}
            />
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {solution.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Solutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="soluciones" className="py-24 lg:py-32 relative">
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
            Soluciones
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Lo que podemos{" "}
            <span className="text-gradient">construir para ti</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cada solución está diseñada a la medida de tu negocio,
            combinando tecnología moderna con experiencia real en el mercado latinoamericano.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.title}
              solution={solution}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
