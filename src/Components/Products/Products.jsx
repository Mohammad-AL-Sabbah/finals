import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Snackbar,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Heart } from 'react-feather';
import ProductDetailsModal from '../Dialog/Dialogs';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`);
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleShare = (e, product) => {
    e.stopPropagation();
    const url = `${window.location.origin}/product/${product.id}`;
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: url,
        })
        .catch((error) => console.log('خطأ في المشاركة:', error));
    } else {
      navigator.clipboard.writeText(url);
      showMessage('تم نسخ رابط المنتج');
    }
  };

  const handleLike = (e, id) => {
    e.stopPropagation();
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
    showMessage(
      likedProducts.includes(id) ? 'تمت إزالة من المفضلة' : 'تمت الإضافة للمفضلة'
    );
  };

  const showMessage = (message) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        {products.map((product) => (
          <Card
            key={product.id}
            onClick={() => navigate(`/ProductsPage/${product.id}`)}
            image src={product.mainImg}
            elevation={0}
            sx={{
              maxWidth: 200,
              background: '#fff',
              borderRadius: 3,
              textAlign: 'center',
              position: 'relative',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 20px rgba(20,107,215,0.2)',
              },
              '&:hover .action-buttons': {
                opacity: 1,
                visibility: 'visible',
                transform: 'translateY(0) scale(1)',
              },
            }}
          >
            <Box sx={{ borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.mainImg}
                alt={product.description || product.name}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              />
              <Box
                className="action-buttons"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1,
                  opacity: 0,
                  visibility: 'hidden',
                  transform: 'translateY(10px) scale(0.95)',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255,255,255,0.0)',

                  // الأيقونات ظاهرة دائمًا على الشاشات الصغيرة
                  '@media (max-width: 600px)': {
                    opacity: 1,
                    visibility: 'visible',
                    transform: 'translateY(0) scale(1)',
                  },
                }}
              >
                <IconButton
                  onClick={(e) => handleLike(e, product.id)}
                  sx={{
                    backgroundColor: 'white',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#146bd7',
                      svg: { color: 'white', fill: 'white' },
                    },
                    svg: {
                      color: likedProducts.includes(product.id) ? 'red' : 'gray',
                      fill: likedProducts.includes(product.id) ? 'red' : 'none',
                      strokeWidth: likedProducts.includes(product.id) ? 1.5 : 1.2,
                      width: 24,
                      height: 24,
                    },
                  }}
                >
                  <Heart />
                </IconButton>

                <IconButton
                  onClick={(e) => handleShare(e, product)}
                  sx={{
                    backgroundColor: 'white',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#146bd7',
                      svg: { color: 'white' },
                    },
                    svg: {
                      color: 'gray',
                      width: 20,
                      height: 20,
                    },
                  }}
                >
                  <ShareIcon />
                </IconButton>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen(product);
                  }}
                  sx={{
                    backgroundColor: 'white',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#146bd7',
                      svg: { color: 'white' },
                    },
                    svg: {
                      color: 'gray',
                      width: 20,
                      height: 20,
                    },
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </Box>

            <CardContent sx={{ padding: '8px 0 0' }}>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontSize: '16px', fontWeight: 500 }}
                noWrap
              >
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $US {product.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <ProductDetailsModal open={open} handleClose={handleClose} product={selectedProduct} />

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

export default Products;
