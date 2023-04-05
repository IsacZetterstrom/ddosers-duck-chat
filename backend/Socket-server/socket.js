import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);
const io = new Server(server);

io.on("connection", (ws) => {
  console.log("Someone connected to websocket!");
});

server.listen(5050, () => {
  console.log("Server started listening on port 5050");
});
