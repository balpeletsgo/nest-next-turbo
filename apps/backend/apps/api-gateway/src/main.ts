import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  HttpException,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ErrorFilter } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('v1');
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
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
    }),
  );

  const port = process.env.PORT || 8000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://${process.env.HOST ?? 'localhost'}:${port}`,
  );
}
bootstrap();
