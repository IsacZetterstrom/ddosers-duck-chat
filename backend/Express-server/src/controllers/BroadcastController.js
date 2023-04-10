import { Channel } from "../db/models/Channel.js";

async function getBroadcast(req, res) {
  const channel = await Channel.findOne({ channelType: "nödkanal" });

  res.send(channel);
}

async function postBroadcast(req, res) {
  const { title, message } = req.body;

  if (title && message) {
    const result = await Channel.updateOne(
      { channelType: "nödkanal" },
      { $push: { messages: { title, message } } }
    );

    res.send(result);
  } else {
    res.send("You need to supply a title and content!");
  }
}

export default { getBroadcast, postBroadcast };
