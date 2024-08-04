import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 4000 });
wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.send(`${message}`);
  });
});
