import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./views/CreateUser";
import Login from "./views/Login";
import Channels from "./views/Channels";

function App() {
  const ref = useRef(false);
  const [clientIo, setIo] = useState();

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      const newIo = io("ws://localhost:5050");
      newIo.on("updatedChannel", (value) => {
        console.log(value);
      });
      newIo.on("newMessage", (value) => {
        console.log(value);
      });
      setIo(newIo);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <h1>Duck</h1>
        <Routes>
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/channels" element={<Channels />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
