import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'admin']),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().regex(/^\d{10,15}$/, 'Phone number must be 10-15 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  isDeleted: z.boolean().optional(),
});
