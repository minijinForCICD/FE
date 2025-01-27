import React from 'react';
import { PageLayout } from '../layouts/PageLayout';

const Calendar = () => {
  return (
    <PageLayout title="Calendar">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <p className="text-gray-800 dark:text-gray-200">
          Calendar page content
        </p>
      </div>
    </PageLayout>
  );
};

export default Calendar;