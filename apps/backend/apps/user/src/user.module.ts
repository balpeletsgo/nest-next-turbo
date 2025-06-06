import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
