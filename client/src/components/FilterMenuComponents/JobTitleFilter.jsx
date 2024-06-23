import React from 'react';
import { useState } from "react";
import { Box, Autocomplete, TextField, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import FilterMenuDivider from './FilterMenuDivider';
import AutofillController  from '../../controllers/AutofillController';
import { ReactComponent as JobIconSvg } from '../../assets/briefcase.svg';
import { ReactComponent as PlusButtonSVG } from '../../assets/plusbutton.svg';



const JobTitleFilter = () => {

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [options, setOptions] = useState([]);


    return (
        <Box
            sx={{
                flexDirection: 'row',
                width: '100%'
            }}
        >
            <Box // Job Type Header
                sx = {{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between', // items are packed to opposite ends of flex direction
                    height: '22px',
                    width: '105%'
                }}
            >
                <HeaderTemplate Icon={JobIconSvg} title={"Job Type"} />
                <PlusButtonSVG style={{ width: '22px', height: '22px'}} > </PlusButtonSVG> 
            </Box>
            <FilterMenuDivider/>
        </Box>
    );
};

export default JobTitleFilter;
