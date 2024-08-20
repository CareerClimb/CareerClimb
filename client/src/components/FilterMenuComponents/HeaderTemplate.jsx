import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const FilterMenu = ( {Icon , title}) => {
    /* 
        Creates a header for the filter types.
        Input: Icon (ReactComponent) : is an optional SVG image, 
               title (String) : is a mandatory description of the filter type.
        Returns: a header for the filters.  
    */
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isIcon = Icon === undefined ? false : true

    return (
        <Box // menu content
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between', // items are packed to opposite ends of flex direction
                height: '100%',
                ml: 2
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                {/* // Conditionally Render Icon */}
                {isIcon && <Icon style={{ width: '18px', height: '18px', fill: palette.text.primary, marginRight: '8px'}} > </Icon> }
                <Typography variant="h7" sx={{ marginTop: '1px', fontWeight: 'bold'}}>
                        {title}
                </Typography>
            </Box>
        </Box>

    );
};

export default FilterMenu;
