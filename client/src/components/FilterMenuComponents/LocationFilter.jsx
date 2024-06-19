import React from 'react';
import { Box, TextField, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import { ReactComponent as LocationIconSvg } from '../../assets/locationpin.svg';
import FilterMenuDivider from './FilterMenuDivider';



const LocationFilter = () => {

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <HeaderTemplate Icon={LocationIconSvg} title={'Location'}/> 
            <TextField id="outlined-basic" autoComplete='country' variant="outlined" fullWidth size="small"
                sx = {{
                    alignItems: 'left',
                    ml: 2,
                    mr: 2,
                    mb: 1,
                    width: '100%'
                }}
            />
            <FilterMenuDivider/>
        </Box>
    );
};

export default LocationFilter;
