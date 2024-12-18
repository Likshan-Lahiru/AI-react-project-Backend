import  Job  from "../persistance/entity/jobs.js";
import { JobDTO } from "./dto/jobs.js";
import ValidationError from "../domain /errors/validation-error.js";
import NotFoundError from "../domain /errors/not-found-error.js";

export const getAllJobs = async (req, res, next) => {
  try {
    const alljobs = await Job.find();
    return res.status(200).json(alljobs);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {

  try {
    const job = JobDTO.safeParse(req.body);
    console.log(job);
    
    if (!job.success) {
      throw new ValidationError(job.error);
    }

    await Job.create(job.data);
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    next(error);

  }
};

export const getJobById = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (job === null) {
      throw new NotFoundError("Job not found");
    }
    return res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};