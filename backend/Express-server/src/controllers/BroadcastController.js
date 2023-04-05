import { Channel } from "../db/models/Channel.js";

async function getBroadcast(req, res) {
  const channel = await Channel.findOne({ channelType: "nödkanal" });

  res.send(channel.messages);
}

async function postBroadcast(req, res) {
  const { title, content } = req.body;

  if (title && content) {
    const result = await Channel.updateOne(
      { channelType: "nödkanal" },
      { $push: { messages: { title, content } } }
    );

    res.send(result);
  } else {
    res.send("You need to supply a title and content!");
  }
}

export default { getBroadcast, postBroadcast };
