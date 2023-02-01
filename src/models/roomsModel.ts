import Room, { IRoom } from "../schemas/roomSchema";

export function createRoomModel(NewRoomData: Object) {
  return Room.create(NewRoomData);
}
export function getAllRoomsModel() {
  return Room.find();
}
export function getRoombyIdModel(id: string) {
  return Room.findOne({ roomId: id });
}

export function addPlayerModel(
  roomId: string,
  playerId: string,
  playerNickname: string
) {
  return Room.findOneAndUpdate(
    { roomId: roomId },
    { $push: { players: { playerId, playerNickname } } },
    {
      new: true,
      runValidators: true,
    }
  );
}

export async function updateRoomModel(newRoom: IRoom) {
  try {
    return Room.findOneAndUpdate({ roomId: newRoom.roomId }, newRoom, {
      new: true,
      runValidators: true,
    });
  } catch (err: any) {
    console.log(err.message);
  }
}

export function removePlayerModel(roomId: string, filteredRoom: object[]) {
  return Room.findOneAndUpdate(
    { roomId: roomId },
    { players: filteredRoom },
    { new: true }
  );
}
