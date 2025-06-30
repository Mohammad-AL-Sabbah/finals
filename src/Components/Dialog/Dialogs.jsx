import React, { useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useTheme } from '@mui/material/styles';
import { Heart } from 'react-feather';
import { Link } from 'react-router-dom';

export default function ProductDialog({ open, handleClose, product }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs')); 
  const isSm = useMediaQuery(theme.breakpoints.down('sm')); 
  const isMd = useMediaQuery(theme.breakpoints.down('md')); 
  const isNestHub = useMediaQuery('(max-height:600px) and (max-width:1024px)');
  

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




  const [userRating, setUserRating] = useState(product?.rating || 0);
    const [likedProducts, setLikedProducts] = useState([]);
  const handleLike = (id) => {
  setLikedProducts((prev) =>
    prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
  );
};


  if (!product) return null;

  const flexDirection = isMd ? 'column' : 'row-reverse';

  return (
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
      {/* زر الإغلاق */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          border: '1px solid',
          bgcolor: 'background.paper',
          borderRadius: '50%',
          zIndex: 1,
          transition: '0.3s',
          '&:hover': {
            transform: 'rotate(90deg)',
            color: 'error.main',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* المحتوى */}
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
        {/* الصورة */}
        <Box
          sx={{
            flex: 1,
            maxHeight: isNestHub || isXs || isSm ? 180 : isMd ? 300 : 'auto',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={product.mainImg}
            alt={product.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: 0,
              display: 'block',
            }}
          />
        </Box>

        {/* التفاصيل */}
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
          <Box sx={{ mt: '18px' ,pt:'10px'}}>
            <Typography variant="h5" fontWeight="bold" mb={1} mt={1}>
              {product.name}
            </Typography>

            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              fontSize="14px"
              color="text.secondary"
              mb={2}
            >
              <span style={{ color: '#d4a373', marginRight: '4px' }}>
                Shipping is calculated at checkout
              </span>
              <LocalShippingIcon style={{ color: '#d4a373', marginRight: '4px' }} />
            </Typography>

            <Typography variant="body2" mb={2}>
              {product.description}
            </Typography>
          </Box>

          {/* الكمية */}
          <Box
            mt={2}
            sx={{
              width: 'fit-content',
              border: '1px solid #ccc',
              borderRadius: '24px',
              padding: '4px 8px',
            }}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <IconButton>
              <AddIcon />
            </IconButton>
            <Typography>1</Typography>
            <IconButton>
              <RemoveIcon />
            </IconButton>
          </Box>

  <Box mt={2}>
            <Typography fontSize="14px">in stock: {product.quantity} product</Typography>
          </Box>
          {/* التقييم */}

          <Box sx={{ display: 'flex', alignItems: 'center', mt: '10px', mb: '10px' }}>
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

          <Typography variant="h5" fontWeight="bold" color="black" mb={1}>
            Price is : {product.price}$
          </Typography>

          {/* الأزرار */}
          <Box mt={3} display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              sx={{ flex: 1, bgcolor: '#d4a373', '&:hover': { bgcolor: '#c58f5f' } }}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              sx={{ flex: 1, bgcolor: '#000', '&:hover': { bgcolor: '#333' } }} 
              
                   component={Link}
              to="/checkout"
              >
              Buy Now
            </Button>
          </Box>

        

          {/* مشاركة */}
          <Box mt={2} display="flex" gap={1}>

<IconButton onClick={() => handleLike(product.id)}>
  <Heart color={likedProducts.includes(product.id) ? 'red' : 'gray'} fill={likedProducts.includes(product.id) ? 'red' : 'none'} size={24} strokeWidth={1.2} />
</IconButton>

        <IconButton aria-label="share" onClick={() => handleShare(product)}>
  <ShareIcon />
</IconButton>

          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
