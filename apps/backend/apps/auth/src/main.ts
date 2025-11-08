import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CustomValidationPipe, ErrorFilter } from '@app/shared';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = parseInt(process.env.AUTH_SERVICE_PORT) || 8001;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.AUTH_SERVICE_HOST ?? 'localhost',
        port: port,
      },
    },
  );
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(new CustomValidationPipe());

  await app.listen();

  Logger.log(
    `🚀 Auth microservice is listening at: http://${process.env.AUTH_SERVICE_HOST ?? 'localhost'}:${port}`,
  );
}
bootstrap();
