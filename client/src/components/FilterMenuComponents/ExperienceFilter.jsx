import React from 'react';
import { Box, MenuItem, InputLabel, Typography, useTheme, useMediaQuery, FormControl, Select } from '@mui/material';
import HeaderTemplate from 'components/FilterMenuComponents/HeaderTemplate'
import FilterMenuDivider from './FilterMenuDivider';

const ExperienceFilter = () => {
    const [experience, setExperience] = React.useState('');

    const handleChange = (event) => {
      setExperience(event.target.salary);
    };

    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const values = ['Internship', 'Entry Level', 'Intermediate' ,'Senior Level', 'Director', 'Executive']
    
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <HeaderTemplate title={'Experience'}/>   
            <FormControl size="small"             
                sx = {{
                    alignItems: 'left',
                    ml: 2,
                    mb: 1,
                    mr: 2,
                    width: '100%'
                }} 
            >
                <Select
                    labelId="ExperienceList"
                    id="List"
                    onChange={handleChange}
                    onClick={(event) => {event.preventDefault()}}
                    MenuProps={{ disableScrollLock: true}}
                >
                    {values.map((value) => (  // Maps a list of salary values to menu items
                        <MenuItem key={value} value={value}>{value}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FilterMenuDivider/>
        </Box>
    );
};

export default ExperienceFilter;
