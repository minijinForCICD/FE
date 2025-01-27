// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/common/ThemeProvider';
import { Header } from './components/common/Header';
import { routes } from './configs/routes';


const App = () => {
    return (
      <BrowserRouter>
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-1200">
            <Header />
            <main className="container mx-auto px-4 py-8 pt-20"> {/* pt-20 추가 */}
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {routes.map(({ path, element: Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                  ))}
                </Routes>
              </Suspense>
            </main>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );
  };
  
export default App;