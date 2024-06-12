// Import packages
import { Box, Typography, useTheme, useMediaQuery, Button } from '@mui/material';
import BottomBar from 'scenes/bottomBar';
import TopBar from 'scenes/topBar';
import React from 'react';
import Form from './Form';

const LoginPage = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <TopBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: isMobile ? 2 : 4,
            borderRight: isMobile ? 'none' : '1px solid #ccc',
            borderBottom: isMobile ? '1px solid #ccc' : 'none',
          }}
        >
          <Form />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: isMobile ? 2 : 4,
          }}
        >
          <Typography variant="h2" gutterBottom>
            CareerClimb
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome! Begin your journey
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2,
              m: "2rem 0",
              // p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              borderRadius: "20px",
              "&:hover": { color: palette.primary.main },
             }}
            
          >
            Start your Climb Today
          </Button>
        </Box>
      </Box>
      <BottomBar />
    </Box>
  );
}

export default LoginPage;
