import express from "express";
import { createJobApplication, getAllJobApplications } from "../application/jobsApplication.js";


const jobApplicationsRouter = express.Router();

jobApplicationsRouter.route('/').post(createJobApplication).get(getAllJobApplications);

export default jobApplicationsRouter;