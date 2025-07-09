import React, { useEffect, useState } from "react";
import AuthToken from "../../Api/ApiAuthToken";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";

// استيراد الأيقونات المطلوبة
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const response = await AuthToken.get(`/Orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr.startsWith("0001")) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const formatPrice = (price) => `${price.toLocaleString()} ₪`;

  // دالة لاختيار أيقونة الحالة مع لون مناسب
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <><HourglassEmptyIcon fontSize="small" color="warning" sx={{ mr: 0.5 }} />{status}</>;
      case "shipped":
        return <><CheckCircleIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />{status}</>;
      case "cancelled":
        return <><CancelIcon fontSize="small" color="error" sx={{ mr: 0.5 }} />{status}</>;
      default:
        return status;
    }
  };
const title = document.getElementById('title');
if (title) title.innerHTML = 'Orders';
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        px: { xs: 2, md: 6 },
        py: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        <Typography
          variant="h5"
          fontWeight="600"
          color="text.primary"
          sx={{ mb: 3 }}
        >
          Orders Overview
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              backgroundColor: "#ffffff",
              border: "1px solid #e0e0e0",
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">Order ID</TableCell>
                  <TableCell align="center"><CalendarMonthIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> Order Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center"><CreditCardIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> Payment</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center"><LocalShippingIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> Carrier</TableCell>
                  <TableCell align="center"><TravelExploreIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> Tracking</TableCell>
                  <TableCell align="center"><CalendarMonthIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} /> Shipped</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        transition: "0.2s",
                      },
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{order.id}</TableCell>
                    <TableCell align="center">
                      {formatDate(order.orderDate)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getStatusIcon(order.orderStatus)}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {order.paymentMethodType || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {formatPrice(order.totalPrice)}
                    </TableCell>
                    <TableCell align="center">
                      {order.carrier ? (
                        order.carrier
                      ) : (
                        <Chip
                          label="No Carrier"
                          variant="outlined"
                          size="small"
                          color="default"
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {order.trackingNumber ? (
                        order.trackingNumber
                      ) : (
                        <Chip
                          label="No Tracking"
                          variant="outlined"
                          size="small"
                          color="default"
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(order.shippedDate)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

export default Orders;
