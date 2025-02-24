import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carValidation } from './car.validation';
import { CarControllers } from './car.controller';

const router = express.Router();

// create user route
router.post(
  '/',
  validateRequest(carValidation.carValidationSchema),
  CarControllers.createCar,
);

export const CarRoute = router;
