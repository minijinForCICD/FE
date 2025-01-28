// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/common/ThemeProvider';
import { AuthProvider } from './components/common/auth/AuthProvider';
import { Loading } from './components/common/Loading';
import { Header } from './components/common/Header';
import { routes } from './configs/routes';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white light:text-black transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8 pt-20">
              <Suspense fallback={<Loading />}>
                <Routes>
                  {routes.map(({ path, element: Element}) => (
                    <Route key={path} path={path} element={<Element />} />
                  ))}
                </Routes>
              </Suspense>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
export default App;