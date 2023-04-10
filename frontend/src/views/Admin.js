import { fetchJson, getFormData } from "../fetch";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  async function broadcastMessage(event) {
    event.preventDefault();
    const json = getFormData(event.target);

    await fetchJson(`http://localhost:3001/ducks/api/broadcast`, "POST", json);

    navigate("/channels");
  }

  return (
    <div>
      <form onSubmit={broadcastMessage}>
        <input name="title" required placeholder="Title..." />
        <input name="message" required placeholder="Message..." />
        <button type="submit">Broadcast message</button>
      </form>
    </div>
  );
}
