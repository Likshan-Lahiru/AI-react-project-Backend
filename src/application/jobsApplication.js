import JobApplication from "../persistance/entity/jobsApplications.js"


export const getAllJobApplications = async (req, res, next) => {
  try {
    const jobApplications = await JobApplication.find()
      .populate("job", ["title", "description"])
      .exec();
    return res.status(200).json(jobApplications);
  } catch (error) {
    
  }
};

export const createJobApplication = async (req, res, next) => {
    try{
    const jobApplication = req.body;
    await JobApplication.create(jobApplication);
    }
    catch(error){
      console.log(error);
    }
};