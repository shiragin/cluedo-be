import { Socket, Server } from 'socket.io';
import express from 'express';
import http from 'http';
import { createUser } from './controllers/usersController';
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

interface Room {
  name: string;
  roomId: string;
  players: Array<string>;
  maxPlayers: number;
}

const rooms: Array<Room> = [
  { name: 'room1', maxPlayers: 4, roomId: '1', players: ['1', '2', '3'] },
  { name: 'room2', maxPlayers: 3, roomId: '2', players: ['5', '6'] },
];

io.on('connection', (socket: Socket): void => {
  console.log('New user');
  console.log(socket.id);

  socket.on('add_user', (data: { name: string }): void => {
    createUser(socket.id, data.name).then((res) => {
      if (res) {
        socket.emit('user_added', res);
      }
    });
  });

  socket.on('choose_room', (): void => {
    socket.emit('get_rooms', rooms);
  });

  socket.on('join_room', (roomId: string): void => {
    const roomToJoin = rooms.find((r) => r.roomId == roomId);
    if (!roomToJoin) {
      socket.emit('error', 'Room not found');
      return;
    }
    roomToJoin?.players.length < roomToJoin?.maxPlayers
      ? socket.join(roomId)
      : socket.emit('error', 'Room is full');
  });

  socket.on('create_room', (room: Room): void => {
    rooms.push(room);
    socket.join(room.roomId);
  });

  socket.on('game_started', (data: any): void => {
    //Prepare the game data
    //emit.game_data(sending the game data)
  });
});

async function init(): Promise<void> {
  const connection = await mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'cluedo',
    });
  if (connection) {
    console.log('Connected to DB');
    server.listen(process.env.PORT, () => {
      console.log(`Listening on ${process.env.PORT}`);
    });
  }
}
init();
