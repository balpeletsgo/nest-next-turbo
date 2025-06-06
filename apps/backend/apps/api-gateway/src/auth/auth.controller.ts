import {
  WebResponse,
  AuthResponse,
  SignInDTO,
  SignUpDTO,
} from '@app/shared/schemas';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('sign_up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() request: SignUpDTO): Promise<WebResponse<AuthResponse>> {
    const result = await this.auth.signUp(request);

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: result,
    };
  }

  @Post('sign_in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() request: SignInDTO): Promise<WebResponse<AuthResponse>> {
    const result = await this.auth.signIn(request);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'User signed in successfully',
      data: result,
    };
  }
}
