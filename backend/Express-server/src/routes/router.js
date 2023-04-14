import express from "express";
import ChannelController from "../controllers/ChannelController.js";
import BroadcastController from "../controllers/BroadcastController.js";
import UserController from "../controllers/UserController.js";
import authenticated from "../filter/authenticated.js";
import isAdmin from "../filter/isAdmin.js";
const router = express.Router();

router.route("/user").post(UserController.login).put(UserController.createUser);

router
  .route("/channel")
  .get(ChannelController.getChannels)
  .put(authenticated.authenticate, ChannelController.putChannel)
  .post(authenticated.authenticate, ChannelController.postChannel)
  .delete(authenticated.authenticate, ChannelController.deleteChannel);

router
  .route("/broadcast")
  .get(BroadcastController.getBroadcast)
  .post(
    authenticated.authenticate,
    isAdmin.authenticateAdmin,
    BroadcastController.postBroadcast
  );

export default router;
