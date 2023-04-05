import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
// import cors from "cors";

const app = express();
// app.use(cors({ origin: "*" }));

const server = createServer(app);
const io = new Server(server, { cors: { origin: true } });

io.on("connection", (ws) => {
  console.log("Someone connected to websocket!");
});

server.listen(5050, () => {
  console.log("Server started listening on port 5050");
});
