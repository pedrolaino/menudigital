"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenciales incorrectas. Verificá tu email y contraseña.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-[family-name:var(--font-playfair)] text-3xl text-[#f5f0e8] tracking-widest mb-1">
            LUMA
          </p>
          <p className="text-[#f5f0e8]/40 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-sans)]">
            Panel de administración
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="border border-[#2a2a2a] bg-[#161616] p-8 space-y-5"
        >
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@luma.com"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400/80 text-xs font-[family-name:var(--font-sans)] border border-red-400/20 bg-red-400/5 px-3 py-2"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.25em] uppercase py-3.5 hover:bg-[#C9A84C] hover:text-[#0d0d0d] transition-all duration-300 cursor-pointer font-[family-name:var(--font-sans)] disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                Ingresando...
              </>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>

        <p className="text-center text-[#f5f0e8]/25 text-xs mt-6 font-[family-name:var(--font-sans)]">
          ←{" "}
          <a href="/" className="hover:text-[#C9A84C] transition-colors duration-200">
            Volver al sitio
          </a>
        </p>
      </motion.div>
    </div>
  );
}

const inputClass =
  "w-full bg-[#0d0d0d] border border-[#2a2a2a] text-[#f5f0e8] text-sm px-4 py-3 outline-none focus:border-[#C9A84C]/60 transition-colors duration-200 placeholder-[#f5f0e8]/20 font-[family-name:var(--font-sans)]";

const labelClass =
  "text-[#f5f0e8]/50 text-xs tracking-widest uppercase font-[family-name:var(--font-sans)]";
