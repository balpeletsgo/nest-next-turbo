import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugService {
  slugify(value: string): string {
    return slugify(value, { lower: true });
  }
}
