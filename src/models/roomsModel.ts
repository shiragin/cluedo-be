import Room, { IRoom } from '../schemas/roomSchema';

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
  console.log(newRoom);
  return Room.findOneAndUpdate({ roomId: newRoom.roomId }, newRoom, {
    new: true,
    runValidators: true,
  });
}

export function removePlayerModel(roomId: string, playerId: string) {
  return Room.updateOne(
    { roomId: roomId },
    { $pull: { players: playerId } },
    { new: true }
  );
}
