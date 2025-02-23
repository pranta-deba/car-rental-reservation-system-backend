import { model, Schema } from 'mongoose';
import { TSignUp } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

// hash password set in save user data
UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// remove password from user object before returning it to client
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TSignUp>('User', UserSchema);
