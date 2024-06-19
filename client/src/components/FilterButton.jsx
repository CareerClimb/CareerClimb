import React from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { ReactComponent as MenuIconSvg } from '../assets/filtermenu.svg';

const FilterButton = ({ onClick }) => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Button
            onClick = {onClick}
            disableRipple
            sx={{
                backgroundColor: palette.background.default,
                color: palette.text.primary,
                borderRadius: "30px",
                padding: "14px 24px",
                justifyContent: 'left',
                height: '20px', // Match the height of the TextFields
                width: '100px',
                mt: '8px',
                fontSize: '18px', // Match the font size of the TextFields
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: palette.background.default, // Disable hover effect
                }
            }}
      >
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                ml: -1,
                mr: -1,
                gap: '10px', 
            }}
        >
            <MenuIconSvg style={{ width: '16px', height: '16px', fill: palette.text.primary,}} > 
            </MenuIconSvg> 
            <Typography variant="h7" sx={{ marginTop: '1px', fontWeight: 'bold', fontSize: '14px'}}>
                    Filters
            </Typography>
        </Box>
      </Button>
    );
};

export default FilterButton;


