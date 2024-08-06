import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  Menu as MenuIcon
} from "@mui/icons-material";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => navigate('/about')}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => navigate('/register')}>
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem button onClick={() => navigate('/register')}>
          <ListItemText primary="Register" />
        </ListItem>
        <ListItem button onClick={user ? handleLogout : handleLogin}>
          <ListItemText primary={user ? 'Log out' : 'Log in'} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      top={0}
      left="5%"
      width="90%"
      height="10%"
      bgcolor="background.default"
      color="text.primary"
      p={2}
      zIndex={1000} // Ensure it stays above other content
    >
      <Box
        onClick={() => navigate('/')}
        display="flex"
        alignItems="center"
        sx={{
          cursor: 'pointer'
        }}>
        <Typography variant="h4" sx={{ ml: 0, fontWeight: 'bold' }}>
          CC.
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: 20 }}>
          {theme.palette.mode === "light" ? <DarkMode fontSize="inherit" /> : <LightMode fontSize="inherit" />}
        </IconButton>
        {isMobile ? (
          <>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <Box display="flex" alignItems="center" sx={{ gap: '48px', color: theme.palette.mode === "light" ? 'black' : 'white' }}>
            <Box
              onClick={() => navigate('/about')}
              sx={{
                ml: 2,
                cursor: 'pointer',
                '&:hover': { color: palette.primary.main }
              }}
            >
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                About
              </Typography>
            </Box>
            <Box
              onClick={() => navigate('/register')}
              sx={{
                ml: 2,
                cursor: 'pointer',
                '&:hover': { color: palette.primary.main }
              }}
            >
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Contact
              </Typography>
            </Box>
            <Box
              onClick={() => navigate('/register')}
              sx={{
                ml: 2,
                cursor: 'pointer',
                '&:hover': { color: palette.primary.main }
              }}
            >
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Register
              </Typography>
            </Box>
            <Box textAlign="center">
              <Button
                onClick={user ? handleLogout : handleLogin}
                type="button"
                sx={{
                  ml: 2,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  padding: "14px 24px",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  borderRadius: '50px',
                  variant: 'contained',
                  textTransform: 'none', // Add this line to prevent all caps
                  border: `3px solid ${palette.primary.main}`, // Add border color same as the primary color
                  '&:hover': {
                    color: palette.primary.main,
                    backgroundColor: palette.background.default,
                    borderColor: palette.primary.main, // Add border color on hover
                  }
                }}
              >
                {user ? 'Log out' : 'Log in'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default TopBar;
