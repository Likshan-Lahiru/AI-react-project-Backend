import express from "express";
import jobsRouter from "./api/jobs.js";
import "dotenv/config"
import { connectionDB } from "./persistance/db.js";
import jobApplicationsRouter from "./api/jobsApplications.js";
import cors from "cors";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

connectionDB();

app.use("/api/jobs", jobsRouter);
app.use("/api/jobapplications", jobApplicationsRouter);

app.use(globalErrorHandlingMiddleware);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Webservice is listening on port ${PORT}`);
});

