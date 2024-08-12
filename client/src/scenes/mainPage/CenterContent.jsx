import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import SearchBar from 'components/SearchBar';
import PostsWidget from 'scenes/widgets/PostsWidget';

const CenterContent = ({filters, handleFilterChange}) => {
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
                marginTop: '80px',
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" fontSize='62px' fontWeight='bold' marginBottom="3px">
                CareerClimb.
            </Typography>
            <Typography variant="h4" fontFamily="Roboto" color={palette.neutral.medium}>
                Welcome! Search for the jobs you are looking for.
            </Typography>
            <SearchBar filters={filters} handleFilterChange={handleFilterChange}/>
            <PostsWidget filters={filters} handleFilterChange={handleFilterChange}/>
        </Box>
    );
};

export default CenterContent;
