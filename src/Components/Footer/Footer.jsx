import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Instagram,
  Pinterest,
  Twitter,
  Email,
  Phone,
  LocationOn,
  Mail,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#111', color: 'white', px: 2, pt: 6, pb: 2 }}>
      {/* Top Section */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: isSmallScreen ? 'center' : 'space-between',
          rowGap: 4,
          columnGap: 4,
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        {/* Each Column */}
        {[

          {
            title: 'Follow Us',
            content: (
              <Stack direction="row" spacing={2} mt={2} justifyContent={isSmallScreen ? 'center' : 'flex-start'}>
                {[
                  { icon: <Instagram />, url: '#instagram' },
                  { icon: <Pinterest />, url: '#pinterest' },
                  { icon: <Twitter />, url: '#twitter' },
                ].map((item, idx) => (
                  <a key={idx} href={item.url} rel="noopener noreferrer">
                    <IconButton sx={{ border: '1px solid rgb(62, 189, 189)', color: '#00FFFF' }}>
                      {item.icon}
                    </IconButton>
                  </a>
                ))}
              </Stack>
            ),
          },
          {
            title: 'Our Product',
            items: [
              { name: 'All Products', url: '#/products' },
              { name: 'Laptops', url: '#/products/laptops' },
              { name: 'Headphones', url: '#/products/headphones' },
              { name: 'Smartphones', url: '#/products/smartphones' },
              { name: 'PlayStation', url: '#/products/playstation' },
              { name: 'Smartwatch', url: '#/products/smartwatch' },
            ],
          },
          {
            title: 'Links',
            items: [
              { name: 'Coustomer Cart', url: '/cart' },
              { name: 'Privacy Policy', url: '/privacy' },
              { name: 'Refund & Return Policy', url: '/refund' },
            ],
          },
          {
            title: 'Site Pages',
            items: [
              { name: 'Homepage', url: '/' },
              { name: 'About ElecTech Store', url: '/about' },
              { name: 'Contact Us', url: '/contact' },
            ],
          },
        ].map((section, idx) => (
          <Box key={idx} sx={{ minWidth: isSmallScreen ? '100%' : 200 }}>
            <Typography variant="h6" gutterBottom textAlign={isSmallScreen ? 'center' : 'left'}>
              {section.title}
            </Typography>

            {section.items ? (
              <Stack spacing={1} mt={2} alignItems={isSmallScreen ? 'center' : 'flex-start'}>
                {section.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </a>
                ))}
              </Stack>
            ) : (
              section.content
            )}
          </Box>
        ))}
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 4, borderColor: '#444' }} />

      {/* Bottom Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          alignItems: isSmallScreen ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: 2,
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        {/* Working Hours */}
        <Box>
          <Typography variant="body2" color="gray">
            Sunday to Thursday
          </Typography>
          <Typography variant="body2" color="gray">
            09 AM — 07 PM
          </Typography>
        </Box>

        {/* Contact Buttons */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <a href="#/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton sx={{ border: '1px solid gray', color: 'white' }}>
              <Phone />
            </IconButton>
          </a>

          <a href="#/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton sx={{ border: '1px solid gray', color: 'white' }}>
              <Mail />
            </IconButton>
          </a>

          <Button
            variant="contained"
            startIcon={<LocationOn />}
            sx={{
              bgcolor: '#444',
              textTransform: 'none',
              color: 'white',
              '&:hover': { bgcolor: '#555' },
            }}
          >
            Location
          </Button>
        </Stack>

        {/* Copyright */}
        <Typography variant="caption" color="gray" textAlign={isSmallScreen ? 'left' : 'right'}>
          ElecTech Store © 2025 | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
