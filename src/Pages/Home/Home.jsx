import React from 'react'
import Products from '../../Components/Products/Products'
import { Box, Typography } from '@mui/material'
import Category from '../../Components/Category/Category';
import MyCarousel from "../../Components/Carousel/MyCarousel.jsx";
import Ads from '../../Components/AdsGlopal/Ads';
import WelcomePopup from '../../Components/WelcomePopup/WelcomePopup.jsx';


function Home() {
  const title = document.getElementById('title');
  title.innerHTML = 'ElecTech Shop';
  
  return (
    <>
    <WelcomePopup />
    <MyCarousel />
    <Category/>
        <Ads />

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
    <MyCarousel/>

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
        <Ads />

    </>

  )
}

export default Home