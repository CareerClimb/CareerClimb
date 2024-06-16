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
            // borderRight: isMobile ? 'none' : '1px solid #ccc',
            // borderBottom: isMobile ? '1px solid #ccc' : 'none',
            position: 'relative', // Position relative for the pseudo-element
            '&::after': {
              content: '""', 
              position: 'absolute',
              right: 0, 
              top: 0,
              bottom: '200px', 
              width: '1px', 
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
                  width: "50%",
                  height: '56px', 
                  fontSize: '1rem', 
                  textTransform: 'none',
                  border: `3px solid ${palette.primary.main}`,
                  '&:hover': {
                      color: palette.primary.main,
                      backgroundColor: palette.background.default,
                      borderColor: palette.primary.main,
                  }
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
