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

// user all booking controller by user
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
// user all booking by admin
const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingIntoDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Booked cars retrieved successfully.',
    data: result,
  });
});
// cancel booking
const cancelBooking = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const { user } = req;
  const result = await BookingService.cancelBookingIntoDB(bookingId, user);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Booking cancelled successfully!.',
    data: result,
  });
});

// return the car controller
const returnTheCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;
  const result = await BookingService.returnTheCarIntoDB(bookingId, endTime);
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
  getAllBooking,
  cancelBooking,
};
