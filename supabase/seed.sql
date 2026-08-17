-- =============================================================================
-- Seed de ejemplo (contenido genérico, NO copia del catálogo de referencia)
-- =============================================================================

insert into public.catalog_settings (
  brand_name,
  collection_name,
  subtitle,
  website,
  instagram,
  phone,
  whatsapp,
  primary_color,
  secondary_color,
  default_background_color,
  products_per_page,
  catalog_width,
  catalog_height,
  show_empty_categories
)
select
  'Marca Verano',
  'Colección Primavera',
  'Looks frescos para días de sol',
  'https://ejemplo.com',
  '@marcaverano',
  '+573001112233',
  '573001112233',
  '#405352',
  '#FFFFFF',
  '#E8FF88',
  3,
  768,
  1080,
  false
where not exists (select 1 from public.catalog_settings);

insert into public.catalog_pages (
  page_type, slug, title, subtitle, body, background_color, text_color, images, content, is_active, display_order
)
values
(
  'cover',
  'portada',
  'CATÁLOGO DE PRODUCTOS',
  'Colección de Primavera',
  null,
  '#E8FF88',
  '#405352',
  '[]'::jsonb,
  '{
    "showSubtitle": true,
    "showTitle": true,
    "showFeaturedProducts": true,
    "showWebsite": true,
    "websiteLabel": "WWW.EJEMPLO.COM",
    "featuredProductIds": []
  }'::jsonb,
  true,
  0
),
(
  'about',
  'sobre-coleccion',
  'SOBRE ESTA COLECCIÓN',
  null,
  'Descubre nuestra nueva colección de verano, diseñada para acompañarte en cada momento especial bajo el sol y ayudarte a expresar tu estilo con frescura, comodidad y mucha personalidad.

En nuestra tienda encontrarás una selección de gafas, bikinis, sombreros, sandalias y accesorios ideales para complementar tus looks durante los días de playa, las tardes junto a la piscina, las vacaciones o cualquier escapada tropical.

Elige tus prendas y accesorios favoritos y crea combinaciones únicas que reflejen tu personalidad. Cada pieza está pensada para ofrecerte comodidad, calidad y un estilo fresco que te acompañe en todos tus planes de verano.',
  '#FFF9C9',
  '#405352',
  '[]'::jsonb,
  '{}'::jsonb,
  true,
  1
),
(
  'categories',
  'categorias',
  'CATEGORÍAS',
  null,
  'Explora nuestras categorías y encuentra el look perfecto para esta temporada.',
  '#E8FF88',
  '#405352',
  '[]'::jsonb,
  '{
    "featuredCategorySlug": "bikinis",
    "showNav": true,
    "ctaLabel": "Ver en catálogo"
  }'::jsonb,
  true,
  2
),
(
  'contact',
  'contacto',
  'CONTÁCTANOS',
  'Estamos listos para ayudarte',
  'Escríbenos por WhatsApp para consultar disponibilidad, tallas y envíos.',
  '#FFD6E8',
  '#405352',
  '[]'::jsonb,
  '{
    "ctaLabel": "Escribir por WhatsApp",
    "showInstagram": true,
    "showWebsite": true
  }'::jsonb,
  true,
  90
),
(
  'closing',
  'cierre',
  'GRACIAS',
  'Por visitar nuestro catálogo',
  'Síguenos en redes y descubre novedades de la colección.',
  '#D6F0FF',
  '#405352',
  '[]'::jsonb,
  '{}'::jsonb,
  true,
  99
)
on conflict (slug) do nothing;

insert into public.categories (
  name, slug, description, background_color, text_color, layout_variant, is_active, display_order
)
values
  ('Bikinis', 'bikinis', 'Diseños frescos para playa y piscina.', '#E8FF88', '#405352', 'image-left', true, 1),
  ('Sombreros', 'sombreros', 'Protección y estilo bajo el sol.', '#FFF9C9', '#405352', 'image-left', true, 2),
  ('Gafas', 'gafas', 'Lentes con actitud veraniega.', '#D6F0FF', '#405352', 'image-left', true, 3),
  ('Sandalias', 'sandalias', 'Comodidad para caminar al aire libre.', '#FFD6E8', '#405352', 'image-left', true, 4),
  ('Salidas de baño', 'salidas-de-bano', 'Piezas ligeras para cubrir y complementar.', '#E8FF88', '#405352', 'image-left', true, 5),
  ('Accesorios', 'accesorios', 'Detalles que completan tu look.', '#FFF9C9', '#405352', 'image-left', true, 6)
on conflict (slug) do nothing;

-- Productos de ejemplo (placeholders sin imágenes reales de la referencia)
insert into public.products (
  category_id, name, slug, material, short_description, price, sizes, badge, stock_status,
  layout_variant, is_active, is_featured, display_order, whatsapp_message
)
select c.id, p.name, p.slug, p.material, p.short_description, p.price, p.sizes, p.badge, p.stock_status,
       p.layout_variant, true, p.is_featured, p.display_order, p.whatsapp_message
