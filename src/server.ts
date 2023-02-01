
import { Socket, Server } from 'socket.io';
import express from 'express';
import http from 'http';
import { IRoom } from './schemas/roomSchema';
import { createUser } from './controllers/usersController';
import {
  addPlayer,
  createRoom,
  getAllRooms,
  getRoombyId,
  removePlayer,
  updateRoom
  } from "./controllers/roomsController";
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


// interface Room {
//   name: string;
//   roomId: string;
//   players: {
//     playerId: string;
//     playerNickname: string;
//   }[];
//   maxPlayers: number;
//   ready: string[];
// }


io.on("connection", (socket: Socket): void => {
  socket.on("add_user", (data: {name: string}): void => {
    createUser(socket.id, data.name).then((res) => {
      if (res) {
        const {socketId, nickname, _id} = res;
        socket.emit("user_added", {socketId, nickname, id: _id});
      }
    });
  });

  socket.on("choose_room", (): void => {
    getAllRooms().then((res) => {
      socket.emit("get_rooms", res);
    });
  });

  socket.on(
    "join_room",
    (data: {
      roomId: string;
      user: {socketId: string; nickname: string; id: string};
    }): void => {
      const {roomId, user} = data;
      getRoombyId(roomId).then((room) => {
        if (room!.players.length < room!.maxPlayers) {
          addPlayer(roomId, user.id, user.nickname).then((res) => {
            socket.join(roomId);
            socket.emit("enter_queue", res);
            if (!res) {
              socket.emit("error", "Room not found");
              return;
            }
          });
        } else {
          socket.emit("error", "Room is full");
        }
      });
    }
  );

  socket.on("create_room", (newRoom): void => {
    createRoom(newRoom).then((res) => {
      socket.join(newRoom.roomId);
      socket.emit("enter_queue", res);
    });
  });

  socket.on("game_started", (data: any): void => {
    //Prepare the game data
    //emit.game_data(sending the game data)
  });

  socket.on(
    'ask',
    (data: { selectedCards: Array<string>; currentRoom: IRoom }): void => {
      const { selectedCards, currentRoom } = data;
      socket.to(currentRoom.roomId).emit('asked_cards', selectedCards);
    }
  );

  socket.on('ready', (data: { user: User; currentRoom: IRoom }): void => {
    socket.to(data.currentRoom.roomId).emit('player_ready', data.user.socketId);

    //if all players ready
  });

  socket.on("start_game", (roomid: string): void => {
    getRoombyId(roomid).then((res) => {
      if (res) {
        socket.emit("game_started", res);
        socket.to(roomid).emit("game_started", res);
      }
    });
  });

  socket.on(
    "player_left",
    (data: {
      room: Room;
      user: {socketId: string; nickname: string; id: string};
    }): void => {
      const {room, user} = data;
      const filteredRoom = room.players.filter(
        (player) => player.playerId !== user.id
      );
      removePlayer(room.roomId, filteredRoom);

      // rooms[
      //   rooms.findIndex((room) =>
      //     room.players.find((p) => p.playerId === user.socketId)
      //   )
      // ].players = filteredRoom;

      socket.to(room.roomId).emit("player_quit", `${user.nickname} left`);
    }
  );
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
