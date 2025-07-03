import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const pages = ['Register', 'Login', 'About US', 'Contact'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  maxWidth: 550,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const SearchInMenu = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  margin: theme.spacing(1, 2),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #ccc',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: 'black',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const half = Math.ceil(pages.length / 2);
  const leftPages = pages.slice(0, half);
  const rightPages = pages.slice(half);

  // لتحويل النص إلى مسار URL مهيأ
  const toPath = (page) => '/' + page.toLowerCase().replace(/\s+/g, '-');

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Mobile: hamburger menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile: logo on right */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'flex-end' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Stors</p>
            </Link>
          </Box>

          {/* Mobile menu */}
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuItem disableRipple disableGutters>
              <SearchInMenu>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </SearchInMenu>
            </MenuItem>
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={handleCloseNavMenu}
                component={Link}          // الربط بمسار react-router
                to={toPath(page)}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>

          {/* Desktop layout */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, alignItems: 'center' }}>
            {/* Left: Logo + Left Pages */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box sx={{ mr: 2 }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Stors</p>
                </Link>
              </Box>
              {leftPages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ color: 'white' }}
                  component={Link}
                  to={toPath(page)}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* Center: Search */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box>

            {/* Right: Remaining Pages */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {rightPages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ color: 'white' }}
                  component={Link}
                  to={toPath(page)}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
