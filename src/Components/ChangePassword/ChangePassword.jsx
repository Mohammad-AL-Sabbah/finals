import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import AuthToken from "../../Api/ApiAuthToken";

const changePassword = async ({ oldPassword, newPassword, confirmNewPassword }) => {
  const response = await AuthToken.patch('/Account/ChangePassword', {
    OldPassword: oldPassword,
    NewPassword: newPassword,
    ConfirmNewPassword: confirmNewPassword,
  });
  return response.data;
};

const ChangePasswordForm = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const newPassword = watch("newPassword");
  const [serverError, setServerError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleShowOld = () => setShowOld((s) => !s);
  const toggleShowNew = () => setShowNew((s) => !s);
  const toggleShowConfirm = () => setShowConfirm((s) => !s);

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      setSuccessMsg("Password changed successfully!");
      setServerError(null);
      reset();
    },
    onError: (error) => {
      setServerError(error.message || "Failed to change password");
      setSuccessMsg(null);
    },
  });

  const onSubmit = (data) => {
    setServerError(null);
    setSuccessMsg(null);
    mutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "440px",
        bgcolor: "#fff",
        display: "flex",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: isSmallScreen ? "90%" : 420,
          bgcolor: "#fff",
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          },
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          mb={4}
          textAlign="center"
          sx={{
            fontWeight: 600,
            color: "#2C3E50",
            letterSpacing: 1,
          }}
        >
          Change Password
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {serverError}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            {successMsg}
          </Alert>
        )}

        <TextField
          label="Old Password"
          type={showOld ? "text" : "password"}
          fullWidth
          margin="normal"
          variant="outlined"
          {...register("oldPassword", { required: "Old password is required" })}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleShowOld}
                  edge="end"
                  aria-label="toggle old password visibility"
                  sx={{ color: "#7F8C8D" }}
                >
                  {showOld ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputLabel-root": { color: "#34495E" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#BDC3C7" },
              "&:hover fieldset": { borderColor: "#2980B9" },
              "&.Mui-focused fieldset": { borderColor: "#2980B9" },
            },
          }}
        />

        <TextField
          label="New Password"
          type={showNew ? "text" : "password"}
          fullWidth
          margin="normal"
          variant="outlined"
          {...register("newPassword", { required: "New password is required" })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleShowNew}
                  edge="end"
                  aria-label="toggle new password visibility"
                  sx={{ color: "#7F8C8D" }}
                >
                  {showNew ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputLabel-root": { color: "#34495E" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#BDC3C7" },
              "&:hover fieldset": { borderColor: "#2980B9" },
              "&.Mui-focused fieldset": { borderColor: "#2980B9" },
            },
          }}
        />

        <TextField
          label="Confirm New Password"
          type={showConfirm ? "text" : "password"}
          fullWidth
          margin="normal"
          variant="outlined"
          {...register("confirmNewPassword", {
            required: "Please confirm new password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleShowConfirm}
                  edge="end"
                  aria-label="toggle confirm password visibility"
                  sx={{ color: "#7F8C8D" }}
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputLabel-root": { color: "#34495E" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#BDC3C7" },
              "&:hover fieldset": { borderColor: "#2980B9" },
              "&.Mui-focused fieldset": { borderColor: "#2980B9" },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={mutation.isLoading}
          sx={{
            mt: 4,
            py: 1.7,
            fontWeight: "600",
            fontSize: "1.05rem",
            backgroundColor: "#2980B9",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(41, 128, 185, 0.6)",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              backgroundColor: "#3498DB",
              boxShadow: "0 6px 20px rgba(52, 152, 219, 0.8)",
            },
            "&:disabled": {
              backgroundColor: "#bdc3c7",
              color: "#7f8c8d",
              boxShadow: "none",
            },
          }}
        >
          {mutation.isLoading ? "Changing..." : "Change Password"}
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePasswordForm;
