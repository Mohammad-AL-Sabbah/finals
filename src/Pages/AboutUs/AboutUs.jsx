import React from 'react'
import { Box, Typography } from '@mui/material'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


function AboutUs() {
  return (
    <>
    <Box sx={{height:'100vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Box sx={{height:'80%',width:'70%',display:'flex',justifyContent:'center',margin:'auto',flexDirection:'column',alignItems:'center',}}>
                    <Typography variant="h4" color="text.secondary" sx={{textAlign:'center',fontSize:'3rem',fontWeight:'bold',margin:'auto',width:'50%',mt:10}}>Comming Soon!</Typography>
  <DotLottieReact
src="/About/Artificial Intelligence Chatbot.lottie"
      
      loop
      autoplay
    />

    </Box>
    </Box>

    </>
  )
}

export default AboutUs




