// Import packages
import mongoose from 'mongoose';

const defaultFilter = {                    
    jobTypes: [],
    company: '',
    locations: [],
    experience: '',
    salary: 0,
};

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
        filter: {
            type: Object,
            default: defaultFilter,
            required: true,
        },
        applications: {
            type: Array,
            default: [],
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;