import OpenAI from "openai";
import JobApplication from "../persistance/entity/jobsApplications.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export default async function generateRating(jobApplicationId) {
    console.log("Calling fine tuning model")
    const jobApplication = await JobApplication.findById(jobApplicationId).populate("job");
    const content = `Role:${jobApplication?.job.title}, User Description : ${jobApplication?.answers.join(". ")}`
    
    const completion = await client.chat.completions.create(
        {
            messages:[{role:"user",content}],
            model: "ft:gpt-3.5-turbo-0125:stemlink:fullstacktutorial:AVERxq2j"
        }
    );
    const response = JSON.parse(completion.choices[0].message.content);
    console.log("Rating :" + response.rate);
    
  
    if (!response.rate) {
        return;
    }
    await JobApplication.findOneAndUpdate({_id:jobApplicationId},{rating:response.rate})
}



