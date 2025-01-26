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
