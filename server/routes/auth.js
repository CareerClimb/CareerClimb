// Import packages
import express from 'express';
import {register} from '../controllers/auth.js';
import {login} from "../controllers/auth.js";

// Set up router
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

export default router;