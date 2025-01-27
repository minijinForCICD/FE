import React from 'react';
import { PageLayout } from '../layouts/PageLayout';

const Home = () => {
  return (
    <PageLayout title="Home">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <p className="text-gray-800 dark:text-gray-200">
          Welcome to the home page
        </p>
      </div>
    </PageLayout>
  );
};

export default Home;