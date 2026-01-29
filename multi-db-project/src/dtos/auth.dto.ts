import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../prisma/generated/tenant';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty({ message: 'email should not be empty' })
  @IsEmail({}, { message: 'must be valid email' })
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'password should not be empty' })
  @MinLength(8, { message: 'Password length should be greater than 8' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;

  @ApiProperty({ enum: Role, example: Role.user })
  @IsNotEmpty({ message: 'role should not be empty' })
  @IsEnum(Role, { message: 'must be valid value' })
  role: Role;
}

export class VerifyOtpDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty({ message: 'email should not be empty' })
  @IsEmail({}, { message: 'must be valid email' })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'otp should not be empty' })
  @Length(6, 6, { message: 'length should be 6' })
  otp: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'token' })
  @IsNotEmpty({ message: 'refreshtoken should not be empty' })
  refreshToken: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty({ message: 'email should not be empty' })
  @IsEmail({}, { message: 'must be valid email' })
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    minLength: 8,
  })
  @IsNotEmpty({ message: 'password should not be empty' })
  @MinLength(8, { message: 'Password length should be greater than 8' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;
}
