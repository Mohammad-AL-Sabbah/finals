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
  Button
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthButtons from '../../Buttons/AuthButtons';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const LoginUser = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/Account/Login`, data);
      localStorage.setItem('Usertoken', response.data.token);
      console.log(response);

      if (response.status === 200) {
        toast.success('Login successful!', {
          autoClose: 2000,
          position: 'top-center',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: 'colored',
        });

        setTimeout(() => {
          navigate('/');
        }, 2000); 
      }
    } catch (error) {
      console.log(error + "error");
      toast.error('Login failed. Please check your credentials.', {
        autoClose: 2000,
        position: 'top-center',
        theme: 'colored',
      });
    }
  };

  const title = document.getElementById('title');
  if (title) title.innerHTML = 'Login page';

  return (
    <>
      <Box
        component={'form'}
        onSubmit={handleSubmit(LoginUser)}
        sx={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
          flexDirection: 'column',
          gap: '1rem',
          height: '60vh'
        }}
      >
        <Typography variant='h3' sx={{ color: 'black', fontWeight: 'bold' }}>Login page</Typography>

        <TextField
          {...register('email')}
          type='email'
          fullWidth
          label="Email"
          required
          id="fullWidth"
          sx={{ width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' } }}
          InputLabelProps={{
            sx: {
              color: 'black',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              '&.Mui-focused': { color: 'black' },
              '& .MuiFormLabel-asterisk': { color: 'red' },
            },
          }}
          InputProps={{
            sx: {
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
            },
          }}
        />

        <FormControl fullWidth sx={{ width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' } }} variant="outlined" required>
          <InputLabel
            htmlFor="outlined-adornment-password"
            sx={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              '&.Mui-focused': { color: 'black' },
              '& .MuiFormLabel-asterisk': { color: 'red' },
            }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            {...register('password')}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'gray' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
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

        <AuthButtons text='Login' />

        <Box sx={{ mt: 1, textAlign: 'right' }}>
          <Link
            to="/forget-password"
            style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#1976d2', textDecoration: 'underline' }}
          >
            Forgot password?
          </Link>
        </Box>
      </Box>

      <ToastContainer />
    </>
  );
}

export default Login;
