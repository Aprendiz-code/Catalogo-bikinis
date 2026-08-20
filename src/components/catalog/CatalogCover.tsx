import { ProductEditorialCard } from "@/components/catalog/ProductEditorialCard";
import type {
  CatalogPage,
  CatalogSettings,
  Product,
} from "@/types/database";

import coverImage from "../../../img/Portada.png";

type Props = {
  page: CatalogPage;
  settings: CatalogSettings;
  products?: Product[];
};

export function CatalogCover({
  page,
  settings,
  products = [],
}: Props) {
  const content = page.content || {};

  const showSubtitle = content.showSubtitle !== false;
  const showTitle = content.showTitle !== false;
  const showWebsite = content.showWebsite !== false;
  const showFeatured = content.showFeaturedProducts !== false;

  const websiteLabel =
    (content.websiteLabel as string) ||
    settings.website?.replace(/^https?:\/\//, "").toUpperCase() ||
    settings.brand_name.toUpperCase();

  const coverProducts = products.slice(0, 3);

  /*
   * La imagen se toma directamente desde la carpeta img.
   * No depende de page.background_image_url.
   */
  const heroBackground = coverImage.src;

  /*
   * Portada con imagen de fondo
   */
  return (
    <div
      className="catalog-outer relative h-full w-full overflow-hidden bg-transparent"
      style={{
        backgroundColor: "transparent",
      }}
    >
      <div
        className="catalog-sheet relative h-full w-full overflow-hidden bg-transparent"
        style={{
          backgroundImage: `url("${heroBackground}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "transparent",
        }}
      >
        {/* Overlay oscuro sobre la imagen y debajo del texto */}
        <div
          className="absolute inset-0 z-0 bg-black/40"
          aria-hidden="true"
        />

        {/* Contenido de la portada */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between px-[6%] py-[8%] sm:px-[8%] sm:py-[10%] md:px-[10%] md:py-[12%]">
          {/* Header superior */}
          <div className="space-y-2 sm:space-y-3 text-center">
            {showSubtitle &&
            (page.subtitle || settings.collection_name) ? (
              <div className="space-y-1">
                <p className="font-display text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white">
                  {page.subtitle || settings.collection_name}
                </p>
              </div>
            ) : null}
          </div>

          {/* Centro de la portada */}
          <div className="space-y-2 sm:space-y-4 text-center">
            {showTitle ? (
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-[0.02em] sm:tracking-[0.05em] text-white">
                {page.title || "COLECCIÓN DE VERANO"}
              </h1>
            ) : null}

            {/* Descripción */}
            <p className="mx-auto max-w-xs sm:max-w-md md:max-w-lg font-display text-xs sm:text-sm md:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white px-2 sm:px-0">
              Explora la colección completa de temporada
            </p>
          </div>

          {/* Footer inferior */}
          {showWebsite ? (
            <div className="space-y-2 sm:space-y-3 text-center">
              {/* Divisor */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent" />

              <div className="space-y-1 sm:space-y-2">
                <p className="font-display text-xs sm:text-sm md:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white">
                  {websiteLabel || "SR GLOW BEACH WEAR"}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 font-display text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/90 px-2 sm:px-0">
                  {settings.instagram ? (
                    <p>{settings.instagram}</p>
                  ) : (
                    <p>@srglow_</p>
                  )}

                  {settings.phone ? (
                    <p>{settings.phone}</p>
                  ) : (
                    <p>+57 317 4291254</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}