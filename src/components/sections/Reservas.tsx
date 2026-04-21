"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type FormState = "idle" | "loading" | "success" | "error";

const GUEST_OPTIONS = ["1 persona", "2 personas", "3 personas", "4 personas", "5 personas", "6 personas", "7 o más"];

export default function Reservas() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "0px 0px -60px 0px" });

  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    fecha: "",
    hora: "",
    personas: "",
    notas: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    // Placeholder — email sending goes here (e.g. Resend / Nodemailer)
    await new Promise((res) => setTimeout(res, 1200));

    // TODO: Replace with actual email service call
    // await sendReservationEmail(form);

    setFormState("success");
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <section id="reservas" className="py-28 bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full h-px bg-[#2a2a2a] mb-28" />
      </div>

      <div className="max-w-3xl mx-auto px-6" ref={sectionRef}>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase mb-4 font-[family-name:var(--font-sans)]"
          >
            Reservas
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#f5f0e8] mb-5"
          >
            Reservá tu Mesa
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="w-10 h-px bg-[#C9A84C] mx-auto mb-5 origin-center"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[#f5f0e8]/50 text-sm font-[family-name:var(--font-sans)] font-light leading-relaxed"
          >
            Para grupos de 8 o más personas, escribinos directamente por WhatsApp.
            <br />
            Confirmamos tu reserva en menos de 24 horas.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {formState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="border border-[#C9A84C]/40 bg-[#161616] p-12 text-center"
            >
              <div className="w-10 h-px bg-[#C9A84C] mx-auto mb-8" />
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[#f5f0e8] mb-4">
                Reserva recibida
              </h3>
              <p className="text-[#f5f0e8]/55 text-sm font-[family-name:var(--font-sans)] leading-relaxed mb-8">
                Gracias, <span className="text-[#f5f0e8]">{form.nombre}</span>. Confirmamos tu reserva
                para el <span className="text-[#f5f0e8]">{form.fecha}</span> a las{" "}
                <span className="text-[#f5f0e8]">{form.hora}</span> en las próximas horas.
              </p>
              <button
                onClick={() => { setFormState("idle"); setForm({ nombre: "", email: "", fecha: "", hora: "", personas: "", notas: "" }); }}
                className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase border border-[#C9A84C]/50 px-6 py-2.5 hover:bg-[#C9A84C] hover:text-[#0d0d0d] transition-all duration-300 cursor-pointer font-[family-name:var(--font-sans)]"
              >
                Nueva reserva
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-[#2a2a2a] bg-[#161616] p-8 md:p-12 space-y-6">

              {/* Row 1: Nombre + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Nombre completo" required>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Santiago García"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="santiago@email.com"
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* Row 2: Fecha + Hora */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Fecha" required>
                  <input
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                    required
                    min={minDate}
                    className={inputClass}
                  />
                </Field>
                <Field label="Horario" required>
                  <select
                    name="hora"
                    value={form.hora}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="" disabled>Elegí un turno</option>
                    <optgroup label="Almuerzo">
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                    </optgroup>
                    <optgroup label="Cena">
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                    </optgroup>
                  </select>
                </Field>
              </div>

              {/* Row 3: Personas */}
              <Field label="Cantidad de personas" required>
                <select
                  name="personas"
                  value={form.personas}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="" disabled>Seleccioná</option>
                  {GUEST_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </Field>

              {/* Row 4: Notas */}
              <Field label="Notas o pedidos especiales">
                <textarea
                  name="notas"
                  value={form.notas}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Alergias, cumpleaños, ocasión especial..."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* Submit */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={formState === "loading"}
                  whileHover={{ scale: formState === "loading" ? 1 : 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.25em] uppercase py-4 hover:bg-[#C9A84C] hover:text-[#0d0d0d] transition-all duration-300 cursor-pointer font-[family-name:var(--font-sans)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    "Confirmar Reserva"
                  )}
                </motion.button>
              </div>

            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const inputClass =
  "w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f0e8] text-sm px-4 py-3 outline-none focus:border-[#C9A84C]/60 transition-colors duration-200 placeholder-[#f5f0e8]/20 font-[family-name:var(--font-sans)] [color-scheme:dark]";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[#f5f0e8]/60 text-xs tracking-widest uppercase font-[family-name:var(--font-sans)]">
        {label}
        {required && <span className="text-[#C9A84C] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
