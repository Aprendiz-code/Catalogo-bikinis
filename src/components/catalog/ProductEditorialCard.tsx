"use client";

import Image from "next/image";
import Link from "next/link";
import { cn, formatPriceCOP, formatSizes, resolveLayout } from "@/lib/utils";
import type { LayoutVariant, Product } from "@/types/database";

type Props = {
  product: Product;
  index: number;
  categoryDefaultLayout?: LayoutVariant;
  whatsapp?: string | null;
  compact?: boolean;
  /** Si true, alterna empezando con ficha a la izquierda (estilo portada). */
  coverAlternate?: boolean;
};

export function ProductEditorialCard({
  product,
  index,
  categoryDefaultLayout = "image-left",
  whatsapp,
  compact = false,
  coverAlternate = false,
}: Props) {
  const layout = coverAlternate
    ? index % 2 === 0
      ? "image-right"
      : "image-left"
    : resolveLayout(index, product.layout_variant, categoryDefaultLayout);
  const imageLeft = layout === "image-left";

  return (
    <article
      className={cn(
        "grid h-full items-stretch gap-0 border border-[#3d5f5a]/60 bg-[#f3f0eb]",
        compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-[1.15fr_1fr]",
        !imageLeft && !compact && "[&>*:first-child]:order-2 [&>*:last-child]:order-1 sm:[&>*:first-child]:order-2 sm:[&>*:last-child]:order-1",
      )}
    >
      <div
        className={cn(
          "relative min-h-[150px] overflow-hidden bg-[#EEF3F2] sm:min-h-[170px] md:min-h-[190px]",
          imageLeft ? "" : "",
          compact ? "" : "",
        )}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#D6F0FF] via-[#FFF9C9] to-[#FFD6E8] px-4 text-center font-display text-lg sm:text-2xl uppercase tracking-[0.12em] text-brand-ink/50">
            {product.name}
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex min-h-[150px] flex-col justify-center bg-[#f5f4ef] px-2 py-3 sm:min-h-[170px] sm:px-3 sm:py-3 md:min-h-[190px] md:px-3 md:py-4",
          compact ? "border-l border-[#3d5f5a]/60" : "border-t sm:border-t-0 sm:border-l border-[#3d5f5a]/60",
        )}
      >
        <div className="space-y-1 text-center text-brand-ink">
          <p className="font-display text-[clamp(0.6rem,0.95vw,1rem)] italic leading-snug text-[#3e5b56]">
            {product.material || "Algodón"}
          </p>
          <h3 className="font-display text-[clamp(0.8rem,1.45vw,1.7rem)] uppercase leading-tight tracking-[-0.05em] text-[#2f4d4a]">
            {product.name}
          </h3>
          <p className="font-display text-[clamp(0.7rem,1.2vw,1.25rem)] leading-snug tracking-[-0.04em] text-[#2f4d4a]">
            Precio: {formatPriceCOP(product.price)}
          </p>
          <p className="text-[clamp(0.5rem,0.85vw,0.75rem)] leading-snug text-[#2f4d4a]">
            Tallas: {formatSizes(product.sizes)}
          </p>
        </div>

        <div className="mt-2 flex flex-col items-center justify-center gap-1 sm:mt-3 sm:gap-2">
          {product.purchase_url ? (
            <Link
              href={product.purchase_url}
              className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wide text-brand-ink underline-offset-2 hover:underline"
            >
              Ver catálogo
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
