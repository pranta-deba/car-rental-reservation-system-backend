import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create-user',
  validateRequest(userValidation.userValidationSchema),
);

export const UserRoute = router;
