import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={{ 
                bgcolor: 'primary.main', 
                p: 1.5, 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/image.png" 
                  alt="SureSavings Mascot" 
                  style={{ width: 24, height: 24 }}
                />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  SureSavings
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Smart Savings Platform
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="grey.300" sx={{ mb: 2 }}>
              Building wealth through smart savings and secure investments. Your trusted partner for financial growth.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ color: 'grey.400', '&:hover': { color: 'primary.main' } }}>
                <Facebook />
              </IconButton>
              <IconButton size="small" sx={{ color: 'grey.400', '&:hover': { color: 'primary.main' } }}>
                <Twitter />
              </IconButton>
              <IconButton size="small" sx={{ color: 'grey.400', '&:hover': { color: 'primary.main' } }}>
                <Instagram />
              </IconButton>
              <IconButton size="small" sx={{ color: 'grey.400', '&:hover': { color: 'primary.main' } }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="semibold" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/savings" style={{ color: theme.palette.grey[300], textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ '&:hover': { color: 'primary.main' } }}>
                  Savings Plans
                </Typography>
              </Link>
              <Link to="/investments" style={{ color: theme.palette.grey[300], textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ '&:hover': { color: 'primary.main' } }}>
                  Investments
                </Typography>
              </Link>
              <Link to="/transactions" style={{ color: theme.palette.grey[300], textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ '&:hover': { color: 'primary.main' } }}>
                  Transactions
                </Typography>
              </Link>
              <Link to="/profile" style={{ color: theme.palette.grey[300], textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ '&:hover': { color: 'primary.main' } }}>
                  Profile
                </Typography>
              </Link>
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="semibold" sx={{ mb: 2 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="grey.300" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                Help Center
              </Typography>
              <Typography variant="body2" color="grey.300" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                FAQs
              </Typography>
              <Typography variant="body2" color="grey.300" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                Contact Us
              </Typography>
              <Typography variant="body2" color="grey.300" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" color="grey.300" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                Terms of Service
              </Typography>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" fontWeight="semibold" sx={{ mb: 2 }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="body2" color="grey.300">
                  support@suresavings.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Phone sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="body2" color="grey.300">
                  +234 800 SURE SAVE
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOn sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="body2" color="grey.300">
                  Lagos, Nigeria
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="grey.400">
            © 2025 SureSavings. All rights reserved. | Licensed by the CBN
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;