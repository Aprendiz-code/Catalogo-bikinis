import Link from "next/link";
import { getCatalogSettings } from "@/lib/services/catalog";

export default async function HomePage() {
  let brand = "Colección Verano";
  try {
    const settings = await getCatalogSettings();
    if (settings?.brand_name) brand = settings.brand_name;
  } catch {
    // Supabase aún no configurado
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#E8FF88_0%,transparent_40%),radial-gradient(circle_at_80%_10%,#D6F0FF_0%,transparent_35%),radial-gradient(circle_at_70%_80%,#FFD6E8_0%,transparent_40%),linear-gradient(180deg,#FFF9C9_0%,#F7F4EE_55%,#FFFFFF_100%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 text-center">
        <p className="script-title mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base animate-[fadeUp_0.8s_ease]">Colección de temporada</p>
        <h1 className="display-title mb-4 sm:mb-6 md:mb-8 max-w-3xl text-2xl sm:text-4xl md:text-5xl lg:text-6xl animate-[fadeUp_1s_ease]">{brand}</h1>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 animate-[fadeUp_1.4s_ease]">
          <Link
            href="/catalogo"
            className="bg-brand-ink px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 font-display text-xs sm:text-sm md:text-base uppercase tracking-[0.16em] sm:tracking-[0.18em] text-white hover:opacity-90 transition-opacity"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
