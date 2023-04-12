import sockets from "../socket.js";
import fetch from "node-fetch";

async function onWsConnect(ws) {
  sockets.push({ ws, channelId: "" });

  ws.on("disconnect", () => onWsDisconnect(ws));
  ws.on("channelListening", (channelId) => onChannelListening(ws, channelId));

  const channels = await getChannels();

  ws.emit("channels", channels);
}

async function onChannelListening(ws, channelId) {
  const socket = sockets.find((socket) => socket.ws == ws);
  if (socket) {
    socket.channelId = channelId;
  }

  const messagesResponse = await fetch(
    "http://localhost:3001/ducks/api/channel/?id=" + channelId,
    {
      method: "GET",
    }
  );

  if (messagesResponse.status === 200) {
    ws.emit("newMessage", await messagesResponse.json());
  }
}

function onWsDisconnect(ws) {
  const socket = sockets.find((element) => element.ws == ws);
  sockets.splice(sockets.indexOf(socket), 1);
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
