import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsEmail,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  dbname: string;

  @ApiProperty()
  @IsString()
  dbhost: string;

  @ApiProperty()
  @IsString()
  dbport: string;

  @ApiProperty()
  @IsString()
  dbuser: string;

  @ApiProperty()
  @IsString()
  dbpassword: string;
}

export class CreateTenantCompanyDto {
  @ApiProperty({ example: 'Ali Enterprise' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @ApiPropertyOptional({ example: '123 Street, Sector G-9' })
  @IsOptional()
  @IsString({ message: 'address should be string' })
  address?: string;

  @ApiPropertyOptional({ example: 'Punjab' })
  @IsOptional()
  @IsString({ message: 'province should be string' })
  province?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsNumber({}, { message: 'province should be a number' })
  provinceid?: number;

  @ApiPropertyOptional({ example: 'Lahore' })
  @IsOptional()
  @IsString({ message: 'city should be string' })
  city?: string;

  @ApiPropertyOptional({ example: '54000' })
  @IsOptional()
  @IsString({ message: 'postal code should be string' })
  post_code?: string;

  @ApiPropertyOptional({ example: '1234567-8' })
  @IsOptional()
  @IsString({ message: 'NTN no should be string' })
  ntn_no?: string;

  @ApiPropertyOptional({ example: '9876543-1' })
  @IsOptional()
  @IsString({ message: 'STRN no should be string' })
  strn_no?: string;

  @ApiPropertyOptional({ example: 'Ali Khan' })
  @IsOptional()
  @IsString({ message: 'contact name should be string' })
  contact_name?: string;

  @ApiPropertyOptional({ example: '03001234567' })
  @IsOptional()
  @IsString({ message: 'mobile number should be string' })
  mobile_number?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  // @IsUrl({}, { message: 'must be valid url' })
  url?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  // @IsUrl({}, { message: 'must be valid url' })
  hscodeapi?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  // @IsUrl({}, { message: 'must be valid url' })
  uomapi?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  // @IsUrl({}, { message: 'must be valid url' })
  saletyeapi?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  // @IsUrl({}, { message: 'must be valid url' })
  scenarionoapi?: string;

  @ApiPropertyOptional({ example: '115151515151561541512151215415151' })
  @IsOptional()
  @IsString({ message: 'token should be string' })
  token?: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'must be valid email' })
  email?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  // @IsUrl({}, { message: 'must be valid url' })
  website?: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsOptional()
  // @IsUrl({}, { message: 'must be valid url' })
  logo?: string;

  @ApiProperty({
    description: 'Fed Mode',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  fedmode?: boolean;

  @ApiProperty({
    description: 'sandbox',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  sandbox?: boolean;

  @ApiProperty({
    description: 'print mapping',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  printmapping?: boolean;

  @ApiProperty({
    description: 'print mapping',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  showmapping?: boolean;
}

export class UpdateTenantCompanyDto extends PartialType(
  CreateTenantCompanyDto,
) {}
