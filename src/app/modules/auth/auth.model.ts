import { model, Schema } from 'mongoose';
import { TSignUp } from './auth.interface';

const UserSchema = new Schema<TSignUp>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const UserModel = model<TSignUp>('User', UserSchema);
