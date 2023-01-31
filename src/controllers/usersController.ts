// import { User } from '../schemas/userSchemas';
import { createUserData } from '../models/usersModel';

export async function createUser(socketId: string, name: string) {
  try {
    const newUser = await createUserData(socketId, name);
    if (newUser) return newUser;
  } catch (error) {
    console.error(error);
  }
}
