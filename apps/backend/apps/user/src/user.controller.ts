import {
  GetUserProfileDTO,
  UpdateProfileRequestDTO,
  UserRequest,
} from '@app/shared/schemas';
import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('me')
  async me(@Payload() req: UserRequest) {
    try {
      const user = req.user;

      if (!user || !user.id) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return await this.userService.me(user);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('update')
  async update(
    @Payload() req: UserRequest,
    @Payload('body') body: UpdateProfileRequestDTO,
  ) {
    try {
      const user = req.user;

      if (!user || !user.id) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return this.userService.update(user, body);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('profile')
  async profile(@Payload() req: GetUserProfileDTO) {
    try {
      if (!req || !req.id) {
        throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
      }

      return this.userService.profile(req.id);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('allUsers')
  async allUsers(@Payload() req: UserRequest) {
    try {
      const user = req.user;

      if (!user || !user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      return await this.userService.allUsers(user);
    } catch (error) {
      throw error;
    }
  }
}
