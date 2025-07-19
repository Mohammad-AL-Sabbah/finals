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
import { useMutation } from '@tanstack/react-query'; 
import AuthToken from '../../Api/ApiAuthToken';
import { Loader } from 'react-feather';

function Login() {
  const { register, handleSubmit,formState: { errors  }} = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const [Loading, setLoading] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const refreshCartItems = async () => {
    try {
      const { data } = await AuthToken.get('/Carts');
    
    } catch (error) {
      console.error('Failed to refresh cart items:', error);
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/Account/Login`, data);
      localStorage.setItem('Usertoken', response.data.token);
      return response;
    },
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success('Login successful!', {
          autoClose: 1000,
          position: 'top-center',
          theme: 'colored',
        });

        await delay(1000);        
        await refreshCartItems(); 
        setLoading(false);
        navigate('/', { replace: true });
      }
    },
    onError: () => {
      toast.error('Login failed. Please check your credentials.', {
        autoClose: 2000,
        position: 'top-center',
        theme: 'colored',
      });
      setLoading(false);
    },
  });

  const title = document.getElementById('title');
  if (title) title.innerHTML = 'Login page';

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden' }}>
      <Box
        sx={{
          flex: 1,
          backgroundImage: 'url(https://cdn-media-2.freecodecamp.org/w1280/5f9c9cfc740569d1a4ca3543.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' },
          minHeight: { md: '100vh', lg: '100%' },
        }}
      />
      <Box
        component="form"
        onSubmit={handleSubmit((data) => loginMutation.mutate(data))}
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
        <Typography variant='h4' fontWeight='bold' textAlign='center'>Login here</Typography>
        <Typography variant='body1' color='text.secondary' textAlign='center'>Good to see you again!</Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, justifyContent: 'center' }}>
          <Button variant='outlined' startIcon={<GoogleIcon />} color='error'>Google</Button>
          <Button variant='outlined' startIcon={<FacebookIcon />} color='primary'>Facebook</Button>
          <Button variant='outlined' startIcon={<EmailIcon />} color='secondary'>Yahoo</Button>
        </Box>

        <Box sx={{ width: '100%', maxWidth: 400, my: 2 }}>
          <Divider><Typography variant='caption'>or</Typography></Divider>
        </Box>

       

        <FormControl fullWidth variant="outlined"  sx={{ maxWidth: 400 }}>
          <InputLabel htmlFor="outlined-adornment-password">Email <span style={{ color: 'red' }}>*</span></InputLabel>
          <OutlinedInput
          
            {...register('email', {required:"email is required"})}
              label="Email *"

          />
        </FormControl>
        {errors.email?<p style={{color:'red'}}>{errors.email.message} </p>  :null }




        <FormControl fullWidth variant="outlined"  sx={{ maxWidth: 400 }}>
          <InputLabel htmlFor="outlined-adornment-password">Password <span style={{ color: 'red' }}>*</span></InputLabel>
          <OutlinedInput
            {...register('password', {required:"password is required"})}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {errors.password?<p style={{color:'red'}}>{errors.password.message} </p>  :null }

        <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'right' }}>
          <Link to="/forget-password" style={{ fontSize: '0.85rem', textDecoration: 'underline', color: theme.palette.primary.main }}>
            Forgot password?
          </Link>
        </Box>

        <Button type='submit' disabled={Loading} variant='contained' fullWidth sx={{ maxWidth: 400, mt: 1 }}>
          {Loading ? <Loader /> : `login`}
        </Button>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Link to="/Register" style={{ fontSize: '0.85rem', display: 'block', textDecoration: 'underline', color: theme.palette.primary.main }}>
            Don't have an account? Register here
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

export default Login;
