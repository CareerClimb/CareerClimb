import React from 'react';
import { Box, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import FilterMenuDivider from './FilterMenuDivider';

const ExperienceFilter = ({filters, handleFilterChange}) => {

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const values = ['Internship', 'Entry Level', 'Intermediate', 'Senior Level', 'Director', 'Executive'];
    const valuesMap = {
        'Internship': '0 Years',
        'Entry Level': '0-2 Years',
        'Intermediate': '2-5 Years',
        'Senior Level': '≥ 5 Years',
        'Director': '≥ 5 Years',
        'Executive': '≥ 5 Years'
    }

    
    const handleChange = (event) => {
        // save filter
        filters.experience = event.target.value;
        handleFilterChange(filters);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '280px'
            }}
        >
            <HeaderTemplate title={'Experience'}/>   
            <FormControl size="small"             
                sx = {{
                    ml: 2,
                    mb: 1,
                    mr: 2,
                    width: '100%'
                }} 
            >
                <Select
                    labelId="ExperienceList"
                    id="List"
                    defaultValue = {filters.experience}
                    onChange={handleChange}
                    MenuProps={{ disableScrollLock: true}}
                    sx = {{ textAlign: 'left'}} 
                >
                    {values.map((value) => (  // Maps a list of salary values to menu items
                        <MenuItem key={value} value={value} sx={{ display: 'flex', justifyContent: 'space-between'}} >
                                <Box component="span">{value}</Box>
                                <Box component="span">{valuesMap[value]}</Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FilterMenuDivider/>
        </Box>
    );
};

export default ExperienceFilter;
