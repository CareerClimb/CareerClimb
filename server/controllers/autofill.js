import mongoose from 'mongoose';
import XLSX from 'xlsx';
import JobTitle from '../models/JobTitle.js';
const { Schema, model } = mongoose;

/*  Autofill job titles based on a given prefix 
    This is the intermediary function between react and mongodb
*/
export const jobAutoComplete = async (req, res) => {
    /*
        Returns a list of job titles that matches a given prefix
    */
    const LIMIT = 5;                  // limit to 5 results
    const prefix = req.query.prefix;  // prefix of job titles
    console.log("prefix: " + prefix);

    try {
        // WHERE jobtitle LIKE "prefix*"
        const regex = new RegExp(`^${prefix}`, 'i');                                    // Case-insensitive regex for "prefix*"
        const jobtitlesquery = await JobTitle.find({ jobTitle: regex }).limit(LIMIT);   // Query mongodb
        const jobtitles = jobtitlesquery.map((doc) => doc.jobTitle);  // extract an array of job titles
        res.status(200).json({array: jobtitles});                     // Success. Return an array of job titles
    } catch(error) {
        console.error(error);
        res.status(500).json({error: err.message}); // Return an error
    }        
}
