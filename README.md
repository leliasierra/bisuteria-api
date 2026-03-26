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

## Ejemplos con Postman

### Paso 1: Importar colección (opcional)
Si tienes el archivo de colección de Postman, impórtalo desde **File > Import**.

### Paso 2: Iniciar sesión

1. Crea una nueva request **POST**
2. URL: `http://localhost:3000/api/auth/login`
3. En **Body > raw > JSON**, ingresa:
   ```json
   {
     "username": "admin",
     "password": "admin123"
   }
   ```
4. Click en **Send**
5. **Copia el token** de la respuesta

### Paso 3: Configurar autenticación

1. Ve a la pestaña **Authorization**
2. Type: **Bearer Token**
3. Token: Pega el token obtenido en el paso anterior
4. Esto aplicará el token a todas las requests de la colección

### Paso 4: Crear producto

1. Nueva request **POST** → `http://localhost:3000/api/products`
2. Body (JSON):
   ```json
   {
     "name": "Collar de Plata",
     "material": "Plata 925",
     "category": "Collares",
     "price": 45000,
     "stock": 10,
     "minStock": 5
   }
   ```
3. Send → Verás el producto creado con su ID

### Paso 5: Listar productos

1. Nueva request **GET** → `http://localhost:3000/api/products`
2. No necesita auth (público)
3. Send → Lista todos los productos

### Paso 6: Ver producto específico

1. Nueva request **GET** → `http://localhost:3000/api/products/1`
2. Send → Devuelve el producto con ID 1

### Paso 7: Actualizar producto

1. Nueva request **PUT** → `http://localhost:3000/api/products/1`
2. Body (solo campos a actualizar):
   ```json
   {
     "price": 50000,
     "stock": 8
   }
   ```
3. Send → Producto actualizado

### Paso 8: Crear venta

1. Nueva request **POST** → `http://localhost:3000/api/sales`
2. Body:
   ```json
   {
     "productId": 1,
     "quantity": 2
   }
   ```
3. Send → Venta registrada (reduce stock automáticamente)

### Paso 9: Listar ventas

1. Nueva request **GET** → `http://localhost:3000/api/sales`
2. Send → Lista todas las ventas

### Paso 10: Eliminar producto

1. Nueva request **DELETE** → `http://localhost:3000/api/products/1`
2. Send → Producto eliminado (204 No Content)

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
