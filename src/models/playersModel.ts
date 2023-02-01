import Player from "../schemas/playerSchemas"

  export function createPlayerModel(newPlayerData: Object) {
    return Player.create(newPlayerData);
  }
