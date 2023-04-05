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

async function putChannel(req, res) {
  const name = req.body.name;
  if (name != undefined) {
    const newChannel = new Channel({
      name,
      messages: [],
      creatorId: "234325",
      channelType: "public",
    });

    newChannel.save();
    res.status(201).send("Channel created!");
  } else {
    res.status(400).send("Bad request");
  }
}

export default { getChannels, putChannel };
