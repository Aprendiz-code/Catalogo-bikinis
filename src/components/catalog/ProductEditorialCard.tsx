"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, cn, formatPriceCOP, resolveLayout } from "@/lib/utils";
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
  const wa = buildWhatsAppUrl(
    whatsapp,
    product.whatsapp_message || `Hola, quiero consultar ${product.name}`,
  );

  return (
    <article
      className={cn(
        "grid items-stretch gap-0 overflow-hidden border border-[#3d5f5a]/60 bg-[#f3f0eb]",
        compact ? "grid-cols-2" : "grid-cols-[1.15fr_1fr]",
        !imageLeft && !compact && "[&>*:first-child]:order-2 [&>*:last-child]:order-1",
      )}
      style={{ boxSizing: "border-box" }}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#EEF3F2]",
          compact ? "min-h-[200px]" : "min-h-[220px]",
        )}
      >
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={`${product.name} - ${product.short_description || product.description || "Gafas"}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 420px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#D6F0FF] via-[#FFF9C9] to-[#FFD6E8] px-4 text-center font-display text-2xl uppercase tracking-[0.12em] text-brand-ink/50">
            {product.name}
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex min-h-[200px] flex-col justify-center bg-[#f5f4ef] px-5 py-4 sm:px-6 sm:py-5",
          compact ? "border-l border-[#3d5f5a]/60" : "border border-[#3d5f5a]/60 border-l-0",
        )}
        style={{ boxSizing: "border-box", overflowWrap: "break-word", wordBreak: "break-word" }}
      >
        <div className="space-y-2 text-brand-ink" style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>
          <p className="font-display text-[clamp(0.8rem,1.4vw,1.5rem)] italic leading-none text-[#3e5b56]">
            {product.material || "Algodón"}
          </p>
          <h3 className="font-display text-[clamp(1.3rem,2.8vw,2.6rem)] uppercase leading-[0.9] tracking-[-0.05em] text-[#2f4d4a]">
            {product.name}
          </h3>
          <p className="font-display text-[clamp(1.1rem,2.1vw,2.2rem)] leading-none tracking-[-0.04em] text-[#2f4d4a]">
            Precio: {formatPriceCOP(product.price)}
          </p>
          {product.short_description ? (
            <p className="text-sm leading-relaxed text-[#2f4d4a]">
              {product.short_description}
            </p>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-brand-ink underline-offset-2 hover:underline"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
