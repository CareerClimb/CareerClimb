import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import DeletableChip from 'components/DeletableChip';
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from 'state';



const LocationTitleContent = () => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    
    const handleDelete = (chiplabel) => {

        // Create new filters object with updated array
        const newFilters = { 
            ...filter, 
            locations: filter.locations.filter((title) => title !== chiplabel), // Shallow copy array except the deleted element   
        };
        
        // Update state with new filter object
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
                mt: 2,
                gap: 1,
            }}  
        >
            {   filter.locations && // Render if not undefined/null
                filter.locations.map((title) => ( // Maps a list of titles into chip components
                    <DeletableChip label={title} handleDelete={handleDelete} />
                ))
            }
            
        </Box>

    );
};

export default LocationTitleContent;
