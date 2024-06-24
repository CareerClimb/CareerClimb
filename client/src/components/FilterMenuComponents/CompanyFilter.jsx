import React from 'react';
import { useState } from "react";
import { Box, Autocomplete, TextField, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import FilterMenuDivider from './FilterMenuDivider';
import AutofillController  from '../../controllers/AutofillController';



const CompanyFilter = ({filters, handleFilterChange}) => {

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
                width: '280px'
            }}
        >
            <HeaderTemplate title={'Company'}/>  
            <Autocomplete // Wrapper to display autofill options
                freeSolo  // Allow any input value (not restricted to autofill values)
                onInputChange={onChangeCompany}
                options = {options}
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
        </Box>
    );
};

export default CompanyFilter;
