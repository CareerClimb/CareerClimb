class FilterModel {
    /*
        Stores the user's filter information, kept in one class 
        to make access easier.
    */

    /* Attributes:
        var: indicates private attribute
    */
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