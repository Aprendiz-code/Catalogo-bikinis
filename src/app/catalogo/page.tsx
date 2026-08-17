import { CatalogFlipbook } from "@/components/catalog/CatalogFlipbook";
import { Header } from "@/components/layout/Header";
import { ErrorState } from "@/components/ui/shared";
import { buildFlipbookPages } from "@/lib/catalog/build-pages";
import { getFullCatalogData } from "@/lib/services/catalog";

export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  try {
    const { settings, editorialPages, categories, products } = await getFullCatalogData();
    const pages = buildFlipbookPages({
      settings,
      editorialPages,
      categories,
      products,
    });

    return (
      <main
        className="min-h-screen"
        style={
          {
            "--color-primary": settings.primary_color,
            "--color-secondary": settings.secondary_color,
            "--color-pastel": settings.default_background_color,
          } as React.CSSProperties
        }
      >
        <div className="bg-[linear-gradient(180deg,#F7F4EE_0%,#EEF6FF_45%,#FFF7FB_100%)]">
          <Header brandName={settings.brand_name} />
          <section className="mx-auto w-full max-w-6xl px-2 sm:px-4 md:px-6 pb-8 sm:pb-12 md:pb-16 pt-2 sm:pt-4 md:pt-6">
            <div className="mb-4 sm:mb-6 md:mb-8 text-center">
              <p className="script-title text-sm sm:text-base md:text-lg">{settings.collection_name}</p>
              <h1 className="display-title mt-1 text-2xl sm:text-3xl md:text-4xl">Catálogo</h1>
            </div>
            <CatalogFlipbook
              pages={pages}
              width={settings.catalog_width}
              height={settings.catalog_height}
              whatsapp={settings.whatsapp}
            />
          </section>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <ErrorState
          message={
            error instanceof Error
              ? error.message
              : "No se pudo cargar el catálogo. Configura Supabase y aplica las migraciones."
          }
        />
      </main>
    );
  }
}
