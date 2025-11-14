import { SignInDTO, SignUpDTO } from '@app/shared/schemas';
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthResponse, WebResponse } from '@workspace/responses';
import { lastValueFrom, TimeoutError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('auth_service') private readonly authClient: ClientProxy,
  ) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() request: SignUpDTO): Promise<WebResponse<AuthResponse>> {
    try {
      const res = this.authClient.send('sign-up', { request });
      const result = await lastValueFrom(res);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Auth service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.CREATED,
        message: 'User registered successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() request: SignInDTO): Promise<WebResponse<AuthResponse>> {
    try {
      const res = this.authClient.send('sign-in', { request });
      const result = await lastValueFrom(res);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Auth service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.CREATED,
        message: 'User signed in successfully',
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
