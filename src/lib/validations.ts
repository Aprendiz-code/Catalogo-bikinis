import { z } from "zod";

export const layoutVariantSchema = z.enum(["image-left", "image-right", "auto"]);
export const stockStatusSchema = z.enum(["available", "low", "out_of_stock"]);
export const badgeSchema = z.preprocess(
  (value) => (value === "" || value === undefined ? null : value),
  z.enum(["Nuevo", "Oferta", "Agotado", "Últimas unidades"]).nullable(),
);
export const productSchema = z.object({
  name: z.string().min(2, "Nombre requerido").max(120),
  slug: z.string().min(2).max(140),
  material: z.string().max(80).optional().nullable(),
  short_description: z.string().max(280).optional().nullable(),
  description: z.string().max(4000).optional().nullable(),
  price: z.coerce.number().min(0),
  compare_price: z.coerce.number().min(0).optional().nullable(),
  category_id: z.string().min(1, "Selecciona una categoría"),
  sizes: z.array(z.string().min(1)).default([]),
  image_url: z.string().url().optional().nullable().or(z.literal("")),
  storage_path: z.string().optional().nullable(),
  gallery: z
    .array(
      z.object({
        url: z.string(),
        storage_path: z.string().optional().nullable(),
        alt: z.string().optional().nullable(),
      }),
    )
    .default([]),
  badge: badgeSchema.default(null),
  stock_status: stockStatusSchema.default("available"),
  purchase_url: z.string().url().optional().nullable().or(z.literal("")),
  whatsapp_message: z.string().max(500).optional().nullable(),
  layout_variant: layoutVariantSchema.default("auto"),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  display_order: z.coerce.number().int().default(0),
});

export const categorySchema = z.object({
  name: z.string().min(2).max(80),
  slug: z.string().min(2).max(100),
  description: z.string().max(2000).optional().nullable(),
  image_url: z.string().url().optional().nullable().or(z.literal("")),
  storage_path: z.string().optional().nullable(),
  cover_image_url: z.string().url().optional().nullable().or(z.literal("")),
  background_color: z.string().min(4).max(20).default("#E8FF88"),
  text_color: z.string().min(4).max(20).default("#405352"),
  layout_variant: layoutVariantSchema.default("image-left"),
  products_per_page: z.coerce.number().int().positive().optional().nullable(),
  is_active: z.boolean().default(true),
  display_order: z.coerce.number().int().default(0),
});

export const catalogPageSchema = z.object({
  page_type: z.enum(["cover", "about", "categories", "contact", "closing", "custom"]),
  slug: z.string().min(2).max(100),
  title: z.string().max(200).optional().nullable(),
  subtitle: z.string().max(200).optional().nullable(),
  body: z.string().max(8000).optional().nullable(),
  background_color: z.string().min(4).max(20).default("#FFF9C9"),
  text_color: z.string().min(4).max(20).default("#405352"),
  background_image_url: z.string().url().optional().nullable().or(z.literal("")),
  background_storage_path: z.string().optional().nullable(),
  images: z
    .array(
      z.object({
        url: z.string(),
        storage_path: z.string().optional().nullable(),
        alt: z.string().optional().nullable(),
      }),
    )
    .default([]),
  content: z.record(z.unknown()).default({}),
  is_active: z.boolean().default(true),
  display_order: z.coerce.number().int().default(0),
});

export const catalogSettingsSchema = z.object({
  brand_name: z.string().min(2).max(120),
  collection_name: z.string().max(120).optional().nullable(),
  subtitle: z.string().max(200).optional().nullable(),
  logo_url: z.string().url().optional().nullable().or(z.literal("")),
  cover_image_url: z.string().url().optional().nullable().or(z.literal("")),
  website: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  primary_color: z.string().min(4).max(20),
  secondary_color: z.string().min(4).max(20),
  default_background_color: z.string().min(4).max(20),
  products_per_page: z.coerce.number().int().positive().default(3),
  catalog_width: z.coerce.number().int().positive().default(768),
  catalog_height: z.coerce.number().int().positive().default(1080),
  show_empty_categories: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type CatalogPageInput = z.infer<typeof catalogPageSchema>;
export type CatalogSettingsInput = z.infer<typeof catalogSettingsSchema>;
