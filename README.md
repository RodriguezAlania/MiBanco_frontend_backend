# MiBanco - Sistema Bancario

Aplicación web bancaria desarrollada con React (Frontend) y Node.js + Supabase (Backend).

## Tecnologías utilizadas

- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Base de datos:** Supabase (PostgreSQL)

## Estructura del proyecto
mibanco_backend/
├── mibanco-backend/     # API REST con Node.js
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── middlewares/
│       └── supabase.js
└── mibanco-fixed/       # Frontend con React

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Gestión de cuentas bancarias
- Autenticación con JWT

## Instalación

### Backend
```bash
cd mibanco-backend
npm install
node src/app.js
```

### Frontend
```bash
cd mibanco-fixed
npm install
npm start
```

## Autor

RodriguezAlania
