"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase-browser";
import { revalidateMenu } from "@/app/actions";
import DishModal from "./DishModal";
import type { Dish, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

const CATEGORY_COLORS: Record<Category, string> = {
  entradas: "text-emerald-400/80 bg-emerald-400/10 border-emerald-400/20",
  principales: "text-blue-400/80 bg-blue-400/10 border-blue-400/20",
  postres: "text-pink-400/80 bg-pink-400/10 border-pink-400/20",
  bebidas: "text-amber-400/80 bg-amber-400/10 border-amber-400/20",
};

interface Props {
  initialDishes: Dish[];
  userEmail: string;
}

export default function DishesManager({ initialDishes, userEmail }: Props) {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [modal, setModal] = useState<{ open: boolean; dish: Dish | null }>({
    open: false,
    dish: null,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered =
    filterCategory === "all"
      ? dishes
      : dishes.filter((d) => d.category === filterCategory);

  const handleSaved = (saved: Dish) => {
    setDishes((prev) => {
      const exists = prev.find((d) => d.id === saved.id);
      return exists
        ? prev.map((d) => (d.id === saved.id ? saved : d))
        : [saved, ...prev];
    });
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const supabase = createClient();
    await supabase.from("dishes").delete().eq("id", id);
    setDishes((prev) => prev.filter((d) => d.id !== id));
    setDeleteConfirm(null);
    setDeleting(false);
    await revalidateMenu();
  };

  const handleToggleAvailable = async (dish: Dish) => {
    const supabase = createClient();
    const { data } = await supabase
      .from("dishes")
      .update({ available: !dish.available })
      .eq("id", dish.id)
      .select()
      .single();
    if (data) {
      setDishes((prev) => prev.map((d) => (d.id === dish.id ? (data as Dish) : d)));
      await revalidateMenu();
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const stats = CATEGORIES.map((cat) => ({
    ...cat,
    count: dishes.filter((d) => d.category === cat.value).length,
  }));

  return (
    <div className="min-h-screen bg-[#0d0d0d] font-[family-name:var(--font-sans)]">

      {/* Top bar */}
      <header className="border-b border-[#2a2a2a] bg-[#161616] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="font-[family-name:var(--font-playfair)] text-xl tracking-widest text-[#f5f0e8] hover:text-[#C9A84C] transition-colors duration-200"
          >
            LUMA
          </a>
          <span className="text-[#2a2a2a]">|</span>
          <span className="text-[#f5f0e8]/40 text-xs tracking-widest uppercase">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-[#f5f0e8]/30 text-xs hidden sm:block">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="text-[#f5f0e8]/40 text-xs tracking-widest uppercase hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer"
          >
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Page header */}
        <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
          <div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[#f5f0e8] mb-1">
              Carta del restaurante
            </h1>
            <p className="text-[#f5f0e8]/40 text-sm">
              {dishes.length} platos en total
            </p>
          </div>
          <button
            onClick={() => setModal({ open: true, dish: null })}
            className="flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-[#C9A84C] hover:text-[#0d0d0d] transition-all duration-300 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nuevo plato
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stats.map((s) => (
            <div
              key={s.value}
              className="border border-[#2a2a2a] bg-[#161616] px-5 py-4 flex items-center justify-between"
            >
              <span className="text-[#f5f0e8]/50 text-xs tracking-widest uppercase">
                {s.label}
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-2xl text-[#C9A84C]">
                {s.count}
              </span>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilterCategory("all")}
            className={`text-xs tracking-[0.15em] uppercase px-4 py-1.5 border transition-all duration-200 cursor-pointer ${
              filterCategory === "all"
                ? "border-[#C9A84C] bg-[#C9A84C] text-[#0d0d0d]"
                : "border-[#2a2a2a] text-[#f5f0e8]/40 hover:text-[#f5f0e8] hover:border-[#3a3a3a]"
            }`}
          >
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilterCategory(cat.value)}
              className={`text-xs tracking-[0.15em] uppercase px-4 py-1.5 border transition-all duration-200 cursor-pointer ${
                filterCategory === cat.value
                  ? "border-[#C9A84C] bg-[#C9A84C] text-[#0d0d0d]"
                  : "border-[#2a2a2a] text-[#f5f0e8]/40 hover:text-[#f5f0e8] hover:border-[#3a3a3a]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="border border-[#2a2a2a] border-dashed py-20 text-center">
            <p className="text-[#f5f0e8]/30 text-sm mb-4">No hay platos en esta categoría</p>
            <button
              onClick={() => setModal({ open: true, dish: null })}
              className="text-[#C9A84C] text-xs tracking-widest uppercase hover:underline cursor-pointer"
            >
              + Agregar el primero
            </button>
          </div>
        ) : (
          <div className="border border-[#2a2a2a] overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-[64px_1fr_120px_90px_100px_110px] gap-4 px-5 py-3 border-b border-[#2a2a2a] bg-[#161616]">
              {["Foto", "Plato", "Categoría", "Precio", "Estado", "Acciones"].map((h) => (
                <span key={h} className="text-[#f5f0e8]/30 text-xs tracking-widest uppercase">
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            <AnimatePresence initial={false}>
              {filtered.map((dish) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-[#2a2a2a] last:border-0 hover:bg-[#161616] transition-colors duration-150"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[64px_1fr_120px_90px_100px_110px] gap-4 px-5 py-4 items-center">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-12 overflow-hidden bg-[#2a2a2a] shrink-0">
                      {dish.image_url ? (
                        <Image
                          src={dish.image_url}
                          alt={dish.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Name + description */}
                    <div className="min-w-0">
                      <p className="text-[#f5f0e8] text-sm font-medium truncate">{dish.name}</p>
                      <p className="text-[#f5f0e8]/35 text-xs truncate mt-0.5">{dish.description}</p>
                    </div>

                    {/* Category */}
                    <span
                      className={`text-xs tracking-wider uppercase border px-2 py-0.5 w-fit ${CATEGORY_COLORS[dish.category]}`}
                    >
                      {dish.category}
                    </span>

                    {/* Price */}
                    <span className="text-[#C9A84C] text-sm font-medium">
                      USD {dish.price}
                    </span>

                    {/* Available toggle */}
                    <button
                      onClick={() => handleToggleAvailable(dish)}
                      className={`text-xs tracking-wider uppercase border px-2 py-0.5 w-fit transition-all duration-200 cursor-pointer ${
                        dish.available
                          ? "text-emerald-400/80 bg-emerald-400/10 border-emerald-400/20 hover:bg-emerald-400/20"
                          : "text-[#f5f0e8]/30 bg-[#2a2a2a]/50 border-[#3a3a3a] hover:text-[#f5f0e8]/50"
                      }`}
                    >
                      {dish.available ? "Activo" : "Oculto"}
                    </button>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModal({ open: true, dish })}
                        className="text-[#f5f0e8]/40 hover:text-[#C9A84C] transition-colors duration-200 cursor-pointer p-1.5 hover:bg-[#C9A84C]/10"
                        title="Editar"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(dish.id)}
                        className="text-[#f5f0e8]/40 hover:text-red-400 transition-colors duration-200 cursor-pointer p-1.5 hover:bg-red-400/10"
                        title="Eliminar"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer note */}
        <p className="text-[#f5f0e8]/20 text-xs text-center mt-8 tracking-widest uppercase">
          Los cambios se reflejan en el sitio público de inmediato
        </p>
      </main>

      {/* Delete confirmation dialog */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0d0d0d]/80 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#161616] border border-[#2a2a2a] p-8 max-w-sm w-full text-center"
            >
              <p className="font-[family-name:var(--font-playfair)] text-xl text-[#f5f0e8] mb-2">
                ¿Eliminar plato?
              </p>
              <p className="text-[#f5f0e8]/50 text-sm mb-8 font-[family-name:var(--font-sans)]">
                Esta acción no se puede deshacer.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border border-[#2a2a2a] text-[#f5f0e8]/50 text-xs tracking-widest uppercase py-2.5 hover:border-[#3a3a3a] hover:text-[#f5f0e8] transition-all duration-200 cursor-pointer font-[family-name:var(--font-sans)]"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={deleting}
                  className="flex-1 border border-red-500/50 text-red-400 text-xs tracking-widest uppercase py-2.5 hover:bg-red-500/10 transition-all duration-200 cursor-pointer font-[family-name:var(--font-sans)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Eliminar"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dish modal */}
      {modal.open && (
        <DishModal
          dish={modal.dish}
          onClose={() => setModal({ open: false, dish: null })}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
