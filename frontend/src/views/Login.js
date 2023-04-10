import { fetchJson } from "../fetch";

export default function Login() {
  async function loginForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const json = Object.fromEntries(formData);
    const response = await fetchJson(
      "http://localhost:3001/ducks/api/user",
      "POST",
      json
    );

    const data = await response.json();

    window.sessionStorage.setItem("sessionToken", data.token);
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
