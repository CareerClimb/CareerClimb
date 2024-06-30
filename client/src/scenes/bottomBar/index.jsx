// Import packages
import { useState, useEffect } from "react";
import {
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Menu,
    Close
} from "@mui/icons-material";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const BottomBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isVisible = prevScrollPos > currentScrollPos;

            setPrevScrollPos(currentScrollPos);
            setVisible(isVisible);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <Box
            style={{
                    opacity: visible ? 1 : 0,
                    visibility: visible ? 'visible' : 'hidden',
                    transition: 'opacity 0.5s ease',
                }}
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            position="fixed"    
            bottom={0}
            left="5%"
            width="90%"
            height="10%"
            bgcolor="background.default"
            color="text.primary"
            p={2.5}
            borderTop = "1px solid"            
            borderColor="text.primary"
            opacity={visible ? 0 : 0} // Adjust opacity instead of display for smooth transition
            transition="opacity 1.0s ease" // Smooth transition for opacity
        >
            <Box
                display="flex"  
                justifyContent="space-between"
                alignItems="center"
                width="100%"
            >
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" component="div" sx={{fontSize: 20, color: theme.palette.mode === "light" ? 'black' : 'white'}}>
                        CareerClimb
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" >
                    <IconButton href="https://www.facebook.com" target="_blank">
                        <FacebookIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton href="https://www.linkedin.com" target="_blank">
                        <LinkedInIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton href="https://www.youtube.com" target="_blank">
                        <YouTubeIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton href="https://www.instagram.com" target="_blank">
                        <InstagramIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default BottomBar;