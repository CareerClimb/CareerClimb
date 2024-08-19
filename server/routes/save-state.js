// Import packages
import express from 'express';
import {saveState} from "../controllers/save-state.js";

// Set up router
const router = express.Router();

router.post("/", saveState); // (path, handler)

export default router;