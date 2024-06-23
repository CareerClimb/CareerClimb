class FilterModel {
    /*
        Stores the user's filter information, kept in one class 
        to make access easier.
    */

    /* Attributes:
        #var: indicates private attribute
    */
    #jobTypes = []; // default values
    #companies = [];
    #location = '';
    #experience = '';
    #salary = 0;

    // constructor with default values
    constructor(jobTypes = [], companies = [], location = '', experience = '', salary = 0) {
        this.#jobTypes = jobTypes;
        this.#companies = companies;
        this.#location = location;
        this.#experience = experience;
        this.#salary = salary;
    }

    
    get jobTypes() {
        return this.#jobTypes;
    }

    set jobTypes(value) {
        this.#jobTypes = value;
    }

    get companies() {
        return this.#companies;
    }

    set companies(value) {
        this.#companies = value;
    }

    get location() {
        return this.#location;
    }

    set location(value) {
        this.#location = value;
    }

    get experience() {
        return this.#experience;
    }

    set experience(value) {
        this.#experience = value;
    }

    get salary() {
        return this.#salary;
    }

    set salary(value) {
        this.#salary = value;
    }



}



export default FilterModel;