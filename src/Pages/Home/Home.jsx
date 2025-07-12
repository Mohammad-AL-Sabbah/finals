import React from 'react'
import Products from '../../Components/Products/Products'
import { Box, Typography } from '@mui/material'
import Category from '../../Components/Category/Category';
import MyCarousel from "../../Components/Carousel/MyCarousel.jsx";
import Ads from '../../Components/AdsGlopal/Ads';
import Banner from '../../Components/Banner/Banner';
import WelcomePopup from '../../Components/WelcomePopup/WelcomePopup.jsx';


function Home() {
  const title = document.getElementById('title');
  title.innerHTML = 'ElecTech Shop';
  
  return (
    <>
    <WelcomePopup />
    <MyCarousel img1="/Carousel/sample-1.jpg" img2="/Carousel/sample-2.jpg" />
    <Category/>
<Ads
  padding="61px 40px"
  bgcolor="#FFD35E"
  borderRadius="12px"
/>


     {/* فش منتجات بتكفي شغال هيك للتجربة */}
<Typography
  variant="h4"
  sx={{
    width: 'fit-content',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: '1.7rem',
    mt: 5,
    mb: 3,
    pb: 1,
    borderBottom: '2px solid #1976d2',
    marginLeft: 'auto',
    marginRight: 5,
  }}
>
  Latest Products
</Typography>
<Box sx={{  display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '3rem',
    flexWrap: 'wrap',}}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}> 

 <Products />  
    </Box>
    <MyCarousel img1="/Carousel/sample-1.jpg"  img2="/Carousel/sample-2.jpg"/>

</Box>
     {/* فش منتجات بتكفي شغال هيك للتجربة */}


<Typography
  variant="h4"
  sx={{
    width: 'fit-content',
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: '1.7rem',
    mt: 5,
    mb: 3,
    pb: 1,
    borderBottom: '2px solid #1976d2',
    marginLeft: 'auto',
    marginRight: 5,
  }}
>
  Most Products popular
</Typography>
<Box sx={{  display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '3rem',
    flexWrap: 'wrap',}}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}> 
 <Products />  

    </Box>
</Box>
   <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        '@media (max-width: 600px)': {
          flexDirection: 'column',
        },
      }}
    >
      <Banner url='https://global.hisense.com/dam/jcr:fbff4c8d-c3b4-45f9-8da9-cd6885d27ea0/og-image-H605G.jpg' />
      <Banner url='https://t4.ftcdn.net/jpg/06/40/64/53/360_F_640645306_ADDT2XPJVYKhd1tIkqZF2vK1MZX4aSb3.jpg' />
    </Box>

        <Ads />
    </>

  )
}

export default Home