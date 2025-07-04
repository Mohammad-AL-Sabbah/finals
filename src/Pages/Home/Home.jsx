import React from 'react'
import Products from '../../Components/Products/Products'
import { Box } from '@mui/material'
import Category from '../../Components/Category/Category';
import MyCarousel from "../../Components/Carousel/MyCarousel.jsx";
import Ads from '../../Components/AdsGlopal.jsx/Ads';

function Home() {
  const title = document.getElementById('title');
  title.innerHTML = 'ElecTech Shop';
  
  return (
    <>
    <MyCarousel />
    <Category/>
        <Ads />

     {/* فش منتجات بتكفي شغال هيك للتجربة */}
<Box sx={{  display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 'auto',
    flexWrap: 'wrap',}}>
 <Products />  
<Products  />  
 <Products />  
 <Products />  
  <Products />  
 <Products />  

 <Products />  
  <Products />  

</Box>


    </>

  )
}

export default Home