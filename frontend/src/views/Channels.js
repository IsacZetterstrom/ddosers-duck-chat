import { useState, useEffect, useRef } from "react";
import { fetchJson } from "../fetch";

export default function Channels() {
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState(undefined);
  const ref = useRef(false);

  async function fetchChannels(event) {
    const response = await fetchJson(
      "http://localhost:3001/ducks/api/channel",
      "GET"
    );
    const data = await response.json();
    console.log(data);
    setChannels(data);
  }

  function onChannelClick(channelName) {
    console.log(channelName);
    setChannel(channels.find((element) => element.name === channelName));
  }

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      fetchChannels();
    }
  });

  return (
    <main>
      <div>
        {channels.map((element, index) => {
          return (
            <p
              key={"channel-name-" + index}
              onClick={() => onChannelClick(element.name)}>
              {element.name}
            </p>
          );
        })}
      </div>
      <div>
        {channel !== undefined &&
          channel.messages.map((element) => {
            return (
              <div key={element._id}>
                <h3>{element.sender}</h3>
                <p>{element.message}</p>
              </div>
            );
          })}
      </div>
    </main>
  );
}
