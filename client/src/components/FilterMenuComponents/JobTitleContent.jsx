import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import DeletableChip from 'components/DeletableChip';
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from 'state';

const JobTitleContent = () => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const handleDelete = (chiplabel) => {
       
       // Remove the chiplabel from the jobTypes array and update the filter state
        const newFilters = { 
            ...filter, // copy old filter 
            jobTypes: filter.jobTypes.filter((title) => title !== chiplabel), // Shallow copy array except the deleted element
        };

        // Update state with new filters object
        dispatch(setFilters({ filter: newFilters })); // Save filters into local redux store
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
                mt: 1,
                gap: 1,
            }}  
        >
            {   filter.jobTypes && // render if not undefined/null
                filter.jobTypes.map((title) => ( // Maps a list of job titles into chip components
                    <DeletableChip label={title} handleDelete={handleDelete} />
                ))
            }
            
        </Box>

    );
};

export default JobTitleContent;
