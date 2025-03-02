import status from 'http-status';
import AppError from '../../errors/AppError';
import { TSignIn, TUser } from './auth.interface';
import { User } from './auth.model';
import config from '../../config';
import { generateToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';

// create user service
const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  if (user) {
    const jwtPayload = {
      email: user.email,
      role: user.role,
    };

    const accessToken = generateToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
    return { token: accessToken, user };
  }
};

// create user service
const loginUserWithTokenIntoDB = async (payload: JwtPayload) => {
  const result = await User.findOne({ email: payload?.email });
  return result;
};
// create google user service
const googleUserIntoDB = async (payload: Partial<TUser>) => {
  let user = await User.findOne({ email: payload?.email, social: true });

  if (!user) {
    user = await User.create({
      name: payload?.name,
      email: payload?.email,
      phone: payload?.phone || 'unknown phone',
      photo: payload?.photo || 'unknown photo',
      password: payload?.email,
      address: payload?.address || 'unknown address',
      role: 'user',
      social: true,
    });
  }
  //create token and sent to the  client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { token: accessToken, user };
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

  // only email password user not google user
  if (user.social) {
    throw new AppError(status.UNAUTHORIZED, 'This user is a social user!');
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

  //create token and sent to the  client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { token: accessToken, user };
};

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  loginUserWithTokenIntoDB,
  googleUserIntoDB,
};
