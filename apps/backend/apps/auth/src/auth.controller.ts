import { SignInDTO, SignUpDTO } from '@app/shared/schemas';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('sign-up')
  async signUp(@Payload('request') request: SignUpDTO) {
    try {
      return this.authService.signUp(request);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('sign-in')
  async signIn(@Payload('request') request: SignInDTO) {
    try {
      return this.authService.signIn(request);
    } catch (error) {
      throw error;
    }
  }
}
