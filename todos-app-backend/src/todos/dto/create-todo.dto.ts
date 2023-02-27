import { z } from 'zod';

export class CreateTodoDto {
  title: string;

  static schema = z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .min(1, 'Title cannot be empty'),
  });
}
