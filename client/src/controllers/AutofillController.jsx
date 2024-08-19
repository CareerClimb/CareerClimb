/*
    Queries public APIs to generate autofill information.
*/
class AutofillController {


    /*  
                                Class attributes   
                                                                        */
    LIMIT = '5';
    
    /*  
                            Environment variables:
        .env is used when app is deployed from local environment. ex. using npm start
        .env.production is used when app is deployed from a static build. 
                                                                        */
    env = process.env.REACT_APP_ENV || ''; 


    /*  
                                Class Methods   
                                                                         */

    isValidInput(inputStr) {
        // checks for undefined/null/empty-string
        return !(!inputStr);
    }

    async fetchLocations(prefix) {
        /* 
            This method receives a string and returns an array of potential autofill names.
            API Documentation: https://docs.locationiq.com/reference/autocomplete-2
                It queries Cities/Countries/States/Provinces/Regions     

            Input: (String)
            Return: (Array of Strings)
        */
        // input validation
        if (!this.isValidInput(prefix)) {
            return [];
        }

        // Customize Query/Request Type
        const locationKey = 'pk.3edcc157dfc136bfa03dcd10d87dfca7'; // our api key
        const options = {method: 'GET', headers: {accept: 'application/json'}};  

        // API call for autofill candidates. 
        const response = await fetch('https://us1.locationiq.com/v1/autocomplete?q='+String(prefix)+'&tag=place%3Acity%2C%20place%3Atown%2C%20place%3A%20country%2C%20place%3A%20province%2C%20place%3A%20state%2C%20place%3A%20region&limit='+this.LIMIT+'&accept-language=en&key='+locationKey, options)
            .then(response => response.json())
            .then(response => response.map(doc => doc.display_place)) // extract location name
            .then(response => response.filter(item => item !== null)) // remove null values
            .then(response => response.slice(0, this.LIMIT)) // limit the array size
            .catch(err => {
                console.error(err);
                return []; // query error, or no matching names
            });

        console.log(response)
        return response
    }


    async fetchJobTitles(prefix) {
        /*
            This method queries our nodeJS server to generate autofill information.
            Data stored on MongoDB. Requires connection to the nodejs server.

            Input: (String)
            Return: (Array of Strings)
        */
        // input validation
        if (!this.isValidInput(prefix)) {
            return [];
        }

         // Customize Query/Request Type
        const options = {method: 'GET', headers: {accept: 'application/json'}}; 
    
        const response = await fetch(this.env+"/autocomplete/jobAutoComplete?prefix="+prefix, options)
            .then(response => response.json()) // extract json 
            .then(response => response.array)  // extract array
            .then(response => response.filter(item => item !== null)) // remove null values
            .then(response => response.slice(0, this.LIMIT)) // limit the array size
            .catch(err => {
                console.error(err);
                return []; // query error, or no matching names
            });
        
        return response;
    }


    async fetchCompanies(prefix) {
        /*
            This method receives a string and returns an array of potential autofill names.
            API Documentation: https://docs.brandfetch.com/reference/search-brand
            
            Input: (String)
            Return: (Array of Strings)
        */

        // input validation
        if (!this.isValidInput(prefix)) {
            return [];
        }

        // Customize Query/Request Type
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Referer: 'https://example.com/searchIntegrationPage' // required field for this API
            }
          };
          
        const response = await fetch("https://api.brandfetch.io/v2/search/"+prefix, options)
            .then(response => response.json()) // extract json 
            .then(response => response.map(doc => doc.name)) // convert to array
            .then(response => response.filter(item => item !== null)) // remove null values
            .then(response => response.slice(0, this.LIMIT))  // limit the array size
            .catch(err => {
                console.error(err);
                return []; // query error, or no matching names
            });

        console.log(response);
        return response;
    }

}

export default AutofillController;