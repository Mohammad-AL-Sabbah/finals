import {
  Box,
  Card,
  FormControl,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
  Button,
  Divider,
} from '@mui/material';
import { useState, useEffect } from 'react';
import AuthToken from '../../Api/ApiAuthToken';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';

function CheckOut() {
  useEffect(() => {
    const title = document.getElementById('title');
    if (title) title.innerHTML = 'Check Out';
  }, []);

  const [paymentMethod, setPaymentMethod] = useState('visa');

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePay = async () => {
    try {
      const response = await AuthToken.post(`/CheckOuts/Pay`, {
        PaymentMethod: paymentMethod,
      });

      if (paymentMethod === 'Visa') {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('حدث خطأ أثناء الدفع:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa, #fce4ec)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        py: 4,
        animation: 'fadein 1s ease-in-out',
        '@keyframes fadein': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Card
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          borderRadius: '20px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
          backgroundColor: '#fff',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
            alt="checkout"
            style={{ width: 90, marginBottom: 10 }}
          />
          <Typography variant="h4" fontWeight="bold">
            Checkout
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', fontSize: '15px', mt: 1 }}
          >
            Choose your payment method and confirm your order
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <FormControl component="fieldset" fullWidth>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Payment Method
          </Typography>

          <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
            <FormControlLabel
              value="Cashondelivery"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalAtmIcon sx={{ mr: 1 }} />
                  Cash on Delivery
                </Box>
              }
              sx={{
                mb: 2,
                px: 2,
                py: 1,
                borderRadius: '10px',
                transition: '0.3s',
                backgroundColor:
                  paymentMethod === 'Cashondelivery' ? '#c8e6c9' : '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#dcedc8',
                },
              }}
            />

            <FormControlLabel
              value="Visa"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardIcon sx={{ mr: 1 }} />
                  Visa Card
                </Box>
              }
              sx={{
                mb: 2,
                px: 2,
                py: 1,
                borderRadius: '10px',
                transition: '0.3s',
                backgroundColor:
                  paymentMethod === 'Visa' ? '#bbdefb' : '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#cfd8dc',
                },
              }}
            />
          </RadioGroup>
        </FormControl>

        <Button
          onClick={handlePay}
          variant="contained"
          color="success"
          fullWidth
          sx={{
            mt: 3,
            height: '45px',
            fontWeight: 'bold',
            borderRadius: '12px',
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0, 128, 0, 0.2)',
          }}
        >
          Confirm Payment
        </Button>
      </Card>
    </Box>
  );
}

export default CheckOut;
