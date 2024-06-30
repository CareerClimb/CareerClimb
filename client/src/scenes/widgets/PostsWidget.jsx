// PostsWidget.jsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import PostWidget from './PostWidget';
import JobDescription from 'components/JobDescription';



const jobPosts = [
  {
    title: 'Software Engineer',
    postedTime: '2 hours ago',
    company: 'Tech Corp',
    salary: '$120,000 - $150,000',
    location: 'San Francisco, CA',
    description: 'We are looking for a skilled software engineer to join our team. You will work on various projects and collaborate with other developers. The ideal candidate should have experience with React and Node.js.',
    link: "https://www.example.com/apply"
  }
];

const PostsWidget = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

   return (
    <Box
      sx={{
        maxHeight: '70vh', // Adjust the height as needed
        // overflowY: 'auto', // Uncomment this line to add a vertical scrollbar
        padding: '20px',
        backgroundColor: 'background.paper',
      }}
    >
      {jobPosts.map((job, index) => (
        <Box
          key={index}
          sx={{ cursor: 'pointer', marginBottom: '20px' }}
          onClick={() => handleJobClick(job)}
        >
          <PostWidget
            title={job.title}
            postedTime={job.postedTime}
            company={job.company}
            location={job.location}
            salary={job.salary}
            description={job.description}
          />
        </Box>
      ))}
      {/* Modal for displaying job details */}
      <JobDescription open={openModal} handleClose={handleCloseModal} job={selectedJob} />
    </Box>
  );
};

export default PostsWidget;
