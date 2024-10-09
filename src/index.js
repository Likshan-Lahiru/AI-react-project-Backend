import express from "express";
import jobsRouter from "./api/jobs.js";

const app = express();

app.use(express.json());

app.use("/api/jobs", jobsRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Webservice is listening on port ${PORT}`);
});