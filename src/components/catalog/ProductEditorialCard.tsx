"use client";

import { useState } from "react";
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
  const [imageFailed, setImageFailed] = useState(false);
  const layout = coverAlternate
    ? index % 2 === 0
      ? "image-right"
      : "image-left"
    : resolveLayout(index, product.layout_variant, categoryDefaultLayout);
  const imageLeft = layout === "image-left";

  return (
    <article
      className={cn(
        "grid h-full items-stretch overflow-hidden border border-[#d9c8cb] bg-[#fffdfd] shadow-[0_8px_20px_rgba(94,61,71,0.06)]",
        compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
        !imageLeft && !compact && "[&>*:first-child]:order-2 [&>*:last-child]:order-1 sm:[&>*:first-child]:order-2 sm:[&>*:last-child]:order-1",
      )}
    >
      <div className="relative min-h-[190px] overflow-hidden bg-[radial-gradient(circle_at_top,_#fef6f8,_#f1e7eb_58%,_#e9ebf2)]">
        {product.image_url && !imageFailed ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#f7e7ee_0%,#f4efe9_50%,#ebf2ff_100%)] px-4 text-center font-display text-[0.9rem] uppercase tracking-[0.2em] text-[#52454f]">
            {product.name}
          </div>
        )}
      </div>

      <div className="flex min-h-[200px] flex-col justify-between bg-[#fffdfd] px-3 py-3 text-[#352d2d] sm:px-4 sm:py-4">
        <div className="space-y-2 text-left">
          <p className="font-display text-[0.72rem] uppercase tracking-[0.22em] text-[#7a5f62]">
            {product.material || "Policarbonato"}
          </p>
          <h3 className="font-display text-[1.2rem] uppercase leading-[0.95] tracking-[-0.06em] text-[#2a2727] sm:text-[1.35rem]">
            {product.name}
          </h3>
          <p className="font-display text-[1.15rem] font-semibold tracking-[-0.04em] text-[#3d2f38]">
            {formatPriceCOP(product.price)}
          </p>
          <p className="text-[0.67rem] uppercase tracking-[0.18em] text-[#68585d]">
            Tallas: {formatSizes(product.sizes)}
          </p>
          {product.short_description ? (
            <p className="text-[0.72rem] leading-relaxed text-[#5b4a4d]">
              {product.short_description}
            </p>
          ) : null}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#eadfe2] pt-2">
          {product.purchase_url ? (
            <Link
              href={product.purchase_url}
              className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[#4a3e46] underline-offset-2 transition hover:underline"
            >
              Ver detalle
            </Link>
          ) : (
            <span className="text-[0.62rem] uppercase tracking-[0.18em] text-[#85757a]">Disponible</span>
          )}
          {whatsapp ? (
            <a
              href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola, quiero consultar ${product.name}`)}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#d6b6be] bg-[#fdf1f3] px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-[#4a3640] transition hover:bg-[#fbe5eb]"
            >
              Consultar
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
