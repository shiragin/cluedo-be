import { Schema, model, Document } from 'mongoose';
import validator from 'validator';

// player interface and schemas

export interface IPlayer extends Document {
  playerId: string;
  nickname: string;
  gameId: Number;
  role: string;
  cards: {
    // clarification: string[];
    // eliminated: string[];
    clue: string[];
  };
}

const playerSchema: Schema = new Schema<IPlayer>({
  playerId: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  gameId: { type: Number, enum: [1, 2, 3, 4], require: true },
  role: { type: String, enum: ['current', 'asked', 'inactive'], require: true },
  cards: {
    // clarification: [String],
    // eliminated: [String],
    clue: [String],
    require: true,
  },
});

const Player = model<IPlayer>('Player', playerSchema);


export default Player;
