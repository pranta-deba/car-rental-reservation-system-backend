import { TSignUp } from './auth.interface';

// create user service
const createUserIntoDB = async (password: string, payload: TSignUp) => {
  console.log({ password, payload });

  return null;
};

export const UserServices = {
  createUserIntoDB,
};
