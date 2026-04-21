"use client";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-center px-6">
      <div>
        <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-sans)]">
          Error
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-[#f5f0e8] mb-4">
          Algo salió mal
        </h2>
        <p className="text-[#f5f0e8]/40 text-sm mb-8 font-[family-name:var(--font-sans)]">
          No pudimos cargar la página. Intentá de nuevo.
        </p>
        <button
          onClick={reset}
          className="border border-[#C9A84C] text-[#C9A84C] text-xs tracking-[0.25em] uppercase px-6 py-3 hover:bg-[#C9A84C] hover:text-[#0d0d0d] transition-all duration-300 cursor-pointer font-[family-name:var(--font-sans)]"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
