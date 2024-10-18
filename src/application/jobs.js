import  Job  from "../persistance/entity/jobs.js";


  export const getAllJobs = async (req, res) => {
    try {
      const allJobs = await Job.find()
      return res.status(200).json(allJobs);
      } catch (error) {
      console.log(error)
      return res.status(500).json("Internal server error");
    }
    
    
  };
  
  
  export const createJob = async (req, res) => {
    try{
      const job = req.body;
      await Job.create(job);
      return res.status(201).send();
    }catch(error){
     console.log(error);
     return res.status(500).json("Internal server error");
    
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
      return res.status(500).json("Internal server error");
    }
  };