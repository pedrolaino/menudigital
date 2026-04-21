"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const HORARIOS = [
  { dia: "Martes — Jueves", horario: "12:00 – 15:00 · 19:30 – 23:00" },
  { dia: "Viernes — Sábado", horario: "12:00 – 15:30 · 19:30 – 00:00" },
  { dia: "Domingo", horario: "12:00 – 16:00" },
  { dia: "Lunes", horario: "Cerrado" },
];

const CONTACT_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Dirección",
    value: "Arroyo 872, Retiro",
    sub: "Buenos Aires, Argentina",
    href: "https://maps.google.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.44 2 2 0 0 1 3.55 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6 6l.89-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16.92z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+54 9 11 4532-7891",
    sub: "Respuesta rápida · 10:00 – 22:00",
    href: "https://wa.me/5491145327891",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "hola@restauranteluma.com",
    sub: "Para consultas y eventos privados",
    href: "mailto:hola@restauranteluma.com",
  },
];

export default function Contacto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <section id="contacto" className="py-28 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-px bg-[#2a2a2a] mb-28" />
      </div>

      <div className="max-w-6xl mx-auto px-6" ref={sectionRef}>

        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-4 font-[family-name:var(--font-sans)]"
          >
            Contacto
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#f5f0e8] mb-5"
          >
            Encontranos
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="w-10 h-px bg-[#C9A84C] mx-auto"
          />
        </div>

        {/* Grid: info + horarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-0 border border-[#2a2a2a]"
          >
            {CONTACT_ITEMS.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`flex items-start gap-5 p-7 group hover:bg-[#161616] transition-colors duration-300 ${
                  i < CONTACT_ITEMS.length - 1 ? "border-b border-[#2a2a2a]" : ""
                }`}
              >
                <span className="text-[#C9A84C] mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <div>
                  <p className="text-[#f5f0e8]/40 text-xs tracking-widest uppercase mb-1 font-[family-name:var(--font-sans)]">
                    {item.label}
                  </p>
                  <p className="text-[#f5f0e8] text-sm font-[family-name:var(--font-sans)] group-hover:text-[#C9A84C] transition-colors duration-300">
                    {item.value}
                  </p>
                  <p className="text-[#f5f0e8]/40 text-xs mt-0.5 font-[family-name:var(--font-sans)]">
                    {item.sub}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Horarios */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-8 font-[family-name:var(--font-sans)]">
              Horarios
            </p>

            <div className="space-y-0 border border-[#2a2a2a]">
              {HORARIOS.map((h, i) => (
                <div
                  key={h.dia}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-6 py-5 ${
                    i < HORARIOS.length - 1 ? "border-b border-[#2a2a2a]" : ""
                  } ${h.horario === "Cerrado" ? "opacity-40" : ""}`}
                >
                  <span className="text-[#f5f0e8]/70 text-sm font-[family-name:var(--font-sans)]">
                    {h.dia}
                  </span>
                  <span
                    className={`text-sm font-[family-name:var(--font-sans)] ${
                      h.horario === "Cerrado" ? "text-[#f5f0e8]/40" : "text-[#f5f0e8]"
                    }`}
                  >
                    {h.horario}
                  </span>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              className="mt-8 flex items-center justify-center gap-3 border border-[#2a2a2a] py-5 text-[#f5f0e8]/50 text-xs tracking-[0.2em] uppercase hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all duration-300 font-[family-name:var(--font-sans)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Ver en Google Maps
            </motion.a>
          </motion.div>

        </div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-24 pt-10 border-t border-[#2a2a2a] flex flex-col md:flex-row items-center justify-between gap-4 text-[#f5f0e8]/25 text-xs tracking-widest uppercase font-[family-name:var(--font-sans)]"
        >
          <span className="font-[family-name:var(--font-playfair)] text-[#f5f0e8]/30 text-base not-uppercase normal-case tracking-wider">
            Luma
          </span>
          <span>© 2025 Luma. Todos los derechos reservados.</span>
          <span>Arroyo 872, Retiro · Buenos Aires</span>
        </motion.div>

      </div>
    </section>
  );
}
