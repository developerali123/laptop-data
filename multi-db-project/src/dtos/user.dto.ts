import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
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
  password?: string;

  @ApiPropertyOptional({
    description: 'isActive',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  // @IsString({ message: 'address should be string' })
  isActive?: boolean;
}
