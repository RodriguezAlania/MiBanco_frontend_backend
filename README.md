# 🏦 MiBanco — Home Banking Full Stack

> Aplicación web de banca por internet desarrollada con React + Node.js + Supabase

![MiBanco](https://img.shields.io/badge/MiBanco-Home%20Banking-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-black?style=for-the-badge&logo=supabase)

---

## 📋 Descripción del Proyecto

**MiBanco** es un portal web de Home Banking desarrollado como proyecto del curso de Desarrollo de Aplicaciones Web. Permite a los usuarios acceder a sus cuentas bancarias de forma segura, visualizar saldos, movimientos y gestionar sus productos financieros.

El sistema está compuesto por:
- **Frontend**: Aplicación React con Vite
- **Backend**: API REST con Node.js y Express
- **Base de datos**: Supabase (PostgreSQL)

---

## 🎯 Flujo de la Aplicación

```
[1] Página Home (index)
        |
        ▼
[2] Banca por Internet (pantalla segura)
        |
        ▼
[3] Formulario de Login
        |
   ┌────┴────┐
   ▼         ▼
[4a] Error   [4b] Éxito
(permanece   (redirige al
en login)    dashboard)
                 |
                 ▼
          [5] Dashboard
```

---

## 🗂️ Estructura del Proyecto

```
MiBanco_frontend_backend/
│
├── mibanco-react/              # Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx   # Ruta protegida con JWT
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Página principal pública
│   │   │   ├── BancaInternet.jsx    # Pantalla previa al login
│   │   │   ├── Login.jsx            # Formulario de autenticación
│   │   │   └── Dashboard.jsx        # Panel del usuario autenticado
│   │   ├── services/
│   │   │   └── authService.js       # Servicios de autenticación
│   │   ├── styles/
│   │   │   └── styles.css           # Estilos globales
│   │   ├── App.jsx                  # Enrutador principal
│   │   └── main.jsx                 # Punto de entrada
│   └── package.json
│
└── mibanco-backend/            # Backend
    ├── src/
    │   ├── controllers/
    │   │   ├── authController.js    # Lógica de autenticación
    │   │   └── cuentasController.js # Lógica de cuentas
    │   ├── middlewares/
    │   │   └── auth.js              # Verificación de token JWT
    │   ├── routes/
    │   │   ├── authRoutes.js        # Rutas de autenticación
    │   │   └── cuentasRoutes.js     # Rutas de cuentas
    │   ├── supabase.js              # Configuración de Supabase
    │   └── app.js                   # Servidor Express
    └── package.json
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| React | 18 | Framework de UI |
| Vite | 8 | Bundler y dev server |
| React Router DOM | 6 | Enrutamiento SPA |
| Axios | 1.x | Peticiones HTTP |
| CSS Variables | — | Diseño y estilos |

### Backend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Node.js | 18+ | Entorno de ejecución |
| Express | 4.x | Framework web |
| JSON Web Token | 9.x | Autenticación stateless |
| bcryptjs | 2.x | Hash de contraseñas |
| Supabase JS | 2.x | Cliente de base de datos |
| CORS | 2.x | Control de acceso |
| dotenv | 16.x | Variables de entorno |
| nodemon | 3.x | Recarga automática (dev) |

### Base de datos
| Servicio | Tecnología |
|---------|-----------|
| Supabase | PostgreSQL |

---

## 🗄️ Estructura de la Base de Datos

### Tabla `usuarios_usuario`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | int8 | Clave primaria |
| username | varchar | Nombre de usuario (único) |
| email | varchar | Correo electrónico |
| password | varchar | Hash pbkdf2_sha256 |
| first_name | varchar | Nombre |
| last_name | varchar | Apellido |
| dni | varchar | DNI (único) |
| telefono | varchar | Teléfono |
| is_active | bool | Estado del usuario |
| cliente_desde | date | Fecha de registro |

### Tabla `cuentas`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | uuid | Clave primaria |
| user_id | uuid | Referencia al usuario |
| tipo | varchar | Tipo de cuenta |
| numero_cuenta | varchar | Número de cuenta |
| saldo | numeric | Saldo disponible |
| moneda | varchar | Moneda (PEN, USD) |

---

## 🔐 Autenticación

El sistema usa **JWT (JSON Web Tokens)** para la autenticación:

1. El usuario envía credenciales al endpoint `/api/auth/login`
2. El backend verifica el password con el algoritmo **pbkdf2_sha256**
3. Si es correcto, genera un token JWT firmado con `JWT_SECRET`
4. El frontend guarda el token en `localStorage`
5. Cada petición protegida envía el token en el header `Authorization: Bearer <token>`
6. El middleware `verificarToken` valida el token en cada ruta privada

---

## 🚀 Instalación y Ejecución

### Requisitos previos
- Node.js 18+
- Cuenta en Supabase
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/RodriguezAlania/MiBanco_frontend_backend.git
cd MiBanco_frontend_backend
```

### 2. Configurar el Backend
```bash
cd mibanco-backend
npm install
```

Crear el archivo `.env`:
```env
PORT=3000
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_anon_key
JWT_SECRET=tu_secreto_jwt
```

Iniciar el servidor:
```bash
npm run dev
```
> El backend estará disponible en `http://localhost:3000`

### 3. Configurar el Frontend
```bash
cd mibanco-react
npm install
npm run dev
```
> El frontend estará disponible en `http://localhost:5173`

---

## 📡 Endpoints de la API

### Autenticación
| Método | Endpoint | Descripción | Auth |
|--------|---------|-------------|------|
| POST | `/api/auth/login` | Iniciar sesión | ❌ |
| POST | `/api/auth/registro` | Registrar usuario | ❌ |
| GET | `/api/auth/perfil` | Obtener perfil | ✅ |

### Cuentas
| Método | Endpoint | Descripción | Auth |
|--------|---------|-------------|------|
| GET | `/api/cuentas/mias` | Obtener cuentas del usuario | ✅ |

### Ejemplo de Login
```json
POST /api/auth/login
{
  "username": "juanperez",
  "password": "admin123"
}

Respuesta:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 3,
    "username": "juanperez",
    "email": "juan@mibanco.com",
    "first_name": "Juan",
    "last_name": "Perez",
    "dni": "12345678"
  }
}
```

---

## 📱 Páginas de la Aplicación

### 🏠 Home (`/`)
Página pública con branding de MiBanco. Incluye:
- Navbar con logo y botón "Banca por Internet"
- Hero section con estadísticas
- Sección de productos financieros
- Banner de acceso seguro
- Footer con información legal

### 🔐 Banca por Internet (`/banca`)
Pantalla intermedia de zona segura antes del login. Muestra:
- Logo de MiBanco
- Indicador de zona segura (SSL 256 bits)
- Botón para continuar al login

### 🔑 Login (`/login`)
Formulario de autenticación con:
- Tabs de Iniciar sesión / Registrarse
- Validación de campos
- Mensajes de error en rojo cuando las credenciales son incorrectas
- Redirección al dashboard cuando son correctas
- Toggle para mostrar/ocultar contraseña

### 📊 Dashboard (`/dashboard`) — Ruta protegida
Panel principal del usuario autenticado con:
- Saludo personalizado con nombre del usuario
- DNI visible en el encabezado
- Saldo total de cuentas desde la base de datos
- Tarjetas de estadísticas (ingresos, gastos, créditos)
- Movimientos recientes
- Módulos de Ahorros, Créditos, Transferencias y Pagos
- Perfil del usuario con datos reales de Supabase




