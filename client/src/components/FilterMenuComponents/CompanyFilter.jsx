import React from 'react';
import { useState } from "react";
import { Box, Autocomplete, TextField, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import FilterMenuDivider from './FilterMenuDivider';
import AutofillController  from '../AutofillController';



const CompanyFilter = () => {

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [options, setOptions] = useState([]);

    const onChangeCompany = async (prefix) => {
        // query autofill options
        const autofill = new AutofillController();
        const array = await autofill.fetchCompany(prefix.target.value);

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
            }}
        >
            <HeaderTemplate title={'Company'}/>  
            <Autocomplete // Wrapper to display autofill options
                freeSolo  // Allow any input value (not restricted to autofill values)
                onInputChange={onChangeCompany}
                options = {options}
                fullWidth
                sx = {{ display: 'inline-block', flexGrow: 1 }}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth size="small"
                        sx = {{
                            alignItems: 'left',
                            ml: 2,
                            mb: 1,
                        }}
                    />
                )}
            />
            <FilterMenuDivider/>
        </Box>
    );
};

export default CompanyFilter;
