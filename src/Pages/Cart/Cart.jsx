/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
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
import { Link } from 'react-router';
import { CartContext } from '../../Context/CartContext';
import React from 'react';

function Cart() {
  const [products, setProducts] = useState([]);
  const [Isloading, setIsLoading] = useState(true);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { cartItems, setCartItems } = React.useContext(CartContext);

  const getProductById = async () => {
    const { data } = await AuthToken.get(`/Carts`);
    setProducts(data.cartResponse);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductById();
    document.title = 'Cart';
  }, []);

  const incress = async (id) => {
    await AuthToken.patch(`/Carts/increaseCount/${id}`, {});
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, count: product.count + 1 } : product
    );
    setProducts(updatedProducts);
  };

const decress = async (id) => {
  await AuthToken.patch(`/Carts/decreaseCount/${id}`, {});
  const updatedProducts = products
    .map((product) =>
      product.id === id ? { ...product, count: product.count - 1 } : product
    )
    .filter((product) => product.count > 0);

  setProducts(updatedProducts);


  if (updatedProducts.length === 0) {
    setCartItems(0);
  } else {
    setCartItems(updatedProducts.length);
  }
};


  const deleteItem = async (id)=>{
    const response = await AuthToken.delete(`/Carts/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      
setCartItems(cartItems - 1);
  }
  const deleteProduct = async (id) => {
    await AuthToken.delete(`/Carts/deleteProduct/${id}`);
    setProducts(products.filter((product) => product.id !== id));
  };

  const clearCart = async () => {
    await AuthToken.delete(`/Carts/clearCart`);
    setProducts([]);
  };

  const clearCartHandler = () => {
    setOpenConfirmDialog(true);
  };

  const total = products.reduce((sum, item) => sum + item.price * item.count, 0);

  if (Isloading) return <Loader />;

  if (products.length === 0) {
    return (
      <Box
        sx={{
          height: '100vh',
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }

          ,
        }}
      >
        <Box sx={{ flex: 1, mr: { md: 3 }, mb: { xs: 3, md: 0 } }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}
          >
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
          <Typography
            variant="subtitle1"
            fontWeight="600"
            sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}
          >
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

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ flex: 1, mr: { md: 3 }, mb: { xs: 3, md: 0 } }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
          Shopping Cart
        </Typography>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            px: 2,
            mb: 1,
            fontWeight: 'bold',
            justifyContent: 'space-evenly',
          }}
        >
          <Box sx={{ width: '30%', textAlign: 'center' }}>PRODUCT</Box>
          <Box sx={{ width: '20%', textAlign: 'center' }}>PRICE</Box>
          <Box sx={{ width: '30%', textAlign: 'center' }}>QUANTITY</Box>
        </Box>

        {products.map((item) => (
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
                    width: { md: '30%', xs: '100%' },
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                  }}
                >
                  <img
                    src="https://placehold.co/600x400"
                    alt={item.name}
                    width="150"
                    height="150"
                    style={{ borderRadius: '8px' }}
                  />
                  <Box>
                    <Typography fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2">
                      description: {item.description}
                    </Typography>
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
                  <IconButton size="small" color="error" onClick={() => deleteItem(item.id)} >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 4 }} />
        <Button
          sx={{ fontWeight: 'bold' }}
          onClick={clearCartHandler}
          variant="contained"
          color="error"
          size="large"
          fullWidth
        >
          Clear Cart
        </Button>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: 320 },
          height: { xs: 'auto', md: '90vh' },
          backgroundColor: '#fafafa',
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          p: 3,
          position: { md: 'sticky' },
          top: { md: 16 },
          alignSelf: { md: 'flex-start' },
          overflowY: 'auto',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          mb: { xs: 4, md: 0 },
        }}
      >
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
              ${total.toFixed(2)}
            </Typography>
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight="600"
            sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}
          >
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
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button component={Link} to='/checkout' variant="contained" color="primary" size="large" fullWidth>
            Checkout
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
  );
}

export default Cart;
