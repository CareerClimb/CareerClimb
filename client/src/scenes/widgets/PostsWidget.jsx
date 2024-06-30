import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import PostWidget from './PostWidget';
import JobDescription from 'components/JobDescription';
import axios from 'axios';

const PostsWidget = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobPosts, setJobPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/jobs');
        setJobPosts(response.data);
      } catch (error) {
        console.log('Error fetching job posts:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Calculate index of the last post in current page
  const indexOfLastPost = currentPage * postsPerPage;
  // Calculate index of the first post in current page
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Get current posts
  const currentPosts = jobPosts.slice(indexOfFirstPost, indexOfLastPost);

  const getTimeSincePosted = (postedTime) => {
    const currentDate = new Date();
    const postDate = new Date(postedTime);
    const timeDifference = currentDate.getTime() - postDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
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
      {currentPosts.map((job, index) => (
        <Box
          key={index}
          sx={{ cursor: 'pointer', marginBottom: '20px' }}
          onClick={() => handleJobClick(job)}
        >
          <PostWidget
            title={job.title}
            postedTime={getTimeSincePosted(job.postedTime)}
            company={job.company}
            location={`${job.country}, ${job.city}`}
            salary={job.salary}
            description={job.description}
          />
        </Box>
      ))}
      {/* Pagination buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button variant="contained" onClick={nextPage} style={{ marginLeft: '10px' }}>
          Next
        </Button>
      </Box>
      {/* Modal for displaying job details */}
      <JobDescription open={openModal} handleClose={handleCloseModal} job={selectedJob} />
    </Box>
  );
};

export default PostsWidget;