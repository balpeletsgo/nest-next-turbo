import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule, SharedModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
