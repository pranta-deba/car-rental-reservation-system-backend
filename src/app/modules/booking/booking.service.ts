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

// all booking service by admin
const getAllBookingIntoDB = async () => {
  const bookings = await Booking.find().populate('car').populate('user');
  return bookings;
};

// Return The Car service
const returnTheCarIntoDB = async (bookingId: string, endTime: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // step 1
    const booking = await Booking.findById(bookingId)
      .populate('car')
      .session(session);
    if (!booking) {
      throw new AppError(status.NOT_FOUND, 'Booking not found!');
    }

    if (booking.endTime) {
      throw new AppError(status.FORBIDDEN, 'Car has already been returned!');
    }
    // step 2
    const car = await Car.findById(booking.car._id).session(session);
    if (!car) {
      throw new AppError(status.NOT_FOUND, 'Car not found!');
    }
    // step 3
    const startTime = new Date(`1970-01-01T${booking.startTime}:00Z`);
    const endTimeParsed = new Date(`1970-01-01T${endTime}:00Z`);

    if (!(startTime instanceof Date) || !(endTimeParsed instanceof Date)) {
      throw new AppError(status.BAD_REQUEST, 'Invalid time format');
    }
    // step 4
    const durationInMilliseconds =
      endTimeParsed.getTime() - startTime.getTime();
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

    if (durationInHours <= 0) {
      throw new AppError(
        status.BAD_REQUEST,
        'End time must be later than start time!',
      );
    }
    // step 5
    const totalCost = durationInHours * car.pricePerHour;
    // step 6
    booking.endTime = endTime;
    booking.totalCost = totalCost;
    car.status = 'available';
    // step 7
    await booking.save({ session });
    await car.save({ session });
    // step 8 : end session
    await session.commitTransaction();
    await session.endSession();
    // step 9
    const updatedBooking = await Booking.findById(bookingId)
      .populate('car')
      .populate('user');
    return updatedBooking;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(status.BAD_REQUEST, 'Failed to returned car!');
  }
};

export const BookingService = {
  createBookingIntoDB,
  userAllBookingIntoDB,
  returnTheCarIntoDB,
  getAllBookingIntoDB,
};
