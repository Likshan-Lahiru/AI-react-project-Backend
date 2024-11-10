import express from "express";
import {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById
} from "./../application/jobsApplication.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware.js";


const jobApplicationsRouter = express.Router();

jobApplicationsRouter
  .route("/")
  .post(ClerkExpressRequireAuth({}), createJobApplication)
  .get(
    ClerkExpressRequireAuth({}),
    AuthorizationMiddleware,
    getAllJobApplications
  );

  jobApplicationsRouter.route("/:id").get(getJobApplicationById);  

export default jobApplicationsRouter;