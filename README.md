# Mobile Shop

Miniaplicación SPA para comprar dispositivos móviles (React + Vite). Consume la
API de productos, cachea las respuestas en cliente y permite añadir artículos al
carrito. Ver la prueba en [ENUNCIADO.md](./ENUNCIADO.md).

## Requisitos

- Node.js 20+ y npm.

## Instalación

```bash
npm install
```

## Scripts

| Comando         | Descripción                          |
| --------------- | ------------------------------------ |
| `npm start`     | Servidor de desarrollo (Vite).       |
| `npm run build` | Compilación de producción a `dist/`. |
| `npm test`      | Tests con Vitest.                    |
| `npm run lint`  | Análisis estático con ESLint.        |

## Funcionalidades

- **Listado (PLP):** todos los productos de la API en un grid adaptativo (máximo
  4 por fila) con estados de carga, error y vacío.
- **Búsqueda en tiempo real:** filtra por marca y modelo a cada pulsación.
- **Detalle (PDP):** dos columnas (imagen / descripción), con marca, modelo,
  precio, CPU, RAM, SO, resolución, batería, cámaras, dimensiones y peso, más un
  enlace de vuelta al listado.
- **Añadir al carrito:** selectores de almacenamiento y color (la primera opción
  queda seleccionada por defecto, también cuando solo hay una).
- **Contador del carrito:** visible en la cabecera en cualquier vista y
  persistido entre recargas.
- **Breadcrumbs:** reflejan el producto actual con enlace de navegación.
- **Cache de 1 hora:** las respuestas de la API se guardan en `localStorage`; se
  revalidan al expirar.

## Decisiones técnicas

- **React + Vite:** SPA con `start`/`build`/`test`/`lint` de serie.
- **React Router:** enrutado en cliente (`/` y `/product/:id`), sin SSR/MPA.
- **`fetch` nativo:** bastan tres endpoints, no se añade cliente HTTP.
- **Context para el carrito:** un único valor global (`count`), sin Redux.
- **Cache en `localStorage` con TTL:** persiste entre recargas y cumple la
  expiración de 1 hora.
- **CSS Modules:** estilos por componente, sin librería de UI.
- **Vitest + Testing Library:** integrados con Vite.

## Notas

- La API de añadir al carrito es _stateless_ y responde siempre `{ count: 1 }`,
  por lo que el total del carrito se acumula en cliente a partir de ese valor.
- La API tiene erratas en algunas claves (`dimentions`, `secondaryCmera`); se
  mapean tal cual en la descripción del producto.
- Node 25 expone un `localStorage` global inerte que tapa el de jsdom; en el
  entorno de test se sustituye por uno en memoria (`src/test/setup.js`). El
  navegador usa el `localStorage` real.

## Tests

- Cache: devuelve valor fresco y revalida tras expirar.
- Enrutado y layout: la cabecera se muestra en ambas vistas.
- PLP: el filtro reduce la lista según el texto.
- PDP: opción única preseleccionada y el contador acumula en cada añadido.
