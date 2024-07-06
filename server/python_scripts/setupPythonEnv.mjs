import { execSync } from 'child_process';
import mongoose from 'mongoose';
import os from 'os';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import toml from 'toml';
import Job from '../models/Job.js';
import express from 'express';


const { Schema, model } = mongoose;

class PythonEnv {

    // Run the Python script and read the JSON file
    async main() {
        // Connect to mongodb 
        try {
            await this.connectMongo();
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            await this.cleanup();
            return; // Exit the function if an error occurs
        }
    
        const jobsList = this.readJsonFile('./python_scripts/jobTitles.json'); // Array of job titles
        for (const jobTitle of jobsList) {
            // run script
            try {
                const jsonData = await this.setupAndRunScript(jobTitle); 
                await this.exportMongo(jsonData);
            } catch (error) {
                console.log('Script Error for',jobTitle, ', Error:', error);
                continue; // Skip to next job title
            }
        }

        await this.cleanup();
    }

    async setupAndRunScript(jobTitle) {
        const platform = os.platform();
        let setupCommand;

        if (platform === 'darwin' || platform === 'linux') {
            setupCommand = `./python_scripts/unix.sh "${jobTitle}"`;
        } else {
            throw new Error('Unsupported OS');
        }

        try {
            // Run script
            console.log('Running script for \'' + jobTitle + '\'...');
            execSync(setupCommand, { stdio: 'inherit' }); // stdio: send standard in/out to terminal
            console.log('Reading data...');
            return this.readJsonFile('jobDataJson.json')
        } catch (error) {
            console.error('Error executing or reading script:', error);
            throw error; // Rethrow the error to be caught in main()
        }

        return {};
        
    }

    readJsonFile(path) {
        // Read JSON data from file
        const data = fs.readFileSync(path, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    }

    async connectMongo() {
        // Handle the JSON data as needed (e.g., insert into MongoDB)
        const __filename = fileURLToPath(import.meta.url);
        const config = toml.parse(fs.readFileSync('config.toml', 'utf-8'));
        const PORT = config.PORT || 3001;
        const MONGO_URL = config.MONGO_URL;
        const app = express();

        /* MONGOOSE SETUP */

        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    }

    async exportMongo(jsonData) {
        console.log('Exporting Data...');

        try {
            // Insert data into MongoDB using insertMany and await the result
            const result = await Job.insertMany(jsonData);
            console.log(`${result.length} documents inserted into MongoDB`);
        } catch (error) {
            console.error('Error exporting data to MongoDB:', error);
            throw error; // Rethrow the error to be caught in main()
        } 
    }

    async cleanup() {
        // Delete the jobDataJson.json file
        try {
            await fs.promises.unlink('jobDataJson.json');
            console.log('Cleanup successful');
        } catch (error) {
            console.error('Error cleaning up: ', error);
        }

        await mongoose.disconnect();
        process.exit(0); // Exit the process with success status
    }

}

export default PythonEnv;