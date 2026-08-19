"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPriceCOP } from "@/lib/utils";
import type { Product } from "@/types/database";

type Props = {
  product: Product;
  whatsapp?: string | null;
};

export function ProductGridCard({ product }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden border border-brand-line bg-white hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#EEF3F2]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width:640px) 50vw, (max-width:768px) 33vw, 280px"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#D6F0FF] via-[#FFF9C9] to-[#FFD6E8] font-display text-xl sm:text-2xl uppercase tracking-widest text-brand-ink/40">
            {product.name.slice(0, 1)}
          </div>
        )}
        {product.badge ? (
          <span className="absolute left-2 sm:left-3 top-2 sm:top-3 bg-white/90 px-2 py-1 text-[9px] sm:text-[10px] uppercase tracking-wider font-display">
            {product.badge}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 sm:gap-2 p-3 sm:p-4">
        <p className="text-xs text-brand-muted">{product.material}</p>
        <h3 className="font-display text-sm sm:text-lg md:text-xl uppercase tracking-[0.06em] sm:tracking-[0.08em]">{product.name}</h3>
        <p className="text-xs sm:text-sm font-semibold">{formatPriceCOP(product.price)}</p>
        <div className="mt-auto flex gap-2 sm:gap-3 pt-2">
          {product.purchase_url ? (
            <Link href={product.purchase_url} className="text-xs uppercase tracking-wide underline underline-offset-2 hover:opacity-70 transition-opacity">
              Comprar
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
