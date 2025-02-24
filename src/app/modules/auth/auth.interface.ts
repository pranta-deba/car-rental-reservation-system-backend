import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export type TSignUp = {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
  isDeleted: boolean;
};

export type TSignIn = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TSignUp> {
  isUserExistsByEmail(email: string): Promise<TSignUp>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
