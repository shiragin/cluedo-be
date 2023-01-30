import { Socket, Server } from "socket.io";
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
