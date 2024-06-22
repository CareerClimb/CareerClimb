import React from 'react';
import { useState } from "react";
import { Box, Autocomplete, TextField, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import { ReactComponent as LocationIconSvg } from '../../assets/locationpin.svg';
import FilterMenuDivider from './FilterMenuDivider';
import AutofillController  from '../AutofillController';



const LocationFilter = () => {

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [options, setOptions] = useState([]);

    const onChangeLocation = async (prefix) => {
        // query autofill options
        const autofill = new AutofillController();
        const array = await autofill.fetchLocation(prefix.target.value);  

        // display autofill options
        try { setOptions(array); } 
        catch(err) {
            console.error(err);
            setOptions([]);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
        >
            <HeaderTemplate Icon={LocationIconSvg} title={'Location'}/> 
            <Autocomplete // Wrapper to display autofill options
                freeSolo  // Allow any input value (not restricted to autofill values)
                onInputChange={onChangeLocation}
                options = {options}
                fullWidth
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth size="small"
                        sx = {{
                            alignItems: 'left',
                            ml: 2,
                            mr: 2,
                            mb: 1,
                            width: '100%'
                        }}
                    />
                )}
            />
            <FilterMenuDivider/>
        </Box>
    );
};

export default LocationFilter;
