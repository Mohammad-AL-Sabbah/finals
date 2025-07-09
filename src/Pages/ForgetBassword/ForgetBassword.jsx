import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Typography,
  Alert,
  Paper,
  Avatar
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasswordReset from '../../Buttons/BasswordReset';
import LockResetIcon from '@mui/icons-material/LockReset';

function ForgetPassword({ buttonName }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/Account/ForgotPassword`, {
        email: data.email
      });
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccessMessage('If this email is registered, a reset link has been sent.');
      if (response.status === 200) {
        navigate('/forget-password-code');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  const title = document.getElementById('title');
  if (title) title.innerHTML = 'Forget Password';

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        backgroundImage: 'url(https://cdn-media-2.freecodecamp.org/w1280/5f9c9cfc740569d1a4ca3543.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          top: 0,
          left: 0,
          zIndex: 0,
        },
      }}
    >
      {/* Form Card */}
      <Paper elevation={8} sx={{ zIndex: 1, p: 4, width: '100%', maxWidth: 420, borderRadius: 4, textAlign: 'center', backgroundColor: 'white' }}> 
        <Avatar sx={{ bgcolor: '#667eea', mx: 'auto', mb: 2 }}>
          <LockResetIcon />
        </Avatar>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Forgot Your Password?
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Enter your registered email and we'll send you a reset link.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <TextField
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            fullWidth
          />

          <BasswordReset name={buttonName || 'Send Reset Link'} />
        </Box>
      </Paper>
    </Box>
  );
}

export default ForgetPassword;
