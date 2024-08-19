import React from 'react';
import { useState } from "react";
import { Box, Autocomplete, TextField, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate';
import AutofillController  from '../../controllers/AutofillController';
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from 'state';




const CompanyFilter = () => {

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [options, setOptions] = useState([]);
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    

    const onChangeCompany = async (prefix) => {
        // Input Validation
        if (prefix === undefined || prefix === null) {
            console.error("Error: MisInput in Company TextField: ", prefix);
            return;
        }        

        //Display autofill options
        try { 
            const autofill = new AutofillController();
            const array = await autofill.fetchCompanies(prefix);
            setOptions(array);  
        } catch(err) {
            console.error(err);
            setOptions([]); // no autofill options
        }

        // Shallow copy filter and update company
        const newFilters = {...filter, company: prefix };

        // Update state with new filters object
        dispatch(setFilters({ filter: newFilters })); // Save filters into local redux store


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
                onInputChange={(e, prefix) => onChangeCompany(prefix)}
                filterOptions={(x) => x} // disable filtering by this MUI 
                options = {options}
                inputValue = {filter.company}
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
