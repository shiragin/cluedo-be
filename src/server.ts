import { Socket, Server } from "socket.io";
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
