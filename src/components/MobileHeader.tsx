import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
} from '@mui/icons-material';
import { Crown } from 'lucide-react';
import SuperheroPiggy from './SuperheroPiggy';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  if (!isMobile) return null;

  return (
    <AppBar 
      position="sticky" 
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
          <Box sx={{ 
            bgcolor: 'primary.main', 
            p: 1, 
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <SuperheroPiggy size="sm" animation="float" showGlow={false} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
              SureSavings
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Smart Savings Platform
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={user.profilePicture}
                sx={{ width: 32, height: 32 }}
              >
                {user.firstName[0]}{user.lastName[0]}
              </Avatar>
              {user.isSuperAdmin && <Crown size={16} color={theme.palette.warning.main} />}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MobileHeader;