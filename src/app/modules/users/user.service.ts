import { TUser } from './user.interface';

// create user service
const createUserIntoDB = async (password: string, payload: TUser) => {
  console.log({ password, payload });
};

export const UserServices = {
  createUserIntoDB,
};
