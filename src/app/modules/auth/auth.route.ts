import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './auth.validation';
import { UserControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './auth.constant';

const router = express.Router();

// create user route
router.post(
  '/signup',
  validateRequest(userValidation.userSignUpValidationSchema),
  UserControllers.createUser,
);
// login user route
router.post(
  '/signin',
  validateRequest(userValidation.userSignInValidationScheme),
  UserControllers.loginUser,
);
// login user with token route
router.get(
  '/signin-with-token',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.loginUserWithToken,
);

export const UserRoute = router;
