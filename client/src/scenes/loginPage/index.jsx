// Import packages
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      padding: isMobile ? 2 : 4,
    }}
  >
    <Typography variant="h2" gutterBottom>
      Welcome to the Login Page
    </Typography>
    <Typography variant="body1">
      This is a simple login page
    </Typography>
  </Box>
}

export default LoginPage;