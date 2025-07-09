import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem,
  Container, Button, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha, useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { useContext } from 'react';

const pagesGuest = ['Register', 'Login'];
const pagesAuth = ['Cart', 'About US'];

const accentColor = '#00bcd4';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 25,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  width: '100%',
  maxWidth: 550,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  transition: 'box-shadow 0.3s ease-in-out',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  fontSize: '1rem',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    borderRadius: 25,
    transition: theme.transitions.create(['background-color', 'border-radius'], {
      duration: 300,
    }),
    '&::placeholder': {
      color: '#e0e0e0',
      opacity: 1,
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      borderRadius: 25,
    },
  },
}));

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLoggedIn = Boolean(localStorage.getItem('Usertoken'));
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const theme = useTheme();

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
  const toPath = (page) => '/' + page.toLowerCase().replace(/\s+/g, '-');

  // التدرج حسب الوضع (light / dark)
  const navbarBackground = theme.palette.mode === 'dark'
    ? 'linear-gradient(90deg, #121212, #1976d2, #2c5364)' // لون أغمق للوضع الداكن
    : 'linear-gradient(90deg, rgb(68, 153, 190), #1976d2, #2c5364)'; // اللون الأصلي للوضع الفاتح

  return (
    <AppBar
      position="static"
      sx={{
        background: navbarBackground,
        color: 'white',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* موبايل */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>ElecTech</Typography>
            </Link>

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
                  {page === 'Cart' ? `Cart (${cartItems})` : page}
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
            {/* يسار: لوجو وروابط */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box sx={{ mr: 2 }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>ElecTech</Typography>
                </Link>
              </Box>
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
                  }}
                >
                  {page === 'Cart' ? `Cart (${cartItems})` : page}
                </Button>
              ))}
            </Box>

            {/* وسط: حقل البحث */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box>

            {/* يمين: روابط وأفاتار */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
