import { fetchJson, getFormData } from "../fetch";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState("");

  async function loginForm(event) {
    event.preventDefault();

    const json = getFormData(event.target);

    const response = await fetchJson(
      "http://localhost:3001/ducks/api/user",
      "POST",
      json
    );

    if (response.status === 200) {
      const data = await response.json();
      window.sessionStorage.setItem("sessionToken", data.token);
      window.sessionStorage.setItem("userRole", data.userRole);
      navigate("/channels");
    } else {
      setServerMessage("Användarnamn eller lösenord är felaktigt");
      console.log("fel användare");
    }
  }
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={loginForm}>
        <input
          className="login-name"
          placeholder="Username..."
          name="username"
        />
        <input
          className="login-password"
          placeholder="Password..."
          type="password"
          name="password"
        />
        <p>{serverMessage}</p>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account?</p>
      <Link to={"/createUser"} className="link">
        Create account
      </Link>
    </div>
  );
}
