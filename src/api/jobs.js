import express from "express";
import {  getJobById ,getAllJobs, createJob } from "../application/jobs.js";

const jobsRouter = express.Router();

jobsRouter.route("/").get(getAllJobs).post(createJob);

jobsRouter.route("/:id").get(getJobById);

export default jobsRouter;