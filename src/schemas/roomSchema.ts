import mongoose, { Schema, model, Document } from 'mongoose';
import validator from 'validator';

export interface IRoom extends Document {
  roomId: string;
  name: string;
  maxPlayers: Number;
  players: [
   {type: mongoose.Types.ObjectId, ref:'players'}
  ];
}

const roomSchema: Schema = new Schema<IRoom>({
  roomId: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
 maxPlayers: { type: Number, enum: [1, 2, 3, 4], require: true },
  players: [{type: mongoose.Types.ObjectId, ref:'players'}],
});

const Room = model<IRoom>('room', roomSchema);
export default Room;