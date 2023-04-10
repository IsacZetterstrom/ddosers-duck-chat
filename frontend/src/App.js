import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./views/CreateUser";
import Login from "./views/Login";
import Channels from "./views/Channels";
import Admin from "./views/Admin";

function App() {
  return (
    <>
      <BrowserRouter>
        <h1>Duck</h1>
        <Routes>
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
