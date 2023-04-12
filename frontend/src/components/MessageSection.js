export default function MessageSection(props) {
  return (
    <section className="message-section">
      {props.channel !== undefined &&
        props.channels[props.channel].channelType === "public" && (
          <button onClick={props.deleteChannel}>Delete channel</button>
        )}
      <div className="message-container">
        {props.messages !== undefined &&
          (() => {
            const newchannels = props.messages.map((element, index) => {
              return (
                <div
                  className="message"
                  key={element._id || "message-id-" + index}>
                  <h3>{element.sender || element.title}</h3>
                  <p>{element.message}</p>
                </div>
              );
            });
            setTimeout(() => {
              const messageCont = document.querySelector(".message-container");
              messageCont.scrollTo(0, messageCont.scrollHeight);
            }, 50);
            return newchannels;
          })()}
      </div>
      {props.channel !== undefined &&
        props.channels[props.channel].name !== "Nödkanal" && (
          <form onSubmit={props.sendMessage}>
            <input name="message" placeholder="Write Message..." required />
            <button type="submit">Send</button>
          </form>
        )}
    </section>
  );
}
