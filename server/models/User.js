// Import packages
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            min: 3,
            max: 50,
            validate: {
                validator: function(value) {
                    return /\s/.test(value);
                },
                message: 'Invalid Full Name. Must contain first name and last name separated by a space.',
            },
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