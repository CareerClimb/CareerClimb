// Import packages
import bcrpyt from 'bcrypt'; // For encryption
import jwt from 'jsonwebtoken'; // For authentication
import User from '../models/User.js'; // User model
import fs from 'fs';
import toml from 'toml';

// Register a new user
export const register = async (req, res) => {
    try {
        const { fullName, 
                email, 
                password } = req.body;

        // Ensure user does not already exist
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return res.status(400).json({msg: "User already exists"});
        }

        // Register the actual user
        const salt = await bcrpyt.genSalt(); // Generate a salt encrypted password
        const hashedPassword = await bcrpyt.hash(password, salt); // Hash the password

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save(); // Save the user to the database
        res.status(201).json(savedUser); // Return the saved user
    } catch (err) {
        res.status(500).json({error: err.message}); // Return an error
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({msg: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);  // Compare the password the user entered with the hashed password in the database
        if (!isMatch) {
            return res.status(400).json({msg: "Invalid credentials"});
        }

        const config = toml.parse(fs.readFileSync('config.toml', 'utf-8'));
        const jwtSecret = config.JWT_SECRET;
        const token = jwt.sign({id: user._id}, jwtSecret);  // Create a token
        delete user.password;  // Delete the password from the user object to make sure it does not get sent anywhere
        res.status(200).json({token, user}); // Send the token and the user object to the client
    } catch (err) {
        console.log('Error occurred during registration:', err); // Log the error for debugging
        res.status(500).json({error: err.message});
    }
};