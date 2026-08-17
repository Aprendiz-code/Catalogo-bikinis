"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function ProductSearch({ value, onChange, placeholder = "Buscar…" }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-brand-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-ink"
      aria-label="Buscar productos"
    />
  );
}
