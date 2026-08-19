import type { CatalogSettings, Category, Product, CatalogPage } from "@/types/database";

const resolveGafasAsset = (fileName: string) => new URL(`../../img/Gafas/${fileName}`, import.meta.url).href;

const gafasImageMap: Record<number, string> = {
  1: resolveGafasAsset("gafas 1.jpeg"),
  2: resolveGafasAsset("gafas 2.jpeg"),
  3: resolveGafasAsset("gafas 3.jpeg"),
  4: resolveGafasAsset("gafas 4.jpeg"),
  5: resolveGafasAsset("gafas 5.jpeg"),
  6: resolveGafasAsset("gafas 6.jpeg"),
  7: resolveGafasAsset("gafas 7.jpeg"),
  8: resolveGafasAsset("gafas 8.jpeg"),
  9: resolveGafasAsset("gafas 9.jpeg"),
  10: resolveGafasAsset("gafas 10.jpeg"),
  11: resolveGafasAsset("gafas 11.jpeg"),
  12: resolveGafasAsset("gafas 12.jpeg"),
  13: resolveGafasAsset("gafas 13.jpeg"),
  14: resolveGafasAsset("gafas 14.jpeg"),
  15: resolveGafasAsset("gafas 15.jpeg"),
  16: resolveGafasAsset("gafas 16.jpeg"),
  17: resolveGafasAsset("gafas 17.jpeg"),
  18: resolveGafasAsset("gafas 18.jpeg"),
  19: resolveGafasAsset("gafas 19.jpeg"),
  20: resolveGafasAsset("gafas 20.jpeg"),
  21: resolveGafasAsset("gafas 21.jpeg"),
  22: resolveGafasAsset("gafas 22.jpeg"),
  23: resolveGafasAsset("gafas 23.jpeg"),
  24: resolveGafasAsset("gafas 24.jpeg"),
  25: resolveGafasAsset("gafas 25.jpeg"),
  26: resolveGafasAsset("gafas 26.jpeg"),
  27: resolveGafasAsset("gafas 27.jpeg"),
  28: resolveGafasAsset("gafas 28.jpeg"),
  29: resolveGafasAsset("gafas 29.jpeg"),
  30: resolveGafasAsset("gafas 30.jpeg"),
  31: resolveGafasAsset("gafas 30.jpeg"),
  32: resolveGafasAsset("gafas 32.jpeg"),
  33: resolveGafasAsset("gafas 33.jpeg"),
  34: resolveGafasAsset("gafas 34.jpeg"),
  35: resolveGafasAsset("gafas 35.jpeg"),
  36: resolveGafasAsset("gafas 36.jpeg"),
  37: resolveGafasAsset("gafas 37.jpeg"),
  38: resolveGafasAsset("gafas 38.jpeg"),
  39: resolveGafasAsset("gafas 38.jpeg"),
  40: resolveGafasAsset("gafas 40.jpeg"),
  41: resolveGafasAsset("gafas 41.jpeg"),
  42: resolveGafasAsset("gafas 42.jpeg"),
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
  { name: "Gafas Demo 27", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[27] },
  { name: "Gafas Demo 28", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[28] },
  { name: "Gafas Demo 29", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[29] },
  { name: "Gafas Demo 30", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[30] },
  { name: "Gafas Demo 31", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[31] },
  { name: "Gafas Demo 32", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[32] },
  { name: "Gafas Demo 33", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[33] },
  { name: "Gafas Demo 34", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[34] },
  { name: "Gafas Demo 35", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[35] },
  { name: "Gafas Demo 36", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[36] },
  { name: "Gafas Demo 37", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[37] },
  { name: "Gafas Demo 38", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[38] },
  { name: "Gafas Demo 39", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[39] },
  { name: "Gafas Demo 40", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[40] },
  { name: "Gafas Demo 41", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[41] },
  { name: "Gafas Demo 42", material: "Material demo", price: 95000, sizes: [], description: "Referencia demo", image_url: gafasImageMap[42] },
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
