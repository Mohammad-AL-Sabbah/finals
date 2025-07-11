import React, { useState, useMemo, useEffect } from 'react'; // Import useEffect for initial page load
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  PaginationItem,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Heart } from 'react-feather';
import ProductDetailsModal from '../../Components/Dialog/Dialogs';
import {
  useNavigate,
  useLocation, 
  Link, 
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

function AllProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [searchTerm, setSearchTerm] = useState(queryParams.get('search') || ''); 
  const [sortBy, setSortBy] = useState(queryParams.get('sort') || ''); 

  const navigate = useNavigate();

  const itemsPerPage = 2;

  const getProduct = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`);
    return data.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProduct,
    staleTime: 6 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const filteredSortedProducts = useMemo(() => {
    if (!data) return [];

    let filtered = data;

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(lowerSearch)
      );
    }

    switch (sortBy) {
      case 'nameAsc':
        filtered = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        filtered = filtered.slice().sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        filtered = filtered.slice().sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered = filtered.slice().sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  }, [data, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredSortedProducts.length / itemsPerPage);
  const currentProducts = filteredSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const newPage = parseInt(queryParams.get('page') || '1', 10);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
    const newSearchTerm = queryParams.get('search') || '';
    if (newSearchTerm !== searchTerm) {
      setSearchTerm(newSearchTerm);
    }
    const newSortBy = queryParams.get('sort') || '';
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    }
  }, [location.search]); 

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
    const url = `${window.location.origin}/ProductsPage/${product.id}`;
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

  const updateUrl = (page, search, sort) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page);
    if (search.trim()) params.set('search', search.trim());
    if (sort) params.set('sort', sort);

    const queryString = params.toString();
    navigate(`${location.pathname}${queryString ? `?${queryString}` : ''}`, { replace: true });
  };

  const onSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchTerm(newSearch);
    setCurrentPage(1);
    updateUrl(1, newSearch, sortBy);
  };

  const onSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);
    setCurrentPage(1); 
    updateUrl(1, searchTerm, newSort);
  };


  const title = document.getElementById('title');
  if (title) {
    title.innerHTML = 'All Products';
  }

  return (
    <>
      <Box sx={{ height: '80vh' }}>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            ALL Products
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 3,
            mb: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            label="Search by name"
            variant="outlined"
            value={searchTerm}
            onChange={onSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '22px',
              },
            }}
          />

          <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              onChange={onSortChange}
              label="Sort by"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
              <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
              <MenuItem value="priceAsc">Price Low to High</MenuItem>
              <MenuItem value="priceDesc">Price High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {isError && <Typography color="error">Error: {error.message}</Typography>}
        {isLoading && <Loader />}

        {!isLoading && !isError && (
          <>
            <Box
              id="products"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
                minHeight: 320,
              }}
            >
              {currentProducts.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
                  لا توجد منتجات مطابقة للبحث.
                </Typography>
              ) : (
                currentProducts.map((product) => (
                  <Card
                    key={product.id}
                    onClick={() => navigate(`/ProductsPage/${product.id}`)}
                    elevation={0}
                    sx={(theme) => ({
                      maxWidth: 170,
                      maxHeight: 280,
                      background: theme.palette.background.paper,
                      borderRadius: 3,
                      textAlign: 'center',
                      margin: '10px 7px',
                      position: 'relative',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 20px rgba(20,107,215,0.2)',
                      },
                      '&:hover .action-buttons': {
                        opacity: 1,
                        visibility: 'visible',
                        transform: 'translateY(0) scale(1)',
                      },
                    })}
                  >
                    <Box
                      sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="150"
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
                          backgroundColor: 'rgba(255,255,255,0)',

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
                              color: likedProducts.includes(product.id)
                                ? 'red'
                                : 'gray',
                              fill: likedProducts.includes(product.id)
                                ? 'red'
                                : 'none',
                              strokeWidth: likedProducts.includes(product.id)
                                ? 1.5
                                : 1.2,
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
                            setSelectedProduct(product);
                            setOpen(true);
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

                    <CardContent>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        fontWeight="600"
                      >
                        ${product.price}US
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>

            {/* Pagination with React Router Link */}
            {filteredSortedProducts.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 3,
                  mb: 2,
                }}
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={{
                        pathname: location.pathname,
                        search: new URLSearchParams({
                          ...Object.fromEntries(queryParams.entries()), 
                          page: item.page,
                          ...(searchTerm && { search: searchTerm }), 
                          ...(sortBy && { sort: sortBy }), 
                        }).toString(),
                      }}
                      {...item}
                    />
                  )}
                />
              </Box>
            )}
          </>
        )}

        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          message={snackbarMessage}
        />

        {selectedProduct && (
          <ProductDetailsModal
            open={open}
            product={selectedProduct}
            handleClose={handleClose}
          />
        )}
      </Box>
    </>
  );
}

export default AllProducts;