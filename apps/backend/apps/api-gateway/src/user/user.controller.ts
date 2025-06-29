import { AdminGuard } from '@app/shared/guards/admin.guard';
import { JwtAuthGuard } from '@app/shared/guards/jwt.guard';
import { UpdateProfileRequestDTO, UserRequest } from '@app/shared/schemas';
import { UserResponse, WebResponse } from '@workspace/responses';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, TimeoutError } from 'rxjs';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    @Inject('user_service') private readonly userClient: ClientProxy,
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async me(@Req() req: UserRequest): Promise<WebResponse<UserResponse>> {
    const user = req.user;

    try {
      const res = this.userClient.send('me', { user });
      const result = await lastValueFrom(res);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'User service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'User retrieved successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: UserRequest,
    @Body() body: UpdateProfileRequestDTO,
  ): Promise<WebResponse<UserResponse>> {
    const user = req.user;

    try {
      const res = this.userClient.send('update', { user, body });
      const result = await lastValueFrom(res);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'User service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'User updated successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async profile(@Param('id') id: string): Promise<WebResponse<UserResponse>> {
    try {
      if (!id) {
        throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
      }

      const res = this.userClient.send('profile', { id });
      const result = await lastValueFrom(res);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'User service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'User profile retrieved successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @Get()
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  async allUsers(): Promise<WebResponse<UserResponse[]>> {
    try {
      const res = this.userClient.send('allUsers', {});
      const result = await lastValueFrom(res);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'User service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'All users retrieved successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }
}
