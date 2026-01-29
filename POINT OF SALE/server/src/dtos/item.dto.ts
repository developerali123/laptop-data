import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ description: 'Unique identifier for the item' })
  @IsNotEmpty()
  @IsString()
  no: string;

  @ApiProperty({ description: 'Description of the item' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'UOM ID (optional)', required: false })
  @IsOptional()
  @IsNumber()
  uomId?: number;

  @ApiProperty({ description: 'Unit price of the item (optional)', required: false })
  @IsOptional()
  @IsNumber()
  unitprice?: number;

  @ApiProperty({ description: 'Costing method (optional)', required: false })
  @IsOptional()
  @IsString()
  costingmethod?: string;

  @ApiProperty({ description: 'Last direct cost (optional)', required: false })
  @IsOptional()
  @IsNumber()
  lastdirectcost?: number;

  @ApiProperty({ description: 'Vendor item number (optional)', required: false })
  @IsOptional()
  @IsString()
  vendoritemno?: string;

  @ApiProperty({ description: 'Blocked status (optional)', required: false })
  @IsOptional()
  @IsNumber()
  blocked?: number;

  @ApiProperty({ description: 'Tax group code (optional)', required: false })
  @IsOptional()
  @IsString()
  taxgroupcode?: string;

  @ApiProperty({ description: 'Minimum order quantity (optional)', required: false })
  @IsOptional()
  @IsNumber()
  minimumorderquantity?: number;

  @ApiProperty({ description: 'Maximum order quantity (optional)', required: false })
  @IsOptional()
  @IsNumber()
  maximumorderquantity?: number;

  @ApiProperty({ description: 'Punch unit of measure (optional)', required: false })
  @IsOptional()
  @IsString()
  punchunitofmeasure?: string;

  @ApiProperty({ description: 'Category ID (optional)', required: false })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({ description: 'Subcategory ID (optional)', required: false })
  @IsOptional()
  @IsNumber()
  subcategoryId?: number;

  @ApiProperty({ description: 'Range ID (optional)', required: false })
  @IsOptional()
  @IsNumber()
  rangeId?: number;

  @ApiProperty({ description: 'Season code (optional)', required: false })
  @IsOptional()
  @IsString()
  seasoncode?: string;
}

export class UpdateItemDto extends PartialType(CreateItemDto) {}