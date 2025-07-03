import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthorDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MinLength(1, { message: 'Name is required' })
  @MaxLength(255, { message: 'Name cannot be longer than 255 characters' })
  name: string;

  @IsNotEmpty({ message: 'Bio is required' })
  @IsString()
  @MinLength(1, { message: 'Bio is required' })
  bio: string;
}

export class UpdateAuthorDTO {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Name is required' })
  @MaxLength(255, { message: 'Name cannot be longer than 255 characters' })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Bio is required' })
  bio: string;
}
