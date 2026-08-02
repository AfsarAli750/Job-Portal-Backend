import { Request } from 'express';
import { ZodSchema } from 'zod';

import { findActiveUserById } from '../repository/find.db';
import { BadRequestError, UnauthorizedError } from './apiError';

/**
 * Validates the request body against a Zod schema, checks authentication,
 * and ensures the user exists and is active.
 * @throws BadRequestError if validation fails
 * @throws UnauthorizedError if user is not authenticated or inactive
 * @returns { parsedData, userId }
 */
export async function validateRequest<T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<{ parsedData: T; userId: string }> {
  // 1. Validate body
  const result = schema.safeParse(req.body);
  if (!result.success) {
    // Throw a BadRequestError with the formatted issues
    throw new BadRequestError();
  }

  // 2. Check authentication
  const userId = req.user?.id;
  if (!userId) {
    throw new UnauthorizedError('User not authenticated');
  }

  // 3. Check if user exists and is active
  const user = await findActiveUserById(userId);
  if (!user) {
    throw new UnauthorizedError('User not found or inactive');
  }

  // 4. Return both the parsed data and the user ID
  return { parsedData: result.data, userId };
}