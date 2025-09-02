import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserDashboard from '../dashboards/UserDashboard';
import AdminDashboard from '../dashboards/AdminDashboard';
import AgentDashboard from '../dashboards/AgentDashboard';
import SuperAdminDashboard from '../dashboards/SuperAdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  // Route to appropriate dashboard based on user type
  if (user.isSuperAdmin) {
    return <SuperAdminDashboard />;
  } else if (user.isAdmin) {
    return <AdminDashboard />;
  } else if (user.isAgent) {
    return <AgentDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default Dashboard;