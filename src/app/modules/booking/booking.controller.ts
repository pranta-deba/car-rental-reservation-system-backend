import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';

// create booking controller
const createBooking = catchAsync(async (req, res) => {
  const result = await BookingService.createBookingIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Car created successfully.',
    data: result,
  });
});

export const BookingController = {
  createBooking,
};
