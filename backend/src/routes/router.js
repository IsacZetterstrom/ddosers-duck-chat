import express from "express";
import ChannelController from "../controllers/ChannelController.js";
import BroadcastController from "../controllers/BroadcastController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Testing!");
});

router
  .route("/channel*")
  .get(ChannelController.getChannels)
  .put(ChannelController.putChannel)
  .post(ChannelController.postChannel)
  .delete(ChannelController.deleteChannel);

router.get("/channels", (req, res) => {
  res.send("advertised channels");
});

router
  .route("/broadcast")
  .get(BroadcastController.getBroadcast)
  .post(BroadcastController.postBroadcast);

export default router;
