import { Channel } from "../db/models/Channel.js";
import { Message } from "../db/models/newMessage.js";

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

async function postChannel(req, res) {
  const channelId = req.query.id;
  const sender = req.body.name;
  const message = req.body.message;
  if (sender && channelId && message) {
    const newMessage = new Message({
      sender,
      message,
    });
    const channel = await Channel.updateOne(
      { _id: channelId },
      { $push: { messages: newMessage } }
    );

    res.status(201).send("message sent");
  } else {
    res.status(400).send("Missing information");
  }
}

async function deleteChannel(req, res) {
  const channelId = req.query.id;
  if (channelId != undefined) {
    const channel = await Channel.deleteOne({ _id: channelId });

    res.status(200).send("Deleted channel");
  } else {
    res.status(400).send("Channel ID not provided");
  }
}

export default { getChannels, putChannel, postChannel, deleteChannel };
