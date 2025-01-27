import React from 'react';
import { PageLayout } from '../layouts/PageLayout';

const Bookcase = () => {
  return (
    <PageLayout title="Bookcase">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <div className="grid gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              My Books
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Book collection content
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Bookcase;