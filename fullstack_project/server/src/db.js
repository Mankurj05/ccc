import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
  const dbName = process.env.MONGODB_DB || "placement_tracker";

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    dbName
  });

  console.log(`MongoDB connected: ${dbName}`);
}
