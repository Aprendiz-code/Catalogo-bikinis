"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { cn, formatPriceCOP } from "@/lib/utils";
import type { Product } from "@/types/database";

type Props = {
  product: Product;
};

export function ProductEditorialCard({ product }: Props) {
  return (
    <article
      className={cn(
        "product-card items-stretch gap-0 overflow-hidden border border-[#3d5f5a]/20 bg-[#fffdfb]",
      )}
      style={{ boxSizing: "border-box" }}
    >
      <div
        className={cn(
          "product-image-button relative col-start-1 row-start-1 flex min-h-0 items-center justify-center overflow-hidden bg-[#f3f1ed]",
        )}
      >
        {product.image_url ? (
          <button
            type="button"
            className="relative h-full w-full cursor-zoom-in border-0 bg-transparent p-0"
            data-image-preview-src={product.image_url}
            data-image-preview-alt={`${product.name} - ${product.short_description || product.description || "Gafas"}`}
            aria-label={`Ampliar imagen de ${product.name}`}
          >
            <Image
              src={product.image_url}
              alt={`${product.name} - ${product.short_description || product.description || "Gafas"}`}
              fill
              className="product-image object-contain object-center"
              sizes="(max-width: 768px) 100vw, 420px"
            />
            <span className="image-zoom-label" aria-hidden="true">
              <Maximize2 className="h-3.5 w-3.5 opacity-[0.65]" strokeWidth={2.2} />
              Ver detalle
            </span>
          </button>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#D6F0FF] via-[#FFF9C9] to-[#FFD6E8] px-4 text-center font-display text-2xl uppercase tracking-[0.12em] text-brand-ink/50">
            {product.name}
          </div>
        )}
      </div>

      <div
        className={cn(
          "product-info col-start-2 row-start-1 flex min-h-0 flex-col items-start justify-center border border-[#3d5f5a]/60 border-l-0 bg-[#fffdfb] px-5 py-4 sm:px-6 sm:py-5",
        )}
        style={{ boxSizing: "border-box", overflowWrap: "break-word", wordBreak: "break-word" }}
      >
        <div className="space-y-2 text-brand-ink" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
          <h3 className={cn(
            "product-reference-title product-name font-display text-[clamp(1.3rem,2.8vw,2.6rem)] uppercase leading-[0.9] tracking-[-0.05em] text-[#315252]",
          )}>
            {product.short_description || product.description || "Referencia demo"}
          </h3>
          <p className={cn(
            "product-price font-display text-[clamp(1.1rem,2.1vw,2.2rem)] leading-none tracking-[-0.04em] text-[#2f2424]",
          )}>
            Precio: {formatPriceCOP(product.price)}
          </p>
        </div>

      </div>
    </article>
  );
}
