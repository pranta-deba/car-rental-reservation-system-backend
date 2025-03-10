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
  auth(USER_ROLE.user),
  validateRequest(bookingValidation.bookingValidationSchema),
  BookingController.createBooking,
);
// user all booking route
router.get('/', auth(USER_ROLE.user), BookingController.userAllBooking);

//  all booked by admin route
router.get('/booked', auth(USER_ROLE.admin), BookingController.getAllBooking);

//  cancel booking by user
router.delete(
  '/cancel/:bookingId',
  auth(USER_ROLE.user),
  BookingController.cancelBooking,
);

// return the car route
router.put(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(bookingValidation.returnBookingValidationSchema),
  BookingController.returnTheCar,
);

export const BookingRoute = router;
