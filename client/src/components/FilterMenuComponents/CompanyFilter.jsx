import React from 'react';
import { Box, TextField, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import FilterMenuDivider from './FilterMenuDivider';


const CompanyFilter = () => {

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
            <HeaderTemplate title={'Company'}/>  
            <TextField id="outlined-basic"  variant="outlined" fullWidth size="small"
                sx = {{
                    alignItems: 'left',
                    ml: 2,
                    mb: 1,
                    width: '100%'
                }}
            />
            <FilterMenuDivider/>
        </Box>
    );
};

export default CompanyFilter;
