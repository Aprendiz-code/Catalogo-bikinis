import type { CatalogSettings, Category, Product, CatalogPage } from "@/types/database";

import gafas1 from "../../img/Gafas/gafas 1.jpeg";
import gafas2 from "../../img/Gafas/gafas 2.jpeg";
import gafas3 from "../../img/Gafas/gafas 3.jpeg";
import gafas4 from "../../img/Gafas/gafas 4.jpeg";
import gafas5 from "../../img/Gafas/gafas 5.jpeg";
import gafas6 from "../../img/Gafas/gafas 6.jpeg";
import gafas7 from "../../img/Gafas/gafas 7.jpeg";
import gafas8 from "../../img/Gafas/gafas 8.jpeg";
import gafas9 from "../../img/Gafas/gafas 9.jpeg";
import gafas10 from "../../img/Gafas/gafas 10.jpeg";
import gafas11 from "../../img/Gafas/gafas 11.jpeg";
import gafas12 from "../../img/Gafas/gafas 12.jpeg";
import gafas13 from "../../img/Gafas/gafas 13.jpeg";
import gafas14 from "../../img/Gafas/gafas 14.jpeg";
import gafas15 from "../../img/Gafas/gafas 15.jpeg";
import gafas16 from "../../img/Gafas/gafas 16.jpeg";
import gafas17 from "../../img/Gafas/gafas 17.jpeg";
import gafas18 from "../../img/Gafas/gafas 18.jpeg";
import gafas19 from "../../img/Gafas/gafas 19.jpeg";
import gafas20 from "../../img/Gafas/gafas 20.jpeg";
import gafas21 from "../../img/Gafas/gafas 21.jpeg";
import gafas22 from "../../img/Gafas/gafas 22.jpeg";
import gafas23 from "../../img/Gafas/gafas 23.jpeg";
import gafas24 from "../../img/Gafas/gafas 24.jpeg";
import gafas25 from "../../img/Gafas/gafas 25.jpeg";
import gafas26 from "../../img/Gafas/gafas 26.jpeg";
import gafas27 from "../../img/Gafas/gafas 27.jpeg";
import gafas28 from "../../img/Gafas/gafas 28.jpeg";
import gafas29 from "../../img/Gafas/gafas 29.jpeg";
import gafas30 from "../../img/Gafas/gafas 30.jpeg";
import gafas32 from "../../img/Gafas/gafas 32.jpeg";
import gafas33 from "../../img/Gafas/gafas 33.jpeg";
import gafas34 from "../../img/Gafas/gafas 34.jpeg";
import gafas35 from "../../img/Gafas/gafas 35.jpeg";
import gafas36 from "../../img/Gafas/gafas 36.jpeg";
import gafas37 from "../../img/Gafas/gafas 37.jpeg";
import gafas38 from "../../img/Gafas/gafas 38.jpeg";
import gafas40 from "../../img/Gafas/gafas 40.jpeg";
import gafas41 from "../../img/Gafas/gafas 41.jpeg";
import gafas42 from "../../img/Gafas/gafas 42.jpeg";

const gafasImageMap: Record<number, string> = {
  1: gafas1.src,
  2: gafas2.src,
  3: gafas3.src,
  4: gafas4.src,
  5: gafas5.src,
  6: gafas6.src,
  7: gafas7.src,
  8: gafas8.src,
  9: gafas9.src,
  10: gafas10.src,
  11: gafas11.src,
  12: gafas12.src,
  13: gafas13.src,
  14: gafas14.src,
  15: gafas15.src,
  16: gafas16.src,
  17: gafas17.src,
  18: gafas18.src,
  19: gafas19.src,
  20: gafas20.src,
  21: gafas21.src,
  22: gafas22.src,
  23: gafas23.src,
  24: gafas24.src,
  25: gafas25.src,
  26: gafas26.src,
  27: gafas27.src,
  28: gafas28.src,
  29: gafas29.src,
  30: gafas30.src,
  31: gafas30.src,
  32: gafas32.src,
  33: gafas33.src,
  34: gafas34.src,
  35: gafas35.src,
  36: gafas36.src,
  37: gafas37.src,
  38: gafas38.src,
  39: gafas38.src,
  40: gafas40.src,
  41: gafas41.src,
  42: gafas42.src,
};

if (typeof console !== "undefined") {
  [31, 39].forEach((missingIndex) => {
    console.warn(
      `[Gafas] No se encontró la imagen esperada: gafas ${missingIndex}.jpeg. Se reutiliza el archivo más cercano disponible para mantener la secuencia de 42 tarjetas.`
    );
  });
}

