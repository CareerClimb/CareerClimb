import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material';

const JobDescription = ({ open, handleClose, job }) => {
  // Ensure job is defined before rendering details
  if (!job) {
    return null; // If job is null, return nothing (or handle appropriately)
  }

  const handleApplyNow = () => {
    window.open(job.applyLink, '_blank'); // Open apply link in a new tab
  };

  return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{job.title}</DialogTitle>
        <DialogContent>
            <Typography variant="body1" gutterBottom>
            Company: {job.company}
            </Typography>
            <Typography variant="body1" gutterBottom>
            Location: {job.location} {/* Adjust as per your job object */}
            </Typography>
            <Typography variant="body1" gutterBottom>
            Description: {job.description}
            </Typography>
            <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleApplyNow}>
                Apply Now
            </Button>
            </Box>
        </DialogContent>
        </Dialog>
  );
};

export default JobDescription;
