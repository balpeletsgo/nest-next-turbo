import { Controller } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCategoriesDTO } from '@app/shared/schemas/dto/categories.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @MessagePattern('create_categories')
  async create(@Payload('body') body: CreateCategoriesDTO) {
    try {
      return this.categoriesService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('find_all_categories')
  async findAll() {
    try {
      return this.categoriesService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('find_category_by_slug')
  async findBySlug(@Payload('slug') slug: string) {
    try {
      return this.categoriesService.findBySlug(slug);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('update_category')
  async update(
    @Payload('id') id: string,
    @Payload('body') body: CreateCategoriesDTO,
  ) {
    try {
      return this.categoriesService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern('delete_category')
  async delete(@Payload('id') id: string) {
    try {
      return this.categoriesService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
