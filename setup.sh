#!/bin/bash

# 1. Create React + TypeScript project with Vite
npm create vite@latest . -- --template react-ts

# 2. Install dependencies
npm install

# Install Tailwind CSS and its dependencies
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/forms @tailwindcss/typography
npx tailwindcss init -p

# Install React Router
npm install react-router-dom

# Install additional utilities
npm install axios @tanstack/react-query zustand @hookform/resolvers yup

# 3. Create folder structure
mkdir -p src/{assets,api,configs,components/{common,bookcase,calendar,map,quest,arena},hooks,lib,services,states,utils,pages,styles,types,auth}

# 4. Create pages
touch src/pages/{Home,About,Bookcase,Calendar,Map,Quest,Arena,Login,Register}.tsx

# 5. Create base files for auth
touch src/auth/{AuthContext,AuthProvider,PrivateRoute}.tsx

# 6. Create configuration files
cat > src/configs/routes.ts << EOL
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Bookcase = lazy(() => import('../pages/Bookcase'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Map = lazy(() => import('../pages/Map'));
const Quest = lazy(() => import('../pages/Quest'));
const Arena = lazy(() => import('../pages/Arena'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

export const routes = [
  { path: '/', element: Home },
  { path: '/about', element: About },
  { path: '/bookcase', element: Bookcase },
  { path: '/calendar', element: Calendar },
  { path: '/map', element: Map },
  { path: '/quest', element: Quest },
  { path: '/arena', element: Arena },
  { path: '/login', element: Login },
  { path: '/register', element: Register },
];
EOL

# 7. Configure Tailwind CSS
cat > tailwind.config.js << EOL
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
EOL

# 8. Update main CSS file
cat > src/styles/index.css << EOL
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
  }
  
  .btn-secondary {
    @apply px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors;
  }
}
EOL

# 9. Create base API configuration
cat > src/api/axios.ts << EOL
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
EOL

# 10. Create environment files
cat > .env << EOL
VITE_API_URL=http://localhost:3000
EOL

cat > .env.example << EOL
VITE_API_URL=http://localhost:3000
EOL

# 11. Update .gitignore
cat >> .gitignore << EOL
.env
.env.local
dist
node_modules
EOL

# 12. Initialize Git repository
git init
git add .
git commit -m "Initial commit: Project setup"

echo "Project setup completed! 🚀"
echo "To start development server, run: npm run dev"
