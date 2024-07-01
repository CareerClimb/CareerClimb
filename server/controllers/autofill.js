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


     
const exportstuff = async () => {
    // exports a excel info into mongodb
    const workbook = XLSX.readFile('./titles.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const column = 'A';
    const range = XLSX.utils.decode_range(sheet['!ref']);
    const columnData = [];
    for (let i = range.s.r; i <= range.e.r; i++) {
        const cellAddress = { c: XLSX.utils.decode_col(column), r: i };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        const cell = sheet[cellRef];
        if (cell) {
            columnData.push({jobTitle: cell.v});
            //console.log('Cell Data:', String(cell.v));
        }
    }

    // bulk insert using insertMany
    try {
        await jobTitle.insertMany(columnData);
        console.log('Data inserted into MongoDB');
    } catch (err) {
        console.error('Error inserting data into MongoDB:', err);
    }
}

const viewstuff = async () => {
    // view mongodb collection
    try {
        const insertedData = await jobTitle.find({});
        console.log('Inserted Data:', insertedData);
    } catch (err) {
        console.error('Error fetching data from MongoDB:', err);
    }

}
