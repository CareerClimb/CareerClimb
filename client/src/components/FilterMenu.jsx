import React from 'react';
import { Box, TextField, Typography, useTheme, useMediaQuery, Select } from '@mui/material';
import { useState } from "react";
import Collapse from '@mui/material/Collapse';
import FilterButton from 'components/FilterButton';
import SalaryFilter from './FilterMenuComponents/SalaryFilter';
import ExperienceFilter from './FilterMenuComponents/ExperienceFilter';
import LocationFilter from './FilterMenuComponents/LocationFilter';
import CompanyFilter from './FilterMenuComponents/CompanyFilter';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import FilterMenuDivider from './FilterMenuComponents/FilterMenuDivider';
import { ReactComponent as JobIconSvg } from '.././assets/briefcase.svg';
import { ReactComponent as PlusButtonSVG } from '.././assets/plusbutton.svg';



const FilterMenu = () => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
          setChecked((prev) => !prev);
    };
      
    return (
        <Box // menu content
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                boxShadow: checked ? '0 8px 16px rgba(0, 0, 0, 0.1)' : 'none',
                background: checked ? theme.palette.background.default : 'transparent',
                border: checked ? `1px solid ${theme.palette.divider}` : 'none',
                pb: '10px',
                zIndex: 5,
                width: '135%'
            }}  
        >
            <FilterButton onClick={handleClick}/>
            <Collapse // content to show/hide 
                orientation="horizontal" 
                in = {checked}
                timeout = {10} // 10 ms animation
            >
                <FilterMenuDivider/> 
                <Box // Job Type Header
                    sx = {{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between', // items are packed to opposite ends of flex direction
                        height: '22px',
                        width: '125%',
                    }}
                >
                    <HeaderTemplate Icon={JobIconSvg} title={"Job Type"} />
                    <PlusButtonSVG style={{ width: '22px', height: '22px'}} > </PlusButtonSVG> 
                </Box>
                <FilterMenuDivider/>
                <CompanyFilter/>
                <LocationFilter/>
                <ExperienceFilter/>
                <SalaryFilter/>
            </Collapse>


        </Box>

    );
};

export default FilterMenu;
