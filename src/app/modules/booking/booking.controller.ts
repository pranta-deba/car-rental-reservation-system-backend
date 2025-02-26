import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';

// create booking controller
const createBooking = catchAsync(async (req, res) => {
  const { body: bookingData, user } = req;
  const result = await BookingService.createBookingIntoDB(bookingData, user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Car booked successfully.',
    data: result,
  });
});

// user all booking controller
const userAllBooking = catchAsync(async (req, res) => {
  const { user } = req;
  const result = await BookingService.userAllBookingIntoDB(user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'My Bookings retrieved successfully.',
    data: result,
  });
});

// return the car controller
const returnTheCar = catchAsync(async (req, res) => {
  const result = await BookingService.returnTheCarIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Car returned successfully.',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  userAllBooking,
  returnTheCar,
};
