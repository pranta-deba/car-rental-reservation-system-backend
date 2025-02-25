import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const BookingSchema = new Schema<TBooking>(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
    totalCost: { type: Number, required: true, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
  },
  { timestamps: true },
);

export const Booking = model<TBooking>('Booking', BookingSchema);
