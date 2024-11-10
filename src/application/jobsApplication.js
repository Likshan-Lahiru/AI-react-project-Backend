import JobApplication from "../persistance/entity/jobsApplications.js"
import { JobApplicationDTO } from "./dto/jobApplications.js";
import ValidationError from "../domain /errors/validation-error.js";
import generateRating from "./rating.js";




export const getAllJobApplications = async (req, res, next) => {
  try {
    const { jobId } = req.query;
    if (jobId) {
      const jobApplications = await JobApplication.find({ job: jobId })
        .populate("job", ["title", "description"])
        .exec();
      return res.status(200).json(jobApplications);
    }

    const jobApplications = await JobApplication.find()
      .populate("job", ["title", "description"])
      .exec();
    return res.status(200).json(jobApplications);
  } catch (error) {
    next(error);
  }
};

export const createJobApplication = async (req, res, next) => {
  try {
    console.log(req.auth);
    
    const { userId } = req.auth;

    const jobApplication = JobApplicationDTO.safeParse(req.body);
    if (!jobApplication.success) {
      throw new ValidationError(jobApplication.error);
    }

    const newJobApplication = await JobApplication.create({ ...jobApplication.data, userId: userId });
    await generateRating(newJobApplication._id);
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getJobApplicationById = async (req, res, next) => {
  
  try {
    const { id } = req.params;
    console.log({ id });
    const jobApplication = await JobApplication.findById(id).populate("job", [
      "title",
      "description",
    ]);
    if (jobApplication === null) {
      throw new NotFoundError("Job Application not found");
    }
    return res.status(200).json(jobApplication);
  } catch (error) {
    next(error);
  }
};