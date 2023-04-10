import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { fetchJson, getFormData } from "../fetch";

export default function Channels() {
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState(undefined);
  const [clientIo, setIo] = useState();
  const ref = useRef(false);

  async function fetchChannels(event) {
    const response = await fetchJson(
      "http://localhost:3001/ducks/api/channel",
      "GET"
    );
    const data = await response.json();
  }

  function onChannelClick(channelIndex) {
    setChannel(channelIndex);
  }

  async function sendMessage(event) {
    event.preventDefault();

    const json = getFormData(event.target);

    const response = await fetchJson(
      `http://localhost:3001/ducks/api/channel/?id=${channels[channel]._id}`,
      "POST",
      json
    );

    // console.log(await response.text());
  }

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      fetchChannels();
      const newIo = io("ws://localhost:5050");
      newIo.on("updatedChannel", (value) => {
        console.log(value);
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
    <main>
      <div>
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
      <div>
        {channel !== undefined &&
          channels[channel].messages.map((element) => {
            return (
              <div key={element._id}>
                <h3>{element.sender}</h3>
                <p>{element.message}</p>
              </div>
            );
          })}
        <div>
          <form onSubmit={sendMessage}>
            <input name="message" placeholder="Write Message..." />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </main>
  );
}
