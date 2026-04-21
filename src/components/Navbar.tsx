"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Menú", href: "#menu" },
  { label: "Historia", href: "#historia" },
  { label: "Reservas", href: "#reservas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#2a2a2a]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-[family-name:var(--font-playfair)] text-2xl tracking-widest text-[#f5f0e8] hover:text-[#C9A84C] transition-colors duration-300"
          >
            LUMA
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm tracking-widest text-[#f5f0e8]/70 hover:text-[#C9A84C] transition-colors duration-300 uppercase cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            aria-label="Abrir menú"
          >
            <span
              className={`block h-px w-6 bg-[#f5f0e8] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-[#f5f0e8] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-[#f5f0e8] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[#0d0d0d] flex flex-col items-center justify-center gap-10"
          >
            {links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                onClick={() => handleNavClick(link.href)}
                className="font-[family-name:var(--font-playfair)] text-3xl text-[#f5f0e8]/80 hover:text-[#C9A84C] transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
