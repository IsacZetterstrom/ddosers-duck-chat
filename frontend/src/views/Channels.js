import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { fetchJson, getFormData } from "../fetch";
import { useNavigate } from "react-router-dom";

export default function Channels() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState(undefined);
  const [clientIo, setIo] = useState();
  const ref = useRef(false);

  function onChannelClick(channelIndex) {
    setChannel(channelIndex);
  }

  async function sendMessage(event) {
    event.preventDefault();

    const json = getFormData(event.target);

    await fetchJson(
      `http://localhost:3001/ducks/api/channel/?id=${channels[channel]._id}`,
      "POST",
      json
    );
  }
  async function deleteChannel(event) {
    event.preventDefault();
    const reponse = await fetchJson(
      `http://localhost:3001/ducks/api/channel/?id=${channels[channel]._id}`,
      "DELETE"
    );
  }

  async function createChannel(event) {
    event.preventDefault();
    const response = await fetchJson(
      "http://localhost:3001/ducks/api/channel",
      "PUT",
      getFormData(event.target)
    );
  }

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      const newIo = io("ws://localhost:5050");
      newIo.on("channels", (channels) => {
        setChannels(channels);
      });
      newIo.on("updatedChannel", (value) => {
        setChannels((oldValue) => {
          const channelArray = [];
          channelArray.push(...oldValue);
          channelArray.push(value);

          return channelArray;
        });
      });
      newIo.on("newMessage", (value) => {
        setChannels((oldValue) => {
          const newValue = JSON.parse(JSON.stringify(oldValue));
          const foundChannel = newValue.find(
            (element) => element._id === value.channelId
          );

          foundChannel.messages.push(value.newMessage);

          return newValue;
        });
      });
      setIo(newIo);
    }
  }, [setIo, setChannel, setChannels, channels]);

  return (
    <main className="main-container">
      <div className="create-channel-container">
        <form onSubmit={createChannel}>
          <input name="name" placeholder="Channel name..." required />
          <button type="submit">Create channel</button>
        </form>
        <div className="channels-container">
          {channels.map((element, index) => {
            return (
              <p
                key={"channel-name-" + index}
                onClick={() => onChannelClick(index)}>
                {element.name}
              </p>
            );
          })}
        </div>
      </div>
      <div>
        {window.sessionStorage.getItem("userRole") === "admin" && (
          <button onClick={() => navigate("/admin")}>Admin</button>
        )}
        {channel !== undefined &&
          channels[channel].channelType === "public" && (
            <button onClick={deleteChannel}>Delete channel</button>
          )}
        <div>
          {channel !== undefined &&
            channels[channel].messages.map((element, index) => {
              return (
                <div key={element._id || "message-id-" + index}>
                  <h3>{element.sender || element.title}</h3>
                  <p>{element.message}</p>
                </div>
              );
            })}
        </div>
        {channel !== undefined &&
          channels[channel].channelType === "public" && (
            <form onSubmit={sendMessage}>
              <input name="message" placeholder="Write Message..." required />
              <button type="submit">Send</button>
            </form>
          )}
      </div>
    </main>
  );
}
