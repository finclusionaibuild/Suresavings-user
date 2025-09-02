import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SuperAdminSidebar from '../components/sidebars/SuperAdminSidebar';
import AdminSidebar from '../components/sidebars/AdminSidebar';
import AgentSidebar from '../components/sidebars/AgentSidebar';
import UserSidebar from '../components/sidebars/UserSidebar';
import { Box, useTheme } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();

  const renderSidebar = () => {
    if (!user) {
      return null;
    }
    
    if (user.isSuperAdmin) {
      return <SuperAdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />;
    } else if (user.isAdmin) {
      return <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />;
    } else if (user.isAgent) {
      return <AgentSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />;
    } else {
      return <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Render appropriate sidebar */}
      {renderSidebar()}
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { lg: sidebarOpen ? '280px' : '72px' },
          transition: theme => theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;