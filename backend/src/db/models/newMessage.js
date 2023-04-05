import mongoose from "../db.js";

const messageSchema = {
  sender: { type: String, required: true },
  message: { type: String, required: true },
};

export const Message = mongoose.model("message", messageSchema);
