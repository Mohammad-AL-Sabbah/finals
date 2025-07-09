import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box, Drawer, CssBaseline, Toolbar, Typography, Divider,
  IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';

import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import Orders from '../../Components/Orders/Orders';
import Info from '../../Components/Info/Info';
import ChangePasswordForm from '../../Components/ChangePassword/ChangePassword';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(90deg, #0d47a1cc 0%, #1976d2cc 100%)' 
    : 'linear-gradient(90deg, #1976d2, #42a5f5)',
  color: '#fff',
  boxShadow: '0 4px 12px rgb(25 118 210 / 0.5)',
  // بدون انحناء:
  borderRadius: 0,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedComponent, setSelectedComponent] = React.useState('info');

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'info': return <Info />;
      case 'chang password': return <ChangePasswordForm />;
      case 'Orders': return <Orders sx={{ height: "100vh", mt: 5 }} />;
      default: return <Info />;
    }
  };

  const getIcon = (text) => {
    switch (text) {
      case 'info': return <InfoOutlinedIcon />;
      case 'chang password': return <LockResetOutlinedIcon />;
      case 'Orders': return <ShoppingCartOutlinedIcon />;
      default: return <InfoOutlinedIcon />;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            User Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div>
          <DrawerHeader sx={{ mb: 2 }}>
            <h4 style={{ textAlign: "center", fontWeight: "bold", width: '100%' }}>User Profile</h4>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['info', 'Orders', 'chang password'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => setSelectedComponent(text)}
                  selected={selectedComponent === text}
                >
                  <ListItemIcon>{getIcon(text)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>

        <Box sx={{ mb: 3, px: 2 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                justifyContent: 'center',
                py: 0.7,
                px: 1.5,
                color: '#1565c0',
                fontWeight: 500,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                borderRadius: 1,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: 'rgba(21, 101, 192, 0.1)',
                  color: '#0d47a1',
                },
              }}
            >
              <ExitToAppIcon fontSize="medium" sx={{ mr: 1 }} />
              Log Out
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
      <Main open={open}>
        <div style={{ ...theme.mixins.toolbar }} />
        {renderComponent()}
      </Main>
    </Box>
  );
}
