import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
};