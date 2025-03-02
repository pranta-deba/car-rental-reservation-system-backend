import { z } from 'zod';

const userSignUpValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['user', 'admin']).optional(),
    phone: z.string().regex(/^\d{10,15}$/, 'Phone number must be 10-15 digits'),
    address: z.string().optional(),
    photo: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const userGoogleSignInValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    address: z.string().optional(),
    photo: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    phone: z
      .string()
      .regex(/^\d{10,15}$/, 'Phone number must be 10-15 digits')
      .optional(),
    address: z.string().optional(),
    photo: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const userSignInValidationScheme = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const userValidation = {
  userSignUpValidationSchema,
  userSignInValidationScheme,
  updateUserValidationSchema,
  userGoogleSignInValidationSchema,
};
