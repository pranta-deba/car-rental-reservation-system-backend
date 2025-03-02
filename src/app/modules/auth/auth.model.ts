import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true, select: 0 },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    photo: { type: String, default: '' },
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

// find one by email
UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password'); // ('+password') --> password and all data
};

// compare plain text password with hashed password
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', UserSchema);
