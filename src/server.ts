import { Socket, Server } from "socket.io";
import express from "express";
import http from "http";
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket): void => {
  console.log("New user");

  // socket.on("join_room", (data) => {
  //   socket.join(data);
  // });

  socket.on("add_user", (data) => {
    console.log(data.name);
    socket.emit("user_added", "Welcome " + data.name);
  });
});

async function init() {
  const connection = await mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "cluedo",
    });
  if (connection) {
    console.log("Connected to DB");
    server.listen(process.env.PORT, () => {
      console.log(`Listening on ${process.env.PORT}`);
    });
  }
}
init();
