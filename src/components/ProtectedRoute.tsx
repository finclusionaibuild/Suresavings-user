import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AccessRestrictionGate from './onboarding/AccessRestrictionGate';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
  requiredVerifications?: string[];
  requiredKYCTier?: number;
  featureName?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false, 
  requireSuperAdmin = false,
  requiredVerifications = ['email'],
  requiredKYCTier = 1,
  featureName = 'this feature'
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <CircularProgress size={80} thickness={4} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireSuperAdmin && !user.isSuperAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireAdmin && !user.isAdmin && !user.isSuperAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AccessRestrictionGate
      user={user}
      requiredVerifications={requiredVerifications}
      requiredKYCTier={requiredKYCTier}
      featureName={featureName}
    >
      {children}
    </AccessRestrictionGate>
  );
};

export default ProtectedRoute;