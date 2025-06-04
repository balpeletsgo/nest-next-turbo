import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      success: true,
      status: 200,
      message: 'Hello NestJS!',
    };
  }
}
