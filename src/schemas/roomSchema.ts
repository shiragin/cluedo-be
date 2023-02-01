import mongoose, { Schema, model, Document } from 'mongoose';
import validator from 'validator';

export interface IRoom extends Document {
  roomId: string;
  name: string;
  players: [{ playerId: string; playerNickname: string }];
  maxPlayers: number;
}

const roomSchema: Schema = new Schema<IRoom>({
  roomId: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  maxPlayers: { type: Number, enum: [2, 3, 4], require: true },
  players: [{ playerId: String, playerNickname: String }],
});

const Room = model<IRoom>('room', roomSchema);
export default Room;
