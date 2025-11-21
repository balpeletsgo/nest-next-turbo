import { IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { User } from 'generated/prisma/client';

export interface UserRequest extends Request {
  user: User;
}

export class GetUserProfileDTO {
  @IsString({ message: 'User ID must be a string' })
  @MinLength(1, { message: 'User ID must be at least 1 character long' })
  @Matches(/^[a-zA-Z0-9-]+$/, { message: 'User ID cannot contain spaces' })
  id: string;
}

export class UpdateProfileRequestDTO {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 character long' })
  @Matches(/^$|^[a-zA-Z\s]+$/, {
    message:
      'Name can only contain letters and spaces, no special symbols allowed',
  })
  name: string;
}
