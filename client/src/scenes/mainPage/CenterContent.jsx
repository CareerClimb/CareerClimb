import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import SearchBar from 'components/SearchBar';
import PostsWidget from 'scenes/widgets/PostsWidget';

const CenterContent = () => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                mt: '80px', // Add margin top to avoid overlap with TopBar
                textAlign: 'center'
            }}
        >
            <Typography variant="h1" fontSize='62px' fontWeight='bold' marginBottom="3px">
                CareerClimb.
            </Typography>
            <Typography variant="h4" fontFamily="Roboto" color={palette.neutral.medium}>
                Welcome! Search for the jobs you are looking for.
            </Typography>
            <SearchBar />
            <PostsWidget />
        </Box>
    );
};

export default CenterContent;
