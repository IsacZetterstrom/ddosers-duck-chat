import mongoose from "../db.js";

const channelSchema = {
  name: { type: String, required: true },
  messages: { type: Array, required: true },
  creatorId: { type: String, required: true },
  channelType: { type: String, required: true },
};

export const Channel = mongoose.model("channel", channelSchema);
