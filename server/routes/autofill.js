// Import packages
import express from 'express';
import {jobAutoComplete} from "../controllers/autofill.js";

// Set up router
const router = express.Router();

router.get("/jobAutoComplete", jobAutoComplete); // (path, handler)

export default router;