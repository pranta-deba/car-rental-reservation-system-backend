import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/auth.constant';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';
const router = express.Router();

// create booking route
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(bookingValidation.bookingValidationSchema),
  BookingController.createBooking,
);

export const BookingRoute = router;
