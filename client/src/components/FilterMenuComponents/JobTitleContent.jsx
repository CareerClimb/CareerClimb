import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import DeletableChip from 'components/DeletableChip';



const JobTitleContent = ({filters, handleFilterChange}) => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const handleDelete = (chiplabel) => {
        // remove the deleted job title
        const jobFilters = filters.jobTypes.filter((title) => title !== chiplabel); // shallow copy elements except the deleted element
        filters.jobTypes = jobFilters;
        handleFilterChange(filters);
    };  



    return (
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'left',
                flexWrap: 'wrap',
                width: '280px',                
                ml: 2,
                mb: 2,
                mt: 2,
                gap: 1,
            }}  
        >
            {   filters.jobTypes && // render if not undefined/null
                filters.jobTypes.map((title) => ( // Maps a list of job titles into chip components
                    <DeletableChip label={title} handleDelete={handleDelete} />
                ))
            }
            
        </Box>

    );
};

export default JobTitleContent;
