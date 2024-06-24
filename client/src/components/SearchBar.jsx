import React from 'react';
import { useState } from "react";
import { Box, Autocomplete, Button, TextField, useTheme, useMediaQuery } from '@mui/material';
import AutofillController from '../controllers/AutofillController';

const SearchBar = ({filters, handleFilterChange}) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [options, setOptions] = useState([]);       // store autofill options
  const [inputValue, setInputValue] = useState(''); // store value entered by user

  const onChangeJobTitle = async (event, prefix) => {
    /* Autofill behaviour  */
    // Query autofill options
    const autofill = new AutofillController();
    console.log("prefix: ", prefix);
    const array = await autofill.fetchJobTitles(prefix);

    // Display autofill options
    try { setOptions(array); } 
    catch(err) {
      console.error(err);
      setOptions([]); // error, display nothing
    }

    // Save TextField value
    console.log("prefix post: ", prefix);
    setInputValue(prefix);
  };


  const buttonClick = () => {
    /* Submit button behaviour */
    // Validate input
    if (!inputValue || typeof inputValue !== 'string') { 
      console.error("SearchBar Error: Input must be a non-empty string");
      console.log("type of input: ", typeof inputValue);
      console.log("inputValue: ", inputValue);
      return;
    }

    // Create a new array of job types
    const newJobTypes = [...filters.jobTypes, inputValue];

    // Update filters state with new array
    const newFilters = {...filters, jobTypes: newJobTypes}; // Same state, but overwrites jobTypes attribute
    handleFilterChange(newFilters);

    // Clear Autofill & Input value 
    setInputValue(''); 
    setOptions([]);    
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
        options = {options}
        value={inputValue}
        sx = {{ flexGrow: 1 }}  // match parent size
        
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
        onClick = {buttonClick}
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
