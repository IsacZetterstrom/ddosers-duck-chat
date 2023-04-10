import mongoose from "../db.js";

const channelSchema = {
  name: { type: String, required: true },
  messages: { type: Array, required: true },
  creator: { type: String, required: true },
  channelType: { type: String, required: true },
};

export const Channel = mongoose.model("channel", channelSchema);

Channel.findOne({ channelType: "nödkanal" }).then((channel) => {
  if (!channel) {
    Channel.create({
      name: "Nödkanal",
      messages: [],
      creator: "server",
      channelType: "nödkanal",
    });
  }
});
