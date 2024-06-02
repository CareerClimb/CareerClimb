import { useState } from "react";
import {
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    DarkMode,
    LightMode,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
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
            <Box display="flex" alignItems="center">
                {isMobile ? (
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <Close /> : <Menu />}
                    </IconButton>
                ) : null}
                <Typography variant="h6" sx={{ ml: 2 }}>
                    Your Logo
                </Typography>
            </Box>
            <Box display="flex" alignItems="center">
                <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: 20 }}>
                    {theme.palette.mode === "light" ? <DarkMode fontSize="inherit" /> : <LightMode fontSize="inherit" />}
                </IconButton>
                <Box
                    onClick={() => navigate('/account')} // Change the path as needed
                    sx={{ ml: 2, cursor: 'pointer' }}
                >
                    <Typography variant="h6" sx={{ fontSize: '1.25rem' }}>
                        Account
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default TopBar;
