"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductEditorialCard } from "@/components/catalog/ProductEditorialCard";
import type { CatalogSettings, Category, Product } from "@/types/database";

type Props = {
  category: Category;
  products: Product[];
  settings: CatalogSettings;
  pageIndex?: number;
  totalPages?: number;
};

export function CategoryCatalogPage({
  category,
  products,
  settings,
  pageIndex = 1,
  totalPages = 1,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const visibleProducts = useMemo(() => products, [products]);

  return (
    <div className="catalog-outer h-full" style={{ backgroundColor: category.background_color }}>
      <div className="catalog-sheet overflow-hidden px-[5%] py-[4.5%]" style={{ color: category.text_color }}>
        <header className="mb-[5%] border-b border-[#3c4a4a]/20 pb-3 text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.38em] text-[#5b4d52]">Colección</p>
          <h2 className="display-title text-[clamp(2.2rem,4vw,4.5rem)] uppercase tracking-[-0.05em] text-[#302a2a]">
            {category.name}
          </h2>
          {totalPages > 1 ? (
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.28em] text-[#6d5b64]">
              {pageIndex} / {totalPages}
            </p>
          ) : null}
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          {visibleProducts.length === 0 ? (
            <div className="flex flex-1 items-center justify-center rounded-[1.25rem] border border-dashed border-[#4a3c40]/30 bg-white/30 px-6 py-10 text-center text-sm uppercase tracking-[0.18em] text-[#5d4a4e]">
              Próximamente productos en esta categoría.
            </div>
          ) : (
            <div className="grid h-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product, index) => (
                <ProductEditorialCard
                  key={product.id}
                  product={product}
                  index={index}
                  categoryDefaultLayout={category.layout_variant}
                  whatsapp={settings.whatsapp}
                  compact={isMobile}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
