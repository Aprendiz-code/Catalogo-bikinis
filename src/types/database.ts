export type StockStatus = "available" | "low" | "out_of_stock";
export type LayoutVariant = "image-left" | "image-right" | "auto";
export type ProductBadge = "Nuevo" | "Oferta" | "Agotado" | "Últimas unidades" | null;
export type PageType = "cover" | "about" | "categories" | "contact" | "closing" | "custom";
export type AdminRole = "admin" | "editor";

export type GalleryItem = {
  url: string;
  storage_path?: string | null;
  alt?: string | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  storage_path: string | null;
  cover_image_url: string | null;
  background_color: string;
  text_color: string;
  layout_variant: LayoutVariant;
  products_per_page: number | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  material: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_price: number | null;
  sizes: string[];
  image_url: string | null;
  storage_path: string | null;
  gallery: GalleryItem[];
  badge: ProductBadge;
  stock_status: StockStatus;
  purchase_url: string | null;
  whatsapp_message: string | null;
  layout_variant: LayoutVariant;
  is_active: boolean;
  is_featured: boolean;
  is_deleted: boolean;
  deleted_at: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
  category?: Category | null;
};

export type CatalogPage = {
  id: string;
  page_type: PageType;
  slug: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  background_color: string;
  text_color: string;
  background_image_url: string | null;
  background_storage_path: string | null;
  images: GalleryItem[];
  content: Record<string, unknown>;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type CatalogSettings = {
  id: string;
  brand_name: string;
  collection_name: string | null;
  subtitle: string | null;
  logo_url: string | null;
  logo_storage_path: string | null;
  cover_image_url: string | null;
  website: string | null;
  instagram: string | null;
  phone: string | null;
  whatsapp: string | null;
  primary_color: string;
  secondary_color: string;
  default_background_color: string;
  heading_font: string | null;
  body_font: string | null;
  products_per_page: number;
  catalog_width: number;
  catalog_height: number;
  show_empty_categories: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminProfile = {
  id: string;
  full_name: string | null;
  role: AdminRole;
  created_at: string;
};

export type FlipbookPage =
  | {
      kind: "editorial";
      key: string;
      page: CatalogPage;
      settings: CatalogSettings;
      categories?: Category[];
      products?: Product[];
    }
  | {
      kind: "category";
      key: string;
      category: Category;
      products: Product[];
      pageIndex: number;
      totalPages: number;
      settings: CatalogSettings;
    };
