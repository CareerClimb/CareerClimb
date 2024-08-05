import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import DeletableChip from 'components/DeletableChip';

/*
    Displays deletable MUI Chips (bubbles). 1 Chip per Job Title.
    Example:
        (Software Engineer) (Front End)
        (UI designer)
*/
const JobTitleContent = ({filters, handleFilterChange}) => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const handleDelete = (chiplabel) => {
        // Shallow copy array excluding the deleted element
        const newJobFilters = filters.jobTypes.filter((title) => title !== chiplabel); // shallow copy elements except the deleted element
       
        // Create new filters object with updated jobTypes array
        const newFilters = { ...filters, jobTypes: newJobFilters };

        // Update state with new filters object
        handleFilterChange(newFilters);
    };  

    return (
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'left',
                flexWrap: 'wrap',
                width: '280px',                
                ml: 2,
                mb: 1, // add margin if non-empty
                mt: 2,
                gap: 1,
            }}  
        >
            {   filters.jobTypes && // Conditionally render if not undefined/null
                filters.jobTypes.map((title) => ( // Turns a list of job titles to chip components
                    <DeletableChip label={title} handleDelete={handleDelete} />
                ))
            }
            
        </Box>

    );
};

export default JobTitleContent;
