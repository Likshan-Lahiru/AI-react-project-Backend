import express from "express";
import jobsRouter from "./api/jobs.js";
import "dotenv/config"
import { connectionDB } from "./persistance/db.js";
import jobsApplicationRouter from "./api/jobsApplications.js";




const app = express();




app.use(express.json());

connectionDB();

app.use("/api/jobs", jobsRouter);
app.use("/api/jobapplications", jobsApplicationRouter);


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Webservice is listening on port ${PORT}`);
});



