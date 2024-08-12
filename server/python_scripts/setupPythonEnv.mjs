import { execSync, exec } from 'child_process';
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

    TIMEOUT_MS = 1000000; // in ms
    
    // Helper function to run a command with a timeout
    // https://stackoverflow.com/questions/50477552/how-can-i-always-terminate-a-nodejs-script-with-a-timeout-even-if-the-event-loop
    runWithTimeout = async (command, timeout = this.TIMEOUT_MS) => {
        return new Promise((resolve, reject) => {
            const child = exec(command);

            let stdout = '';
            let stderr = '';

            // Collect data from stdout
            child.stdout.on('data', (data) => {
                stdout += data;
                process.stdout.write(data); // Print to console
            });

            // Collect data from stderr
            child.stderr.on('data', (data) => {
                stderr += data;
                process.stderr.write(data); // Print to console
            });

            // Set up timeout to kill the process
            const timeoutId = setTimeout(() => {
                child.kill();
                reject(new Error('Timeout: Script execution exceeded time limit'));
            }, timeout);

            // Normal Exit
            child.on('exit', (code) => {
                clearTimeout(timeoutId);
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Script exited with code ${code}`));
                }
            });

            // Eror occurred, exit.
            child.on('error', (err) => {
                clearTimeout(timeoutId);
                reject(err);
            });
        });
    };

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

        const jobsList = await this.readJsonFile('./python_scripts/jobTitles.json'); // Array of job titles
        for (const jobTitle of jobsList) {
            // run script
            try {
                await this.setupAndRunScript(jobTitle); 
                const jsonData = await this.readJsonFile('./jobDataJson.json')
                await this.exportMongo(jsonData);
            } catch (error) {
                console.log('Script Error for ', jobTitle, ', Error:', error);
                continue; // Skip to next job title
            }
        }

        await this.cleanup();
    }
    
    /* Create Indexes on link and JobPostingID 
       expireAfterSeconds: Automatically deletes a document after specified time
    */
    async createIndexes(){
        console.log("Creating Indexes")
        await Job.createIndexes([
            { key: { link: 1}, unique: true},
            { key: {JobPostingID: 1}, unique: true},
            { key: { createdAt: 1 }, expireAfterSeconds: 1814000 } // 21 days * 24 hours * 60 minutes * 60 seconds
        ]);
    }

    async setupAndRunScript(jobTitle) {
        const platform = os.platform();
        let setupCommand;

        if (platform === 'darwin' || platform === 'linux') {
            execSync('chmod +x ./python_scripts/unix.sh');  // Give execute permissions
            setupCommand = `./python_scripts/unix.sh "${jobTitle}"`;
        } else {
            throw new Error('Unsupported OS');
        }

        try {
            // Run script
            console.log('Running script for \'' + jobTitle + '\'...');
            // execSync(setupCommand, { stdio: 'inherit' }); // run without timeout
            await this.runWithTimeout(setupCommand);   // run with timeout 
        } catch (error) {
            console.error('Error executing or reading script:', error);
            throw error;
        }
        
    }

    async readJsonFile(path) {
        // Read JSON data from file
        const data = fs.readFileSync(path, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    }

    async connectMongo() {
        // Handle the JSON data as needed (e.g., insert into MongoDB)
        const __filename = fileURLToPath(import.meta.url);
        const config = toml.parse(fs.readFileSync('config.toml', 'utf-8'));
        const PORT = 6001;
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
            const result = await Job.insertMany(jsonData, {ordered: false});
            console.log(`${result.length} documents inserted into MongoDB`);
        } catch (error) {
            if (error.name === 'MongoBulkWriteError') {
                const duplicateErrors = error.writeErrors.filter(err => err.code === 11000);
                console.log(`Number of Duplicates Skipped: ${duplicateErrors.length}`);
                console.log(`Number of Documents Successfully Inserted: ${error.result.insertedCount}`);
            } else {
                console.error('Error exporting data to MongoDB:', error);
                throw error; // Rethrow the error to be caught in main()
            }
        } 
    }

    async cleanup() {
        // Delete the jobDataJson.json file
        try {
            // await fs.promises.unlink('jobDataJson.json');
            console.log('Cleanup successful');
        } catch (error) {
            console.error('Error cleaning up: ', error);
        }

        await mongoose.disconnect();
        process.exit(0); // Exit the process with success status
    }


}

export default PythonEnv;