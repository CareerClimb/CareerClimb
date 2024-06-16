// MainPage.jsx
import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import TopBar from 'scenes/topBar';
import BottomBar from 'scenes/bottomBar';
import SearchBar from 'components/SearchBar';
import PostsWidget from 'scenes/widgets/PostsWidget';

const MainPage = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                textAlign: 'center',
            }}
        >
            <TopBar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexGrow: 1, // Take up remaining space
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
            <BottomBar />
        </Box>
    );
};

export default MainPage;
