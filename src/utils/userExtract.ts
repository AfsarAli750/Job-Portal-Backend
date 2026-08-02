import { Request } from 'express';
import { ZodSchema } from 'zod';

import { BadRequestError } from './apiError';


export async function userValidateRequest<T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<T > {
  // 1. Validate body
  const result = schema.safeParse(req.body);
  if (!result.success) {
    // Throw a BadRequestError with the formatted issues
    throw new BadRequestError();
  }

  return  result.data ;
}