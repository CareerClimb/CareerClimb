import React from 'react';
import { Box, Chip, useTheme, useMediaQuery } from '@mui/material';



const DeletableChip = ({label, handleDelete}) => {
    const theme = useTheme();
    const { palette } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
      
    return (
        <Chip
            size="small" 
            variant="soft" 
            label={label}
            onDelete={() => handleDelete(label)}
            sx={{
                // Display Delete Icon only when hovering chip
                "& .MuiChip-deleteIcon": {
                    visibility: 'hidden',
                    color: 'background.primary'
                    },
                "&:hover": {
                    "& .MuiChip-deleteIcon": {
                        visibility: "visible",
                    }
                }
            }}
        />
    );


};

export default DeletableChip;
