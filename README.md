# Préstamos Lab — 0902-23-11039

Aplicación web desarrollada en React con TypeScript y Vite para el control y gestión de préstamos de equipos de red (Switch, Cable de red, Access Point) en el laboratorio de cómputo.

---

## Requisitos Previos
- Node.js instalado en el sistema.
- Gestor de paquetes npm.

---

## Pasos para Instalar y Ejecutar el Proyecto

### 1. Clonar el repositorio
\`\`\`bash
git clone https://github.com/luisenriquecab/prestamos-lab.git
cd prestamos-lab
\`\`\`

### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Levantar la API REST (json-server)
En una terminal, ejecuta el servidor local en el puerto 3039 utilizando el archivo de base de datos:
\`\`\`bash
npx json-server --watch db.json --port 3039
\`\`\`

### 4. Ejecutar el Frontend
En otra terminal, arranca el servidor de desarrollo de Vite:
\`\`\`bash
npm run dev
\`\`\`
Abre tu navegador web en la dirección: `http://localhost:5173`.