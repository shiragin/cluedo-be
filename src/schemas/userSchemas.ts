import { Schema, model, Document } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
  nickname: string;
  email?: string;
  password?: string;
}

const userSchema: Schema = new Schema<IUser>({
  nickname: {
    type: String,
    required: [true, 'Please enter a valid nickname'],
    maxlength: [8, `Your first name can't more than 8 characters`],
    minlength: [3, 'Your first name must have at least 3 characters'],
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [8, 'Your password must have at least 8 characters'],
  },
});

const User = model('User', userSchema);

module.exports = User;
