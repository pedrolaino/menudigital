"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const handleReserve = () => {
    const el = document.querySelector("#reservas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
          alt="Plato signature de Luma"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay — gradient from bottom for legibility */}
        <div className="absolute inset-0 bg-[#0d0d0d]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-6 font-[family-name:var(--font-sans)]"
        >
          Buenos Aires · Cocina de Autor
        </motion.p>

        {/* Restaurant name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="font-[family-name:var(--font-playfair)] text-[clamp(4rem,12vw,9rem)] leading-none tracking-tight text-[#f5f0e8] mb-4"
        >
          Luma
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
          className="text-[#f5f0e8]/70 text-sm md:text-base tracking-[0.12em] max-w-xs md:max-w-sm font-[family-name:var(--font-sans)] font-light"
        >
          Una experiencia gastronómica que celebra la tierra argentina
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
          className="w-12 h-px bg-[#C9A84C] my-8 origin-center"
        />

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
          onClick={handleReserve}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-[#C9A84C] hover:text-[#0d0d0d] transition-all duration-300 font-[family-name:var(--font-sans)] cursor-pointer"
        >
          Reservar Mesa
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#f5f0e8]/30 text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-sans)]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
