import { type } from "@testing-library/user-event/dist/type";

class AutofillClass {
    /*
        This class queries public API to generate autofill information.
        Location : https://docs.locationiq.com/reference/autocomplete-2
            Queries Cities/Countries/States/Provinces/Regions
        Job Types : TODO
    */

    locationKey = 'pk.3edcc157dfc136bfa03dcd10d87dfca7'; // our api key
    limit = '5';

    async fetchLocation(location) {
        /* This function receives a string and generates possible autofill possibilities in an array.*/
        const options = {method: 'GET', headers: {accept: 'application/json'}};  // Customize Query/Request Type

        // API call to get location autofill. 
        const response = await fetch('https://us1.locationiq.com/v1/autocomplete?q='+String(location)+'&tag=place%3Acity%2C%20place%3Atown%2C%20place%3A%20country%2C%20place%3A%20province%2C%20place%3A%20state%2C%20place%3A%20region&limit='+this.limit+'&accept-language=en&key='+this.locationKey, options)
            .then(response => response.json())
            .then(response => {
                return response.map(doc => doc.display_place); // extract place name
            })   
            .catch(err => {
                console.error(err)
                return []; // no match or query error
            });

        return response;
    }


}

export default AutofillClass;