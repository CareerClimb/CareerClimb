import React from 'react';
import { Box, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from 'state';


const SalaryFilter = () => {

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    const startValue = 50000;
    const endValue = 200000;
    const increment = 20000;
    const values = [0]

    const handleChange = (event) => {
        // save filter
        const newFilters = { 
            ...filter, // copy old filter 
            salary: event.target.value // replace salary field
        };

        dispatch(setFilters({ filter: newFilters })); // Save filters into local redux store    };
    };
    
    // populate values for salary dropdown list
    for (let value = startValue; value <= endValue; value += increment) {
        values.push(value);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '280px'
            }}
        >
            <HeaderTemplate title={'Salary'}/>   
            <FormControl size="small"           
                sx = {{
                    alignItems: 'left',
                    ml: 2,
                    mr: 2,
                    mb: 1,
                    width: '100%'
                }} 
            >
                <Select
                    labelId="SalaryList"
                    id="List"
                    defaultValue = {filter.salary}
                    onChange={handleChange}
                    MenuProps={{ disableScrollLock: true}}
                    sx = {{ textAlign: 'left'}}
                >
                    {
                        values.map((value) => (  // Maps a list of salary values to menu items
                            <MenuItem key={value} value={value} sx={{ textAlign: 'left'}}> +${value.toLocaleString()} </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
};

export default SalaryFilter;
