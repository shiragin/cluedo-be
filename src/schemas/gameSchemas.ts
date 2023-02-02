import { Schema, model, Document } from 'mongoose';
import validator from 'validator';

// player interface and schemas

export interface IPlayer extends Document {
  nickname: string;
  gameId: Number;
  role: string;
  cards: {
    clarification: string[];
    eliminated: string[];
    clue: string[];
  };
}

const playerSchema: Schema = new Schema<IPlayer>({
  nickname: { type: String, required: true, unique: true },
  gameId: { type: Number, enum: [1, 2, 3, 4], require: true },
  role: { type: String, enum: ['current', 'asked', 'inactive'], require: true },
  cards: {
    clarification: [String],
    eliminated: [String],
    clue: [String],
    require: true,
  },
});

const Player = model('Player', playerSchema);

// game interface and schemas - inside are nested 4 players objects

export interface IGame extends Document {
  player1: IPlayer | null;
  player2: IPlayer | null;
  player3: IPlayer | null;
  player4: IPlayer | null;
}

const gameSchema: Schema = new Schema<IGame>({
  player1: [Player.schema],
  player2: [Player.schema],
  player3: [Player.schema],
  player4: [Player.schema],
});

const Game = model('Game', gameSchema);

module.exports = Game;
