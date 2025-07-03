import { Controller } from '@nestjs/common';
import { AuthorService } from './author.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAuthorDTO } from '@app/shared/schemas/dto/author.dto';

@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @MessagePattern('create_author')
  async create(@Payload('body') body: CreateAuthorDTO) {
    try {
      return this.authorService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('find_all_authors')
  async findAll() {
    try {
      return this.authorService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('find_author_by_slug')
  async findById(@Payload('slug') slug: string) {
    try {
      return this.authorService.findBySlug(slug);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('update_author')
  async update(
    @Payload('id') id: string,
    @Payload('body') body: CreateAuthorDTO,
  ) {
    try {
      return this.authorService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('delete_author')
  async delete(@Payload('id') id: string) {
    try {
      return this.authorService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
