import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import DeletableChip from 'components/DeletableChip';



const CompanyTitleContent = ({filters, handleFilterChange}) => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const handleDelete = (chiplabel) => {
        // Shallow copy array excluding the deleted element
        const newCompanies = filters.companies.filter((title) => title !== chiplabel); 
        
        // Create new filters object with updated companies array
        const newFilters = { ...filters, companies: newCompanies };
        
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
                mb: 2,
                mt: 2,
                gap: 1,
            }}  
        >
            {   filters.companies && // Render if not undefined/null
                filters.companies.map((title) => ( // Maps a list of titles into chip components
                    <DeletableChip label={title} handleDelete={handleDelete} />
                ))
            }
            
        </Box>

    );
};

export default CompanyTitleContent;
