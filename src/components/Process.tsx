"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Code, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Analizamos tus procesos y necesidades para encontrar la mejor solución tecnológica para tu negocio.",
    icon: Search,
  },
  {
    number: "02",
    title: "Desarrollo",
    description:
      "Construimos tu página o aplicación con tecnologías modernas, código limpio y mejores prácticas.",
    icon: Code,
  },
  {
    number: "03",
    title: "Entrega",
    description:
      "Desplegamos tu solución, te capacitamos en su uso y te brindamos soporte continuo para garantizar tu éxito.",
    icon: Rocket,
  },
];

function ProcessStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const stepRef = useRef(null);
  const stepInView = useInView(stepRef, { once: true });
  const Icon = step.icon;

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, y: 40 }}
      animate={stepInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex flex-col items-center text-center"
    >
      <div className="relative z-10 w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <span className="text-4xl font-bold text-primary/20 mb-2">
        {step.number}
      </span>
      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
      <p className="text-muted-foreground leading-relaxed max-w-sm">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-4 tracking-widest uppercase">
            Proceso
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Cómo <span className="text-gradient">trabajamos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un proceso claro y transparente para llevar tu proyecto de la idea a
            la realidad.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <ProcessStep key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
