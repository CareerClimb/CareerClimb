import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

/*
    Draws a line dividing two sections of a menu:
              Section 1
       ------------------------
              Section 2
*/
const FilterMenuDivider = () => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
            margin: '10px 10px',
            width: '103%',
            borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        />
    );
};

export default FilterMenuDivider;
