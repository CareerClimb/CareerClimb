import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const PostWidget = ({ title, postedTime, company, location, salary, description }) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  
  return (
    <Box
      sx={{
        width: isNonMobile ? '850px' : '100%',
        maxWidth: '100%',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '10px',
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {postedTime}
        </Typography>
      </Box>
      <Box
        sx={{
          margin: '10px 0',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <Typography variant="body1" component="div">
          {company} ({location})
        </Typography>
        <Typography variant="body1" component="div">
          {salary}
        </Typography>
      </Box>
      <Typography variant="body2" component="div" sx={{ padding: '0 10px' }}>
        {description}
      </Typography>
    </Box>
  );
};

export default PostWidget;
