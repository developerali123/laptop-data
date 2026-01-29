import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
  Matches,
  Length,
  IsBoolean,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    minLength: 8,
  })
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message: 'Password too weak',
    },
  )
  password: string;

  @ApiProperty({ enum: Role, example: Role.user })
  @IsEnum(Role)
  role: Role;
}

export class VerifyOtpDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    minLength: 8,
  })
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    { message: 'Password too weak' },
  )
  password: string;
}

export class VerifyEmailDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'token' })
  @IsNotEmpty()
  refreshToken: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    minLength: 8,
  })
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    { message: 'Password too weak' },
  )
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    description:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    minLength: 8,
  })
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    { message: 'Password too weak' },
  )
  @IsNotEmpty()
  newPassword: string;
}

export class AccountStatusDto {
  @IsBoolean()
  isActive: boolean;
}
