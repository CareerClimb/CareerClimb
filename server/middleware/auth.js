// Import packages
import jwt from "jsonwebtoken";
import fs from 'fs';
import toml from 'toml';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const config = toml.parse(fs.readFileSync('config.toml', 'utf-8'));
        const jwtSecret = config.JWT_SECRET;
        const verified = jwt.verify(token, jwtSecret);
        req.user = verified;
        next();
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};