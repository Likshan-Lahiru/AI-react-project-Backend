import JobApplication from "../persistance/entity/jobsApplications.js"
import { JobApplicationDTO } from "./dto/jobApplications.js";
import ValidationError from "../domain /errors/validation-error.js";


export const getAllJobApplications = async (req, res, next) => {
  try {
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

    await JobApplication.create({ ...jobApplication.data, userId: userId });
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};