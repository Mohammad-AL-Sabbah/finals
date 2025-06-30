import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ProductDetailsModal from '../Dialog/Dialogs';
import { Heart } from 'react-feather';


function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);


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
  };
  
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


const handleLike = (id) => {
  setLikedProducts((prev) =>
    prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
  );
};


  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              maxWidth: 245,
              height: 310,             
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="img"
              height="240"              
              image={product.mainImg}
              alt={product.description || product.name}
              sx={{ objectFit: 'cover', width: '100%' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="black" noWrap sx={{fontSize: '17px'}}>
                {product.name}
              </Typography>
              <Typography variant="span" color="text.secondary" noWrap>
                Price is :{product.price}$
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', gap: 2 }}>

<IconButton onClick={() => handleLike(product.id)}>
  <Heart color={likedProducts.includes(product.id) ? 'red' : 'black'} fill={likedProducts.includes(product.id) ? 'red' : 'none'} size={24} strokeWidth={1.2} />
</IconButton>

                   <IconButton aria-label="share" onClick={() => handleShare(product)}>
  <ShareIcon color='black' />
</IconButton>
              <Button variant="outlined" size="small" onClick={() => handleOpen(product)}>
                Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <ProductDetailsModal open={open} handleClose={handleClose} product={selectedProduct} />
    </>
  );
}

export default Products;
