import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors = []) => {
        const errors = validationErrors.map((error) => {
          const constraints = error.constraints
            ? Object.values(error.constraints)
            : [];
          return {
            property: error.property,
            message: constraints.length > 0 ? constraints[0] : 'Invalid value',
          };
        });

        return new HttpException(
          {
            success: false,
            status: HttpStatus.BAD_REQUEST,
            message: 'Validation failed',
            errors: errors,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    });
  }
}
