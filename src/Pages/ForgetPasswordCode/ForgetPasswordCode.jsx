import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Avatar
} from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from 'react-router-dom';

function ForgetPasswordCode() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(show => !show);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(show => !show);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/Account/SendCode`, {
        email: data.email,
        code: data.code,
        password: data.password,
        ConfirmPassword: data.confirmPassword
      });

      if(response.status === 200){
        setMessage('Password reset successful!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setMessage('Error resetting password. Please check your data and try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const title = document.getElementById('title');
  if(title) title.innerHTML = 'Reset Password'; 
  const password = watch('password');

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
        backgroundImage: 'url(https://raw.githubusercontent.com/creativetimofficial/public-assets/master/twcomponents/header.webp)',
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
      <Paper elevation={8} sx={{ zIndex: 1, p: 4, width: '100%', maxWidth: 420, borderRadius: 4, textAlign: 'center', backgroundColor: 'white' }}>
        <Avatar sx={{ bgcolor: '#667eea', mx: 'auto', mb: 2 }}>
          <LockResetIcon />
        </Avatar>

        <Typography variant="h5" fontWeight="bold" gutterBottom>Reset Password</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Verification Code"
            {...register('code', { required: 'Code is required', minLength: { value: 4, message: 'Code must be at least 4 characters' } })}
            error={!!errors.code}
            helperText={errors.code?.message}
            fullWidth
          />

          <TextField
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end" aria-label="toggle password visibility">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword} edge="end" aria-label="toggle confirm password visibility">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button type="submit" variant="contained" disabled={loading} fullWidth>
            {loading ? 'Submitting...' : 'Reset Password'}
          </Button>

          {message && (
            <Typography color={message.includes('successful') ? 'green' : 'error'} textAlign="center" mt={2}>
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default ForgetPasswordCode;
