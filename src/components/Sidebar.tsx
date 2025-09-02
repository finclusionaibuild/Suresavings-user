import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  People,
  BarChart,
  Security,
  AdminPanelSettings,
  ChevronLeft,
  ChevronRight,
  Notifications,
  Help,
  Logout,
  Public,
  VerifiedUser,
  MonitorHeart,
  Storage,
  EmojiEvents,
  CreditCard,
  Business,
  SupervisorAccount,
  Assessment,
  AccountBalanceWallet,
  Group,
  ManageAccounts,
  Analytics,
  SupportAgent,
  Gavel,
  ContactSupport,
  QuestionAnswer,
  Feedback,
  MonetizationOn,
  ShowChart,
  Speed,
  Backup,
  Api,
  Groups,
  Mail
} from '@mui/icons-material';
import { Crown, UserCheck } from 'lucide-react';
import SuperheroPiggy from './SuperheroPiggy';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const getNavigationItems = () => {
    if (!user) return [];

    // Base items for all authenticated users
    const dashboardItems = [
      { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon, category: 'main' },
    ];

    const userItems = [
      { path: '/savings', label: 'Savings Plans', icon: SavingsIcon, category: 'main' },
      { path: '/investments', label: 'Investments', icon: TrendingUp, category: 'main' },
      { path: '/transactions', label: 'Transaction History', icon: History, category: 'main' },
    ];

    const accountItems = [
      { path: '/profile', label: 'My Profile', icon: Person, category: 'account' },
      { path: '/settings', label: 'Account Settings', icon: Settings, category: 'account' },
      { path: '/notifications', label: 'Notifications', icon: Notifications, category: 'account' },
      { path: '/rewards', label: 'Rewards & Points', icon: EmojiEvents, category: 'account' },
      { path: '/referrals', label: 'Refer Friends', icon: Group, category: 'account' },
      { path: '/cards', label: 'Virtual Cards', icon: CreditCard, category: 'account' },
    ];

    const supportItems = [
      { path: '/help', label: 'Help Center', icon: Help, category: 'support' },
      { path: '/contact', label: 'Contact Support', icon: ContactSupport, category: 'support' },
      { path: '/faq', label: 'FAQ', icon: QuestionAnswer, category: 'support' },
      { path: '/feedback', label: 'Send Feedback', icon: Feedback, category: 'support' },
    ];

    const groupSavingsItems = [
      { path: '/group-savings', label: 'Group Savings', icon: Groups, category: 'main' },
    ];

    const agentItems = [
      { path: '/agent-dashboard', label: 'Agent Dashboard', icon: UserCheck, category: 'agent' },
    ];

    const adminItems = [
      { path: '/admin', label: 'Admin Overview', icon: BarChart, category: 'admin' },
      { path: '/admin/users', label: 'User Management', icon: People, category: 'admin' },
      { path: '/admin/transactions', label: 'Transaction Monitor', icon: MonetizationOn, category: 'admin' },
      { path: '/admin/savings', label: 'Savings Management', icon: AccountBalanceWallet, category: 'admin' },
      { path: '/admin/investments', label: 'Investment Oversight', icon: ShowChart, category: 'admin' },
      { path: '/admin/kyc', label: 'KYC Verification', icon: VerifiedUser, category: 'admin' },
      { path: '/admin/analytics', label: 'Analytics & Reports', icon: Assessment, category: 'admin' },
      { path: '/admin/compliance', label: 'Compliance', icon: Gavel, category: 'admin' },
      { path: '/admin/support', label: 'Support Tickets', icon: SupportAgent, category: 'admin' },
      { path: '/admin/settings', label: 'Admin Settings', icon: ManageAccounts, category: 'admin' },
      { path: '/admin/esusu', label: 'Esusu Management', icon: Groups, category: 'admin' },
    ];

    const superAdminItems = [
      { path: '/super-admin', label: 'Super Admin Dashboard', icon: AdminPanelSettings, category: 'super-admin' },
      { path: '/super-admin/platform', label: 'Platform Overview', icon: Public, category: 'super-admin' },
      { path: '/super-admin/rbac', label: 'Role-Based Access Control', icon: Security, category: 'super-admin' },
      { path: '/super-admin/regions', label: 'Regional Management', icon: Business, category: 'super-admin' },
      { path: '/super-admin/admins', label: 'Admin Management', icon: SupervisorAccount, category: 'super-admin' },
      { path: '/super-admin/kyb', label: 'KYB Management', icon: VerifiedUser, category: 'super-admin' },
      { path: '/super-admin/wallets', label: 'Wallet Management', icon: AccountBalanceWallet, category: 'super-admin' },
      { path: '/super-admin/notifications', label: 'Notifications Management', icon: Notifications, category: 'super-admin' },
      { path: '/super-admin/profiles', label: 'Profile Management', icon: Person, category: 'super-admin' },
      { path: '/super-admin/system', label: 'System Health', icon: MonitorHeart, category: 'super-admin' },
      { path: '/super-admin/security', label: 'Security Center', icon: Security, category: 'super-admin' },
      { path: '/super-admin/database', label: 'Database Management', icon: Storage, category: 'super-admin' },
      { path: '/super-admin/performance', label: 'Performance Monitor', icon: Speed, category: 'super-admin' },
      { path: '/super-admin/integrations', label: 'Platform Integrations', icon: Api, category: 'super-admin' },
      { path: '/super-admin/webhooks', label: 'Webhooks & API Console', icon: Api, category: 'super-admin' },
      { path: '/super-admin/backup', label: 'Backup & Recovery', icon: Backup, category: 'super-admin' },
      { path: '/super-admin/config', label: 'Global Configuration', icon: Settings, category: 'super-admin' },
    ];

    // Build navigation based on user role
    let items = [...dashboardItems];

    if (user.isSuperAdmin) {
      // Super Admin gets everything
      items = [
        ...items,
        ...superAdminItems,
        ...adminItems,
        ...agentItems,
        ...groupSavingsItems,
        ...userItems,
        ...accountItems,
        ...supportItems
      ];
    } else if (user.isAdmin) {
      // Admin gets admin tools + basic user features
      items = [
        ...items,
        ...adminItems,
        ...userItems,
        ...groupSavingsItems,
        ...accountItems,
        ...supportItems
      ];
    } else if (user.isAgent) {
      // Agent gets agent tools + basic user features
      items = [
        ...items,
        ...agentItems,
        ...groupSavingsItems,
        ...userItems,
        ...accountItems,
        ...supportItems
      ];
    } else {
      // Regular users get basic features
      items = [
        ...items,
        ...userItems,
        ...groupSavingsItems,
        ...accountItems,
        ...supportItems
      ];
    }

    return items;
  };

  const navigationItems = getNavigationItems();
  
  const isActive = (path: string) => {
    // Exact match for root paths
    if (location.pathname === path) return true;
    // For sub-paths, check if current path starts with the item path (but not for root paths)
    if (path !== '/' && path !== '/dashboard' && location.pathname.startsWith(path + '/')) return true;
    return false;
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'main': return 'Main';
      case 'account': return 'Account';
      case 'admin': return 'Administration';
      case 'super-admin': return 'Super Admin';
      case 'support': return 'Support';
      case 'agent': return 'Agent';
      default: return '';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'main': return theme.palette.primary.main;
      case 'account': return theme.palette.info.main;
      case 'admin': return theme.palette.secondary.main;
      case 'super-admin': return theme.palette.warning.main;
      case 'support': return theme.palette.success.main;
      case 'agent': return theme.palette.error.main;
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

  const categoryOrder = ['main', 'agent', 'admin', 'super-admin', 'account', 'support'];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const drawerWidth = isOpen ? 280 : 72;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      {/* Modern Header with Superhero Piggy */}
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
              justifyContent: 'center',
              position: 'relative'
            }}>
              <SuperheroPiggy size="md" animation="float" showGlow={false} />
              <div style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 8,
                height: 8,
                backgroundColor: '#fbbf24',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
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

      {/* Modern User Info with Superhero Piggy */}
      {isOpen && user && (
        <Box sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          position: 'relative'
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
                {user.isSuperAdmin && <Crown size={12} color={theme.palette.warning.main} />}
                {user.isAdmin && !user.isSuperAdmin && <Security sx={{ fontSize: 12, color: 'secondary.main' }} />}
                <Chip
                  label={user.isSuperAdmin ? 'Super Admin' : user.isAdmin ? 'Admin' : `KYC Tier ${user.kycTier}`}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.65rem',
                    height: 20,
                    borderColor: user.isSuperAdmin ? 'warning.main' : user.isAdmin ? 'secondary.main' : 'primary.main',
                    color: user.isSuperAdmin ? 'warning.main' : user.isAdmin ? 'secondary.main' : 'primary.main'
                  }}
                />
              </Box>
            </Box>
          </Box>
          {/* Floating Superhero Piggy */}
          <Box sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: 0.3
          }}>
            <SuperheroPiggy size="sm" animation="bounce" />
          </Box>
        </Box>
      )}

      {/* Modern Navigation */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        py: 1,
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(16, 185, 129, 0.3)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(16, 185, 129, 0.6)',
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
                            cursor: 'pointer',
                            '&.Mui-selected': {
                              bgcolor: 'primary.50',
                              color: 'primary.main',
                              borderLeft: 3,
                              borderColor: 'primary.main',
                              transform: 'translateX(2px)',
                              '&:hover': {
                                bgcolor: 'primary.100',
                              },
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
                              transition: 'all 0.2s ease',
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

      {/* Modern Footer Actions */}
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
              transition: 'all 0.2s ease',
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
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;