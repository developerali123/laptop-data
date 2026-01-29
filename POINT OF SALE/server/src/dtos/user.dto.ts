import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, Matches, MinLength, MaxLength } from 'class-validator';
import { Role } from 'src/enum/enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe', 
    minLength: 3, 
    maxLength: 20, 
  })
  @IsString()
  @IsNotEmpty()
  UserName: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'Password123!',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  Password: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'cashier', // Default will be cashier
    enum: Role, // Referencing the enum
    required: false,
  })
  @IsEnum(Role)
  @IsOptional()
  Role?: Role = Role.cashier; // Default to 'cashier'

  @ApiProperty({
    description: 'Outlet code associated with the user',
    example: 'OUT123',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  OutletCode?: string;

  @ApiProperty({
    description: 'Page access rights for the user',
    example: 'admin, editor',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  pageaccess?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Username of the user',
    example: 'john_doe',
  })
  @IsString()
  @IsOptional()
  UserName?: string; // Allow updating the UserName
  @ApiPropertyOptional({
    description: 'Role of the user',
    example: 'admin',
    enum: Role, // Referencing the enum
  })
  @IsEnum(Role)
  @IsOptional()
  Role?: Role;

  @ApiPropertyOptional({
    description: 'Outlet code associated with the user',
    example: 'OUT456',
  })
  @IsString()
  @IsOptional()
  OutletCode?: string;

  @ApiPropertyOptional({
    description: 'Page access rights for the user',
    example: 'admin, viewer',
  })
  @IsString()
  @IsOptional()
  pageaccess?: string;
}