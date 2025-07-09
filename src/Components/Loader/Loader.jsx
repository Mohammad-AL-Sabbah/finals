import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function Loader() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box sx={{ position: 'relative', width: 80, height: 80 }}>
        {/* الدائرة الأولى */}
        <CircularProgress
          size={80}
          thickness={4}
          color="primary"
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
        {/* الدائرة الثانية مع تأخير في الحركة */}
        <CircularProgress
          size={80}
          thickness={4}
          color="primary"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            animationDuration: '1.5s',
            animationDelay: '0.75s',
          }}
        />
      </Box>

      <Typography variant="h6" sx={{ mt: 2, color: '#1976d2', fontWeight: 'bold' }}>
        Loading...
      </Typography>
    </Box>
  );
}

export default Loader;
