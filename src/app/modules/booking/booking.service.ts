import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Car } from '../car/car.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { Booking } from './booking.model';
import { User } from '../auth/auth.model';
import mongoose from 'mongoose';

// create booking service
const createBookingIntoDB = async (payload: TBooking, user: JwtPayload) => {
  const { car: carId } = payload;
  const { email } = user;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const userData = await User.findOne({ email }).session(session);

    if (!userData) {
      throw new AppError(status.NOT_FOUND, 'User not found!');
    }

    const car = await Car.findById(carId).session(session);

    if (!car) {
      throw new AppError(status.NOT_FOUND, 'Car not found!');
    }
    if (car.status !== 'available') {
      throw new AppError(status.FORBIDDEN, 'Car is not available!');
    }

    // car status changes
    const updatedCarStatus = await Car.findByIdAndUpdate(
      carId,
      {
        status: 'unavailable',
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedCarStatus) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        'Failed to update car status!',
      );
    }

    payload.user = userData._id;
    const booking = await Booking.create([payload], { session });
    const populatedBooking = await Booking.findById(booking[0]._id)
      .populate('car')
      .populate('user')
      .session(session);

    await session.commitTransaction();
    await session.endSession();

    return populatedBooking;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.BAD_REQUEST, 'Failed to car booking!');
  }
};

// user booking service
const userAllBookingIntoDB = async (user: JwtPayload) => {
  const userData = await User.findOne({ email: user.email });
  if (!userData) {
    throw new AppError(status.NOT_FOUND, 'User not found!');
  }
  const bookings = await Booking.find({ user: userData._id })
    .populate('car')
    .populate('user');
  return bookings;
};

export const BookingService = { createBookingIntoDB, userAllBookingIntoDB };
