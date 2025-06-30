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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '@mui/material/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
export default function ProductDialog({ open, handleClose, product }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs')); // <600px
  const isSm = useMediaQuery(theme.breakpoints.down('sm')); // <900px
  const isMd = useMediaQuery(theme.breakpoints.down('md')); // <1200px
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg')); // >=1200px

  // ميديا كويري خاص بـ Nest Hub (تقريباً شاشة 7 بوصة)
  const isNestHub = useMediaQuery('(max-height:600px) and (max-width:1024px)');

  const [userRating, setUserRating] = useState(product?.rating || 0);

  if (!product) return null;

  // تحديد اتجاه المحتوى (صورة يمين على الشاشات الكبيرة، عمودي على الصغيرة)
  const flexDirection = isMd ? 'column' : 'row-reverse';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          maxWidth: '800px',
          minHeight: isNestHub ? '60vh' : isXs ? '70vh' : '80vh',
          width: isXs ? '95%' : '90%',
          overflow: 'hidden',
          borderRadius: 2,
        },
      }}
    >
      {/* زر الإغلاق */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 10,
          border: '1px solid',
          bgcolor: 'background.paper',
          borderRadius: '50%',
          left: 10,
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
          height: '100%',
          maxHeight: isNestHub ? 'calc(60vh - 48px)' : 'auto', // ناقص ارتفاع الهيدر
          overflowY: isNestHub ? 'auto' : 'visible',
        }}
      >
        {/* الصورة */}
        <Box
          sx={{
            flex: 1,
            height: isNestHub || isXs || isSm ? 180 : isMd ? 300 : 'auto',
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
              width: '100%',
              height: '100%',
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
            justifyContent: 'space-between',
            height: isLgUp ? '100%' : 'auto',
          }}
        >
          <Box sx={{marginTop:'30px'}}>
            <Typography variant="h4" fontWeight="bold" mb={1} mt={3}>
              {product.name}
            </Typography>

        

            <Typography sx={{ display: 'flex', alignItems: 'center' }}  fontSize="14px" color="text.secondary" mb={2}>
<span style={{ color: '#d4a373', marginRight: '4px' }}> Shipping is calculated at checkou</span>
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
        
         

            
            {/* التقييم قابل للتغيير من المستخدم */}
            <Box sx={{ display: 'flex', alignItems: 'center',mt:'20px',mb:'10px' }}>

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
            >
              Buy Now
            </Button>
          </Box>

          <Box mt={2}>
            <Typography fontSize="14px">in stock: {product.quantity} product</Typography>
          </Box>

          {/* مشاركة */}
          <Box mt={2} display="flex" gap={1}>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
