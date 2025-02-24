import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carValidation } from './car.validation';
import { CarControllers } from './car.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = express.Router();

// create user route
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(carValidation.carValidationSchema),
  CarControllers.createCar,
);

// all user route
router.get('/', CarControllers.getAllCar);

export const CarRoute = router;
