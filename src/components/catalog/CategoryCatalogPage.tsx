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
      <div className="catalog-sheet px-[6%] py-[5%]" style={{ color: category.text_color }}>
        <header className="mb-[4%] text-center">
          <h2 className="display-title text-[clamp(2.1rem,4vw,4.4rem)] uppercase tracking-[-0.04em]">
            {category.name}
          </h2>
          {totalPages > 1 ? (
            <p className="mt-1 text-xs tracking-[0.2em] text-brand-muted">
              {pageIndex} / {totalPages}
            </p>
          ) : null}
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-[4%]">
          {visibleProducts.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-center text-sm text-brand-muted">
              Próximamente productos en esta categoría.
            </div>
          ) : (
            visibleProducts.map((product, index) => (
              <ProductEditorialCard
                key={product.id}
                product={product}
                index={index}
                categoryDefaultLayout={category.layout_variant}
                whatsapp={settings.whatsapp}
                compact={isMobile}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
