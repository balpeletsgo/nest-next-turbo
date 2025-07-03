import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoriesController } from 'apps/api-gateway/src/categories/categories.controller';

@Module({
  imports: [
    SharedModule,
    ClientsModule.register([
      {
        name: 'categories_service',
        transport: Transport.TCP,
        options: {
          host: process.env.CATEGORIES_SERVICE_HOST || 'localhost',
          port: process.env.CATEGORIES_SERVICE_PORT
            ? parseInt(process.env.CATEGORIES_SERVICE_PORT)
            : 8003,
        },
      },
    ]),
  ],
  providers: [JwtService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
