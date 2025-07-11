import React from "react";
import { useQuery } from "@tanstack/react-query";
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

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const fetchOrders = async () => {
  const response = await AuthToken.get("/Orders");
  return response.data;
};

function Orders() {
const { data: orders, isLoading, error } = useQuery({
  queryKey: ["orders"],
  queryFn: fetchOrders,
  retry:3
});

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr.startsWith("0001")) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const formatPrice = (price) => `${price.toLocaleString()} ₪`;

  const getStatusChip = (status) => {
    if (!status) return null;
    const lowerStatus = status.toLowerCase();

    let icon = null;
    let color = "default";
    let variant = "outlined";

    switch (lowerStatus) {
      case "pending":
        icon = <HourglassEmptyIcon fontSize="small" sx={{ mr: 0.5 }} />;
        color = "warning";
        break;
      case "shipped":
        icon = <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />;
        color = "success";
        break;
      case "cancelled":
        icon = <CancelIcon fontSize="small" sx={{ mr: 0.5 }} />;
        color = "error";
        break;
      case "approved":
        icon = <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />;
        color = "success";
        variant = "filled";
        break;
      default:
        icon = null;
        color = "default";
        variant = "outlined";
        break;
    }

    return (
      <Chip
        icon={icon}
        label={status}
        color={color}
        variant={variant}
        size="small"
      />
    );
  };

  const title = document.getElementById("title");
  if (title) title.innerHTML = "Orders";

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">Error loading orders.</Typography>
      </Box>
    );

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
                <TableCell align="center">
                  <CalendarMonthIcon
                    fontSize="small"
                    sx={{ mr: 0.5, verticalAlign: "middle" }}
                  />{" "}
                  Order Date
                </TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">
                  <CreditCardIcon
                    fontSize="small"
                    sx={{ mr: 0.5, verticalAlign: "middle" }}
                  />{" "}
                  Payment
                </TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">
                  <LocalShippingIcon
                    fontSize="small"
                    sx={{ mr: 0.5, verticalAlign: "middle" }}
                  />{" "}
                  Carrier
                </TableCell>
                <TableCell align="center">
                  <TravelExploreIcon
                    fontSize="small"
                    sx={{ mr: 0.5, verticalAlign: "middle" }}
                  />{" "}
                  Tracking
                </TableCell>
                <TableCell align="center">
                  <CalendarMonthIcon
                    fontSize="small"
                    sx={{ mr: 0.5, verticalAlign: "middle" }}
                  />{" "}
                  Shipped
                </TableCell>
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
                  <TableCell align="center">{formatDate(order.orderDate)}</TableCell>
                  <TableCell align="center">{getStatusChip(order.orderStatus)}</TableCell>
                  <TableCell align="center">{order.paymentMethodType || "-"}</TableCell>
                  <TableCell align="center">{formatPrice(order.totalPrice)}</TableCell>
                  <TableCell align="center">
                    {order.carrier ? (
                      order.carrier
                    ) : (
                      <Chip label="No Carrier" variant="outlined" size="small" color="default" />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {order.trackingNumber ? (
                      order.trackingNumber
                    ) : (
                      <Chip label="No Tracking" variant="outlined" size="small" color="default" />
                    )}
                  </TableCell>
                  <TableCell align="center">{formatDate(order.shippedDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Orders;
