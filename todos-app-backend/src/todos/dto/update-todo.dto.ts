import { z } from 'zod';

export class UpdateTodoDto {
  title?: string;
  isCompleted?: boolean;

  static schema = z.object({
    title: z
      .string({ invalid_type_error: 'Title must be a string' })
      .min(1, 'Title cannot be empty')
      .optional(),
    isCompleted: z
      .boolean({ invalid_type_error: 'IsCompleted must be boolean' })
      .optional(),
  });
}
