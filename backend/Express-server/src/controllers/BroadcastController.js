import fetch from "node-fetch";
import { Channel } from "../db/models/Channel.js";
import jwtUtil from "../utils/jwtUtil.js";

async function getBroadcast(req, res) {
  const channel = await Channel.findOne(
    { channelType: "nödkanal" },
    "name _id"
  );

  if (channel) {
    res.send(channel);
  } else {
    res.status(503).send("The broadcast channel does not exist!");
  }
}

async function postBroadcast(req, res) {
  const { title, message } = req.body;

  if (title && message) {
    const newMessage = { title, message };

    try {
      const result = await Channel.updateOne(
        { channelType: "nödkanal" },
        { $push: { messages: newMessage } }
      );
      if (result.modifiedCount > 0) {
        res.status(201).send("The message was broadcasted!");
      } else {
        res.status(503).send("Something went wrong!");
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(503).send("Server is unavailable");
      return;
    }

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
  } else {
    res.status(400).send("You need to supply a title and content!");
  }
}

export default { getBroadcast, postBroadcast };
