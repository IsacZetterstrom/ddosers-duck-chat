import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import router from "./src/routes/router.js";
// import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
// app.use(cors({ origin: "*" }));

const server = createServer(app);
const io = new Server(server, { cors: { origin: true } });

const sockets = [];

io.on("connection", (ws) => {
  sockets.push(ws);

  ws.on("disconnect", () => {
    sockets.splice(sockets.indexOf(ws), 1);
  });
});

server.listen(5050, () => {
  console.log("Server started listening on port 5050");
});

export default sockets;
