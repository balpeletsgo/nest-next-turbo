import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { ErrorFilter, CustomValidationPipe } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(new CustomValidationPipe());

  const port = process.env.PORT || 8000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://${process.env.HOST ?? 'localhost'}:${port}`,
  );
}
bootstrap();
