// SearchBar.jsx
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
        marginBottom: '20px',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Enter job title or keyword"
        sx={{
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
            m: "2rem 0",
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
