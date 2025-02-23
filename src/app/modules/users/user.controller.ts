import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// create user controller
const createUser = catchAsync(async (req, res) => {
  const { password, user: userData } = req.body;
  const result = await UserServices.createUserIntoDB(password, userData);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is created successfully.',
    data: null,
  });
});

export const UserControllers = {
  createUser,
};
