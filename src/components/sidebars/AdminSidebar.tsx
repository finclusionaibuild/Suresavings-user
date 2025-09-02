import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People,
  MonetizationOn,
  AccountBalanceWallet,
  ShowChart,
  VerifiedUser,
  Assessment,
  Gavel,
  SupportAgent,
  ManageAccounts,
  Groups,
  ChevronLeft,
  ChevronRight,
  Notifications,
  Help,
  Logout,
  Person,
  Settings,
  ContactSupport,
  QuestionAnswer,
  Feedback,
  BarChart,
  Security,
  Business,
} from '@mui/icons-material';
import SuperheroPiggy from '../SuperheroPiggy';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const navigationItems = [
    // Admin Dashboard
    { path: '/admin', label: 'Admin Dashboard', icon: DashboardIcon, category: 'admin' },
    
    // Core Admin Tools
    { path: '/admin/users', label: 'User Management', icon: People, category: 'admin' },
    { path: '/admin/transactions', label: 'Transaction Monitor', icon: MonetizationOn, category: 'admin' },
    { path: '/admin/savings', label: 'Savings Management', icon: AccountBalanceWallet, category: 'admin' },
    { path: '/admin/investments', label: 'Investment Oversight', icon: ShowChart, category: 'admin' },
    { path: '/admin/kyc-management', label: 'KYC Management', icon: VerifiedUser, category: 'admin' },
    { path: '/admin/kyb-management', label: 'KYB Management', icon: Business, category: 'admin' },
    { path: '/admin/esusu', label: 'Esusu Management', icon: Groups, category: 'admin' },
    { path: '/admin/rbac', label: 'Role & Access Control', icon: Security, category: 'admin' },
    { path: '/admin/admin-management', label: 'Admin Management', icon: ManageAccounts, category: 'admin' },
    
    // Analytics & Reports
    { path: '/admin/analytics', label: 'Analytics & Reports', icon: Assessment, category: 'analytics' },
    { path: '/admin/compliance', label: 'Compliance', icon: Gavel, category: 'analytics' },
    
    // Support & Settings
    { path: '/admin/support', label: 'Support Tickets', icon: SupportAgent, category: 'support' },
    { path: '/admin/settings', label: 'Admin Settings', icon: ManageAccounts, category: 'support' },
    
    // Account Management
    { path: '/profile', label: 'My Profile', icon: Person, category: 'account' },
    { path: '/settings', label: 'Account Settings', icon: Settings, category: 'account' },
    { path: '/notifications', label: 'Notifications', icon: Notifications, category: 'account' },
    
    // Help & Support
    { path: '/help', label: 'Help Center', icon: Help, category: 'help' },
    { path: '/contact', label: 'Contact Support', icon: ContactSupport, category: 'help' },
    { path: '/faq', label: 'FAQ', icon: QuestionAnswer, category: 'help' },
    { path: '/feedback', label: 'Send Feedback', icon: Feedback, category: 'help' },
  ];

  const isActive = (path: string) => {
    if (location.pathname === path) return true;
    if (path !== '/' && path !== '/admin' && location.pathname.startsWith(path + '/')) return true;
    return false;
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'admin': return 'Administration';
      case 'analytics': return 'Analytics';
      case 'support': return 'Support';
      case 'account': return 'Account';
      case 'help': return 'Help';
      default: return '';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'admin': return theme.palette.secondary.main;
      case 'analytics': return theme.palette.info.main;
      case 'support': return theme.palette.warning.main;
      case 'account': return theme.palette.primary.main;
      case 'help': return theme.palette.success.main;
      default: return theme.palette.grey[600];
    }
  };

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof navigationItems>);

  const categoryOrder = ['admin', 'analytics', 'support', 'account', 'help'];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const drawerWidth = isOpen ? 280 : 72;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        borderBottom: 1, 
        borderColor: 'divider',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'white'
      }}>
        {isOpen && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              p: 1, 
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Security sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                Admin Panel
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                Administrative Control
              </Typography>
            </Box>
          </Box>
        )}
        
        <IconButton 
          onClick={() => setIsOpen(!isOpen)} 
          size="small"
          sx={{ 
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
          }}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      {/* User Info */}
      {isOpen && user && (
        <Box sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              src={user.profilePicture}
              sx={{ 
                width: 44, 
                height: 44,
                border: '2px solid',
                borderColor: 'secondary.main'
              }}
            >
              {user.firstName[0]}{user.lastName[0]}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight="600" noWrap>
                {user.firstName} {user.lastName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <Security sx={{ fontSize: 12, color: 'secondary.main' }} />
                <Chip
                  label="Admin"
                  size="small"
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.65rem',
                    height: 20,
                    borderColor: 'secondary.main',
                    color: 'secondary.main'
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Navigation */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        py: 1,
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { 
          background: 'rgba(59, 130, 246, 0.3)',
          borderRadius: '10px'
        }
      }}>
        {categoryOrder.map((category) => {
          const items = groupedItems[category];
          if (!items || items.length === 0) return null;

          return (
            <Box key={category} sx={{ mb: 1 }}>
              {isOpen && (
                <Typography
                  variant="caption"
                  sx={{
                    px: 3,
                    py: 1,
                    display: 'block',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 1.2,
                    color: getCategoryColor(category),
                    fontSize: '0.7rem'
                  }}
                >
                  {getCategoryTitle(category)}
                </Typography>
              )}
              
              <List dense sx={{ px: 1 }}>
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <ListItem key={item.path} disablePadding>
                      <Tooltip title={!isOpen ? item.label : ''} placement="right">
                        <ListItemButton
                          onClick={() => handleNavigation(item.path)}
                          selected={active}
                          sx={{
                            borderRadius: 2,
                            mx: 0.5,
                            mb: 0.5,
                            minHeight: 48,
                            justifyContent: isOpen ? 'initial' : 'center',
                            transition: 'all 0.2s ease',
                            '&.Mui-selected': {
                              bgcolor: 'secondary.50',
                              color: 'secondary.main',
                              borderLeft: 3,
                              borderColor: 'secondary.main',
                              transform: 'translateX(2px)',
                              '&:hover': { bgcolor: 'secondary.100' },
                            },
                            '&:hover': {
                              bgcolor: active ? 'secondary.100' : 'grey.50',
                              transform: 'translateX(2px)',
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: isOpen ? 2.5 : 'auto',
                              justifyContent: 'center',
                              color: active ? 'secondary.main' : 'text.secondary',
                            }}
                          >
                            <Icon fontSize="small" />
                          </ListItemIcon>
                          {isOpen && (
                            <ListItemText
                              primary={item.label}
                              primaryTypographyProps={{
                                fontSize: '0.875rem',
                                fontWeight: active ? 600 : 400,
                              }}
                            />
                          )}
                        </ListItemButton>
                      </Tooltip>
                    </ListItem>
                  );
                })}
              </List>
              
              {isOpen && category !== 'help' && <Divider sx={{ my: 1.5, mx: 2 }} />}
            </Box>
          );
        })}
      </Box>

      {/* Footer */}
      <Box sx={{ 
        borderTop: 1, 
        borderColor: 'divider', 
        p: 1,
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <Tooltip title={!isOpen ? 'Sign Out' : ''} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              minHeight: 48,
              justifyContent: isOpen ? 'initial' : 'center',
              color: 'error.main',
              '&:hover': {
                bgcolor: 'error.50',
                transform: 'translateX(2px)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isOpen ? 2.5 : 'auto',
                justifyContent: 'center',
                color: 'error.main',
              }}
            >
              <Logout fontSize="small" />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary="Sign Out"
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? isOpen : true}
      onClose={() => setIsOpen(false)}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          border: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      }}
      ModalProps={{ keepMounted: true }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default AdminSidebar;