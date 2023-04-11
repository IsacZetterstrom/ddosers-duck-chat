import sockets from "../socket.js";
import fetch from "node-fetch";

async function onWsConnect(ws) {
  sockets.push(ws);

  ws.on("disconnect", onWsDisconnect);

  const channels = await getChannels();

  ws.emit("channels", channels);
}

function onWsDisconnect(ws) {
  sockets.splice(sockets.indexOf(ws), 1);
}

async function getChannels() {
  const mainChannels = await (
    await fetch("http://localhost:3001/ducks/api/channel", {
      method: "GET",
    })
  ).json();
  const broadcastChannel = await (
    await fetch("http://localhost:3001/ducks/api/broadcast", {
      method: "GET",
    })
  ).json();

  return [broadcastChannel, ...mainChannels];
}

export default onWsConnect;
