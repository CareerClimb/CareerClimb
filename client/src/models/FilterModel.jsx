class FilterModel {
    /*
        Stores the user's filter information, kept in one class 
        to make access easier.

        server/routes/jobs.js is dependent on this model to convert
        this FilterModel class into mongodb usable filters.

        client/state/index.js is dependent on this model for initializing states
    */

    /* Attributes */
    jobTypes = []; // default values
    company = '';
    locations = [];
    experience = '';
    salary = 0;

    // constructor with default values
    constructor(jobTypes = [], company = '', locations = [], experience = '', salary = 0) {
        this.jobTypes = jobTypes;
        this.company = company;
        this.locations = locations;
        this.experience = experience;
        this.salary = salary;
    };

    
}



export default FilterModel;