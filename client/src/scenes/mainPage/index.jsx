// Import packages
import React, { useRef } from 'react';
import { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import TopBar from 'scenes/topBar';
import BottomBar from 'scenes/bottomBar';
import CenterContent from 'scenes/mainPage/CenterContent';
import FilterMenu from './FilterMenu';

const MainPage = ({filters, handleFilterChange}) => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                    flexDirection: 'row',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    mt: isMobile ? '30px' : 0, 
                }}
            >
                <FilterMenu filters={filters} handleFilterChange={handleFilterChange}/>
                <CenterContent filters={filters} handleFilterChange={handleFilterChange}/>
            </Box>
            <BottomBar />
        </Box>
    );
};

export default MainPage;
