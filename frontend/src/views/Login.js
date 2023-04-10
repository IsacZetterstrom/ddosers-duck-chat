import { fetchJson, getFormData } from "../fetch";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

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
      navigate("/channels");
    } else {
      console.log("fel användare");
    }
  }
  return (
    <div>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
