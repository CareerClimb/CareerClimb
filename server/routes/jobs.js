// Import packages
import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

// GET all job postings
// Filter by user filters (FilterModel) sent from Client
router.post('/', async (req, res) => {
  // convert FilterModel class to mongodb filters
  const query = getFilters(req.body.filters) || {}; 
  try {
    const jobs = await Job.find(query) // apply user filters
        .sort({createdAt: -1})         // sort by latest
        .limit(150);                   // limit documents
    res.status(200).json(jobs); // Return filtered jobs
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;


function getFilters(filters) {
  /* 
    Converts our FilterModel class from client
    into mongodb usable filters.
  */

  // Extract FilterModel from Client.
  let query = {};  // Instantiate query class.

  // Create filter for Company:
  if (filters.company) { query.company = { $regex: filters.company, $options: 'i' } } // Case insensitive. Same as SQL LIKE *company*.

  // Create filter for Experience:
  // Currently backend does not have experience
  // if (filters.experience) { query.experience = filters.experience }

  // Create filter for Salary:
  let salaryQuery = null;
  if (filters.salary) { 
    salaryQuery = getSalaryFilter(filters); 
  }
  
  // Create filter for Locations:
  let locationsQuery = null;
  if (filters.locations && filters.locations.length>0) {
    locationsQuery = getLocationFilter(filters);
  }

  // Create filter for JobTypes:
  let jobTypesQuery = null;
  if (filters.jobTypes && filters.jobTypes.length>0) {
    jobTypesQuery = getJobTypesFilter(filters);
  } 
 
  /* 
    Problem: salary, location, jobtype all use $or internally.
        They don't explicitly reference fields like Job.company to filter from
    Solution: 
      Convert to: query AND (salaryQuery AND locationsQuery AND jobTypesQuery) */
  const andQuery = [salaryQuery, locationsQuery, jobTypesQuery].filter(Boolean); // filter removes null

  // Apply Conditions 
  if (andQuery.length>0) {
    // Condition: query AND (salaryQuery AND locationsQuery AND jobTypesQuery)
    query.$and = andQuery
  }
  
  return query;
}


function getSalaryFilter(filters) {
    /* 
      converts salary from FilterModel class 
      into mongodb usable filters.
    */

      const query = {
    $or: [
      // Either min/max/salary must be >= filters.salary
      // Todo: remove 'salary' from both front+backend and just use min/max.
      { minSalary: {$gte: filters.salary.toString() }},
      { maxSalary: {$gte: filters.salary.toString() }},
      { salary: {$gte: filters.salary.toString() }},
    ],
  }  

  return query
}

function getLocationFilter(filters) {
    /* 
      converts Location from FilterModel class 
      into mongodb usable filters.
    */

    const query = {
      // Checks if any Locations in the list matches job post's location.
      $or: filters.locations.map((location) => ({
        // City, State, or Country matches location
        $or: [
          { city: { $regex: location, $options: 'i' } }, // 'i' option makes it case-insensitive },
          { state: { $regex: location, $options: 'i' } }, 
          { country: { $regex: location, $options: 'i' } }, 
        ],
      })),
    };

    return query;
}

function getJobTypesFilter(filters) {
  /* 
    converts JobTypes from FilterModel class 
    into mongodb usable filters.
  */

  const query = {
    // Checks if any jobTypes in the list matches job post's title.
    $or: filters.jobTypes.map((jobType) => ({
      // Must contains jobType in it's name. I.e. LIKE *jobType*. 
      title: { $regex: jobType, $options: 'i' }, // 'i' option makes it case-insensitive
    })),
  };

  return query;
}