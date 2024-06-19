import { useState } from "react";
import {
    Box,
    IconButton,
    Typography,
    useTheme,
    Button
} from "@mui/material";
import {
    DarkMode,
    LightMode
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const theme = useTheme();
    const { palette } = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch();
    // const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    
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
                <Typography variant="h4" sx={{ ml: 2, fontWeight: 'bold' }}>
                    CC.
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ gap: '48px', 
                                                          color: theme.palette.mode === "light" ? 'black' : 'white'}}>
                <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: 20 }}>
                    {theme.palette.mode === "light" ? <DarkMode fontSize="inherit" /> : <LightMode fontSize="inherit" />}
                </IconButton>

                <Box
                    onClick={() => navigate('/about')}
                    sx={{ ml: 2, 
                          cursor: 'pointer',
                          '&:hover': {color: palette.primary.main}}}
                >
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold'}}>
                        About
                    </Typography>
                </Box>
                <Box
                    onClick={() => navigate('/register')}
                    sx={{ ml: 2, 
                        cursor: 'pointer',
                        '&:hover': {color: palette.primary.main}}}
                >
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold'}}>
                        Contant
                    </Typography>
                </Box>
                <Box
                    onClick={() => navigate('/register')}
                    sx={{ ml: 2, 
                          cursor: 'pointer',
                          '&:hover': {color: palette.primary.main}}}
                >
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold'}}>
                        Register
                    </Typography>
                </Box>
                <Box textAlign="center">
                    <Button
                        onClick={() => navigate('/login')}
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
                            Log In
                    </Button>
                </Box>
                
            </Box>
        </Box>
    );
}

export default TopBar;
