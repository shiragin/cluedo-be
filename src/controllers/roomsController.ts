import { createRoomModel, getAllRoomsModel } from '../models/roomsModel';

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
  