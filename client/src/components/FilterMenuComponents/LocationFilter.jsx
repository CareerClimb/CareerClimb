import React from 'react';
import { useState } from "react";
import { Box, Autocomplete, TextField, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import { ReactComponent as LocationIconSvg } from '../../assets/locationpin.svg';
import FilterMenuDivider from './FilterMenuDivider';
import AutofillClass  from '../AutofillClass';



const LocationFilter = () => {

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [options, setOptions] = useState([]);

    const onChangeLocation = async (location) => {
        // query autofill options for this location
        const autofill = new AutofillClass();
        const qry = await autofill.fetchLocation(location.target.value);

        // display autofill options for the user
        setOptions(qry)
    }


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <HeaderTemplate Icon={LocationIconSvg} title={'Location'}/> 
            <Autocomplete 
                freeSolo
                onInputChange={onChangeLocation}
                options = {options}
                // ListboxProps={{ style: { maxHeight: 50 } }}  // minimize size
                renderInput={(params) => (
                    <TextField {...params} id="outlined-basic" variant="outlined" fullWidth size="small"
                        sx = {{
                            alignItems: 'left',
                            ml: 2,
                            mr: 2,
                            mb: 1,
                        }}
                    />
                )}
            />
            <FilterMenuDivider/>
        </Box>
    );
};

export default LocationFilter;
