import mongoose from "mongoose";

export const connectionDB = async () => {
    try{
      if(!process.env.MONGODB_DATABASE){
        return new error("Missing MONGODB_DATABASE env varible.")
      }
      await mongoose.connect(process.env.MONGODB_DATABASE);
      console.log("DB connection successful!");
    }catch(error){
      console.log(error);
    }
  }

