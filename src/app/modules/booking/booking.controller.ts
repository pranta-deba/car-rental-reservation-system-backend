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

export const BookingController = {
  createBooking,
};
