import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPriceCOP(value: number | string) {
  const amount = typeof value === "string" ? Number(value) : value;
  const formatted = new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `$ ${formatted}`;
}

export function formatSizes(sizes: string[] | null | undefined) {
  if (!sizes || sizes.length === 0) return "Consultar tallas";
  return sizes.join(" - ");
}

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function chunkArray<T>(items: T[], size: number): T[][] {
  if (size <= 0) return [items];
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export function buildWhatsAppUrl(phone: string | null | undefined, message?: string | null) {
  if (!phone) return null;
  const cleaned = phone.replace(/[^\d]/g, "");
  const text = encodeURIComponent(message || "Hola, quiero consultar un producto del catálogo");
  return `https://wa.me/${cleaned}?text=${text}`;
}

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
