import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export type TUser = {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address?: string;
  photo?: string;
  isDeleted: boolean;
  social?: boolean;
};

export type TSignIn = {
  email: string;
  password: string;
};

// generate token types
export type TGenerateToken = {
  email: string;
  role: string;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
