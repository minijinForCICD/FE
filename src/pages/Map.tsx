import React from 'react';
import { PageLayout } from '../layouts/PageLayout';

const Map = () => {
  return (
    <PageLayout title="Map">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <p className="text-gray-800 dark:text-gray-200">
          Map page content
        </p>
      </div>
    </PageLayout>
  );
};

export default Map;