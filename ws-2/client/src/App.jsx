import { useEffect, useState } from "react";
import { io } from "socket.io-client";
function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    const newSocket = io("ws://localhost:3000");
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [socket]);
  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("message", input);
    }
    setInput("");
  };
  return (
    <div>
      <form onSubmit={sendMessageHandler}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((e) => {
          return <li key={e}>{e}</li>;
        })}
      </ul>
    </div>
  );
}
export default App;
