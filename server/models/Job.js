// Import packages
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
    {
        JobPostingID: {
            type: String,
            max: 100,
            required: false,
            unique: true,
        },
        title: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        postedTime: { 
            type: Date,
            required: false,
        },
        company: {
            type: String,
            required: true,
            max:50,
        },
        minSalary: {
            type: String,
            required: false,
            max:50,
        },
        maxSalary: {
            type: String,
            required: false,
            max:50
        },
        salary: {
            type: String,
            required: false,
            max:50,
        },
        currency:{
            type: String,
            required: false,
            max:50,
        },
        country: {
            type: String,
            required: false,
            max:50,
        },
        state: {
            type: String,
            required: false,
            max:50,
        },
        city: {
            type: String,
            required: false,
            max:50,
        },
        isRemote: {
            type: Boolean,
            required: false,
        },
        description: {
            type: String,
            required: false,
            max:5000,
        },
        link: {
            type: String,
            required: false,
            max:150,
        }
    },
    { timestamps: true }
);

const Job = mongoose.model('Job', JobSchema);
export default Job;