import { useState, useEffect, useRef } from 'react';
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
import { useParams } from 'react-router-dom';

export default function ProductPage() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState('10');
  
  const imageIds = [1015, 1016, 1020, 1021, 1024];
  const [mainImageId, setMainImageId] = useState(imageIds[0]);

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
      if (data.mainImageId) setMainImageId(data.mainImageId);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    getByid();
  }, [id]);

  const title = document.getElementById('title');
  if (title) title.innerHTML = data.name;

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto', direction: 'rtl', mt: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
       
        <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {imageIds.map((id) => (
              <img
                key={id}
                src={`https://picsum.photos/id/${id}/100/100`}
                alt={`thumb-${id}`}
                onClick={() => setMainImageId(id)}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  cursor: 'pointer',
                  objectFit: 'cover',
                  border: id === mainImageId ? '2px solid #facc15' : '2px solid #ccc'
                }}
              />
            ))}
          </Box>
          <Box sx={{ flex: 1, position: 'relative' }}>
            <img
              ref={imgRef}
              src={`https://picsum.photos/id/${mainImageId}/600/600`}
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
                  backgroundImage: `url(https://picsum.photos/id/${mainImageId}/600/600)`,
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

        {/* التفاصيل */}
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

          {/* خيارات اللون */}
          <Typography variant="subtitle1" sx={{ mt: 4, mb: 1 }}>
            :Avilable Colors
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {colorOptions.map((color) => (
              <Box
                key={color.name}
                onClick={() => setSelectedColor(color)}
                sx={{
                  width: 22,
                  height:22,
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



          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
            <IconButton
              color="primary"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              sx={{ border: '1px solid #ccc' }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6" sx={{ minWidth: 24, textAlign: 'center' }}>{quantity}</Typography>
            <IconButton
              color="primary"
              onClick={() => setQuantity(q => q + 1)}
              sx={{ border: '1px solid #ccc' }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          <TextField
            label="More Details from customer to Store (Optional)"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          />


          <Button
            variant="contained"
            sx={{
              mt: 4,
              px: 4,
              fontWeight: 'bold',
              fontSize: '1rem',
              backgroundColor: '#4fc4ca',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
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
                backgroundColor: '#388e3c',
                transform: 'scale(1.03)',
                boxShadow: '0 0 12px 4px rgba(76, 175, 80, 0.5)'
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
 