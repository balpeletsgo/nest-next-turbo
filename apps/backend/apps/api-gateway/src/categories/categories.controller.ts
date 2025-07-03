import { AdminGuard } from '@app/shared/guards/admin.guard';
import { JwtAuthGuard } from '@app/shared/guards/jwt.guard';
import { CreateCategoriesDTO } from '@app/shared/schemas/dto/categories.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CategoriesResponse, WebResponse } from '@workspace/responses';
import { lastValueFrom, TimeoutError } from 'rxjs';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject('categories_service')
    private readonly categoriesClient: ClientProxy,
  ) {}

  @UseGuards(AdminGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateCategoriesDTO,
  ): Promise<WebResponse<CategoriesResponse>> {
    try {
      const categories = this.categoriesClient.send('create_categories', {
        body,
      });
      const result = await lastValueFrom(categories);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Categories service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Categories created successfully',
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
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<WebResponse<CategoriesResponse[]>> {
    try {
      const categories = this.categoriesClient.send('find_all_categories', {});
      const result = await lastValueFrom(categories);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Categories service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Categories retrieved successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<WebResponse<CategoriesResponse>> {
    try {
      const category = this.categoriesClient.send('find_category_by_slug', {
        slug,
      });
      const result = await lastValueFrom(category);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Categories service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Category retrieved successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Put(':id/update')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() body: CreateCategoriesDTO,
  ): Promise<WebResponse<CategoriesResponse>> {
    try {
      const updateCategory = this.categoriesClient.send('update_category', {
        id,
        body,
      });
      const result = await lastValueFrom(updateCategory);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Categories service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Category updated successfully',
        data: result,
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Delete(':id/delete')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<WebResponse<void>> {
    try {
      const deleteCategory = this.categoriesClient.send('delete_category', {
        id,
      });
      const result = await lastValueFrom(deleteCategory);

      if (result && !result.success && result.status) {
        throw new HttpException(
          {
            success: false,
            status: result.status,
            message: result.message || 'Categories service error',
            ...(result.errors && { errors: result.errors }),
          },
          result.status,
        );
      }

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'Category deleted successfully',
      };
    } catch (error) {
      if (error instanceof TimeoutError) {
        throw new HttpException('Service timeout', HttpStatus.GATEWAY_TIMEOUT);
      }

      throw error;
    }
  }
}