from public.categories c
join (
  values
    ('bikinis', 'Bikini Arena', 'bikini-arena', 'Poliéster', 'Corte clásico con ajuste cómodo.', 129900::numeric, array['S','M','L','XL'], 'Nuevo', 'available', 'image-left', true, 1, 'Hola, quiero consultar el Bikini Arena'),
    ('bikinis', 'Bikini Coral', 'bikini-coral', 'Nailon', 'Diseño de dos piezas con lazo lateral.', 139900::numeric, array['S','M','L'], null, 'available', 'image-right', true, 2, 'Hola, quiero consultar el Bikini Coral'),
    ('bikinis', 'Bikini Brisa', 'bikini-brisa', 'Poliéster', 'Estampado suave para días soleados.', 119900::numeric, array['XS','S','M','L'], 'Oferta', 'available', 'auto', false, 3, 'Hola, quiero consultar el Bikini Brisa'),
    ('bikinis', 'Bikini Marea', 'bikini-marea', 'Elastano', 'Silueta alta y soporte medio.', 149900::numeric, array['S','M','L','XL'], null, 'low', 'image-left', false, 4, 'Hola, quiero consultar el Bikini Marea'),
    ('sombreros', 'Sombrero Palma', 'sombrero-palma', 'Paja', 'Ala media con cinta decorativa.', 89900::numeric, array['Única'], 'Nuevo', 'available', 'image-left', true, 1, 'Hola, quiero consultar el Sombrero Palma'),
    ('sombreros', 'Sombrero Sol', 'sombrero-sol', 'Algodón', 'Protección ligera y plegable.', 79900::numeric, array['Única'], null, 'available', 'image-right', false, 2, 'Hola, quiero consultar el Sombrero Sol'),
    ('sombreros', 'Sombrero Costa', 'sombrero-costa', 'Rafia', 'Acabado natural para look playero.', 94900::numeric, array['Única'], null, 'available', 'auto', false, 3, 'Hola, quiero consultar el Sombrero Costa'),
    ('gafas', 'Gafas Horizon', 'gafas-horizon', 'Acetato', 'Montura rectangular con filtro UV.', 109900::numeric, array['Única'], 'Nuevo', 'available', 'image-left', true, 1, 'Hola, quiero consultar las Gafas Horizon'),
    ('gafas', 'Gafas Nube', 'gafas-nube', 'Policarbonato', 'Lentes degradados y puente cómodo.', 99900::numeric, array['Única'], null, 'available', 'image-right', false, 2, 'Hola, quiero consultar las Gafas Nube'),
    ('gafas', 'Gafas Tropic', 'gafas-tropic', 'Acetato', 'Estilo oversized para pleno sol.', 119900::numeric, array['Única'], 'Últimas unidades', 'low', 'auto', false, 3, 'Hola, quiero consultar las Gafas Tropic'),
    ('sandalias', 'Sandalia Duna', 'sandalia-duna', 'EVA', 'Plantilla acolchada y correa ajustable.', 89900::numeric, array['36','37','38','39','40'], null, 'available', 'image-left', false, 1, 'Hola, quiero consultar la Sandalia Duna'),
    ('sandalias', 'Sandalia Ola', 'sandalia-ola', 'Caucho', 'Suela antideslizante para piscina.', 84900::numeric, array['36','37','38','39'], 'Oferta', 'available', 'image-right', false, 2, 'Hola, quiero consultar la Sandalia Ola'),
    ('salidas-de-bano', 'Salida Linen', 'salida-linen', 'Lino', 'Cubrimiento ligero con cinturón.', 159900::numeric, array['S','M','L'], 'Nuevo', 'available', 'image-left', true, 1, 'Hola, quiero consultar la Salida Linen'),
    ('salidas-de-bano', 'Salida Gasa', 'salida-gasa', 'Viscosa', 'Textura fluida y transparentes suaves.', 149900::numeric, array['S','M','L','XL'], null, 'available', 'auto', false, 2, 'Hola, quiero consultar la Salida Gasa'),
    ('accesorios', 'Bolso Playa', 'bolso-playa', 'Yute', 'Capacidad media con asas largas.', 79900::numeric, array['Única'], null, 'available', 'image-left', false, 1, 'Hola, quiero consultar el Bolso Playa'),
    ('accesorios', 'Pañuelo Mar', 'panuelo-mar', 'Seda', 'Estampado versátil para cuello o bolso.', 59900::numeric, array['Única'], 'Nuevo', 'available', 'image-right', false, 2, 'Hola, quiero consultar el Pañuelo Mar')
) as p(category_slug, name, slug, material, short_description, price, sizes, badge, stock_status, layout_variant, is_featured, display_order, whatsapp_message)
  on c.slug = p.category_slug
where not exists (select 1 from public.products where slug = p.slug);
