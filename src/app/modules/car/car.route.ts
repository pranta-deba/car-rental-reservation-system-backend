import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carValidation } from './car.validation';
import { CarControllers } from './car.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';

const router = express.Router();

// create car route
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(carValidation.createCarValidationSchema),
  CarControllers.createCar,
);

// all car route
router.get('/', CarControllers.getAllCar);

// a user route
router.get('/:id', CarControllers.getACar);

// update car route
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(carValidation.updateCarValidationSchema),
  CarControllers.updateCar,
);
// delete car route
router.delete('/:id', auth(USER_ROLE.admin), CarControllers.deleteCar);

export const CarRoute = router;
