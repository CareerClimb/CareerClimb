import React from 'react';
import { Box, Collapse, TextField, Typography, useTheme, useMediaQuery, Select } from '@mui/material';
import { useState } from "react";
import FilterButton from 'components/FilterButton';
import SalaryFilter from '../../components/FilterMenuComponents/SalaryFilter';
import ExperienceFilter from '../../components/FilterMenuComponents/ExperienceFilter';
import LocationFilter from '../../components/FilterMenuComponents/LocationFilter';
import CompanyFilter from '../../components/FilterMenuComponents/CompanyFilter';
import FilterMenuDivider from '../../components/FilterMenuComponents/FilterMenuDivider';
import JobTitleFilter from '../../components/FilterMenuComponents/JobTitleFilter';
import JobTitleContent from '../../components/FilterMenuComponents/JobTitleContent';
import LocationTitleContent from '../../components/FilterMenuComponents/LocationTitleContent';


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
                position: 'absolute',
                flexDirection: 'column',
                borderRadius: '10px',
                pb: '10px',
                width: isMobile ? '100%' : '320px', // Full width on mobile
                zIndex: 5,
                mt: isMobile ? '85px' : '95px', // Adjust margin top on mobile
                left: isMobile ? 0 : '5%', // Adjust position on mobile
                top: isMobile ? '0' : 'auto',
                boxShadow: checked ? '0 8px 16px rgba(0, 0, 0, 0.1)' : 'none',
                background: checked ? theme.palette.background.default : 'transparent',
                border: checked ? `1px solid ${theme.palette.divider}` : 'none',
            }}  
        >
            <FilterButton onClick={handleClick}/>
            <Collapse
                orientation="horizontal" 
                in = {checked}
                timeout = {10} // animation in ms
            >
                {/* content to show/hide  */}
                <FilterMenuDivider/> 
                <JobTitleFilter filters={filters}/>
                <JobTitleContent filters={filters} handleFilterChange={handleFilterChange}/>
                <FilterMenuDivider/>
                <CompanyFilter filters={filters} handleFilterChange={handleFilterChange}/>
                <FilterMenuDivider/>
                <LocationFilter filters={filters} handleFilterChange={handleFilterChange}/>
                <LocationTitleContent filters={filters} handleFilterChange={handleFilterChange}/>
                <FilterMenuDivider/>
                <ExperienceFilter filters={filters} handleFilterChange={handleFilterChange}/>
                <SalaryFilter filters={filters} handleFilterChange={handleFilterChange}/>
            </Collapse>


        </Box>

    );
};

export default FilterMenu;
