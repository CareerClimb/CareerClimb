import React from 'react';
import { Box, Button, TextField, useTheme, useMediaQuery } from '@mui/material';

const SearchBar = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: isNonMobile ? '800px' : '95%', // Slightly smaller width than the PostWidget
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Enter job title or keyword"
        sx={{
          flexGrow: 1, // Allow TextField to take the remaining space
          padding: "14px 24px",
          borderRadius: "50px",
          '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              fontSize: '20px', // Change the font size for the input text
          },
          '& .MuiInputLabel-root': {
              fontSize: '1.2rem', // Change the font size for the label
          },
          '& .MuiFormHelperText-root': {
              fontSize: '0.9rem', // Change the font size for the helper text
          },
        }}
      />
      <Button
        type="submit"
        sx={{
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            borderRadius: "50px",
            padding: "14px 24px",
            height: '56px', // Match the height of the TextFields
            fontSize: '20px', // Match the font size of the TextFields
            textTransform: 'none',
            border: `3px solid ${palette.primary.main}`,
            '&:hover': {
                color: palette.primary.main,
                backgroundColor: palette.background.default,
                borderColor: palette.primary.main,
            }
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SearchBar;
