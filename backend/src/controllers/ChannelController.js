import { Channel } from "../db/models/Channel.js";

function getChannels(req, res) {
  const id = req.query.id;
  console.log(id);
  if (id) {
    getChannelById(req, res, id);
  } else {
    getAllChannels(req, res);
  }
}

function getChannelById(req, res, id) {}

async function getAllChannels(req, res) {
  const channels = await Channel.find({});

  res.send(channels);
}

function getBroadcast(req, res) {
  res.send("broadcast channel");
}

export default { getChannels, getBroadcast };
