import React from 'react'
import { InputAdornment, TextField, Typography } from '@mui/material'
import { Box, FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';

function Register() {
const {register, handleSubmit} = useForm();

const registerUser = async (data) => {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/Account/register`, data);
}


 const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


    const title = document.getElementById('title');
  if(title) title.innerHTML = 'Register';  

  return (
    <>
    <Box sx={{width:"100%", marginBottom:'1rem' , height:'5rem', backgroundColor:'#757575',display:'flex', justifyContent:'center', alignItems:'center'}} >
        <Typography variant='h4' sx={{color:'white', padding:'1rem'}}>Register Page</Typography>
    </Box>

    <Box component={'form'} sx={{ width: '80%',display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit(registerUser)}>
       
   {/* =========  Fitst Name field ========= */}
<TextField
{...register('firstName')}
  fullWidth
  type='text'
  label="First Name"
  id="fullWidth"
  required
  sx={{ 
    width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' }  // متجاوب حسب حجم الشاشة
  }}
  InputLabelProps={{
    sx: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: '0.8rem',
      '&.Mui-focused': {
        color: 'black',
      },
       '& .MuiFormLabel-asterisk': {
        color: 'red',
      },
    },
  }}
  InputProps={{
    sx: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray', 
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
      },
    },
  }}
/>
   {/* ========= Fitst Name field end ========= */} 


   {/* =========  Last Name field ========= */}
<TextField
{...register('lastName')}
  fullWidth
  type='text'
  label="Last Name"
  required
  id="fullWidth"
  sx={{ 
    width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' }
  }}
  InputLabelProps={{
    sx: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: '0.8rem',
      '&.Mui-focused': {
        color: 'black',
      },
       '& .MuiFormLabel-asterisk': {
        color: 'red',
      },
    },
  }}
  InputProps={{
    sx: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black', 
      },
    },
  }}
/>

   {/* =========  Last Name field end ========= */}

   {/* =========  user Name field ========= */}

<TextField
{...register('userName')}
  fullWidth
  type='text'
  label="User Name"
  required
  id="fullWidth"
  sx={{ 
    width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' }
  }}
  InputLabelProps={{
    sx: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: '0.8rem',
      '&.Mui-focused': {
        color: 'black',
      },
       '& .MuiFormLabel-asterisk': {
        color: 'red',
      },
    },
  }}
  InputProps={{
    sx: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black', 
      },
    },
  }}/>


   {/* =========  user Name field end ========= */}

      {/* =========  Email field  ========= */}

<TextField
{...register('email')}
type='email'
  fullWidth
  label="Email"
  required
  id="fullWidth"
  sx={{ 
    width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' }
  }}
  InputLabelProps={{
    sx: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: '0.8rem',
      '&.Mui-focused': {
        color: 'black',
      },
       '& .MuiFormLabel-asterisk': {
        color: 'red',
      },
    },
  }}
  InputProps={{
    sx: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black', 
      },
    },
  }}/>
      {/* =========  Email field end  ========= */}

      {/* =========  Password field  ========= */}

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
      {/* =========  Password field end  ========= */}

            {/* ========= confirm Password field   ========= */}
<FormControl fullWidth sx={{ width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' } }} variant="outlined" required>
    
  <InputLabel

    htmlFor="outlined-adornment-password-confirm"
    sx={{
      color: 'black',
      fontWeight: 'bold',
      fontSize: '0.8rem',
      '&.Mui-focused': { color: 'black' },
      '& .MuiFormLabel-asterisk': { color: 'red' },
    }}
  >
    Confirm Password
  </InputLabel>
  <OutlinedInput
        {...register('confirmPassword')}

    id="outlined-adornment-password-confirm"
    type={showPassword ? 'text' : 'password'}
    label="Confirm Password"
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
            {/* ========= confirm Password field end  ========= */}

            {/* ========= Birthday field   ========= */}
<TextField
{...register('birthOfDate')}
  type="date"
  fullWidth
  required
  label="Birthday"
  id="birthday"
  sx={{ 
    width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' }
  }}
  InputLabelProps={{
    shrink: true, 
    sx: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: '0.8rem',
      '&.Mui-focused': {
        color: 'black',
      },
      '& .MuiFormLabel-asterisk': {
        color: 'red',
      },
    },
  }}
  InputProps={{
    sx: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
      },
    },
  }}
/>
   {/* ========= Birthday field end  ========= */}

<Button
  type="submit"
  variant="contained"
  sx={{
    width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' },
    backgroundColor: '#4caf50',
    fontWeight: 'bold',
    fontSize: '1rem',
    position: 'relative',
    overflow: 'hidden',
    color: 'white',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: '-75%',
      width: '50%',
      height: '100%',
      background:
        'linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)',
      transform: 'skewX(-25deg)',
      transition: 'right 1.2s ease',
      opacity: 0,
    },
    '&:hover:before': {
      right: '125%',
      opacity: 1,
    },
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  }}
>
  Register
</Button>

    </Box>
    </>
  )
}

export default Register
