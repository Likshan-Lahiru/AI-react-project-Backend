import mongoose from "mongoose";
import { Schema } from "mongoose";

const jobsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    type: String,
    location: String,
    questions: [String]
})

export const jobs = mongoose.model('job', jobsSchema);