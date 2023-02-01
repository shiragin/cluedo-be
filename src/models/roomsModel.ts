import Room from "../schemas/roomSchema"

 export function createRoomModel(NewRoomData : Object) {
  return Room.create(NewRoomData);
 }
 export function getAllRoomsModel() {
  return Room.find();
 }
