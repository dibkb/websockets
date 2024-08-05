import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const timeOutRef = useRef(null);
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

      socket.on("typing", () => {
        setTyping(true);
      });
      socket.on("not-typing", () => {
        setTyping(false);
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
  const onChageHandler = (ev) => {
    const val = ev.target.value;
    setInput(val);
    socket.emit("typing");

    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = setTimeout(() => {
      socket.emit("not-typing");
    }, 2000);
  };
  useEffect(() => {}, []);
  return (
    <div>
      <form onSubmit={sendMessageHandler}>
        <input type="text" value={input} onChange={onChageHandler} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((e) => {
          return <li key={e}>{e}</li>;
        })}
        {typing && <pre>Typing</pre>}
      </ul>
    </div>
  );
}
export default App;
