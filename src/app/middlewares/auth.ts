import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/auth/auth.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/auth/auth.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    // checking if the token is missing
    if (!token) {
      throw new AppError(
        status.UNAUTHORIZED,
        'You have no access to this route!',
      );
    }
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { email, role } = decoded;

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(status.NOT_FOUND, 'This user is not found !');
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(status.FORBIDDEN, 'This user is deleted !');
    }

    // role verify
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        status.UNAUTHORIZED,
        'You have no access to this route!',
      );
    }

    // decoded
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
