// Import packages
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            min: 3,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;