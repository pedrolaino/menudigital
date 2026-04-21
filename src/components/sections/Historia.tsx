"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "2017", label: "Año de apertura" },
  { value: "3", label: "Estrellas Culinarias" },
  { value: "12", label: "Productores locales" },
  { value: "48", label: "Cubiertos por noche" },
];

export default function Historia() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -80px 0px" });

  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <section id="historia" className="py-28 bg-[#0d0d0d] overflow-hidden">
      {/* Top divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-px bg-[#2a2a2a] mb-28" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image column */}
          <div ref={imgRef} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={imgInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=900&auto=format&fit=crop"
                alt="Chef de Luma en cocina"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {/* Subtle inner shadow */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(13,13,13,0.4)]" />
            </motion.div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={imgInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="absolute -bottom-6 -right-4 md:right-0 lg:-right-8 bg-[#161616] border border-[#2a2a2a] px-7 py-5"
            >
              <p className="font-[family-name:var(--font-playfair)] text-[#C9A84C] text-3xl mb-0.5">
                2017
              </p>
              <p className="text-[#f5f0e8]/50 text-xs tracking-widest uppercase font-[family-name:var(--font-sans)]">
                Fundado en Buenos Aires
              </p>
            </motion.div>
          </div>

          {/* Text column */}
          <div ref={sectionRef} className="pt-8 lg:pt-0">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-5 font-[family-name:var(--font-sans)]"
            >
              Nuestra Historia
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#f5f0e8] leading-tight mb-8"
            >
              Donde la tierra
              <br />
              <span className="italic text-[#f5f0e8]/70">se vuelve plato</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="w-10 h-px bg-[#C9A84C] mb-8 origin-left"
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-5 text-[#f5f0e8]/65 text-base leading-relaxed font-[family-name:var(--font-sans)] font-light"
            >
              <p>
                Luma nació en 2017 de la visión del chef <span className="text-[#f5f0e8]">Martín Varela</span>, quien
                después de una década en restaurantes de Europa regresó a Buenos Aires con una certeza: que
                la cocina argentina tenía todo para estar en el centro del mundo gastronómico.
              </p>
              <p>
                Cada plato es un diálogo entre el territorio y la técnica. Trabajamos con doce productores
                de confianza — desde apicultores de la Patagonia hasta criadores de cordero en Santa Cruz —
                para asegurar que cada ingrediente llegue a la mesa en su punto exacto.
              </p>
              <p>
                Nuestro menú cambia con las estaciones. No por tendencia, sino porque creemos que cocinar
                con lo que la tierra ofrece en cada momento es la forma más honesta de hacer fine dining.
              </p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 pl-5 border-l border-[#C9A84C] text-[#f5f0e8]/50 text-sm italic font-[family-name:var(--font-playfair)] leading-relaxed"
            >
              "La cocina argentina ya no necesita imitar a nadie.
              <br />
              Tiene su propia voz — y Luma es su megáfono."
              <footer className="mt-2 text-[#C9A84C] not-italic text-xs tracking-widest uppercase font-[family-name:var(--font-sans)] font-normal">
                — Martín Varela, Chef & Fundador
              </footer>
            </motion.blockquote>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-28 grid grid-cols-2 md:grid-cols-4 border border-[#2a2a2a]"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center py-10 px-4 text-center ${
                i < STATS.length - 1 ? "border-r border-[#2a2a2a] border-b md:border-b-0" : ""
              } ${i === 1 ? "border-b md:border-b-0" : ""}`}
            >
              <span className="font-[family-name:var(--font-playfair)] text-4xl text-[#C9A84C] mb-2">
                {stat.value}
              </span>
              <span className="text-[#f5f0e8]/40 text-xs tracking-widest uppercase font-[family-name:var(--font-sans)]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
