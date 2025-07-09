import React from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
  Button,
  useTheme,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';

function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const registerUser = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/Account/register`, data);
      if (response.status === 200) {
        toast.success('Registration successful!', { autoClose: 2000, position: 'top-center', theme: 'colored' });
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.', { autoClose: 2000, position: 'top-center', theme: 'colored' });
    }
  };

  const title = document.getElementById('title');
  if (title) title.innerHTML = 'Register Page';

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh',
      flexDirection: { xs: 'column', md: 'row' },
      overflow: 'hidden'
    }}>

      <Box
        sx={{
          flex: 1,
          backgroundImage: 'url(https://e0.pxfuel.com/wallpapers/180/89/desktop-wallpaper-couple-alone-sunset-neon-mountains-moon.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' },
          minHeight: { md: '100vh', lg: '100%' },
        }}
      />

      <Box
        component="form"
        onSubmit={handleSubmit(registerUser)}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 6, md: 4 },
          py: { xs: 6, md: 0 },
          gap: 2,
          width: '100%',
          maxWidth: { md: '600px', lg: '700px' },
          mx: 'auto'
        }}
      >
        <Typography variant='h4' fontWeight='bold' textAlign='center'>Register here</Typography>
        <Typography variant='body1' color='text.secondary' textAlign='center'>Let's create your account</Typography>

        <TextField {...register('firstName')} label='First Name' required fullWidth sx={{ maxWidth: 400 }} />
        <TextField {...register('lastName')} label='Last Name' required fullWidth sx={{ maxWidth: 400 }} />
        <TextField {...register('userName')} label='User Name' required fullWidth sx={{ maxWidth: 400 }} />
        <TextField {...register('email')} label='Email' type='email' required fullWidth sx={{ maxWidth: 400 }} />

        <FormControl fullWidth variant="outlined" required sx={{ maxWidth: 400 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" required sx={{ maxWidth: 400 }}>
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <OutlinedInput
            {...register('confirmPassword')}
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <TextField {...register('birthOfDate')} type="date" label="Birthday" InputLabelProps={{ shrink: true }} required fullWidth sx={{ maxWidth: 400 }} />

        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{ maxWidth: 400, mt: 1 }}
        >
          Register
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Link to="/login" style={{ fontSize: '0.85rem', display: 'block', textDecoration: 'underline', color: theme.palette.primary.main }}>
            Already have an account? Login here
          </Link>
          <Link to="/" style={{ fontSize: '0.85rem', display: 'block', textDecoration: 'underline', color: theme.palette.primary.main }}>
            Back to Guest page
          </Link>
        </Box>

      </Box>

      <ToastContainer />
    </Box>
  );
}

export default Register;
