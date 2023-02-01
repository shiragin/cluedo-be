import mongoose, { Schema, model, Document } from 'mongoose';
import validator from 'validator';

export interface IRoom extends Document {
  roomId: string;
  name: string;
  players: [
    { playerId: string; playerNickname: string; role: string; clues: Clue[] }
  ];
  maxPlayers: number;
}

export interface Clue {
  id: number;
  name: string;
  type: string;
  color: string;
  image: string;
}

const roomSchema: Schema = new Schema<IRoom>({
  roomId: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  maxPlayers: { type: Number, enum: [2, 3, 4], require: true },
  players: [
    {
      playerId: String,
      playerNickname: String,
      role: { type: String, enum: ['active', 'asked', 'inactive'] },
      clues: [
        {
          id: Number,
          type: String,
          name: String,
          color: String,
          image: String,
        },
      ],
    },
  ],
});

const Room = model<IRoom>('room', roomSchema);
export default Room;
