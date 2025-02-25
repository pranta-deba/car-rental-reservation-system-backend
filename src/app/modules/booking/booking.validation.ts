import { z } from 'zod';

const bookingValidationSchema = z.object({
  date: z.date(),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().nullable(),
  totalCost: z
    .number()
    .min(0, 'Total cost must be a positive number')
    .default(0),
  car: z.string().uuid('Invalid car ID format'),
});

export const bookingValidation = {
  bookingValidationSchema,
};
