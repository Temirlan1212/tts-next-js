import mongoose from "mongoose";

let isConnected = false;

const connectToDb = async () => {
  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  if (isConnected) return console.log("Already connected to MongoDB");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("connected to mongoDb");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
