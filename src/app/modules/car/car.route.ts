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
  validateRequest(carValidation.createCarValidationSchema),
  CarControllers.createCar,
);

// all user route
router.get('/', CarControllers.getAllCar);

// create user route
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(carValidation.updateCarValidationSchema),
  CarControllers.updateCar,
);

export const CarRoute = router;
