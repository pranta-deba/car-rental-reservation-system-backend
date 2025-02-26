import { z } from 'zod';

const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().nullable().optional(),
    totalCost: z
      .number()
      .min(0, 'Total cost must be a positive number')
      .default(0)
      .optional(),
    car: z.string(),
  }),
});
const returnBookingValidationSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string().min(1, 'End time is required'),
  }),
});

export const bookingValidation = {
  bookingValidationSchema,
  returnBookingValidationSchema,
};