export function isMockDataEnabled() {
  const value = process.env.NEXT_PUBLIC_USE_MOCK_DATA;
  return value === undefined || value === "" ? true : value === "true";
}

export const mockCatalogSettings: CatalogSettings = {
  id: "demo-settings",
  brand_name: "SR GLOW BEACH WEAR",
  collection_name: "Summer Edit",
  subtitle: "Bikinis, sets y looks de playa",
  logo_url: null,
  logo_storage_path: null,
  cover_image_url: null,
  website: "https://example.com",
  instagram: "@srglow_",
  phone: "+57 317 4291254",
  whatsapp: "+573174291254",
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
    products_per_page: 2,
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

const gafasCatalog = [
  { name: "Gafas Aurora", material: "Material demo", price: 95000, sizes: [], description: "Cartier Transition", image_url: gafasImageMap[1] },
  { name: "Gafas Eclipse", material: "Material demo", price: 95000, sizes: [], description: "Cartier Transition", image_url: gafasImageMap[2] },
  { name: "Gafas Riviera", material: "Material demo", price: 95000, sizes: [], description: "Cartier Transition", image_url: gafasImageMap[3] },
  { name: "Gafas Coral", material: "Material demo", price: 95000, sizes: [], description: "Cartier Transition", image_url: gafasImageMap[4] },
  { name: "Gafas Brisa", material: "Material demo", price: 95000, sizes: [], description: "Cartier Transition", image_url: gafasImageMap[5] },
  { name: "Gafas Sol", material: "Material demo", price: 95000, sizes: [], description: "Cartier Transition", image_url: gafasImageMap[6] },
  { name: "Gafas Marina", material: "Material demo", price: 95000, sizes: [], description: "Cartier Transition", image_url: gafasImageMap[7] },
  { name: "Gafas Nube", material: "Material demo", price: 95000, sizes: [], description: "Cartier Transition", image_url: gafasImageMap[8] },
  { name: "Gafas Horizon", material: "Material demo", price: 95000, sizes: [], description: "Cartier Transition", image_url: gafasImageMap[9] },
  { name: "Gafas Duet", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[10] },
  { name: "Gafas Vela", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[11] },
  { name: "Gafas Cielo", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[12] },
  { name: "Gafas Luma", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[13] },
  { name: "Gafas Delta", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[14] },
  { name: "Gafas Tulum", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[15] },
  { name: "Gafas Marea", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[16] },
  { name: "Gafas Cora", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[17] },
  { name: "Gafas Alba", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[18] },
  { name: "Gafas Beryl", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[19] },
  { name: "Gafas Yara", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[20] },
  { name: "Gafas Costa", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[21] },
  { name: "Gafas Luna", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[22] },
  { name: "Gafas Estela", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[23] },
  { name: "Gafas Duna", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[24] },
  { name: "Gafas Siroco", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[25] },
  { name: "Gafas Faro", material: "Material demo", price: 95000, sizes: [], description: "Transition Miu Miu", image_url: gafasImageMap[26] },
  { name: "Gafas 27 Bvlgari", material: "Bvlgari", price: 95000, sizes: [], description: "Gafas 27 Bvlgari", image_url: gafasImageMap[27] },
  { name: "Gafas 28 Bvlgari", material: "Bvlgari", price: 95000, sizes: [], description: "Gafas 28 Bvlgari", image_url: gafasImageMap[28] },
  { name: "Gafas 29 Fendi", material: "Fendi", price: 95000, sizes: [], description: "Gafas 29 Fendi", image_url: gafasImageMap[29] },
  { name: "Gafas 30 Fendi", material: "Fendi", price: 95000, sizes: [], description: "Gafas 30 Fendi", image_url: gafasImageMap[30] },
  { name: "Gafas Demo 31", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[31] },
  { name: "Gafas 32 Ray Ban", material: "Ray Ban", price: 95000, sizes: [], description: "Gafas 32 Ray Ban", image_url: gafasImageMap[32] },
  { name: "Gafas 33 Ray Ban", material: "Ray Ban", price: 95000, sizes: [], description: "Gafas 33 Ray Ban", image_url: gafasImageMap[33] },
  { name: "Gafas 34 Versace", material: "Versace", price: 95000, sizes: [], description: "Gafas 34 Versace", image_url: gafasImageMap[34] },
  { name: "Gafas 35 Dolce & Gabbana", material: "Dolce & Gabbana", price: 95000, sizes: [], description: "Gafas 35 Dolce & Gabbana", image_url: gafasImageMap[35] },
  { name: "Gafas 36 Prada", material: "Prada", price: 95000, sizes: [], description: "Gafas 36 Prada", image_url: gafasImageMap[36] },
  { name: "Gafas 37 Louis Vuitton", material: "Louis Vuitton", price: 95000, sizes: [], description: "Gafas 37 Louis Vuitton", image_url: gafasImageMap[37] },
  { name: "Gafas 38 Louis Vuitton", material: "Louis Vuitton", price: 95000, sizes: [], description: "Gafas 38 Louis Vuitton", image_url: gafasImageMap[38] },
  { name: "Gafas Demo 39", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[39] },
  { name: "Gafas 40 Louis Vuitton", material: "Louis Vuitton", price: 95000, sizes: [], description: "Gafas 40 Louis Vuitton", image_url: gafasImageMap[40] },
  { name: "Gafas 41 Bvlgari", material: "Bvlgari", price: 95000, sizes: [], description: "Gafas 41 Bvlgari", image_url: gafasImageMap[41] },
  { name: "Gafas 42 Marc Jacobs", material: "Marc Jacobs", price: 95000, sizes: [], description: "Gafas 42 Marc Jacobs", image_url: gafasImageMap[42] },
];

const productNames = {
  "cat-1": gafasCatalog.map((product) => product.name),
  "cat-2": ["Salida Linen", "Salida Gasa", "Salida Algodón", "Salida Seda", "Salida Viscosa", "Salida Lino"],
  "cat-3": ["Bikini Arena", "Bikini Coral", "Bikini Brisa", "Bikini Marea", "Bikini Aurora", "Bikini Stella"],
  "cat-4": ["Sombrero Palma", "Sombrero Sol", "Sombrero Costa", "Sombrero Playa", "Sombrero Ala Ancha", "Sombrero Tropical"],
  "cat-5": ["Sandalia Duna", "Sandalia Ola", "Sandalia Arena", "Sandalia Mar", "Sandalia Brisa", "Sandalia Verano"],
  "cat-6": ["Bolso Playa", "Pañuelo Mar", "Pulsera Perla", "Collar Arena", "Arete Coral", "Anillo Dorado"],
};

const materials = {
  "cat-1": gafasCatalog.map((product) => product.material),
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
    const totalForCategory = category.id === "cat-1" ? gafasCatalog.length : 6;

    for (let i = 0; i < totalForCategory; i++) {
      const productDetails = category.id === "cat-1" ? gafasCatalog[i] : null;
      const productName = category.id === "cat-1" ? productDetails?.name ?? "Gafas Demo" : catNames[i];
      const productMaterial = category.id === "cat-1" ? productDetails?.material ?? "Material demo" : catMaterials[i] ?? "Acetato";
      const productSizes = category.id === "cat-1" ? [] : sizeSets[i % sizeSets.length];
      const productPrice = category.id === "cat-1" ? 95000 : 39 + i * 5;
      const productDescription = category.id === "cat-1" ? productDetails?.description ?? "Referencia demo" : `Diseño exclusivo de ${category.name}. ${productName} perfecto para disfrutar del estilo.`;
      const productImageUrl = category.id === "cat-1" ? productDetails?.image_url ?? gafasImageMap[1] : images[(i + catIndex) % images.length];

      products.push({
        id: `prod-${productId}`,
        category_id: category.id,
        name: productName,
        slug: productName.toLowerCase().replace(/\s+/g, "-"),
        material: productMaterial,
        short_description: productDescription,
        description: productDescription,
        price: productPrice,
        compare_price: 49 + i * 8,
        sizes: productSizes,
        image_url: productImageUrl,
        storage_path: null,
        gallery: [
          { url: productImageUrl },
          { url: category.id === "cat-1" ? gafasImageMap[Math.min(i + 2, 42)] ?? productImageUrl : images[(i + catIndex + 1) % images.length] },
        ],
        badge: i % 3 === 0 ? "Nuevo" : i % 3 === 1 ? "Oferta" : null,
        stock_status: i % 4 === 0 ? "low" : "available",
        purchase_url: null,
        whatsapp_message: `Hola, quiero consultar ${productName}`,
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
    subtitle: "Summer Edit",
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
      websiteLabel: "SR GLOW BEACH WEAR",
      featuredProductIds: [],
      coverStyle: "image",
    },
    is_active: true,
    display_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
