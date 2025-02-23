import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

// create user route
router.post(
  '/create-user',
  validateRequest(userValidation.userValidationSchema),
  UserControllers.createUser,
);

export const UserRoute = router;
