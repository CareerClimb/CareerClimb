// Import packages
import { Box, Typography, useTheme, useMediaQuery, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import BottomBar from 'scenes/bottomBar';
import TopBar from 'scenes/topBar';
import React from 'react';
import ResgisterForm from 'scenes/forms/registerForm';

const LandingPage = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

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
            position: 'relative', // Position relative for the pseudo-element
            '&::after': {
              content: '""',
              position: isMobile? 'center' : 'absolute',   
              marginTop: isMobile ? '25px' : 0, 
              right: isMobile ? 'auto' : 0, 
              bottom: isMobile ? 0 : '200px',
              top: isMobile ? '20px' : 0, 
              width: isMobile ? '90%' : '1px', 
              height: isMobile ? '1px' : null, // Horizontal line on mobile, vertical line on larger screens
              backgroundColor: '#ccc', 
          },
          }}
        >
          <ResgisterForm />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            padding: isMobile ? 2 : 4,
            marginBottom: isMobile ? '100px' : '0px', // Add margin bottom if mobile
          }}
        >
          <Typography variant="h1" fontSize='62px' fontWeight='bold' marginBottom="3px">
            CareerClimb.
          </Typography>
          <Typography variant="h4" marginBottom='1.5rem' fontFamily="Roboto" color={palette.neutral.medium}>
            Welcome! To begin your journey
          </Typography>
          <Button
            onClick={() => navigate('/home')}
            type="submit"
              sx={{
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                borderRadius: "50px",
                width: isMobile ? "80%" : "50%",
                height: isMobile ? '40px' : '56px',
                fontSize:'20px',
                textTransform: 'none',
                border: `3px solid ${palette.primary.main}`,
                '&:hover': {
                  color: palette.primary.main,
                  backgroundColor: palette.background.default,
                  borderColor: palette.primary.main,
                },
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

export default LandingPage;
