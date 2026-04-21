"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase-browser";
import { revalidateMenu } from "@/app/actions";
import type { Dish, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface Props {
  dish?: Dish | null;
  onClose: () => void;
  onSaved: (dish: Dish) => void;
}

const EMPTY: Omit<Dish, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: "entradas",
  image_url: null,
  available: true,
};

export default function DishModal({ dish, onClose, onSaved }: Props) {
  const isEdit = !!dish;
  const [form, setForm] = useState<Omit<Dish, "id">>(dish ? { ...dish } : { ...EMPTY });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(dish?.image_url ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : name === "price"
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from("dishes")
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (error) throw new Error(`Error al subir imagen: ${error.message}`);

    const { data: { publicUrl } } = supabase.storage
      .from("dishes")
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      let image_url: string | null = form.image_url;

      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }

      const payload = { ...form, image_url };

      if (isEdit && dish) {
        const { data, error } = await supabase
          .from("dishes")
          .update(payload)
          .eq("id", dish.id)
          .select()
          .single();

        if (error) throw error;
        onSaved(data as Dish);
      } else {
        const { data, error } = await supabase
          .from("dishes")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        onSaved(data as Dish);
      }

      await revalidateMenu();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ocurrió un error. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0d0d0d]/80 backdrop-blur-sm flex items-center justify-end"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="h-full w-full max-w-lg bg-[#161616] border-l border-[#2a2a2a] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-[#2a2a2a] shrink-0">
            <div>
              <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-sans)] mb-0.5">
                {isEdit ? "Editando" : "Nuevo plato"}
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-xl text-[#f5f0e8]">
                {isEdit ? dish.name : "Agregar plato"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#f5f0e8]/30 hover:text-[#f5f0e8] transition-colors duration-200 cursor-pointer p-1"
              aria-label="Cerrar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-5">

            {/* Image upload */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Foto del plato</label>
              <div
                onClick={() => fileRef.current?.click()}
                className="relative h-44 border border-[#2a2a2a] border-dashed hover:border-[#C9A84C]/40 transition-colors duration-200 cursor-pointer overflow-hidden flex items-center justify-center bg-[#0d0d0d]"
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized={imagePreview.startsWith("blob:")}
                  />
                ) : (
                  <div className="text-center">
                    <svg className="mx-auto mb-2 text-[#f5f0e8]/20" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p className="text-[#f5f0e8]/30 text-xs font-[family-name:var(--font-sans)]">
                      Clic para seleccionar imagen
                    </p>
                  </div>
                )}
                {imagePreview && (
                  <div className="absolute inset-0 bg-[#0d0d0d]/0 hover:bg-[#0d0d0d]/40 transition-colors duration-200 flex items-center justify-center">
                    <span className="opacity-0 hover:opacity-100 text-[#f5f0e8] text-xs tracking-widest uppercase font-[family-name:var(--font-sans)]">
                      Cambiar
                    </span>
                  </div>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Nombre <span className="text-[#C9A84C]">*</span></label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ej: Tartar de Lomo"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Descripción</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Ingredientes y técnica de preparación..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Price + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Precio (USD) <span className="text-[#C9A84C]">*</span></label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min={0}
                  step={0.5}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>Categoría <span className="text-[#C9A84C]">*</span></label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Available */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#2a2a2a] rounded-full peer-checked:bg-[#C9A84C] transition-colors duration-200" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5" />
              </div>
              <span className="text-[#f5f0e8]/60 text-xs tracking-widest uppercase font-[family-name:var(--font-sans)] group-hover:text-[#f5f0e8] transition-colors duration-200">
                Disponible en carta
              </span>
            </label>

            {error && (
              <p className="text-red-400/80 text-xs font-[family-name:var(--font-sans)] border border-red-400/20 bg-red-400/5 px-3 py-2">
                {error}
              </p>
            )}
          </form>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-[#2a2a2a] shrink-0 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#2a2a2a] text-[#f5f0e8]/50 text-xs tracking-[0.2em] uppercase py-3 hover:border-[#f5f0e8]/20 hover:text-[#f5f0e8] transition-all duration-200 cursor-pointer font-[family-name:var(--font-sans)]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              form="dish-form"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.2em] uppercase py-3 hover:bg-[#C9A84C] hover:text-[#0d0d0d] transition-all duration-300 cursor-pointer font-[family-name:var(--font-sans)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </>
              ) : isEdit ? (
                "Guardar cambios"
              ) : (
                "Crear plato"
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const inputClass =
  "w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f0e8] text-sm px-4 py-2.5 outline-none focus:border-[#C9A84C]/60 transition-colors duration-200 placeholder-[#f5f0e8]/20 font-[family-name:var(--font-sans)] [color-scheme:dark]";

const labelClass =
  "text-[#f5f0e8]/50 text-xs tracking-widest uppercase font-[family-name:var(--font-sans)]";

export type { Category };
