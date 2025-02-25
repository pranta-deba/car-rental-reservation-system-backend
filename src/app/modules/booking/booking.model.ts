import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const BookingSchema = new Schema<TBooking>(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: [true, 'Car id is required!'],
    },
  },
  { timestamps: true },
);

export const Booking = model<TBooking>('Booking', BookingSchema);
