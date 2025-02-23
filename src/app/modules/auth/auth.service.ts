import status from 'http-status';
import AppError from '../../errors/AppError';
import { TSignIn, TSignUp } from './auth.interface';
import { User } from './auth.model';

// create user service
const createUserIntoDB = async (payload: TSignUp) => {
  const result = await User.create(payload);
  return result;
};

// login user service
const loginUserIntoDB = async (payload: TSignIn) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found !');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(status.UNAUTHORIZED, 'Incorrect password!');
  }
  // password not sending
  user.password = '';
  return user;
};

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
};
