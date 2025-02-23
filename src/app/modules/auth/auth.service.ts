import { TSignUp } from './auth.interface';
import { User } from './auth.model';

// create user service
const createUserIntoDB = async (password: string, payload: TSignUp) => {
  const result = await User.create({ ...payload, password });
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
