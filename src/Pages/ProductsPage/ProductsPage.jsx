import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
  CardActionArea,
  Pagination,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCart from '../../Buttons/AddToCart/AddToCart';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductPage() {
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  },[]);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState('10');

  const imageUrls = [
    'https://img.freepik.com/premium-photo/sony-playstation-5-white-background_971991-8863.jpg?w=360',
    'https://st.depositphotos.com/10617446/56390/i/450/depositphotos_563907420-stock-photo-playstation-console-isolated-white-background.jpg',
    'https://t4.ftcdn.net/jpg/04/26/08/33/360_F_426083371_CMd6IErmmdHDI8b5SGGU3uMEGIlMUCxW.jpg',
    'https://sonyworld.ae/cdn/shop/files/PS5_D_SA_RNDR_FT_RGB_AE_231018.jpg?v=1715855464&width=1080',
    'https://i.pcmag.com/imagery/articles/03Drfwl2bhP6L2wHX2fdEOE-1..v1707236882.jpg',
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

  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(1);

  const token = localStorage.getItem('Usertoken');

  const fetchProductById = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`);
    if (data.mainImageUrl) setMainImageUrl(data.mainImageUrl);
    else if (imageUrls.length > 0) setMainImageUrl(imageUrls[0]);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProductById,
  });

  const addReviewMutation = useMutation({
    mutationFn: (newReview) =>
      axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/${id}/Reviews/Create`,
        newReview,
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: () => {
      toast.success('Review submitted successfully!');
      queryClient.invalidateQueries(['product', id]);
      setComment('');
      setRate(1);
      setPage(1); 
    },
    onError: (err) => {
      toast.error('Failed to submit review: ' + err.message);
    },
  });

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

  const handleShippingChange = (event) => {
    setShipping(event.target.value);
  };

  const handleSubmitReview = () => {
    if (!token) {
      toast.error('You must be logged in to submit a review.');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please write a comment before submitting.');
      return;
    }

    addReviewMutation.mutate({ Rate: rate, Comment: comment });
  };

  const [page, setPage] = useState(1);
  const reviewsPerPage = 4;

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <Loader />;

  const title = document.getElementById('title');
  if (title) title.innerHTML = data.name;

  const reviews = data?.reviews || [];
  const pageCount = Math.ceil(reviews.length / reviewsPerPage);
  const paginatedReviews = reviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  

  return (
    <>
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto', mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', lg: 'row' },
            gap: 4,
            height: 'fit-content',
          }}
        >
          <Box sx={{ flex: 1, height: 'fit-content' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {data.name}
            </Typography>

            <Typography variant="h6" color="primary" gutterBottom>
              Price: {data.price}$
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
              Description: {data.description}
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
              Available quantity: {data.quantity} products
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 4, mb: 1 }}>
              Available Colors:
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
                    border:
                      selectedColor.name === color.name
                        ? '3px solid #2196f3'
                        : '2px solid #ccc',
                    transition: '0.2s ease-in-out',
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

            <Box sx={{ mt: 2 }}>
              <AddToCart product={data} quantity={quantity} shippingCost={shipping} />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              direction: 'rtl',
              flex: 1,
              gap: 2,
              height: 'fit-content',
            }}
          >
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
                    border: url === mainImageUrl ? '2px solid #facc15' : '2px solid #ccc',
                  }}
                />
              ))}
            </Box>
            <Box sx={{ flex: 1, position: 'relative', height: 'fit-content' }}>
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
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.7)',
                    left: lensPos.x - lensSize / 2,
                    top: lensPos.y - lensSize / 2,
                    backgroundImage: `url(${mainImageUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `${imgRef.current?.width * zoom}px ${
                      imgRef.current?.height * zoom
                    }px`,
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

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row-reverse',
        }}
      >
  
        <Box sx={{ height: 'fit-content', width: 'fit-content', ml: 5 }}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row-reverse',
              gap: 1,
              mb: 2,
            }}
          >
          <TextField
  onChange={(e) => setComment(e.target.value)}
  value={comment}
  label="Your review"
  multiline
  maxRows={3}
  sx={{
    width: {
      xs: '150px',
      sm: '250px',
      md: '400px',
      lg: '600px',
      xl: '800px',
    },
  }}
/>


            <TextField
              type="number"
              onChange={(e) => setRate(+e.target.value)}
              value={rate}
              inputProps={{ min: 1, max: 5 }}
              label="Rate (1 to 5)"
              sx={{ width: 120 }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleSubmitReview}>
              Submit Review
            </Button>
          </Box>
        </Box>
      </Box>

     
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          mb: 3,
          mt: 3,
          px: 2,
        }}
      >
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((review) => (
            <Card
              key={review.id}
              sx={{
                width: 280,
                minHeight: 250,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(33, 44, 165, 0.1)',
                bgcolor: 'background.paper',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 12, 234, 0.32)',
                  transform: 'translateY(-8px)',
                  bgcolor: '#f9fafb',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  gutterBottom
                  sx={{ color: 'primary.main', fontSize: '18px' }}
                >
                  <span style={{ color: 'black' }}>Customer name:</span> {review.reviewerName}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  {review.reviewDate}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: 'text.primary',
                    letterSpacing: '0.05em',
                  }}
                >
                  Rating: {review.rate} / 5
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: 'italic',
                    color: 'text.secondary',
                    lineHeight: 1.5,
                  }}
                >
                  About Product : "{review.comment}"
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No reviews yet.
          </Typography>
        )}
      </Box>

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      )}
    </>
  );
}
