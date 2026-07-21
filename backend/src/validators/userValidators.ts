import { z } from 'zod';

// ---------------------------------------------------------------------------
// Shared Zod schemas for user-related request bodies.
// Import these into the route file and pass them to the validate() middleware.
// ---------------------------------------------------------------------------

/**
 * Schema for PATCH /users/me
 * All fields are optional — only the provided ones will be updated.
 */
export const updateProfileSchema = z.object({
    fullName: z
        .string()
        .min(2, 'Full name must be at least 2 characters')
        .max(100)
        .optional(),

    phoneNumber: z
        .string()
        .regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number format') // e.g. +923001234567
        .optional(),

    profilePictureUrl: z
        .string()
        .url('Must be a valid URL')
        .optional(),
});

// TypeScript type inferred from the schema — use this in your controller
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
