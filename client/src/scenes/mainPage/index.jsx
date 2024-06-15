// MainPage.jsx
import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import TopBar from 'scenes/topBar';
import SearchBar from 'components/SearchBar';
import PostsWidget from 'scenes/widgets/PostsWidget';

const MainPage = () => {
    const theme = useTheme();
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
            <Typography variant="h2" gutterBottom>
                CareerClimb.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Welcome! Search for the jobs you are looking for.
            </Typography>
            <SearchBar />
            <PostsWidget />
        </Box>
    </Box>
);
};

export default MainPage;
