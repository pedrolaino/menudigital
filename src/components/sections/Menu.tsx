"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CATEGORIES, type Category, type Dish } from "@/lib/types";

interface MenuProps {
  dishes: Dish[];
}

function DishCard({ dish, index }: { dish: Dish; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
      className="group flex flex-col bg-[#161616] border border-[#2a2a2a] hover:border-[#C9A84C]/30 transition-colors duration-500 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-[#1a1a1a]">
        {dish.image_url ? (
          <Image
            src={dish.image_url}
            alt={dish.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-px bg-[#C9A84C]/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-[family-name:var(--font-playfair)] text-[#f5f0e8] text-lg leading-tight">
            {dish.name}
          </h3>
          <span className="text-[#C9A84C] font-[family-name:var(--font-sans)] text-sm font-medium whitespace-nowrap shrink-0 mt-0.5">
            USD {dish.price}
          </span>
        </div>
        <p className="text-[#f5f0e8]/50 text-sm leading-relaxed font-[family-name:var(--font-sans)] font-light">
          {dish.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Menu({ dishes }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("entradas");

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "0px 0px -40px 0px" });

  const filtered = dishes.filter(
    (d) => d.category === activeCategory && d.available
  );

  return (
    <section id="menu" className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-4 font-[family-name:var(--font-sans)]"
          >
            Temporada 2025
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#f5f0e8] mb-5"
          >
            Nuestra Carta
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="w-10 h-px bg-[#C9A84C] mx-auto mb-5 origin-center"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[#f5f0e8]/50 text-sm font-[family-name:var(--font-sans)] font-light max-w-md mx-auto leading-relaxed"
          >
            Todos los precios en dólares estadounidenses. IVA incluido.
            Consultá por opciones vegetarianas y alergenos.
          </motion.p>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mb-14"
        >
          <div className="grid grid-cols-2 md:flex border border-[#2a2a2a]">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-3 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-sans)] transition-all duration-300 cursor-pointer whitespace-nowrap
                  ${i % 2 === 0 ? "border-r border-[#2a2a2a] md:border-r-0" : ""}
                  ${i < 2 ? "border-b border-[#2a2a2a] md:border-b-0" : ""}
                  ${activeCategory === cat.value
                    ? "bg-[#C9A84C] text-[#0d0d0d]"
                    : "text-[#f5f0e8]/50 hover:text-[#f5f0e8] hover:bg-[#1a1a1a]"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dish grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-[#2a2a2a]"
          >
            {filtered.map((dish, i) => (
              <div key={dish.id} className="bg-[#0d0d0d]">
                <DishCard dish={dish} index={i} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-[#f5f0e8]/30 text-xs tracking-widest uppercase mt-14 font-[family-name:var(--font-sans)]"
        >
          El menú varía según la disponibilidad estacional
        </motion.p>

      </div>
    </section>
  );
}
