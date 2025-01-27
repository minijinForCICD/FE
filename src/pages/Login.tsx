import React from 'react';
import { PageLayout } from '../layouts/PageLayout';

const Login = () => {
  return (
    <PageLayout title="Login">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <p className="text-gray-800 dark:text-gray-200">
          Login page content
        </p>
      </div>
    </PageLayout>
  );
};

export default Login;