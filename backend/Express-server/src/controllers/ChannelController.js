import { Channel } from "../db/models/Channel.js";
import { Message } from "../db/models/newMessage.js";
import { User } from "../db/models/User.js";
import jwtUtil from "../utils/jwtUtil.js";
import fetch from "node-fetch";

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
  if (name != undefined && (await Channel.findOne({ name })) == null) {
    const newChannel = new Channel({
      name,
      messages: [],
      creator: req.jwtPayload.username,
      channelType: "public",
    });

    await newChannel.save();
    try {
      const token = jwtUtil.createToken({ role: "express-server" });

      const response = await fetch("http://127.0.0.1:5050/updatedChannel", {
        method: "PUT",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({ channel: newChannel }),
      });

      const text = await response.text();

      console.log(text);
    } catch (error) {
      console.log("Fetch request failed!");
    }

    res.status(201).send("Channel created!");
  } else {
    res.status(400).send("Bad request");
  }
}

async function postChannel(req, res) {
  const channelId = req.query.id;
  const sender = req.jwtPayload.username;
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

    try {
      const token = jwtUtil.createToken({ role: "express-server" });

      const response = await fetch("http://localhost:5050/newMessage", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channelId, newMessage }),
      });

      const text = await response.text();

      console.log(text);
    } catch (error) {
      console.log(error);
    }

    res.status(201).send("message sent");
  } else {
    res.status(400).send("Missing information");
  }
}

async function deleteChannel(req, res) {
  const channelId = req.query.id;
  if (channelId != undefined) {
    const user = req.jwtPayload.username;

    const result = await Channel.deleteOne({
      _id: channelId,
      creator: user,
      channelType: "public",
    });
    console.log(result);
    res.status(200).send("Deleted channel");
  } else {
    res.status(400).send("Channel ID not provided");
  }
}

export default { getChannels, putChannel, postChannel, deleteChannel };
