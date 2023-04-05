import mongoose from "../db.js";

const userSchema = {
  username: { type: String, required: true },
  userRole: { type: String, required: true },
  password: { type: String, required: true },
};

export const User = mongoose.model("user", userSchema);
