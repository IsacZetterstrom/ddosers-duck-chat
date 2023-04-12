import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();

  function logoutClick() {
    window.sessionStorage.clear();
    navigate("/");
  }

  return (
    <header>
      <h1>Duckling-Broadcaster</h1>
      <button onClick={logoutClick}>Logout</button>
    </header>
  );
}
