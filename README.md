# Catálogo Digital Flipbook (Next.js + Supabase)

Catálogo editorial dinámico tipo flipbook para moda de verano. Las páginas se generan automáticamente desde productos, categorías y páginas editoriales en Supabase. El diseño sigue la composición del catálogo de referencia (A4 vertical, fondos pastel, fichas superpuestas), sin copiar marcas ni imágenes.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Supabase (PostgreSQL, Auth, Storage, RLS)
- react-pageflip
- React Hook Form + Zod
- Lucide React + Sonner
- Vercel-ready

## Arquitectura

```
Datos (Supabase)
  categories / products / catalog_pages / catalog_settings
        │
        ▼
buildFlipbookPages()
  1. Portada
  2. Sobre esta colección
  3. Categorías
  4. Páginas de categoría (N productos por página, auto-paginado)
  5. Contacto / cierre
        │
        ▼
CatalogFlipbook (/catalogo)  ·  ProductGrid (/catalogo/grid)
        ▲
        │ revalidatePath tras mutaciones admin
Admin CRUD (Auth + RLS)
```

Cuando creas, editas, desactivas, reemplazas o eliminas productos/categorías, las Server Actions actualizan Supabase y revalidan `/catalogo` y `/catalogo/grid`. El flipbook no guarda páginas estáticas: las recalcula en cada request.

## Estilo visual (referencia)

- Formato vertical A4 (`aspect-a4`)
- Marco pastel exterior + hoja blanca interior
- Tipografía condensada (`Barlow Condensed`) + script (`Cormorant Garamond`)
- Color de texto `#405352`
- Ficha blanca con borde fino superpuesta ~12% sobre la imagen
- Esquinas redondeadas marcadas en el lado exterior de la imagen
- 3 productos por página (configurable en `catalog_settings.products_per_page`)

## 1. Crear proyecto Supabase

1. Entra a [https://supabase.com](https://supabase.com) y crea un proyecto.
2. Copia **Project URL** y **anon public key**.
3. Copia también la **service_role** key (solo servidor).

## 2. Variables de entorno

```bash
cp .env.example .env.local
```

Completa:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` nunca debe exponerse al cliente.

## 3. Migraciones SQL

En **SQL Editor** de Supabase:

1. Ejecuta `supabase/migrations/001_initial_schema.sql`
2. Ejecuta `supabase/seed.sql`

La migración crea:

- Tablas: `categories`, `products`, `catalog_pages`, `catalog_settings`, `admin_profiles`
- Trigger `set_updated_at`
- Función `is_admin()`
- RLS (lectura pública de activos; escritura solo admin)
- Bucket `catalog-images` + policies de Storage

## 4. Bucket de imágenes

La migración ya crea el bucket público `catalog-images` con MIME permitidos:

- `image/jpeg`, `image/jpg`, `image/png`, `image/webp`
- Máximo 5MB

Estructura recomendada:

```
catalog-images/
  products/
  categories/
  pages/
  covers/
  logos/
  uploads/
```

Si el bucket no aparece, créalo manualmente en Storage con las mismas reglas.

## 5. Crear el primer administrador

1. En Supabase → **Authentication** → **Users** → **Add user** (email + password).
2. Copia el `user UUID`.
3. Ejecuta en SQL Editor:

```sql
insert into public.admin_profiles (id, full_name, role)
values ('UUID-DEL-USUARIO', 'Administrador', 'admin');
```

Sin fila en `admin_profiles`, el middleware redirige a `/login?error=unauthorized`.

## 6. Ejecutar localmente

```bash
npm install
npm run dev
```

Abre:

- Landing: [http://localhost:3000](http://localhost:3000)
- Flipbook: [http://localhost:3000/catalogo](http://localhost:3000/catalogo)
- Grid: [http://localhost:3000/catalogo/grid](http://localhost:3000/catalogo/grid)
- Admin: [http://localhost:3000/login](http://localhost:3000/login)

## 7. Desplegar en Vercel

1. Sube el repo a GitHub.
2. Importa el proyecto en Vercel.
3. Configura las mismas variables de entorno.
4. `NEXT_PUBLIC_SITE_URL` = dominio de producción.
5. Deploy.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing minimalista |
| `/catalogo` | Flipbook dinámico |
| `/catalogo/grid` | Galería con filtros |
| `/login` | Auth admin |
| `/admin` | Dashboard |
| `/admin/productos` | CRUD productos |
| `/admin/productos/nuevo` | Alta |
| `/admin/productos/[id]/editar` | Edición |
| `/admin/categorias` | CRUD categorías |
| `/admin/paginas` | Portada / about / categorías / contacto |
| `/admin/configuracion` | Branding y paginación |
| `/admin/imagenes` | Gestión Storage |

## CRUD y regeneración del flipbook

- **Crear producto** → se ordena por `display_order` dentro de su categoría → `buildFlipbookPages` lo incluye en la página correspondiente (o crea una página nueva si supera `products_per_page`).
- **Editar / reemplazar** → mismos IDs o flujo duplicar+desactivar; revalidación inmediata.
- **Desactivar** → desaparece del público, permanece en admin.
- **Eliminar** → papelera (`is_deleted`) o hard delete + limpieza Storage.
- **Categoría vacía** → no genera páginas salvo `show_empty_categories = true`.

## Precios y tallas

- Precio numérico en DB.
- UI con `Intl.NumberFormat('es-CO', { currency: 'COP' })`.
- Tallas como `text[]`, render: `Tallas disponibles: S - M - L - XL`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```

## Notas de diseño

No se usan páginas como imagen completa ni PDF embebido. Cada página es un componente React alimentado por datos. Las imágenes de producto se suben a Storage y se referencian por URL.
