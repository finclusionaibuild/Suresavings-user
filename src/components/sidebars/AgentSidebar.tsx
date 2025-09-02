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
  Groups,
  People,
  MonetizationOn,
  Assessment,
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
  Savings as SavingsIcon,
  TrendingUp,
  History
} from '@mui/icons-material';
import { UserCheck } from 'lucide-react';
import SuperheroPiggy from '../SuperheroPiggy';

interface AgentSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AgentSidebar: React.FC<AgentSidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const navigationItems = [
    // Agent Dashboard
    { path: '/agent-dashboard', label: 'Agent Dashboard', icon: DashboardIcon, category: 'agent' },
    
    // Agent Tools
    { path: '/group-savings', label: 'Group Savings', icon: Groups, category: 'agent' },
    { path: '/agent/customers', label: 'Customer Management', icon: People, category: 'agent' },
    { path: '/agent/collections', label: 'Collections', icon: MonetizationOn, category: 'agent' },
    { path: '/agent/reports', label: 'Agent Reports', icon: Assessment, category: 'agent' },
    
    // Personal Features
    { path: '/savings', label: 'My Savings', icon: SavingsIcon, category: 'personal' },
    { path: '/investments', label: 'My Investments', icon: TrendingUp, category: 'personal' },
    { path: '/transactions', label: 'My Transactions', icon: History, category: 'personal' },
    
    // Account Management
    { path: '/profile', label: 'My Profile', icon: Person, category: 'account' },
    { path: '/settings', label: 'Account Settings', icon: Settings, category: 'account' },
    { path: '/notifications', label: 'Notifications', icon: Notifications, category: 'account' },
    
    // Support
    { path: '/help', label: 'Help Center', icon: Help, category: 'support' },
    { path: '/contact', label: 'Contact Support', icon: ContactSupport, category: 'support' },
    { path: '/faq', label: 'FAQ', icon: QuestionAnswer, category: 'support' },
    { path: '/feedback', label: 'Send Feedback', icon: Feedback, category: 'support' },
  ];

  const isActive = (path: string) => {
    if (location.pathname === path) return true;
    if (path !== '/' && path !== '/agent-dashboard' && location.pathname.startsWith(path + '/')) return true;
    return false;
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'agent': return 'Agent Tools';
      case 'personal': return 'Personal';
      case 'account': return 'Account';
      case 'support': return 'Support';
      default: return '';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'agent': return theme.palette.error.main;
      case 'personal': return theme.palette.primary.main;
      case 'account': return theme.palette.info.main;
      case 'support': return theme.palette.success.main;
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

  const categoryOrder = ['agent', 'personal', 'account', 'support'];

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
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
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
              <People sx={{ fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                Agent Portal
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                Field Operations
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
                borderColor: 'error.main'
              }}
            >
              {user.firstName[0]}{user.lastName[0]}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight="600" noWrap>
                {user.firstName} {user.lastName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <People sx={{ fontSize: 12, color: 'error.main' }} />
                <Chip
                  label="Agent"
                  size="small"
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.65rem',
                    height: 20,
                    borderColor: 'error.main',
                    color: 'error.main'
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
          background: 'rgba(239, 68, 68, 0.3)',
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
                              bgcolor: 'error.50',
                              color: 'error.main',
                              borderLeft: 3,
                              borderColor: 'error.main',
                              transform: 'translateX(2px)',
                              '&:hover': { bgcolor: 'error.100' },
                            },
                            '&:hover': {
                              bgcolor: active ? 'error.100' : 'grey.50',
                              transform: 'translateX(2px)',
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: isOpen ? 2.5 : 'auto',
                              justifyContent: 'center',
                              color: active ? 'error.main' : 'text.secondary',
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
              
              {isOpen && category !== 'support' && <Divider sx={{ my: 1.5, mx: 2 }} />}
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

export default AgentSidebar;