import React, { Suspense, lazy } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SuperAdminDashboard = lazy(() => import('../dashboards/SuperAdminDashboard'));
const AdminDashboard = lazy(() => import('../dashboards/AdminDashboard'));
const AgentDashboard = lazy(() => import('../dashboards/AgentDashboard'));
const UserDashboard = lazy(() => import('../dashboards/UserDashboard'));

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();

  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading dashboard...</div>}>
      {(() => {
        if (!user) return <div />;
        if (user.isSuperAdmin) return <SuperAdminDashboard />;
        if (user.isAdmin) return <AdminDashboard />;
        if (user.isAgent) return <AgentDashboard />;
        return <UserDashboard />;
      })()}
    </Suspense>
  );
};

export default DashboardRouter;


