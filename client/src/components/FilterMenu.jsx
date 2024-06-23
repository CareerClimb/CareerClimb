import React from 'react';
import { Box, Collapse, TextField, Typography, useTheme, useMediaQuery, Select } from '@mui/material';
import { useState } from "react";
import FilterButton from 'components/FilterButton';
import SalaryFilter from './FilterMenuComponents/SalaryFilter';
import ExperienceFilter from './FilterMenuComponents/ExperienceFilter';
import LocationFilter from './FilterMenuComponents/LocationFilter';
import CompanyFilter from './FilterMenuComponents/CompanyFilter';
import FilterMenuDivider from './FilterMenuComponents/FilterMenuDivider';
import JobTitleFilter from './FilterMenuComponents/JobTitleFilter';


const FilterMenu = ({filters, handleFilterChange}) => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
          // hide/unhide filter menu
          setChecked((checked) => !checked); 
    };
      
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                boxShadow: checked ? '0 8px 16px rgba(0, 0, 0, 0.1)' : 'none',
                background: checked ? theme.palette.background.default : 'transparent',
                border: checked ? `1px solid ${theme.palette.divider}` : 'none',
                pb: '10px',
                zIndex: 5,
            }}  
        >
            <FilterButton onClick={handleClick}/>
            <Collapse 
                orientation="horizontal" 
                in = {checked}
                timeout = {10} // 10 ms animation
            >
                {/* content to show/hide  */}
                <FilterMenuDivider/> 
                <JobTitleFilter filters={filters}/>
                <CompanyFilter filters={filters} handleFilterChange={handleFilterChange}/>
                <LocationFilter filters={filters} handleFilterChange={handleFilterChange}/>
                <ExperienceFilter filters={filters} handleFilterChange={handleFilterChange}/>
                <SalaryFilter filters={filters} handleFilterChange={handleFilterChange}/>
            </Collapse>


        </Box>

    );
};

export default FilterMenu;
