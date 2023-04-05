import express from "express";
import ChannelController from "../controllers/ChannelController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Testing!");
});

router.route("/channel*").get(ChannelController.getChannels);

router.get("/channels", (req, res) => {
  res.send("advertised channels");
});

router.route("/broadcast").get(ChannelController.getBroadcast);

export default router;
