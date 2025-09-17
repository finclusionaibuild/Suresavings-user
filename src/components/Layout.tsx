import React, { useState } from 'react';
import UserSidebar from '../components/sidebars/UserSidebar';
import { Box, useTheme } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();

  const renderSidebar = () => <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />;

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