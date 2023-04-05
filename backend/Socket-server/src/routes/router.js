import express from "express";
import sockets from "../../socket.js";
const router = express.Router();

router.route("/updatedChannel").put((req, res) => {
  console.log("Updated channel!");
  const channel = req.body.channel;
  console.log(channel);
  for (let i = 0; i < sockets.length; i++) {
    sockets[i].emit("updatedChannel", channel);
  }
  res.send("Done!");
});

export default router;
