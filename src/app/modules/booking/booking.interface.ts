import { Types } from 'mongoose';

export type TBooking = {
  date: Date;
  startTime: string;
  endTime: string | null;
  totalCost: number;
  user: Types.ObjectId;
  car: Types.ObjectId;
};
