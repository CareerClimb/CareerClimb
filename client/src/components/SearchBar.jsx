import React from 'react';
import { useState } from "react";
import { Box, Autocomplete, Button, TextField, useTheme, useMediaQuery } from '@mui/material';
import AutofillController from '../controllers/AutofillController';

const SearchBar = ({filters, handleFilterChange}) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [options, setOptions] = useState([]);       // Store autofill options
  const [inputValue, setInputValue] = useState(''); // Store user Input

  
  const clearUI = () => {
    // Delay to let other asynchronous functions / renderings finish. Fixes a bug where searchbar doesn't clear.
    setTimeout(() => {
        // Clear UI
        setInputValue('');  // Clear SearchBar
        setOptions([]);     // Clear Autofill Options
    }, 15); // ms delay
  }

  const onChangeJobTitle = async (event, prefix) => {
    // Save TextField value
    setInputValue(prefix);

    // Query and display autofill options
    try {     
      const autofill = new AutofillController();
      const array = await autofill.fetchJobTitles(prefix)
      setOptions(array); 
    } catch(err) {
      console.error(err);
      setOptions([]); // error, display nothing
    }
  };

  const buttonClick = (value) => {
    // Validate input: Checks if null/undefined/empty-string
    if (!value) { 
      console.error("SearchBar Error: Input must be a non-empty string");
      return;
    }

    // Create a new array of job types
    const newJobTypes = [...filters.jobTypes, value]; // append value 

    // Update filters state with new array
    const newFilters = {...filters, jobTypes: newJobTypes}; // Overwrite jobTypes attribute
    handleFilterChange(newFilters);

    // Clear SearchBar / Autofill options
    clearUI();
  };

  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: isNonMobile ? '800px' : '95%', // Slightly smaller width than the PostWidget
      }}
    >
      <Autocomplete // Wrapper to display autofill options
        freeSolo    // Allow any input value
        onInputChange={onChangeJobTitle}
        onChange={(e, prefix) => buttonClick(prefix)} // user pressed enter or selected autofill option
        options = {options}
        inputValue={inputValue}
        sx = {{ flexGrow: 1 }}  // match parent size
        filterOptions={(x) => x} // disable filtering by this MUI 
        renderInput={(params) => ( // text input functionality
          <TextField {...params}
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

        )}

      />

      <Button
        type="submit"
        onClick = {() => buttonClick(inputValue)}
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
