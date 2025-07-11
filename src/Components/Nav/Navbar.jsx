import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem,
  Container, Button, Avatar, Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import AuthToken from '../../Api/ApiAuthToken';
import { useQuery } from '@tanstack/react-query';

const pagesGuest = ['Register', 'Login'];
const pagesAuth = ['Cart', 'All Products','About Us'];

const accentColor = '#00bcd4';

function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();

  // جلب بيانات السلة
  const fetchCartItems = async () => {
    const { data } = await AuthToken.get(`/Carts`);
    return data;
  };

  const { data } = useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchCartItems,
    staleTime: 1000,
  });

  const cartItemsCount = data?.cartResponse?.length || 0;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLoggedIn = Boolean(localStorage.getItem('Usertoken'));

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    localStorage.removeItem('Usertoken');
    handleCloseUserMenu();
    navigate('/login');
  };

  const leftPages = isLoggedIn ? pagesAuth : pagesGuest;
  

  const toPath = (page) => {
  if (page.toLowerCase() === 'home') return '/';
  if(page.toLowerCase() === 'about us') return '/about-us';
  return '/' + page.toLowerCase().replace(/\s+/g, '-');
};

  const navbarBackground =
    theme.palette.mode === 'dark'
      ? 'linear-gradient(90deg, #121212, #1976d2, #2c5364)'
      : 'linear-gradient(90deg, rgb(68, 153, 190), #1976d2, #2c5364)';

  return (
    <AppBar position="static" sx={{ background: navbarBackground, color: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* موبايل */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>ElecTech</Typography>
            </Link>

            {isLoggedIn && (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'white',
                    color: 'black',
                    fontSize: '0.8rem',
                    '&:hover': {
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                      transition: 'box-shadow 0.3s ease-in-out',
                    },
                  }}
                />
              </IconButton>
            )}
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleCloseUserMenu} component={Link} to="/UserProfile">
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* قائمة الموبايل */}
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {leftPages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={toPath(page)}>
                <Typography textAlign="center">
                  {page === 'Cart' ? (
                    <>
                      <Badge badgeContent={cartItemsCount} color="error" sx={{ mr: 1 }}>
                        <ShoppingCartIcon />
                      </Badge>
                      Cart
                    </>
                  ) : (
                    page
                  )}
                </Typography>
              </MenuItem>
            ))}
            {isLoggedIn && (
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            )}
          </Menu>

          {/* ديسكتوب */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, alignItems: 'center' }}>
            {/* يسار: روابط الصفحات */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {leftPages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={toPath(page)}
                  sx={{
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'white',
                      boxShadow: `inset 0 -2px 0 0 ${accentColor}`,
                      transition: 'all 0.3s ease-in-out',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  {page === 'Cart' ? (
                    <Badge badgeContent={cartItemsCount} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  ) : (
                    page
                  )}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography sx={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}>ElecTech</Typography>
              </Link>
            </Box>

            {/* يمين: أيقونة البروفايل مع عرض ثابت فقط في الديسكتوب */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width: { xs: 'auto', md: '200px' },
                justifyContent: 'flex-end',
              }}
            >
              {isLoggedIn && (
                <>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: 'white',
                        color: 'black',
                        fontSize: '0.8rem',
                        '&:hover': {
                          boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
                          transition: 'box-shadow 0.3s ease-in-out',
                        },
                      }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem onClick={handleCloseUserMenu} component={Link} to="/UserProfile">
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
