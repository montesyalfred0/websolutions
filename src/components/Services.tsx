"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Monitor, Cog } from "lucide-react";

const services = [
  {
    title: "Páginas Web Profesionales",
    description:
      "Sitios web modernos, rápidos y optimizados para SEO que representan la identidad de tu marca y convierten visitantes en clientes.",
    icon: Globe,
  },
  {
    title: "Aplicaciones Web a Medida",
    description:
      "Sistemas personalizados: paneles de control, CRMs, plataformas SaaS y herramientas diseñadas específicamente para tu negocio.",
    icon: Monitor,
  },
  {
    title: "Automatización de Procesos",
    description:
      "Identificamos tareas repetitivas en tu negocio y las automatizamos para ahorrar tiempo, reducir errores y escalar tus operaciones.",
    icon: Cog,
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative p-8 rounded-2xl bg-card border border-border card-hover"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 lg:py-32 relative">
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
            Servicios
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Soluciones que{" "}
            <span className="text-gradient">impulsan tu negocio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ofrecemos servicios completos de desarrollo web para llevar tu
            empresa al siguiente nivel digital.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
