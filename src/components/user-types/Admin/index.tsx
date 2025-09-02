import React from 'react';
import RoleLanding from '../RoleLanding';

const AdminLanding: React.FC = () => (
  <RoleLanding
    title="Admin"
    description="Manage users, savings, compliance, and operations."
    accentColorClass="bg-gradient-to-r from-blue-600 to-teal-600"
    loginRoleParam="admin"
  />
);

export default AdminLanding;



