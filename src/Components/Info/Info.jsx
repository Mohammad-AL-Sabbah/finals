import React from 'react';
import {
  Box, Typography, Divider, Avatar, useTheme, useMediaQuery
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import AuthToken from '../../Api/ApiAuthToken';
import dayjs from 'dayjs';

function fetchUser() {
  return AuthToken.get('/Account/userinfo').then(res => res.data);
}

function Info() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userinfo'],
    queryFn: fetchUser,
    retry: 3
  });

  if (isLoading) {
    return (
      <Box sx={{
        minHeight: '70vh',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{
        minHeight: '70vh',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <Typography variant="h6" color="error">Error: {error.message || 'Failed to load user info'}</Typography>
      </Box>
    );
  }

  const title = document.getElementById('title');
  if (title) title.innerHTML = 'Profile info';

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      p: isMobile ? 1 : 2,
    }}>
      <Box sx={{
        width: '100%',
        maxWidth: 800,
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 24px rgba(0,0,0,0.8)'
          : '0 8px 24px rgba(0,0,0,0.12)',
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(30,30,30,0.7)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(10px)',
      }}>
        <Box sx={{
          height: 160,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(120deg,#1976d2,#2c5364)'
            : 'linear-gradient(120deg,rgb(68,153,190),#1976d2,#2c5364)',
          position: 'relative'
        }}>
          <Avatar
            src=""
            sx={{
              width: 100,
              height: 100,
              position: 'absolute',
              bottom: -50,
              left: '50%',
              transform: 'translateX(-50%)',
              border: '4px solid white',
              bgcolor: theme.palette.grey[300],
              fontSize: '2rem'
            }}
          >
            {user.firstName[0]}
          </Avatar>
        </Box>

        <Box sx={{ pt: 7, pb: 4, px: isMobile ? 2 : 4, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            @{user.userName}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3
          }}>
            <InfoItem label="Email" value={user.email} />
            <InfoItem label="Gender" value={user.gender} />
            <InfoItem
              label="Birth Date"
              value={dayjs(user.birthOfDate).format('DD MMM YYYY')}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 4,
          textAlign: isMobile ? 'center' : 'left',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          width: '100%',
          maxWidth: 800,
        }}
      >
        <LabeledLine label="First Name" value={user.firstName} />
        <LabeledLine label="Last Name" value={user.lastName} />
        <LabeledLine label="Username" value={user.userName} />
      </Box>
    </Box>
  );
}

function InfoItem({ label, value }) {
  return (
    <Box sx={{ minWidth: 180, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body1" fontWeight={500}>{value}</Typography>
    </Box>
  );
}

function LabeledLine({ label, value }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 1,
      mb: 1,
      border: '1px solid #1976d2',
      padding: 1,
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1976d2',
      color: 'white',
      minWidth: 200
    }}>
      <Typography variant="body1" fontWeight="500">{label}:</Typography>
      <Typography variant="body1" fontWeight="500">{value}</Typography>
    </Box>
  );
}

export default Info;
