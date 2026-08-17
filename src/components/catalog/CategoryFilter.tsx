"use client";

import type { Category } from "@/types/database";

type Props = {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
};

export function CategoryFilter({ categories, value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-brand-line bg-white px-3 py-2 text-sm"
      aria-label="Filtrar por categoría"
    >
      <option value="all">Todas las categorías</option>
      {categories.map((category) => (
        <option key={category.id} value={category.slug}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
