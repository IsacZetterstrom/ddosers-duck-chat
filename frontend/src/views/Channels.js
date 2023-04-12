import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { fetchJson, getFormData } from "../fetch";
import MessageSection from "../components/MessageSection";
import ChannelContainer from "../components/ChannelsContainer";
import Header from "../components/Header";

export default function Channels() {
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState(undefined);
  const [messages, setMessages] = useState(undefined);
  const [clientIo, setIo] = useState();
  const ref = useRef(false);

  function onChannelClick(channelIndex) {
    setChannel(channelIndex);
    clientIo.emit("channelListening", channels[channelIndex]._id);
  }

  async function sendMessage(event) {
    event.preventDefault();

    const json = getFormData(event.target);

    await fetchJson(
      `http://localhost:3001/ducks/api/channel/?id=${channels[channel]._id}`,
      "POST",
      json
    );

    event.target.querySelector("input").value = "";
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
    event.target.querySelector("input").value = "";
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
        console.log(value);
        if (value.length || value.length === 0) {
          setMessages(value);
        } else {
          setMessages((oldValue) => [...oldValue, value]);
        }
      });
      setIo(newIo);
    }
  }, [setIo, setChannel, setChannels, channels]);

  return (
    <>
      <Header />
      <main className="main-container">
        <ChannelContainer
          createChannel={createChannel}
          onChannelClick={onChannelClick}
          channels={channels}
        />
        <MessageSection
          deleteChannel={deleteChannel}
          channel={channel}
          channels={channels}
          messages={messages}
          sendMessage={sendMessage}
        />
      </main>
    </>
  );
}
