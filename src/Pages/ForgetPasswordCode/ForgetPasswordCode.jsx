import React, { useState } from 'react';
import { Box, TextField, Typography, Button, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; // ✅ استدعاء useNavigate

function ForgetPasswordCode() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // ✅ استخدام useNavigate

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
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400,height: '80vh', mx: 'auto', mt: 6, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center">Reset Password</Typography>

      <TextField
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
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
  );
}

export default ForgetPasswordCode;
