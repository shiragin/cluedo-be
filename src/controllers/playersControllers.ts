// import { User } from '../schemas/userSchemas';
import { createPlayerModel } from '../models/playersModel';

export async function createPlayer(newPlayerData: Object) {
  try {
    const newPlayer = await createPlayerModel(newPlayerData);
    if (newPlayer) return newPlayer;
  } catch (error) {
    console.error(error);
  }
}
