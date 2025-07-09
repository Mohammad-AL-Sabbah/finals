import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasswordReset from '../../Buttons/BasswordReset';

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
      component="form" 
      onSubmit={handleSubmit(onSubmit)} 
      sx={{ 
        width: '90%', maxWidth: 400, mx: 'auto', mt: 8, 
        display: 'flex', flexDirection: 'column', gap: 2, height: "50vh" 
      }}
    >
      <Typography variant="h5" align="center" fontWeight="bold">
        Reset Password
      </Typography>

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

      {/* زر إعادة تعيين كلمة المرور */}
      <BasswordReset name={buttonName || "Send Reset Link"} />
    </Box>
  );
}

export default ForgetPassword;
