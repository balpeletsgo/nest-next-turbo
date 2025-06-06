import { Match } from '@app/shared/match.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(1, { message: 'Name is required' })
  @MaxLength(255, {
    message: 'Name cannot be longer than 255 characters',
  })
  @Matches(/^$|^[a-zA-Z\s]+$/, {
    message:
      'Name can only contain letters and spaces, no special symbols allowed',
  })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @MinLength(1, { message: 'Email is required' })
  @MaxLength(255, { message: 'Email cannot be longer than 255 characters' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^$|^[^\s]+$/, {
    message: 'Email cannot contain spaces',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(100, { message: 'Password cannot be longer than 100 characters' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @IsString()
  @MinLength(8, {
    message: 'Confirm password must be at least 8 characters long',
  })
  @MaxLength(100, {
    message: 'Confirm password cannot be longer than 100 characters',
  })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}

export class SignInDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @MinLength(1, { message: 'Email is required' })
  @MaxLength(255, { message: 'Email cannot be longer than 255 characters' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^$|^[^\s]+$/, {
    message: 'Email cannot contain spaces',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(100, { message: 'Password cannot be longer than 100 characters' })
  password: string;
}
