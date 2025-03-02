import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './auth.service';

// create user controller
const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User registered successfully.',
    data: result,
  });
});

// login user controller
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User logged in successfully.',
    data: result.user,
    token: result.token,
  });
});
// login user with token controller
const loginUserWithToken = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await UserServices.loginUserWithTokenIntoDB(user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User logged in successfully.',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
  loginUserWithToken,
};
