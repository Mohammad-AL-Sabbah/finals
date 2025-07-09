import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import AddToCart from '../../Buttons/AddToCart/AddToCart';

export default function ProductPage() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState('10');
  
  // ✅ الصور كمصفوفة روابط URLs
  const imageUrls = [
    'https://img.freepik.com/premium-photo/sony-playstation-5-white-background_971991-8863.jpg?w=360',
    'https://st.depositphotos.com/10617446/56390/i/450/depositphotos_563907420-stock-photo-playstation-console-isolated-white-background.jpg',
    'https://t4.ftcdn.net/jpg/04/26/08/33/360_F_426083371_CMd6IErmmdHDI8b5SGGU3uMEGIlMUCxW.jpg',
    'https://sonyworld.ae/cdn/shop/files/PS5_D_SA_RNDR_FT_RGB_AE_231018.jpg?v=1715855464&width=1080',
    'https://i.pcmag.com/imagery/articles/03Drfwl2bhP6L2wHX2fdEOE-1..v1707236882.jpg'
  ];
  const [mainImageUrl, setMainImageUrl] = useState(imageUrls[0]);

  const imgRef = useRef(null);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, visible: false });

  const lensSize = 150;
  const zoom = 2;

  const colorOptions = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#000000' },
    { name: 'Red', hex: '#D94C3D' },
    { name: 'Gold', hex: '#F4A400' },
    { name: 'Blue', hex: '#3B28D8' },
  ];
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

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

  const getByid = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`);
      setData(data);
      if (data.mainImageUrl) setMainImageUrl(data.mainImageUrl);
      else if (imageUrls.length > 0) setMainImageUrl(imageUrls[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const title = document.getElementById('title');
  if (title) title.innerHTML = data.name;
  useEffect(() => {
    getByid();
    setMainImageUrl(imageUrls[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
  };

  return (
    <>
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto', mt: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', lg: 'row' }, gap: 4 }}>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {data.name}
            </Typography>

            <Typography variant="h6" color="primary" gutterBottom>
              Price is : {data.price}$
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
              Product description: {data.description}
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
              quantity : {data.quantity} Products
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 4, mb: 1 }}>
              Available Colors :
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {colorOptions.map((color) => (
                <Box
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: color.hex,
                    cursor: 'pointer',
                    border: selectedColor.name === color.name ? '3px solid #2196f3' : '2px solid #ccc',
                    transition: '0.2s ease-in-out'
                  }}
                />
              ))}
            </Box>

            <RadioGroup value={shipping} onChange={handleShippingChange}>
              <FormControlLabel
                value="10"
                control={<Radio />}
                label="Packaging and Shipping - 3 days (10$ plus)"
              />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="Packaging and Shipping - 5 days (5$ plus)"
              />
            </RadioGroup>

            <TextField
              label="More Details from customer to Store (Optional)"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
            />

            <Box sx={{ mt: 2 }}></Box>
            <AddToCart product={data} quantity={quantity} shippingCost={shipping} />
          </Box>

          {/* صور المنتج */}
          <Box sx={{ display: 'flex', flexDirection: 'row', direction: 'rtl', flex: 1, gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {imageUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`thumb-${idx}`}
                  onClick={() => setMainImageUrl(url)}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    cursor: 'pointer',
                    objectFit: 'cover',
                    border: url === mainImageUrl ? '2px solid #facc15' : '2px solid #ccc'
                  }}
                />
              ))}
            </Box>
            <Box sx={{ flex: 1, position: 'relative' }}>
              <img
                ref={imgRef}
                src={mainImageUrl}
                alt="main-product"
                style={{
                  width: '100%',
                  maxWidth: 600,
                  height: 'auto',
                  borderRadius: 12,
                  objectFit: 'cover',
                  maxHeight: 600,
                  display: 'block',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
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
                    backgroundImage: `url(${mainImageUrl})`,
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
          </Box>
        </Box>
      </Box>
    </>
  );
}
