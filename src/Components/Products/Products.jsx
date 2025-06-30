import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import ProductDetailsModal from '../Dialog/Dialogs';
function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const getProduct = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`);
    setProducts(data);
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

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id}>
            <Typography>{product.name}</Typography>
            <img src={product.mainImg} alt={product.description} style={{ width: '200px', borderRadius: '8px' }} />
            <Button variant="outlined" onClick={() => handleOpen(product)}>Details</Button>
          </div>
        ))}
      </Box>

      <ProductDetailsModal
        open={open}
        handleClose={handleClose}
        product={selectedProduct}
      />
    </>
  );
}

export default Products;
