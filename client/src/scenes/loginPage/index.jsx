// Import packages
import { Box, useTheme, useMediaQuery } from '@mui/material';
import BottomBar from 'scenes/bottomBar';
import TopBar from 'scenes/topBar';
import React from 'react';
import LoginForm from 'scenes/forms/loginForm';

const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '100vh',
        padding: isMobile ? 2 : 4,
      }}
    >
      <TopBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          width: '100%', // Ensures it takes full width for proper alignment
        }}
      >
        <LoginForm />
      </Box>
      <BottomBar />
    </Box>
  );
}

export default LoginPage;
