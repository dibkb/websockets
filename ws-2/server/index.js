import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
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

httpServer.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
