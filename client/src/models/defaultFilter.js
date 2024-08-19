/*
    Default values for Filter information

    server/routes/jobs.js is dependent on this model's design (fields) to convert
    this FilterModel class into mongodb usable filters.
*/
const defaultFilter = {                    
    jobTypes: [],
    company: '',
    locations: [],
    experience: '',
    salary: 0,
};

export default defaultFilter;