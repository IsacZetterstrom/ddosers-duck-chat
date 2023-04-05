import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

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
      setIo(newIo);
    }
  }, []);

  return (
    <div>
      <h1>Duck</h1>
    </div>
  );
}

export default App;
