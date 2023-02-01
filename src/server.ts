import { Socket, Server } from "socket.io";
import express from "express";
import http from "http";
import { createUser } from "./controllers/usersController";
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

interface User {
  nickname: string;
  socketId: string;
  _id: string;
}

interface Room {
  name: string;
  roomId: string;
  players: {
    playerId: string;
    playerNickname: string;
  }[];
  maxPlayers: number;
  ready: string[];
}

const rooms: Array<Room> = [
  {
    name: "room1",
    maxPlayers: 4,
    roomId: "1",
    players: [
      { playerId: "1", playerNickname: "Shira" },
      { playerId: "2", playerNickname: "Nadav" },
      { playerId: "3", playerNickname: "Odeya" },
    ],
    ready: ["1", "2", "3"],
  },
  {
    name: "room2",
    maxPlayers: 3,
    roomId: "2",
    players: [{ playerId: "1", playerNickname: "Shira" }],
    ready: [],
  },
];

io.on("connection", (socket: Socket): void => {
  socket.on("add_user", (data: { name: string }): void => {
    createUser(socket.id, data.name).then((res) => {
      if (res) {
        const { socketId, nickname, _id } = res;
        socket.emit("user_added", { socketId, nickname, id: _id });
      }
    });
  });

  socket.on("choose_room", (): void => {
    socket.emit("get_rooms", rooms);
  });

  socket.on("join_room", ({ roomId, user }): void => {
    console.log(roomId);
    const roomToJoin = rooms.find((r) => r.roomId == roomId);
    if (!roomToJoin) {
      socket.emit("error", "Room not found");
      return;
    }
    if (roomToJoin?.players.length < roomToJoin?.maxPlayers) {
      socket.join(roomId);
      roomToJoin.players.push({
        playerId: user.socketId,
        playerNickname: user.nickname,
      });
      socket
        .to(roomToJoin.roomId)
        .emit("player_joined", `${user.nickname} joined`);
      console.log(roomToJoin);
      console.log("Joined room number", roomId);
      // socket.emit('get_rooms', rooms);
      socket.emit("enter_queue", roomToJoin);
    }
    socket.emit("error", "Room is full");
  });

  socket.on("create_room", (room: Room, user): void => {
    console.log(room);
    rooms.push(room);
    socket.join(room.roomId);
    socket.emit("enter_queue", room);
  });

  socket.on("game_started", (data: any): void => {
    //Prepare the game data
    //emit.game_data(sending the game data)
  });

  socket.on(
    "ask",
    (data: { selectedCards: Array<string>; currentRoom: Room }): void => {
      const { selectedCards, currentRoom } = data;
      console.log(selectedCards);
      socket.to(currentRoom.roomId).emit("asked_cards", selectedCards);
    }
  );

  socket.on("ready", (data: { user: User; currentRoom: Room }): void => {
    socket.to(data.currentRoom.roomId).emit("player_ready", data.user.socketId);

    //if all players ready
  });

  socket.on("start_game", (roomid: string): void => {
    socket.emit("game_started");
    socket.to(roomid).emit("game_started");
  });

  socket.on("player_left", (data: { room: Room; user: User }): void => {
    const { room, user } = data;
    console.log(user.socketId);
    const filteredRoom = room.players.filter(
      (player) => player.playerId !== user.socketId
    );

    rooms[
      rooms.findIndex((room) =>
        room.players.find((p) => p.playerId === user.socketId)
      )
    ].players = filteredRoom;

    socket.to(room.roomId).emit("player_quit", `${user.nickname} left`);
  });
});

async function init(): Promise<void> {
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
