import { ErrorFilter } from '@app/shared';
import {
  HttpException,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';

async function bootstrap() {
  const port = parseInt(process.env.USER_SERVICE_PORT) || 8001;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.USER_SERVICE_HOST ?? 'localhost',
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
    `🚀 User microservice is listening at ${process.env.USER_SERVICE_HOST ?? 'localhost'}:${port}`,
  );
}
bootstrap();
