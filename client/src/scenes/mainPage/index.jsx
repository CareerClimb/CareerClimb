import React, { useRef } from 'react';
import { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import TopBar from 'scenes/topBar';
import BottomBar from 'scenes/bottomBar';
import CenterContent from 'scenes/mainPage/CenterContent';
import FilterMenu from 'components/FilterMenu';
import FilterModel from '../../models/FilterModel.jsx'

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
                    textAlign: 'center'
                }}
            >
                <Box // absolute positoning of the filter menu 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        mt: '95px', // Add margin top to avoid overlap with TopBar
                        position: 'absolute',
                        left : '0%',
                        textAlign: 'center',
                        width: '230px'
                    }}
                >
                    <FilterMenu filters={filters} handleFilterChange={handleFilterChange}/>
                </Box> 
                <CenterContent />
            </Box>
            <BottomBar />
        </Box>
    );
};

export default MainPage;
