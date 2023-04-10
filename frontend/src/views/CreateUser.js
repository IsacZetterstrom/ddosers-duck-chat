import { useState } from "react";
import { fetchJson } from "../fetch";
import { useNavigate } from "react-router-dom";

export default function CreateUser(props) {
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  async function onFormSubmit(event) {
    event.preventDefault();
    setServerMessage("");

    const formData = new FormData(event.target);

    const json = Object.fromEntries(formData);

    const response = await fetchJson(
      "http://localhost:3001/ducks/api/user",
      "PUT",
      json
    );

    const data = await response.text();

    if (response.status === 201) {
      console.log("Everything went fine!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    setServerMessage(data);
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input required name="username" placeholder="Username" />
        <input
          required
          name="password"
          type="password"
          placeholder="Password"
        />
        <input
          required
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit">Create User</button>
      </form>
      <p>{serverMessage}</p>
    </>
  );
}
