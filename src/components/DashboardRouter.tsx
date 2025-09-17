import React, { Suspense, lazy } from 'react';

const UserDashboard = lazy(() => import('../dashboards/UserDashboard'));

const DashboardRouter: React.FC = () => {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading dashboard...</div>}>
      <UserDashboard />
    </Suspense>
  );
};

export default DashboardRouter;


