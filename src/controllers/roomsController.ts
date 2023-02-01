import Room, {IRoom} from "../schemas/roomSchema";
import {
  createRoomModel,
  getAllRoomsModel,
  getRoombyIdModel,
  addPlayerModel,
  removePlayerModel,
  updateRoomModel,
} from "../models/roomsModel";

export async function createRoom(NewRoomData: Object) {
  try {
    const newRoom = await createRoomModel(NewRoomData);
    if (newRoom) return newRoom;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllRooms() {
  try {
    const allRooms = await getAllRoomsModel();
    if (allRooms) return allRooms;
  } catch (error) {
    console.error(error);
  }
}

export async function addPlayer(
  roomId: string,
  playerId: string,
  playerNickname: string
) {
  try {
    const updatedRoom = await addPlayerModel(roomId, playerId, playerNickname);
    if (updatedRoom) return updatedRoom;
  } catch (error) {
    console.error(error);
  }
}

export async function removePlayer(roomId: string, filteredRoom: object[]) {
  try {
    const updatedRoom = await removePlayerModel(roomId, filteredRoom);
    if (updatedRoom) return updatedRoom;
  } catch (error) {
    console.error(error);
  }
}

export async function getRoombyId(roomid: string) {
  try {
    const room = await getRoombyIdModel(roomid);
    if (!room) {
      return;
    }
    room!.players.map((player, index) => {
      if (index === 0) player.role = "active";
      else if (index === 1) player.role = "asked";
      else player.role = "inactive";
    });
    const updatedRoom = await updateRoomModel(room);
    return updatedRoom;
  } catch (err) {
    console.error(err);
  }
}
