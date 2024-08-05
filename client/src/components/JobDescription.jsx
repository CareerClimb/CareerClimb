import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Typography, Box, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const JobDescription = ({ open, handleClose, job }) => {
    const { palette } = useTheme();

    // Ensure job is defined before rendering details
    if (!job) {
        return null; // If job is null, return nothing (or handle appropriately)
    }

    const handleApplyNow = () => {
        console.log("User clicked: Apply now")
        window.open(job.link, '_blank'); // Open apply link in a new tab
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: '50px' } }}>
            <DialogTitle variant='h3' sx={{ textAlign: 'center', paddingBottom: '0' }}>
                {job.title}
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: '24px' }}>
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '16px' }}>
                    Company: {job.company}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', marginBottom: '16px' }}>
                    Location: {job.city && job.country ? `${job.city}, ${job.country}` : job.city || job.country} 
                </Typography>
                <ReactMarkdown>
                    {job.description}
                </ReactMarkdown>
                <Box mt={4} display="flex" justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplyNow}
                        sx={{
                            borderRadius: '50px',
                            padding: '14px 24px',
                            marginTop: '24px',
                            '&:hover': {
                                backgroundColor: palette.primary.dark,
                            },
                        }}
                    >
                        Apply Now
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default JobDescription;
