import React from 'react';
import { useState } from "react";
import { Box, Autocomplete, TextField, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import { ReactComponent as LocationIconSvg } from '../../assets/locationpin.svg';
import FilterMenuDivider from './FilterMenuDivider';
import AutofillController  from '../../controllers/AutofillController';



const LocationFilter = ({filters, handleFilterChange}) => {

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [options, setOptions] = useState([]);       // Store autofill options
    const [inputValue, setInputValue] = useState(''); // Store user Input


    const onChangeLocation = async (prefix) => {
        // Query and display autofill options
        try { 
            const autofill = new AutofillController();
            const array = await autofill.fetchLocations(prefix);
            setOptions(array); 
        } catch(err) {
            console.error(err);
            setOptions([]);
        }

        // Save TextField value
        setInputValue(prefix);

    };

    const onOptionsClick = async (value) => {
        // Function called when user selects an autofill option or clicks enter
        // Validate Input
        if (!value) {
            return;
        }
        
        // Create a new array of locations
        const newLocations = [...filters.locations, value] // append value 

        // Update filters state with new array
        const newFilters = {...filters, locations: newLocations}; // Overwrite locations attribute
        handleFilterChange(newFilters);
        
        // Clear UI
        setInputValue(''); // Clear SearchBar
        setOptions([]);    // Clear Autofill Options
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '280px'
            }}
        >
            <HeaderTemplate Icon={LocationIconSvg} title={'Location'}/> 
            <Autocomplete // Wrapper to display autofill options
                freeSolo  // Allow any input value 
                inputValue = {inputValue} // Value displayed in TextField
                onInputChange={(e, prefix) => onChangeLocation(prefix)} // user edits textfield input
                onChange={(e, prefix) => onOptionsClick(prefix)}  // user pressed enter or selected autofill option
                options = {options}
                fullWidth
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth size="small"
                        sx = {{
                            alignItems: 'left',
                            ml: 2,
                            mr: 2,
                            width: '100%'
                        }}
                    />
                )}
            />
        </Box>
    );
};

export default LocationFilter;
