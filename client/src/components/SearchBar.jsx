// SearchBar.jsx
import React from 'react';
import { Box, Button, TextField } from '@mui/material';

const SearchBar = () => {
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
        sx={{ width: '300px', marginRight: '10px', borderRadius: '20px', '.MuiInputBase-root': { borderRadius: '20px' } }}
      />
      <Button
        variant="contained"
        sx={{ borderRadius: '20px', padding: '10px 20px' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SearchBar;
