// MainPage.jsx
import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import TopBar from 'scenes/topBar';
import SearchBar from 'components/SearchBar';
import PostsWidget from 'scenes/widgets/PostsWidget';

const MainPage = () => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

return (
    <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        textAlign: 'center',
    }}>
        <TopBar />
        <Box
        sx={{
            padding: isMobile ? 8 : 15,
        }}
      >
            <Typography variant="h1" fontSize='62px' fontWeight='bold' marginBottom="3px">
                CareerClimb.
            </Typography>
            <Typography variant="h4" marginBottom='1.5rem' fontFamily="Roboto" color={palette.neutral.medium}>
                Welcome! Search for the jobs you are looking for.
            </Typography>
            <SearchBar />
            <PostsWidget />
        </Box>
    </Box>
);
};

export default MainPage;
