import { Model } from 'mongoose';

export interface TSignUp {
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
  isDeleted: boolean;
}

export interface TSignIn {
  email: string;
  password: string;
}

export interface UserModel extends Model<TSignUp> {
  isUserExistsByEmail(email: string): Promise<TSignUp>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
}
