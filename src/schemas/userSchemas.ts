import { Schema, model, Document } from 'mongoose';
// import validator from 'validator';

export interface IUser extends Document {
  socketId: string;
  nickname: string;
}

const userSchema: Schema = new Schema<IUser>({
  socketId: { type: String, required: true },
  nickname: {
    type: String,
    required: [true, 'Please enter a valid nickname'],
    maxlength: [8, `Your first name can't more than 8 characters`],
    minlength: [3, 'Your first name must have at least 3 characters'],
  },
});

const User = model<IUser>('User', userSchema);
export default User;
