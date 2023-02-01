import Room from "../schemas/roomSchema"

 export function createRoomModel(NewRoomData : Object) {
  return Room.create(NewRoomData);
 }
 export function getAllRoomsModel() {
  return Room.find();
 }

 export function addPlayerModel(roomId: string, playerId: string){
    return Room.updateOne({roomId: roomId}, {$push: {players: playerId}}, {new: true});
 }

 export function removePlayerModel(roomId:string, playerId:string){
    return Room.updateOne({roomId: roomId}, {$pull: {players: playerId}}, {new: true})
 }