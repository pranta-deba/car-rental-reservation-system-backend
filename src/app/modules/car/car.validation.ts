import { z } from 'zod';

const carValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    color: z.string().min(1, 'Color is required'),
    isElectric: z.boolean(),
    features: z.array(z.string()).nonempty('At least one feature is required'),
    pricePerHour: z.number().min(0, 'Price per hour must be a positive number'),
    isDeleted: z.boolean().optional(),
  }),
});

export const carValidation = { carValidationSchema };
