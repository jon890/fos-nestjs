import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string(),
  age: z.number(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
