import React from 'react';
import RoleLanding from '../RoleLanding';

const AgentLanding: React.FC = () => (
  <RoleLanding
    title="Agent"
    description="Field operations, onboarding, and customer support."
    accentColorClass="bg-gradient-to-r from-emerald-600 to-green-600"
    loginRoleParam="agent"
  />
);

export default AgentLanding;



