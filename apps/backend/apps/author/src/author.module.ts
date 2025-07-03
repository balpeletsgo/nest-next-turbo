import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';

@Module({
  imports: [SharedModule],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
