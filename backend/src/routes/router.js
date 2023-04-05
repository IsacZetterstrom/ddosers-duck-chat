import express from "express";
import ChannelController from "../controllers/ChannelController.js";
import BroadcastController from "../controllers/BroadcastController.js";
import UserController from "../controllers/UserController.js";
import authenticated from "../filter/authenticated.js";
import isAdmin from "../filter/isAdmin.js";
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Testing!");
});

router.route("/user").post(UserController.login).put(UserController.createUser);

router.use(authenticated.authenticate);

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
  .post(isAdmin.authenticateAdmin, BroadcastController.postBroadcast);

export default router;
