import { Channel } from "../db/models/Channel.js";

function getChannels(req, res) {
  const id = req.query.id;

  if (id) {
    getChannelById(req, res, id);
  } else {
    getAllChannels(req, res);
  }
}

async function getChannelById(req, res, _id) {
  try {
    const channel = await Channel.findOne({
      _id, // samma som _id:_id
      channelType: "public",
    });

    res.send(channel);
  } catch (error) {
    res.status(400).send("Channel does not exist");
  }
}

async function getAllChannels(req, res) {
  const channels = await Channel.find({ channelType: "public" });

  res.send(channels);
}

export default { getChannels };
