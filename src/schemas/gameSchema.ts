// game interface and schemas - inside are nested 4 players objects
// import { Schema, model, Document } from 'mongoose';
// import Player, { IPlayer } from "./playerSchemas";
// export interface IGame extends Document {
//     player1: IPlayer | null;
//     player2: IPlayer | null;
//     player3: IPlayer | null;
//     player4: IPlayer | null;
//   }

//   const gameSchema: Schema = new Schema<IGame>({
//     player1: [Player.schema],
//     player2: [Player.schema],
//     player3: [Player.schema],
//     player4: [Player.schema],
//   });

//   const Game = model<IGame>('Game', gameSchema);

//   export default Game;
