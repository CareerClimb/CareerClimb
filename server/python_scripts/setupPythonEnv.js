import { execSync } from 'child_process';
import mongoose from 'mongoose';
import os from 'os';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import toml from 'toml';
import express from 'express';
import Job from '../models/Job.js';

const { Schema, model } = mongoose;

class PythonEnv {
    async setupAndRunScript() {
        const platform = os.platform();
        let setupCommand;

        if (platform === 'win32') {
            setupCommand = 'python_scripts/windows.bat';
        } else if (platform === 'darwin' || platform === 'linux') {
            setupCommand = './python_scripts/unix.sh';
        } else {
            throw new Error('Unsupported OS');
        }

        try {
            // Run script synchronously
            console.log('Running script...');
            execSync(setupCommand);
        } catch (error) {
            console.error('Error executing or reading script:', error);
        }

        return this.readJsonFile()
    }

    readJsonFile() {
        // Read JSON data from file
        console.log('Reading data...');
        const data = fs.readFileSync('jobDataJson.json', 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    }

    async connectMongo() {
        // Handle the JSON data as needed (e.g., insert into MongoDB)
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const config = toml.parse(fs.readFileSync('config.toml', 'utf-8'));
        const PORT = config.PORT || 3001;
        const MONGO_URL = config.MONGO_URL;
        const app = express();

        /* MONGOOSE SETUP */
        try {
            await mongoose.connect(MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB connected successfully');
            app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw error; // Rethrow the error to be caught in main()
        }
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
        } finally {
            // Close connection after exporting data
            mongoose.disconnect();
            console.log('MongoDB connection closed');
        }
    }

    async cleanup() {
        // Delete the jobDataJson.json file
        try {
            await fs.promises.unlink('jobDataJson.json');
            console.log('jobDataJson.json deleted successfully');
        } catch (error) {
            console.error('Error deleting jobDataJson.json:', error);
        }

        await mongoose.disconnect();
        process.exit(0); // Exit the process with success status
    }

}



// Run the Python script and read the JSON file
async function main() {
    try {
        const pythonRunner = new PythonEnv();
        const jsonData = await pythonRunner.setupAndRunScript(); 
        await pythonRunner.connectMongo();
        await pythonRunner.exportMongo(jsonData);
        await pythonRunner.cleanup();
    } catch (error) {
        console.error('Main function error:', error);
    }
}

main();
