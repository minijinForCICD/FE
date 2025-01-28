import React from 'react';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  );
};
