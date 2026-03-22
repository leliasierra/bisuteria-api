# API Bisutería

API REST para la gestión de una bisutería con autenticación JWT y persistencia en JSON.

## Características

- CRUD de productos y ventas
- Validación con Zod
- Autenticación JWT
- Persistencia en archivos JSON
- Documentación completa

## Tecnologías

- Node.js + Express
- Zod (validación)
- JWT (autenticación)
- @kreisler/js-jsondb (persistencia)

## Instalación

```bash
npm install
```

## Ejecutar

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

El servidor estará en: http://localhost:3000

## Endpoints

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Iniciar sesión | No |
| POST | `/api/auth/register` | Registrar usuario | No |

### Productos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | Listar todos | No |
| GET | `/api/products/:id` | Ver uno | No |
| POST | `/api/products` | Crear | Sí |
| PUT | `/api/products/:id` | Actualizar | Sí |
| DELETE | `/api/products/:id` | Eliminar | Sí |

### Ventas

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/sales` | Listar todas | No |
| GET | `/api/sales/:id` | Ver una | No |
| POST | `/api/sales` | Crear | Sí |
| DELETE | `/api/sales/:id` | Eliminar | Sí |

## Ejemplos con curl

### 1. Iniciar sesión

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Respuesta:
```json
{"token":"eyJhbGciOiJIUzI1NiIs...","user":{"id":1,"username":"admin"}}
```

### 2. Crear producto (requiere auth)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{"name":"Collar","material":"Plata","category":"Collares","price":15000,"stock":10,"minStock":5}'
```

### 3. Listar productos (público)

```bash
curl http://localhost:3000/api/products
```

### 4. Actualizar producto

```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{"price":50000}'
```

### 5. Eliminar producto

```bash
curl -X DELETE http://localhost:3000/api/products/1 \
  -H "Authorization: Bearer <tu_token>"
```

## Usuarios Predeterminados

| Usuario | Contraseña |
|---------|------------|
| admin | admin123 |
| vendedor | vendedor123 |

## Esquemas de Datos

### Product
```json
{
  "id": 1,
  "name": "Collar de perlas",
  "material": "Plata 925",
  "category": "Collares",
  "price": 45000,
  "stock": 15,
  "minStock": 5
}
```

### Sale
```json
{
  "id": 1,
  "productId": 1,
  "productName": "Collar de perlas",
  "quantity": 2,
  "unitPrice": 45000,
  "total": 90000,
  "date": "2026-03-15"
}
```

## Códigos de Respuesta

| Código | Descripción |
|--------|-------------|
| 200 | Solicitud exitosa |
| 201 | Recurso creado |
| 204 | Recurso eliminado |
| 400 | Error de validación |
| 401 | Token requerido |
| 403 | Token inválido |
| 404 | Recurso no encontrado |
| 409 | Recurso ya existe |

## Estructura del Proyecto

```
src/
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── saleController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── data.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── saleRoutes.js
├── schemas/
│   ├── productSchema.js
│   ├── saleSchema.js
│   └── userSchema.js
└── index.js
db/
├── products.json
├── sales.json
└── users.json
```

## Licencia

ISC
