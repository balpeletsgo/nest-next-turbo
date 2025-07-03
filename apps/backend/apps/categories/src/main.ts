import { ErrorFilter } from '@app/shared';
import {
  HttpException,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CategoriesModule } from './categories.module';

async function bootstrap() {
  const port = parseInt(process.env.CATEGORIES_SERVICE_PORT) || 8003;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CategoriesModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.CATEGORIES_SERVICE_HOST ?? 'localhost',
        port: port,
      },
    },
  );
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

  await app.listen();

  Logger.log(
    `🚀 Categories microservice is listening at ${process.env.CATEGORIES_SERVICE_HOST ?? 'localhost'}:${port}`,
  );
}
bootstrap();
