import { SafeParseError, ZodType } from 'zod';

export class SchemaValidator<T> {
  constructor(private readonly schema: ZodType<T>) {}

  validate(dto: T) {
    const validationResult = this.schema.safeParse(dto);

    if (!validationResult.success) {
      const { error } = validationResult as SafeParseError<T>;

      return {
        isValid: false,
        message: error.issues[0].message,
      };
    }

    return { isValid: true };
  }
}
