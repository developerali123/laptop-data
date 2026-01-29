import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CustomerVendorType } from '../../prisma/generated/tenant';

export class CreateTaxAreaCodeDto {
  @ApiProperty({
    description: 'Unique code for the tax area code',
    example: 'CPG-001',
  })
  @IsNotEmpty({ message: 'Code is required' })
  @IsString({ message: 'Code must be a string' })
  code: string;

  @ApiProperty({
    description: 'Optional description of the tax area code',
    example: 'Main retail tax area code',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}

export class UpdateTaxAreaCodeDto extends PartialType(CreateTaxAreaCodeDto) {}

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Name of the customer',
    example: 'Ali Enterprises',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Primary address of the customer',
    required: false,
    example: '123 Main Street',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'note',
    required: false,
    example: 'abc',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'State or province',
    required: false,
    example: 'Sindh',
  })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiProperty({
    description: 'City of the customer',
    required: false,
    example: 'Karachi',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'post code of customer',
    required: false,
    example: '49430',
  })
  @IsOptional()
  @IsString()
  post_code?: string;

  @ApiProperty({
    description: 'Contact person name',
    required: false,
    example: 'Muhammad Ali',
  })
  @IsOptional()
  @IsString()
  contact_name?: string;

  @ApiProperty({
    description: 'Phone number',
    required: false,
    example: '021-1234567',
  })
  @IsOptional()
  @IsString()
  phone_no?: string;

  @ApiProperty({
    description: 'Email address',
    required: false,
    example: 'customer@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Tax area code',
    required: true,
    example: 'TX-001',
  })
  @IsOptional()
  @IsUUID()
  tax_area_code_id: string;

  @ApiProperty({
    description: 'Mobile number',
    required: false,
    example: '03001234567',
  })
  @IsOptional()
  @IsString()
  mobile_number?: string;

  @ApiProperty({
    description: 'Website',
    required: false,
    example: 'https://bcdcbdhcbdhbcdhcbd.com',
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({
    description: 'NTN number',
    required: false,
    example: '1234567-8',
  })
  @IsOptional()
  @IsString()
  ntn_no?: string;

  @ApiProperty({
    description: 'Registration number',
    required: false,
    example: 'REG-2024-001',
  })
  @IsOptional()
  @IsString()
  strn_no?: string;

  @ApiProperty({
    description: 'Mapping ID',
    required: false,
    example: 'MID-001',
  })
  @IsOptional()
  @IsString()
  mappingid?: string;

  @ApiProperty({ enum: CustomerVendorType })
  @IsEnum(CustomerVendorType)
  customer_type: CustomerVendorType;

  @ApiProperty({
    description: 'Registration status',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  registation_status?: boolean;

  @ApiProperty({
    description: 'Active Status',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class CreateVendorDto {
  @ApiProperty({
    description: 'Name of the vendor',
    example: 'Ali Enterprises',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Primary address of the vendor',
    required: false,
    example: '123 Main Street',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'note',
    required: false,
    example: 'abc',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'State or province',
    required: false,
    example: 'Sindh',
  })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiProperty({
    description: 'City of the vendor',
    required: false,
    example: 'Karachi',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Mapping ID',
    required: false,
    example: 'MID-001',
  })
  @IsOptional()
  @IsString()
  mappingid?: string;

  @ApiProperty({
    description: 'post code of vendor',
    required: false,
    example: '49430',
  })
  @IsOptional()
  @IsString()
  post_code?: string;

  @ApiProperty({
    description: 'Contact person name',
    required: false,
    example: 'Muhammad Ali',
  })
  @IsOptional()
  @IsString()
  contact_name?: string;

  @ApiProperty({
    description: 'Phone number',
    required: false,
    example: '021-1234567',
  })
  @IsOptional()
  @IsString()
  phone_no?: string;

  @ApiProperty({
    description: 'Email address',
    required: false,
    example: 'customer@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Tax area code',
    required: true,
    example: 'TX-001',
  })
  @IsOptional()
  @IsUUID()
  tax_area_code_id: string;

  @ApiProperty({
    description: 'Mobile number',
    required: false,
    example: '03001234567',
  })
  @IsOptional()
  @IsString()
  mobile_number?: string;

  @ApiProperty({
    description: 'Website',
    required: false,
    example: 'https://bcdcbdhcbdhbcdhcbd.com',
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({
    description: 'NTN number',
    required: false,
    example: '1234567-8',
  })
  @IsOptional()
  @IsString()
  ntn_no?: string;

  @ApiProperty({
    description: 'Registration number',
    required: false,
    example: 'REG-2024-001',
  })
  @IsOptional()
  @IsString()
  strn_no?: string;

  @ApiProperty({ enum: CustomerVendorType })
  @IsEnum(CustomerVendorType)
  vendor_type: CustomerVendorType;

  @ApiProperty({
    description: 'Registration status',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  registation_status?: boolean;

  @ApiProperty({
    description: 'Active Status',
    required: false,
    default: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateVendorDto extends PartialType(CreateVendorDto) {}
