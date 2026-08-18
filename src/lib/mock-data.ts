import type { CatalogSettings, Category, Product, CatalogPage } from "@/types/database";

export function isMockDataEnabled() {
  const value = process.env.NEXT_PUBLIC_USE_MOCK_DATA;
  return value === undefined || value === "" ? true : value === "true";
}

export const mockCatalogSettings: CatalogSettings = {
  id: "demo-settings",
  brand_name: "Solea Bikini",
  collection_name: "Summer Edit",
  subtitle: "Bikinis, sets y looks de playa",
  logo_url: null,
  logo_storage_path: null,
  cover_image_url: null,
  website: "https://example.com",
  instagram: "@soleabikini",
  phone: "+34 600 000 000",
  whatsapp: "+34600000000",
  primary_color: "#E8A7B8",
  secondary_color: "#F7D7DF",
  default_background_color: "#FFF7FB",
  heading_font: null,
  body_font: null,
  products_per_page: 3,
  catalog_width: 800,
  catalog_height: 1100,
  show_empty_categories: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const colors = [
  { bg: "#FDE7F0", text: "#3D2A2A" },
  { bg: "#EAF6FF", text: "#213041" },
  { bg: "#F4F1E6", text: "#2F2B28" },
  { bg: "#E8F5F0", text: "#1F3F3A" },
  { bg: "#FFF4E6", text: "#4D3B28" },
  { bg: "#F0E8FF", text: "#362A47" },
  { bg: "#FFE8F4", text: "#4D2A3A" },
];

const images = [
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1537050487db-5ac1f5f4bda4?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1549887534-7051a2b5b249?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1520342868574-e3c19038b8b5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529134391234-544e2f298f0b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1100&q=80",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80",
];

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Gafas",
    slug: "gafas",
    description: "Lentes con actitud veraniega.",
    image_url: images[0],
    storage_path: null,
    cover_image_url: null,
    background_color: colors[0].bg,
    text_color: colors[0].text,
    layout_variant: "auto",
    products_per_page: 3,
    is_active: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name: "Salidas de baño",
    slug: "salidas-de-bano",
    description: "Piezas ligeras para cubrir y complementar.",
    image_url: images[1],
    storage_path: null,
    cover_image_url: null,
    background_color: colors[1].bg,
    text_color: colors[1].text,
    layout_variant: "image-left",
    products_per_page: 3,
    is_active: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-3",
    name: "Bikinis",
    slug: "bikinis",
    description: "Diseños frescos para playa y piscina.",
    image_url: images[2],
    storage_path: null,
    cover_image_url: null,
    background_color: colors[2].bg,
    text_color: colors[2].text,
    layout_variant: "image-right",
    products_per_page: 3,
    is_active: true,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-4",
    name: "Sombreros",
    slug: "sombreros",
    description: "Protección y estilo bajo el sol.",
    image_url: images[3],
    storage_path: null,
    cover_image_url: null,
    background_color: colors[3].bg,
    text_color: colors[3].text,
    layout_variant: "auto",
    products_per_page: 3,
    is_active: true,
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-5",
    name: "Sandalias",
    slug: "sandalias",
    description: "Comodidad para caminar al aire libre.",
    image_url: images[4],
    storage_path: null,
    cover_image_url: null,
    background_color: colors[4].bg,
    text_color: colors[4].text,
    layout_variant: "image-left",
    products_per_page: 3,
    is_active: true,
    display_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-6",
    name: "Accesorios",
    slug: "accesorios",
    description: "Detalles que completan tu look.",
    image_url: images[5],
    storage_path: null,
    cover_image_url: null,
    background_color: colors[5].bg,
    text_color: colors[5].text,
    layout_variant: "image-right",
    products_per_page: 3,
    is_active: true,
    display_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const productNames = {
  "cat-1": ["Gafas Horizon", "Gafas Nube", "Gafas Tropic", "Gafas Sunset", "Gafas Marina", "Gafas Palmera"],
  "cat-2": ["Salida Linen", "Salida Gasa", "Salida Algodón", "Salida Seda", "Salida Viscosa", "Salida Lino"],
  "cat-3": ["Bikini Arena", "Bikini Coral", "Bikini Brisa", "Bikini Marea", "Bikini Aurora", "Bikini Stella"],
  "cat-4": ["Sombrero Palma", "Sombrero Sol", "Sombrero Costa", "Sombrero Playa", "Sombrero Ala Ancha", "Sombrero Tropical"],
  "cat-5": ["Sandalia Duna", "Sandalia Ola", "Sandalia Arena", "Sandalia Mar", "Sandalia Brisa", "Sandalia Verano"],
  "cat-6": ["Bolso Playa", "Pañuelo Mar", "Pulsera Perla", "Collar Arena", "Arete Coral", "Anillo Dorado"],
};

const materials = {
  "cat-1": ["Policarbonato", "Acetato", "Policarbonato", "Acetato", "Policarbonato", "Acetato"],
  "cat-2": ["Lino", "Viscosa", "Algodón", "Seda", "Viscosa", "Lino"],
  "cat-3": ["Poliéster", "Nailon", "Poliéster", "Elastano", "Poliéster", "Nailon"],
  "cat-4": ["Paja", "Algodón", "Rafia", "Paja", "Algodón", "Paja"],
  "cat-5": ["EVA", "Caucho", "EVA", "Caucho", "EVA", "Caucho"],
  "cat-6": ["Yute", "Seda", "Perla", "Plata", "Coral", "Oro"],
};

const sizeSets = [
  ["S", "M", "L"],
  ["XS", "S", "M", "L"],
  ["S", "M", "L", "XL"],
  ["S", "M", "L"],
  ["M", "L", "XL"],
  ["One Size"],
];

function generateProducts(): Product[] {
  const products: Product[] = [];
  let productId = 1;

  mockCategories.forEach((category, catIndex) => {
    const catNames = productNames[category.id as keyof typeof productNames];
    const catMaterials = materials[category.id as keyof typeof materials];

    for (let i = 0; i < 6; i++) {
      products.push({
        id: `prod-${productId}`,
        category_id: category.id,
        name: catNames[i],
        slug: catNames[i].toLowerCase().replace(/\s+/g, "-"),
        material: catMaterials[i],
        short_description: `Descripción breve del producto ${catNames[i]}.`,
        description: `Diseño exclusivo de ${category.name}. ${catNames[i]} perfecto para disfrutar del estilo.`,
        price: 39 + i * 5,
        compare_price: 49 + i * 8,
        sizes: sizeSets[i % sizeSets.length],
        image_url: images[(i + catIndex) % images.length],
        storage_path: null,
        gallery: [
          { url: images[(i + catIndex) % images.length] },
          { url: images[(i + catIndex + 1) % images.length] },
        ],
        badge: i % 3 === 0 ? "Nuevo" : i % 3 === 1 ? "Oferta" : null,
        stock_status: i % 4 === 0 ? "low" : "available",
        purchase_url: null,
        whatsapp_message: `Hola, quiero consultar ${catNames[i]}`,
        layout_variant: "auto",
        is_active: true,
        is_featured: i === 0,
        is_deleted: false,
        deleted_at: null,
        display_order: i + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category,
      });
      productId++;
    }
  });

  return products;
}

export const mockProducts: Product[] = generateProducts();

export const mockEditorialPages: CatalogPage[] = [
  {
    id: "page-cover-1",
    page_type: "cover",
    slug: "cover",
    title: "COLECCIÓN DE VERANO",
    subtitle: "Summer Edit 2024",
    body: null,
    background_color: "#1a1a1a",
    text_color: "#ffffff",
    background_image_url: "https://images.unsplash.com/photo-1514272519207-3a751e4fdc51?auto=format&fit=crop&w=1200&q=80",
    background_storage_path: null,
    images: [],
    content: {
      showTitle: true,
      showSubtitle: true,
      showWebsite: true,
      showFeaturedProducts: false,
      websiteLabel: "SOLEA BIKINI",
      featuredProductIds: [],
      coverStyle: "image",
    },
    is_active: true,
    display_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
