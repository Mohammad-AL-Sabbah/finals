import React from 'react';
import { Button } from '@mui/material';
import AuthToken from '../../Api/ApiAuthToken';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddToCart(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return await AuthToken.post(`/Carts/${props.product.id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cartItems']); 
      toast.success(
        <span>
          Product added to cart <br />
          <Link
            to="/cart"
            style={{
              fontSize: '0.8rem',
              color: '#007bff',
              fontWeight: '500',
              textDecoration: 'none',
            }}
          >
            View Cart
          </Link>
        </span>,
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Bounce,
        }
      );
    },
    onError: (error) => {
      console.error('Error adding to cart:', error);
      toast.error('Error adding product to cart', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        transition: Bounce,
      });
    },
  });

  const handleAddToCart = async () => {
    const token = localStorage.getItem('Usertoken');
    if (!token) {
      toast.error(
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem' }}>Please login first</div>
          <Button
            color="black"
            size="small"
            startIcon={<LoginIcon />}
            onClick={() => {
              toast.dismiss();
              navigate('/login');
            }}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '0.8rem',
            }}
          >
            press to Login
          </Button>
        </div>,
        {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
          transition: Bounce,
        }
      );
      return;
    }

    await addToCartMutation.mutateAsync();
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
        rtl={props.dir}
      />

      <Button
        variant="contained"
        onClick={handleAddToCart}
        sx={{
          width: { xs: '90%', sm: '70%', md: '50%', lg: '35%' },
          backgroundColor: '#1976d2',
          fontWeight: 'bold',
          fontSize: '1rem',
          position: 'relative',
          overflow: 'hidden',
          color: 'white',
          direction: 'rtl',
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
            backgroundColor: '#1976d2',
          },
        }}
        disabled={addToCartMutation.isLoading}
      >
        {addToCartMutation.isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </>
  );
}

export default AddToCart;
