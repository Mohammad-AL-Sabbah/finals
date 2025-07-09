import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Rating,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useTheme } from '@mui/material/styles';
import { Heart } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginIcon from '@mui/icons-material/Login';
import { keyframes } from '@mui/system';
import AddToCart from '../../Buttons/AddToCart/AddToCart';

export default function ProductDialog({ open, handleClose, product }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isNestHub = useMediaQuery('(max-height:600px) and (max-width:1024px)');
  const Navigate = useNavigate();

  const handleShare = (product) => {
    const url = `${window.location.origin}/product/${product.id}`;
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: url,
      }).catch((error) => console.log('خطأ في المشاركة:', error));
    } else {
      alert('المتصفح لا يدعم ميزة المشاركة.');
    }
  };

  const handleBuyNow = () => {
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
              Navigate('/login');
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
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );
    } else {
        toast(
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem' , color:"red" }}>Something went wrong try add to cart </div>
  
        </div>,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );
    }
  };

  const [userRating, setUserRating] = useState(product?.rating || 0);
  const [likedProducts, setLikedProducts] = useState([]);
  const handleLike = (id) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const imgRef = useRef(null);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, visible: false });

  const lensSize = 150;
  const zoom = 2;

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    if (y < 0) y = 0;
    if (y > rect.height) y = rect.height;

    setLensPos({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setLensPos((pos) => ({ ...pos, visible: false }));
  };

  if (!product) return null;

  const flexDirection = isMd ? 'column' : 'row-reverse';

  const flash = keyframes`
    0% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 0, 0, 0); }
    50% { transform: scale(1.05); box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); }
    100% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 0, 0, 0); }
  `;

  return (
    <>
      <ToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: 900,
            minHeight: '50vh',
            width: '90%',
            margin: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(100% - 64px)',
            boxShadow: 'var(--MuiPaper-elevation24)',
            backgroundColor: '#fff',
            color: 'rgba(0, 0, 0, 0.87)',
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            border: '1px solid',
            bgcolor: 'background.paper',
            borderRadius: '50%',
            zIndex: 10,
            transition: '0.3s',
            '&:hover': {
              transform: 'rotate(90deg)',
              color: 'error.main',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent
          sx={{
            p: 0,
            display: 'flex',
            flexDirection,
            maxHeight: isNestHub ? '60vh' : isXs ? '70vh' : '80vh',
            overflowY: 'auto',
            height: 'auto',
          }}
        >
          <Box
            sx={{
              flex: 1,
              maxHeight: isNestHub || isXs || isSm ? 180 : isMd ? 300 : 'auto',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <img
              src={product.mainImg}
              alt={product.name}
              style={{
                width: '100%',
                height: 300,
                objectFit: 'contain',
                borderRadius: 0,
                display: 'block',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              ref={imgRef}
            />

            {lensPos.visible && (
              <div
                style={{
                  position: 'absolute',
                  pointerEvents: 'none',
                  width: lensSize,
                  height: lensSize,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 0 8px rgba(255,255,255,0.7)',
                  left: lensPos.x - lensSize / 2,
                  top: lensPos.y - lensSize / 2,
                  backgroundImage: `url(${product.mainImg})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: `${imgRef.current?.width * zoom}px ${imgRef.current?.height * zoom}px`,
                  backgroundPositionX: `-${lensPos.x * zoom - lensSize / 2}px`,
                  backgroundPositionY: `-${lensPos.y * zoom - lensSize / 2}px`,
                  borderRadius: 4,
                  zIndex: 5,
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              flex: 1,
              p: isXs ? 2 : 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              maxHeight: isNestHub ? 'calc(60vh - 48px)' : '70vh',
              overflowY: 'auto',
              height: 'auto',
            }}
          >
            <Box sx={{ mt: '18px', pt: '10px' }}>
              <Typography variant="h5" fontWeight="bold" mb={1} mt={1}>
                {product.name}
              </Typography>

              <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
                fontSize="14px"
                color="text.secondary"
                mb={2}
              >
                <span style={{ color: '#1976d2', marginRight: '4px' }}>
                  Shipping is calculated at checkout
                </span>
                <LocalShippingIcon style={{ color: '#1976d2', marginRight: '4px' }} />
              </Typography>

              <Typography variant="body2" mb={2}>
                {product.description} <br />
                <p style={{ color: '#388e3c', fontSize: '15px',fontWeight:"bold" }}>You can Zoom on the product </p>
              </Typography>
            </Box>

        

            <Box >
              <Typography fontSize="14px">Avilable in stock: {product.quantity} Products</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: '5px' }}>
              <span>Rate this product</span>
              <Rating
                value={userRating}
                precision={0.5}
                onChange={(event, newValue) => {
                  setUserRating(newValue);
                }}
                sx={{ ml: 1 }}
              />
            </Box>

            <Typography variant="h5" fontWeight="bold" color="black" >
              Price is : {product.price}$
            </Typography>

            <Box mt={1} mb={1} display="flex" gap={2} flexWrap="wrap">
              <AddToCart product={product} />

              <Button
                variant="contained"
                onClick={handleBuyNow}
                sx={{
                  flex: 1,
                  bgcolor: 'rgb(56, 142, 60)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#2e7d32',
                    animation: `${flash} 0.6s ease`,
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>

            <Box display="flex" gap={1}>
              <IconButton onClick={() => handleLike(product.id)}>
                <Heart
                  color={likedProducts.includes(product.id) ? 'red' : 'gray'}
                  fill={likedProducts.includes(product.id) ? 'red' : 'none'}
                  size={24}
                  strokeWidth={1.2}
                />
              </IconButton>

              <IconButton aria-label="share" onClick={() => handleShare(product)}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
