import express from "express";
import { Server } from "socket.io";
const PORT = 3000;
const app = express();
const expressServer = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? ALLOWED_ORIGINS
        : ["http://localhost:5174"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id}`);
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", data);
  });
});
