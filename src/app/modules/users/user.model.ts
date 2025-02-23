import mongoose, { Model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const UserSchema: Schema<TUser> = new Schema<TUser>(
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

export const UserModel: Model<TUser> = mongoose.model<TUser>(
  'User',
  UserSchema,
);
