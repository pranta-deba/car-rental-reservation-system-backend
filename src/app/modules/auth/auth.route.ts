import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './auth.validation';
import { UserControllers } from './auth.controller';

const router = express.Router();

// create user route
router.post(
  '/signup',
  validateRequest(userValidation.userValidationSchema),
  UserControllers.createUser,
);

export const UserRoute = router;
