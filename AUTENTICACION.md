# Sistema de Autenticación - Credenciales de Prueba

## Descripción del Sistema

Se ha implementado un sistema completo de autenticación con las siguientes características:

### ✅ Características Implementadas

#### 1. **Autenticación Simulada**
- Login con validación de credenciales
- Generación de tokens JWT simulados (válidos por 24 horas)
- Simulación de latencia de red (800ms)

#### 2. **Gestión de Estado Global Persistente**
- Contexto de autenticación (`AuthContext`) con React Context API
- Persistencia en `localStorage` para el navegador
- Sincronización con cookies del servidor para protección en Next.js
- Restauración automática de sesión al recargar la página

#### 3. **Protección de Rutas**
- Middleware Next.js que protege automáticamente:
  - `/catalogo` - Catálogo de juegos (requiere autenticación)
  - `/wishlist` - Lista de deseos (requiere autenticación)
  - `/game/[id]` - Detalles de un juego (requiere autenticación)
- Redirección automática a `/login` si accedes sin autenticación
- Redirección a `/catalogo` si intentas acceder a `/login` estando autenticado

#### 4. **Interfaz de Usuario**
- Página de login diseñada con Tailwind CSS
- Credenciales de prueba visibles en la página de login
- Información del usuario en el navbar
- Botón de cerrar sesión en el navbar
- Pantalla de bienvenida en `/` para usuarios no autenticados

---

## Credenciales de Prueba

### Usuario 1 - Admin
```
Email: admin@example.com
Contraseña: admin123
```

### Usuario 2 - Usuario Estándar
```
Email: user@example.com
Contraseña: user123
```

### Usuario 3 - Cuenta Demo
```
Email: demo@test.com
Contraseña: demo123
```

---

## Flujo de Uso

### 1. **Primera Vez (Sin Autenticación)**
1. Accedes a `/` (home)
2. Ves un botón "Iniciar Sesión"
3. Haces clic en él, te redirige a `/login`
4. Ingresas credenciales válidas
5. Se crea un token y se almacena en estado global y localStorage
6. Eres redirigido a `/catalogo`

### 2. **Navegación Autenticado**
- Puedes ver el catálogo en `/catalogo`
- Puedes ver detalles de juegos en `/game/[id]`
- Puedes acceder a tu wishlist en `/wishlist`
- Tu información se muestra en el navbar
- Tienes un botón "SALIR" para cerrar sesión

### 3. **Persistencia de Sesión**
1. Inicia sesión
2. Cierra el navegador o recarga la página
3. La sesión se restaura automáticamente (valida el token)
4. Permaneces autenticado

### 4. **Cerrar Sesión**
1. Haz clic en el botón "SALIR" en el navbar
2. Se borra la sesión (state, localStorage, cookies)
3. Eres redirigido a `/login`
