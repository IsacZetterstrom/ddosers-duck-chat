import mongoose from "mongoose";

mongoose.connect(process.env.DB_CONNECTION_STRING);

mongoose.connection.on("open", () => {
  console.log("Connected to DB");
});

export default mongoose;
