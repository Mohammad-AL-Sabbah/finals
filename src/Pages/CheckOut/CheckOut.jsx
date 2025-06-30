import { Box, Card, FormControl, Radio, RadioGroup, Typography } from '@mui/material'
import styles from './CheckOut.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
function CheckOut() {
  const [paymentMethod, setPaymentMethod] = useState('visa');

 const handlePaymentChange = (event) => {
  setPaymentMethod(event.target.value);
  console.log(event.target.value);
};

const handlePay = async () => {
  const token = localStorage.getItem('Usertoken');
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BURL}/CheckOuts/Pay`,
      {
        PaymentMethod: paymentMethod,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      }
    );
    if(paymentMethod == 'Visa'){
      window.location.href = response.data.url
    }
  
  } catch (error) {
    console.error("حدث خطأ أثناء الدفع:", error);
  }
};
  return (
     <>
     <Box className={styles.container}  >
      <Card sx={{p:2}} className={styles.card}>
      <Typography variant="h2" className={styles.checkout}>Check Out</Typography>
      <Typography variant='span' sx={{fontSize:"20px"}}>Choose your payment method<br/>you will be redirected to the payment page </Typography>
      <FormControl>
        <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
          <Typography variant="h5" sx={{fontWeight:"bold",mb:2}}>Payment Method</Typography>
       <FormControlLabel value="Cashondelivery" control={<Radio />} sx={{ mb:2,'& .MuiFormControlLabel-label': { fontSize: '15px', fontWeight:"bold",backgroundColor:"green",color:"white",p:1,borderRadius:"10px", } }}
  label="Cash on delivery" />
       <FormControlLabel value="Visa" control={<Radio />}   sx={{ '& .MuiFormControlLabel-label': { fontSize: '15px', fontWeight:"bold",backgroundColor:"#3760C9",color:"white",p:1,px:2,borderRadius:"10px" } }}
 label="Visa card" />
        </RadioGroup>
      </FormControl>
              <Button onClick={handlePay} variant="contained" color='success' sx={{width:"100%",height:"40px"}}>Confirm Payment</Button>
      </Card>
     </Box>
     </>
  )
}

export default CheckOut