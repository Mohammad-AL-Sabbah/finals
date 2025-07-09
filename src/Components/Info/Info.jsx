import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Divider, Avatar, useTheme
} from '@mui/material';
import AuthToken from '../../Api/ApiAuthToken';
import dayjs from 'dayjs';

function Info() {
  const [user, setUser] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AuthToken.get('/Account/userinfo');
        setUser(data);
      } catch (err) {
        console.error('Error:', err);
      }
    })();
  }, []);

  if (!user) {
    return (
      <Box sx={{
        minHeight: '70vh',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 2,
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
        {/* Banner */}
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
              width: 120,
              height: 120,
              position: 'absolute',
              bottom: -60,
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

        <Box sx={{ pt: 8, pb: 4, px: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            @{user.userName}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4
          }}>
            <InfoItem label="Email" value={user.email} />
            <InfoItem label="Gender" value={user.gender} />
            <InfoItem
              label="Birth Date"
              value={dayjs(user.birthOfDate).format('DD MMM YYYY')}
            />
          </Box>


          
          <Box sx={{ mt: 4, textAlign: 'left',display: 'flex',justifyContent: 'center',alignItems: 'center',gap: 10}}>
          
            <LabeledLine label="First Name" value={user.firstName} />
            <LabeledLine label="Last Name" value={user.lastName} />
            <LabeledLine label="Username" value={user.userName} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function InfoItem({ label, value }) {
  return (
    <Box sx={{ minWidth: 180 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body1" fontWeight={500}>{value}</Typography>
    </Box>
  );
}

function LabeledLine({ label, value }) {
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
      <Typography variant="body1" fontWeight="500">{label}:</Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}

export default Info;
