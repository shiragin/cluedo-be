import User from '../schemas/userSchemas';

export function createUserData(socketId: string, name: string) {
  return User.create({
    socketId: socketId,
    nickname: name,
  });
}
