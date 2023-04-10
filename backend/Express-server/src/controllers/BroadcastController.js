import fetch from "node-fetch";
import { Channel } from "../db/models/Channel.js";
import jwtUtil from "../utils/jwtUtil.js";

async function getBroadcast(req, res) {
  const channel = await Channel.findOne({ channelType: "nödkanal" });

  res.send(channel);
}

async function postBroadcast(req, res) {
  const { title, message } = req.body;

  if (title && message) {
    const newMessage = { title, message };
    const result = await Channel.updateOne(
      { channelType: "nödkanal" },
      { $push: { messages: newMessage } }
    );

    const emergencyChannel = await Channel.findOne({ channelType: "nödkanal" });

    try {
      const token = jwtUtil.createToken({ role: "express-server" });
      const response = await fetch("http://localhost:5050/newMessage", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channelId: emergencyChannel._id, newMessage }),
      });

      console.log(await response.text());
    } catch (error) {
      console.log(error);
    }

    res.send(result);
  } else {
    res.send("You need to supply a title and content!");
  }
}

export default { getBroadcast, postBroadcast };
