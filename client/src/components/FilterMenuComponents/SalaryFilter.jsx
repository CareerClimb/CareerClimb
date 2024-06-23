import React from 'react';
import { Box, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'


const SalaryFilter = ({filters, handleFilterChange}) => {

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const startValue = 50000;
    const endValue = 200000;
    const increment = 20000;
    const values = [0]

    const handleChange = (event) => {
        // save filter
        filters.salary = event.target.value;
        handleFilterChange(filters);
        console.log(filters.salary);
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
                width: '200px'
            }}
        >
            <HeaderTemplate title={'Salary'}/>   
            <FormControl                
                sx = {{
                    alignItems: 'left',
                    ml: 2,
                    mr: 2,
                    mb: 1,
                    width: '100%'
                }} size="small"
            >
                <Select
                    labelId="SalaryList"
                    id="List"
                    defaultValue = {filters.salary}
                    onChange={handleChange}
                    MenuProps={{ disableScrollLock: true}}
                >
                    {values.map((value) => (  // Maps a list of salary values to menu items
                        <MenuItem key={value} value={value}>+${value.toLocaleString()}/Year</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SalaryFilter;
