// PostsWidget.jsx
import React from 'react';
import { Box } from '@mui/material';
import PostWidget from './PostWidget';

const jobPosts = [
  {
    title: 'Software Engineer',
    postedTime: '2 hours ago',
    company: 'Tech Corp',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a skilled software engineer to join our team. You will work on various projects and collaborate with other developers. The ideal candidate should have experience with React and Node.js.',
  },
  {
    title: 'Product Manager',
    postedTime: '1 day ago',
    company: 'Innovatech',
    salary: '$100,000 - $130,000',
    description: 'Innovatech is seeking a product manager to lead our next-generation products. The role involves working closely with cross-functional teams and stakeholders.',
  },
  {
    title: 'Data Scientist',
    postedTime: '3 days ago',
    company: 'DataWorks',
    salary: '$110,000 - $140,000',
    description: 'Join DataWorks as a data scientist. We are looking for someone with strong analytical skills and experience with machine learning algorithms.',
  },
  {
    title: 'Software Engineer',
    postedTime: '2 hours ago',
    company: 'Tech Corp',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a skilled software engineer to join our team. You will work on various projects and collaborate with other developers. The ideal candidate should have experience with React and Node.js.',
  },
  {
    title: 'Product Manager',
    postedTime: '1 day ago',
    company: 'Innovatech',
    salary: '$100,000 - $130,000',
    description: 'Innovatech is seeking a product manager to lead our next-generation products. The role involves working closely with cross-functional teams and stakeholders.',
  },
  {
    title: 'Data Scientist',
    postedTime: '3 days ago',
    company: 'DataWorks',
    salary: '$110,000 - $140,000',
    description: 'Join DataWorks as a data scientist. We are looking for someone with strong analytical skills and experience with machine learning algorithms.',
  },
  {
    title: 'Software Engineer',
    postedTime: '2 hours ago',
    company: 'Tech Corp',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a skilled software engineer to join our team. You will work on various projects and collaborate with other developers. The ideal candidate should have experience with React and Node.js.',
  },
  {
    title: 'Product Manager',
    postedTime: '1 day ago',
    company: 'Innovatech',
    salary: '$100,000 - $130,000',
    description: 'Innovatech is seeking a product manager to lead our next-generation products. The role involves working closely with cross-functional teams and stakeholders.',
  },
  {
    title: 'Data Scientist',
    postedTime: '3 days ago',
    company: 'DataWorks',
    salary: '$110,000 - $140,000',
    description: 'Join DataWorks as a data scientist. We are looking for someone with strong analytical skills and experience with machine learning algorithms.',
  }
  // Add more job posts as needed
];

const PostsWidget = () => {
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
        <PostWidget
          key={index}
          title={job.title}
          postedTime={job.postedTime}
          company={job.company}
          salary={job.salary}
          description={job.description}
        />
      ))}
    </Box>
  );
};

export default PostsWidget;
