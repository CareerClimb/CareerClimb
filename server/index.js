// Import packages 
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
import toml from 'toml';
import authRoutes from "./routes/auth.js";
import autofillRoutes from "./routes/autofill.js"
import jobRoutes from './routes/jobs.js';
import saveRoutes from './routes/save-state.js'
import Job from './models/Job.js'

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = toml.parse(fs.readFileSync('config.toml', 'utf-8'));

const PORT = config.PORT || 6001;
const MONGO_URL = config.MONGO_URL;

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/autocomplete", autofillRoutes);
app.use('/jobs', jobRoutes);
app.use('/savestate', saveRoutes);

/* STATIC BUILD PATH */
const buildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildPath));

/* HANDLE STATIC BUILD */
app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});


async function removeOldestDocuments() {
    try {
        // Find the 10,000 oldest documents
        const oldestDocs = await Job.find({})
            .sort({ createdAt: 1 }) // Sort in ascending order to get the oldest first
            .limit(10000) // Limit to the 10,000 oldest documents
            .exec();

        // Extract the _id values of the documents to be deleted
        const idsToDelete = oldestDocs.map(doc => doc._id);

        // Remove the documents
        await Job.deleteMany({ _id: { $in: idsToDelete } });

        console.log('Removed 10,000 oldest documents successfully.');
    } catch (error) {
        console.error('Error removing documents:', error);
    }
}

/* MONGOOSE SETUP */
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        //removeOldestDocuments();
    })
    .catch((error) => console.log(`${error} did not connect`));


