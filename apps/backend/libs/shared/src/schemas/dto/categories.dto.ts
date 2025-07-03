import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCategoriesDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MinLength(1, { message: 'Name is required' })
  @MaxLength(255, { message: 'Name cannot be longer than 255 characters' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  @MinLength(1, { message: 'Description is required' })
  description: string;
}

export class UpdateCategoriesDTO {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Name cannot be empty' })
  @MaxLength(255, { message: 'Name cannot be longer than 255 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Description cannot be empty' })
  description: string;
}
