# Catalogo Digital Flipbook

Catalogo editorial tipo flipbook para moda de verano, construido con Next.js, TypeScript, Tailwind CSS y react-pageflip.

## Datos locales

El proyecto funciona como una demostracion frontend autocontenida. Los productos, categorias y paginas editoriales viven en `src/lib/mock-data.ts`; no requiere base de datos, autenticacion ni variables de entorno.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Rutas disponibles:

- `http://localhost:3000`
- `http://localhost:3000/catalogo`
- `http://localhost:3000/catalogo/grid`

## Compilar y desplegar

```bash
npm run build
npm run start
```

El proyecto puede desplegarse directamente en Vercel sin configurar variables de entorno.

## Estructura principal

- `src/lib/mock-data.ts`: configuracion y contenido de demostracion.
- `src/lib/services/`: servicios locales para leer el catalogo.
- `src/components/catalog/`: flipbook, paginas y tarjetas de producto.
- `src/app/catalogo/`: vistas del catalogo.
