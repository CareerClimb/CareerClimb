import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const jobTitleSchema = new Schema({
    jobTitle: { type: String, required: true },
});
const JobTitle = model('JobTitle', jobTitleSchema);
export default JobTitle;