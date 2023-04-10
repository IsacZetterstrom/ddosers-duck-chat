import { fetchJson, getFormData } from "../fetch";

export default function Admin() {
  async function broadcastMessage(event) {
    event.preventDefault();
    const json = getFormData(event.target);

    await fetchJson(`http://localhost:3001/ducks/api/broadcast`, "POST", json);
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
