interface Room {
    name: string;
    roomId: string;
    players: {
      playerId: string;
      playerNickname: string;
    }[];
    maxPlayers: number;
  }

export async function createPlayer(room: Room, player: string) {

    
    // try {
    //   const newUser = await createUserData(socketId, name);
    //   if (newUser) return newUser;
    // } catch (error) {
    //   console.error(error);
    // }
  }