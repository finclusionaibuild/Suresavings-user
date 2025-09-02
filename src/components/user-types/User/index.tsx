import React from 'react';
import RoleLanding from '../RoleLanding';

const UserLanding: React.FC = () => (
  <RoleLanding
    title="User"
    description="Access your savings, investments, and rewards."
    accentColorClass="bg-gradient-to-r from-cyan-600 to-blue-600"
    loginRoleParam="user"
  />
);

export default UserLanding;



