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
  Savings as SavingsIcon,
  TrendingUp,
  History,
  Person,
  Settings,
  ChevronLeft,
  ChevronRight,
  Notifications,
  Help,
  Logout,
  EmojiEvents,
  CreditCard,
  Group,
  ContactSupport,
  QuestionAnswer,
  Feedback,
  Groups
} from '@mui/icons-material';
import SuperheroPiggy from '../SuperheroPiggy';

interface UserSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const navigationItems = [
    // Main Features
    { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon, category: 'main' },
    { path: '/savings', label: 'Savings Plans', icon: SavingsIcon, category: 'main' },
    { path: '/investments', label: 'Investments', icon: TrendingUp, category: 'main' },
    { path: '/group-savings', label: 'Group Savings', icon: Groups, category: 'main' },
    { path: '/transactions', label: 'Transaction History', icon: History, category: 'main' },
    
    // Account Management
    { path: '/profile', label: 'My Profile', icon: Person, category: 'account' },
    { path: '/settings', label: 'Account Settings', icon: Settings, category: 'account' },
    { path: '/notifications', label: 'Notifications', icon: Notifications, category: 'account' },
    { path: '/rewards', label: 'Rewards & Points', icon: EmojiEvents, category: 'account' },
    { path: '/referrals', label: 'Refer Friends', icon: Group, category: 'account' },
    { path: '/cards', label: 'Virtual Cards', icon: CreditCard, category: 'account' },
    
    // Support
    { path: '/help', label: 'Help Center', icon: Help, category: 'support' },
    { path: '/contact', label: 'Contact Support', icon: ContactSupport, category: 'support' },
    { path: '/faq', label: 'FAQ', icon: QuestionAnswer, category: 'support' },
    { path: '/feedback', label: 'Send Feedback', icon: Feedback, category: 'support' },
  ];

  const isActive = (path: string) => {
    if (location.pathname === path) return true;
    if (path !== '/' && path !== '/dashboard' && location.pathname.startsWith(path + '/')) return true;
    return false;
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'main': return 'Main';
      case 'account': return 'Account';
      case 'support': return 'Support';
      default: return '';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'main': return theme.palette.primary.main;
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

  const categoryOrder = ['main', 'account', 'support'];

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
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
              <SuperheroPiggy size="md" animation="float" showGlow={false} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                SureSavings
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                Smart Savings Platform
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
                borderColor: 'primary.main'
              }}
            >
              {user.firstName[0]}{user.lastName[0]}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight="600" noWrap>
                {user.firstName} {user.lastName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <Chip
                  label={`KYC Tier ${user.kycTier}`}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.65rem',
                    height: 20,
                    borderColor: 'primary.main',
                    color: 'primary.main'
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
          background: 'rgba(16, 185, 129, 0.3)',
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
                              bgcolor: 'primary.50',
                              color: 'primary.main',
                              borderLeft: 3,
                              borderColor: 'primary.main',
                              transform: 'translateX(2px)',
                              '&:hover': { bgcolor: 'primary.100' },
                            },
                            '&:hover': {
                              bgcolor: active ? 'primary.100' : 'grey.50',
                              transform: 'translateX(2px)',
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: isOpen ? 2.5 : 'auto',
                              justifyContent: 'center',
                              color: active ? 'primary.main' : 'text.secondary',
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

export default UserSidebar;