import { z } from 'zod';

const createCarValidationSchema = z.object({
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

const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    color: z.string().min(1, 'Color is required').optional(),
    isElectric: z.boolean().optional(),
    features: z
      .array(z.string())
      .nonempty('At least one feature is required')
      .optional(),
    pricePerHour: z
      .number()
      .min(0, 'Price per hour must be a positive number')
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const carValidation = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
