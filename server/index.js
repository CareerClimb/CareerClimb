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
import Job from "./models/Job.js";
import { jobs } from "./data/index.js";

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

/* STATIC BUILD PATH */
const buildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildPath));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        "https://api.brandfetch.io",
        "https://us1.locationiq.com",
        "http://careerclimb.net",
        "http://www.careerclimb.net"
      ],
      connectSrc: [
        "'self'",
        "https://api.brandfetch.io",
        "https://us1.locationiq.com",
        "http://careerclimb.net",
        "http://www.careerclimb.net"
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    },
  })
);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/autocomplete", autofillRoutes);
app.use('/jobs', jobRoutes);

/* HANDLE STATIC BUILD */
app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

/* MONGOOSE SETUP */
mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));


