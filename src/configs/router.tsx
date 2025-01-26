import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Bookcase from '../pages/Bookcase';
import Calendar from '../pages/Calendar';
import Map from '../pages/Map';
import Quest from '../pages/Quest';
import Arena from '../pages/Arena';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const router = createBrowserRouter([
 { path: '/', element: <Home /> },
 { path: '/about', element: <About /> },
 { path: '/bookcase', element: <Bookcase /> },
 { path: '/calendar', element: <Calendar /> },
 { path: '/map', element: <Map /> },
 { path: '/quest', element: <Quest /> },
 { path: '/arena', element: <Arena /> },
 { path: '/login', element: <Login /> },
 { path: '/register', element: <Register /> },
]);
