import React from 'react'
import { Button } from '@mui/material'


function AuthButtons(props) {
  return (
    <>
    
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
  {props.text}
</Button>
    
    
    
    </>
  )
}

export default AuthButtons