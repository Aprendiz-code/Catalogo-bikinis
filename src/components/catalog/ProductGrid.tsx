"use client";

import { useMemo, useState } from "react";
import { ProductGridCard } from "@/components/catalog/ProductGridCard";
import type { Category, Product } from "@/types/database";

type Props = {
  products: Product[];
  categories: Category[];
  whatsapp?: string | null;
  initialCategory?: string;
};

export function ProductGrid({ products, categories, whatsapp, initialCategory }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory || "all");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("order");

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.material || "").toLowerCase().includes(q) ||
          (p.short_description || "").toLowerCase().includes(q),
      );
    }

    if (category !== "all") {
      const cat = categories.find((c) => c.slug === category);
      if (cat) list = list.filter((p) => p.category_id === cat.id);
    }

    if (availability === "available") {
      list = list.filter((p) => p.stock_status === "available" || p.stock_status === "low");
    } else if (availability === "out") {
      list = list.filter((p) => p.stock_status === "out_of_stock");
    }

    switch (sort) {
      case "price_asc":
        list.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        list.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        list.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
        break;
      default:
        list.sort((a, b) => a.display_order - b.display_order);
    }

    return list;
  }, [products, categories, search, category, availability, sort]);

  return (
    <div className="space-y-4 px-2 sm:space-y-6 sm:px-0">
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar productos…"
          className="border border-brand-line bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:border-brand-ink"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-brand-line bg-white px-3 py-2 text-xs sm:text-sm"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="border border-brand-line bg-white px-3 py-2 text-xs sm:text-sm"
        >
          <option value="all">Toda disponibilidad</option>
          <option value="available">Disponibles</option>
          <option value="out">Agotados</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-brand-line bg-white px-3 py-2 text-xs sm:text-sm"
        >
          <option value="order">Orden del catálogo</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
          <option value="name">Nombre</option>
          <option value="newest">Novedades</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-brand-ink/20 bg-white/70 p-6 sm:p-10 text-center text-xs sm:text-sm text-brand-muted">
          No hay productos con esos filtros.
        </div>
      ) : (
        <div className="grid gap-2 grid-cols-2 sm:gap-3 sm:grid-cols-2 md:gap-4 md:grid-cols-3 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductGridCard key={product.id} product={product} whatsapp={whatsapp} />
          ))}
        </div>
      )}
    </div>
  );
}
