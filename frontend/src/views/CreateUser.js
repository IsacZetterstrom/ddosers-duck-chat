import { useState } from "react";
import { fetchJson, getFormData } from "../fetch";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);

  async function onFormSubmit(event) {
    event.preventDefault();
    setServerMessage("");

    const json = getFormData(event.target);

    if (json.password !== json.confirmPassword) {
      setServerMessage("The passwords do not match!");
      return;
    }

    const response = await fetchJson(
      "http://localhost:3001/ducks/api/user",
      "PUT",
      json
    );

    const data = await response.text();

    if (response.status === 201) {
      setAccountCreated(true);
    }
    setServerMessage(data);
  }

  return (
    <>
      {!accountCreated && (
        <form className="create-account-form" onSubmit={onFormSubmit}>
          <h1>Account creation</h1>
          <input required name="username" placeholder="Username..." />
          <input
            required
            name="password"
            type="password"
            placeholder="Password..."
          />
          <input
            required
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password..."
          />
          <button type="submit">Create User</button>
          {!accountCreated && <p>{serverMessage}</p>}
          <button
            onClick={() => {
              navigate("/");
            }}>
            Back
          </button>
        </form>
      )}
      {accountCreated && (
        <div className="account-created">
          <p>Account created!</p>
          <Link to="/">Login</Link>
        </div>
      )}
    </>
  );
}
