import React from 'react';
import RoleLanding from '../RoleLanding';

const SuperAdminLanding: React.FC = () => (
  <RoleLanding
    title="Super Admin"
    description="System-wide management and platform control."
    accentColorClass="bg-gradient-to-r from-indigo-600 to-purple-600"
    loginRoleParam="superadmin"
  />
);

export default SuperAdminLanding;



