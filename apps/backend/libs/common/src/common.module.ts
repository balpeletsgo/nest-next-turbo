import { Module } from '@nestjs/common';
import { PrismaService } from './database';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule {}
