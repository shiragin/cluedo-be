import {
  createRoomModel,
  getAllRoomsModel,
  getRoombyIdModel,
  addPlayerModel,
  removePlayerModel,
} from '../models/roomsModel';

export async function createRoom(NewRoomData: Object) {
  try {
    const newRoom = await createRoomModel(NewRoomData);
    console.log('ROOM CREATED', newRoom);
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

export async function removePlayer(roomId: string, playerId: string) {
  try {
    const updatedRoom = await removePlayerModel(roomId, playerId);
    if (updatedRoom) return updatedRoom;
  } catch (error) {
    console.error(error);
  }
}

export async function getRoombyId(roomid: string) {
  try {
    const room = await getRoombyIdModel(roomid);
    console.log(room);
    if (room) return room;
  } catch (err) {
    console.error(err);
  }
}
