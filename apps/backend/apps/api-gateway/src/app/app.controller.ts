import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @HttpCode(HttpStatus.OK)
  getStatus() {
    return {
      success: true,
      status: HttpStatus.OK,
      message: 'API Gateway is running',
    };
  }
}
