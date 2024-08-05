import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import PostWidget from './PostWidget';
import JobDescription from 'components/JobDescription';
import axios from 'axios';

const PostsWidget = () => {
  const { palette } = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobPosts, setJobPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // read env variables
  const env = process.env.REACT_APP_ENV || '';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(env+"/jobs", { timeout: 90000}); // 100s timeout. Fixes a bug where cloudflare terminates api calls after 100s.
        const sortedJobs = response.data.sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime));
        setJobPosts(sortedJobs);
        // setJobPosts(response.data);
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
    const years = Math.floor(months / 12);


    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
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
        backgroundColor: 'background.paper'
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
            location={job.city && job.country ? `${job.city}, ${job.country}` : job.city || job.country}
            salary={job.salary}
            description={job.description}
          />
        </Box>
            ))}
            {/* Pagination buttons */}
      <Box sx={{ display: 'flex', 
                 justifyContent: 'center', 
                 marginTop: '20px',
                 paddingBottom: '150px'}}
                 >
        <Button 
          onClick={prevPage} 
          disabled={currentPage === 1}
          type="button"
          sx={{
            ml: 2,
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            padding: "14px 24px",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            borderRadius: '50px',
            variant: 'contained',
            textTransform: 'none', // Add this line to prevent all caps
            border: `3px solid ${palette.primary.main}`, // Add border color same as the primary color
            '&:hover': {
                color: palette.primary.main,
                backgroundColor: palette.background.default,
                borderColor: palette.primary.main, // Add border color on hover
            }
        }}>

          Previous
        </Button>
        {/* <Button variant="contained" onClick={nextPage} style={{ marginLeft: '10px' }}> */}
        <Button 
          onClick={nextPage} 
          disabled={currentPosts.length < postsPerPage}
          sx={{
            ml: 2,
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            padding: "14px 24px",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            borderRadius: '50px',
            variant: 'contained',
            textTransform: 'none', // Add this line to prevent all caps
            border: `3px solid ${palette.primary.main}`, // Add border color same as the primary color
            '&:hover': {
                color: palette.primary.main,
                backgroundColor: palette.background.default,
                borderColor: palette.primary.main, // Add border color on hover
            }
        }}>

          Next
        </Button>
      </Box>
      {/* Modal for displaying job details */}
      <JobDescription open={openModal} handleClose={handleCloseModal} job={selectedJob} />
    </Box>
  );
};

export default PostsWidget;