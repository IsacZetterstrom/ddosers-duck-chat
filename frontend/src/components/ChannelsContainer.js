import { useNavigate } from "react-router-dom";

export default function ChannelContainer(props) {
  const navigate = useNavigate();

  return (
    <div className="channels-container">
      <div className="admin-container">
        {" "}
        {window.sessionStorage.getItem("userRole") === "admin" && (
          <button onClick={() => navigate("/admin")}>Admin</button>
        )}
      </div>
      <div className="create-channel-container">
        <form onSubmit={props.createChannel}>
          <input name="name" placeholder="Channel name..." required />
          <button type="submit">Create channel</button>
        </form>
      </div>
      <h2 className="channel-header">Channels</h2>
      <div className="individual-channel">
        {props.channels.map((element, index) => {
          return (
            <h2
              className="channel"
              key={"channel-name-" + index}
              onClick={() => props.onChannelClick(index)}>
              {element.name}
            </h2>
          );
        })}
      </div>
    </div>
  );
}
