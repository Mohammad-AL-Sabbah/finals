/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AuthToken from '../../Api/ApiAuthToken';
import Loader from '../../Components/Loader/Loader';
import { Link } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import Ads from '../../Components/AdsGlopal/Ads';
import Products from '../../Components/Products/Products';


function Cart() {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['cartItems'],
    queryFn: async () => {
      const response = await AuthToken.get('/Carts');
      return response.data;
    },
    staleTime: 0,
  });

  if (isLoading) return <Loader />;
  if (isError) return <h1>{error.message}</h1>;

  const incress = async (id) => {
    await AuthToken.patch(`/Carts/increaseCount/${id}`, {});
    queryClient.setQueryData(['cartItems'], (oldData) => {
      const newCart = oldData.cartResponse.map((p) =>
        p.id === id ? { ...p, count: p.count + 1 } : p
      );
      return { ...oldData, cartResponse: newCart };
    });
  };

  const decress = async (id) => {
    await AuthToken.patch(`/Carts/decreaseCount/${id}`, {});
    refetch();
  };

  const deleteItem = async (id) => {
    await AuthToken.delete(`/Carts/${id}`);
    queryClient.setQueryData(['cartItems'], (oldData) => {
      const newCart = oldData.cartResponse.filter((item) => item.id !== id);
      return { ...oldData, cartResponse: newCart };
    });
  };

  const deleteProduct = async (id) => {
    await AuthToken.delete(`/Carts/deleteProduct/${id}`);
    queryClient.setQueryData(['cartItems'], (oldData) => {
      const newCart = oldData.cartResponse.filter((item) => item.id !== id);
      return { ...oldData, cartResponse: newCart };
    });
  };

  const clearCart = async () => {
    await AuthToken.delete(`/Carts/clearCart`);
    queryClient.setQueryData(['cartItems'], (oldData) => ({
      ...oldData,
      cartResponse: [],
    }));
  };

  const clearCartHandler = () => {
    setOpenConfirmDialog(true);
  };

  const total = data.cartResponse.reduce((sum, item) => sum + item.price * item.count, 0);

  if (data.cartResponse.length === 0) {
    return (
      <Box
        sx={{
          height: '100vh',
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        
        <Box sx={{ flex: 1, mr: { md: 3 }, mb: { xs: 3, md: 0 } }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            Shopping Cart
          </Typography>
          <Box
            sx={{
              height: '80%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 5,
                border: '2px solid #f60025',
                borderRadius: '10px',
                color: '#f60025',
              }}
            >
              Your Cart is Empty
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              borderBottom: '2px solid #1976d2',
              pb: 1,
              mb: 3,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Total:{' '}
            <Typography component="span" color="primary" fontWeight="bold">
              {total}
            </Typography>
          </Typography>
          <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
            Delivery Fees
          </Typography>
          {[
            { label: 'West Bank Areas', price: 10 },
            { label: 'Palestinian Interior', price: 20 },
            { label: 'Jerusalem', price: 15 },
          ].map(({ label, price }) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocalShippingIcon sx={{ color: '#1976d2', mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                {label}: ${price}
              </Typography>
            </Box>
          ))}
          <Typography variant="body2" sx={{ color: 'green', ml: 1, fontSize: 18 }}>
            Free delivery for orders above $100!
          </Typography>
          

        </Box>
      </Box>
    );
  }

  const title = document.getElementById('title');
  if (title) title.innerHTML = 'Cart';

  return (
    <Box>

   
    <Box sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ flex: 1, mr: { md: 3 }, mb: { xs: 3, md: 0 },mt:4 }}>
        

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            px: 2,
            mb: 1,
            fontWeight: 'bold',
            justifyContent: 'space-evenly',
          }}
        >
          <Box sx={{ width: '34%', textAlign: 'center' }}>PRODUCT</Box>
          <Box sx={{ width: '24%', textAlign: 'center' }}>PRICE</Box>
          <Box sx={{ width: '30%', textAlign: 'center' }}>QUANTITY</Box>
        </Box>

        {data.cartResponse.map((item) => (
          <Card key={item.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: { md: 'space-evenly' },
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: { md: '34%', xs: '100%' },
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                  }}
                >
                  <img
                    src="https://www.ubuy.com.ps/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFXZ1dVYXk3Q0wuX1NTNDAwXy5qcGc.jpg"
                    alt={item.name}
                    width="150"
                    height="150"
                    style={{ borderRadius: '8px' }}
                  />
                  <Box>
                    <Typography fontWeight="bold" sx={{fontSize: { xs: '0.8rem', md: '0.9rem',width:'100%' }}}>{item.name}</Typography>
                    <Typography variant="body2">description: {item.description}</Typography>
                  </Box>
                </Box>

                <Box sx={{ width: { md: '20%', xs: '100%' }, textAlign: 'center' }}>
                  <Typography>${item.price.toFixed(2)}</Typography>
                </Box>

                <Box
                  sx={{
                    width: { md: '30%', xs: '100%' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <IconButton size="small" color="primary" onClick={() => decress(item.id)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.count}</Typography>
                  <IconButton size="small" color="primary" onClick={() => incress(item.id)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => deleteItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 4 }} />
  
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: 500 },
          height: { xs: 'auto', md: '90vh' },
          backgroundColor: '#fafafa',
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          p: 3,
          position: { md: 'sticky' },
          top: { md: 16 },
          alignSelf: { md: 'flex-start' },
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          mb: { xs: 4, md: 0 },
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ borderBottom: '2px solid #1976d2', pb: 1, mb: 3 }}>
            Total:{' '}
            <Typography component="span" color="primary" fontWeight="bold">
              ${total.toFixed(2)}
            </Typography>
          </Typography>

          <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
            Delivery Fees
            
          </Typography>

          {[
            { label: 'West Bank Areas', price: 10 },
            { label: 'Palestinian Interior', price: 20 },
            { label: 'Jerusalem', price: 15 },
          ].map(({ label, price }) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocalShippingIcon sx={{ color: '#1976d2', mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                {label}: ${price}
              </Typography>
            </Box>
            
          ))}

          {total > 100 && (
            <Typography variant="body2" sx={{ color: 'green', ml: 1, fontSize: 18 }}>
              Free delivery for orders above $100!
            </Typography>
          )}
                    <Box  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
            
            
  src="https://media.istockphoto.com/id/1435116123/fr/vectoriel/autocollant-de-vente-black-friday.jpg?s=612x612&w=0&k=20&c=sQalu70vJNp8zPnMcaqjsxfKaN-ROvsttQDoqWQrXXI="            height="200"
            width="100%"
            alt="حبتسهميتسمن" />
          </Box>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button component={Link} to="/checkout" variant="contained" color="primary" size="large" fullWidth>
            Checkout
          </Button>
                <Button
          sx={{ fontWeight: 'bold',mt:2 }}
          onClick={clearCartHandler}
          variant="contained"
          color="error"
          size="large"
          fullWidth
        >
          Clear Cart
        </Button>
        </Box>
      </Box>

      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirm Clear Cart</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to clear your cart? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await clearCart();
              setOpenConfirmDialog(false);
            }}
            color="error"
            variant="contained"
          >
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Box>




     <Ads /> 
     <Box sx={{ borderBottom: '2px solid rgb(146, 146, 146)'}}> 

     </Box>
<Box
  sx={{
    mx: { xs: 2, md: 5 },
    mt: 5,
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'flex-start', sm: 'center' },
    gap: 2,
  }}
>
  <Typography
    variant="h5"
    fontWeight="bold"
    sx={{
      color: '#000',
      ml: { xs: 0, sm: 5 },
      pb: 1,
    }}
  >
    <span style={{ borderBottom: '2px solid rgb(0, 0, 0)', paddingBottom: 4 }}>
      Recommended for You
    </span>
  </Typography>

  <Button
    variant="contained"
    component={Link}
    to="/all-products"
    
    sx={{
      color: 'white',
      backgroundColor: '#1976d2',
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: 2,
      px: 3,
      ml: { xs: 0, sm: 5 },
      fontSize: '1rem',
      '&:hover': {
        backgroundColor: '#115293',
      },
    }}
  >
    <span style={{ fontSize: '1.5rem', marginRight: 8 }}>👉</span>
    Click to See More
  </Button>
</Box>

<Products />
     </Box>
  );
}

export default Cart;
