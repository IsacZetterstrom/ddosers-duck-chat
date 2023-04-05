import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

function App() {
  const ref = useRef(false);
  const [clientIo, setIo] = useState();

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      setIo(io("ws://localhost:5050"));
    }
  });

  return (
    <div>
      <h1>Duck</h1>
    </div>
  );
}

export default App;
