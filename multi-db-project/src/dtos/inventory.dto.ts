import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CostingMethod, ItemType } from '../../prisma/generated/tenant';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateTaxGroupCodeDto {
  @ApiProperty({
    description: 'Unique code for the tax group code',
    example: 'CPG-001',
  })
  @IsNotEmpty({ message: 'Code is required' })
  @IsString({ message: 'Code must be a string' })
  code: string;

  @ApiProperty({
    description: 'Optional description of the tax group code',
    example: 'Main retail customer group',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}

export class UpdateTaxGroupCodeDto extends PartialType(CreateTaxGroupCodeDto) { }

export class CreateItemCategoryCodeDto {
  @ApiProperty({
    description: 'Unique code for the item category code',
    example: 'CPG-001',
  })
  @IsNotEmpty({ message: 'Code is required' })
  @IsString({ message: 'Code must be a string' })
  code: string;

  @ApiProperty({
    description: 'Optional description of the item category code',
    example: 'Main retail customer group',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}

export class UpdateItemCategoryCodeDto extends PartialType(
  CreateItemCategoryCodeDto,
) { }

export class CreateItemDto {
  @ApiProperty({ example: 'HS-001', description: 'Unique hs number' })
  @IsNotEmpty()
  @IsString()
  hs_code: string;

  @ApiProperty({ example: 'Laptop', description: 'Unique name of the item' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Base Unit of Measure ID' })
  @IsNotEmpty()
  @IsString()
  uom: string;

  @ApiProperty({ example: 'Laptop', description: 'sale type of the item' })
  @IsNotEmpty()
  @IsString()
  saletype: string;

  @ApiProperty({
    description: 'Mapping ID',
    required: false,
    example: 'MID-001',
  })
  @IsOptional()
  @IsString()
  mappingid?: string;

  @ApiProperty({ example: 'Laptop', description: 'sroscheduleno of the item' })
  @IsNotEmpty()
  @IsString()
  sroscheduleno: string;

  @ApiProperty({ example: 'Laptop', description: 'itemserialno of the item' })
  @IsNotEmpty()
  @IsString()
  itemserialno: string;

  @ApiProperty({ example: 'Laptop', description: 'rate desc of the item' })
  @IsNotEmpty()
  @IsString()
  ratedesc: string;

  @ApiProperty({ example: '1' })
  @IsNumber({}, { message: 'province should be a number' })
  rateid: number;

  @ApiProperty({ description: 'ratevalue', example: 100.5 })
  @IsNumber()
  ratevalue: number;

  @ApiProperty({ enum: ItemType })
  @IsEnum(ItemType)
  type: ItemType;

  @ApiProperty({ description: 'Unit Price', example: 100.5 })
  @IsNumber()
  unit_price: number;

  @ApiProperty({ description: 'Unit Price', example: 100.5 })
  @IsNumber()
  retail_price: number;

  @ApiProperty({ description: 'Unit Price', example: 100.5 })
  @IsNumber()
  assessed_unit: number;

  @ApiProperty({ enum: CostingMethod })
  @IsEnum(CostingMethod)
  costing_method: CostingMethod;

  @ApiProperty({ description: 'Unit Cost', example: 80.0 })
  @IsNumber()
  unit_cost: number;

  @ApiProperty({ description: 'Tax Group Code ID' })
  @IsUUID()
  @IsNotEmpty()
  tax_group_code_id: string;

  @ApiProperty({ description: 'Item Category Code ID', required: false })
  @IsOptional()
  @IsUUID()
  item_category_code_id?: string;
}

export class UpdateItemDto extends PartialType(CreateItemDto) { }

export class CreateTaxCalculationDto {
  @ApiProperty({ description: 'Tax Group Code ID', example: 'uuid-string' })
  @IsNotEmpty()
  @IsUUID()
  tax_group_code_id: string;

  @ApiProperty({ description: 'Tax Group Area ID', example: 'uuid-string' })
  @IsNotEmpty()
  @IsUUID()
  tax_group_area_id: string;

  @ApiProperty({
    description: 'Description of the tax calculation',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Tax percentage (0 to 100)', example: 15 })
  @IsNumber()
  @Min(0)
  @Max(100)
  percentage: number;
}

export class UpdateTaxCalculationDto extends PartialType(
  CreateTaxCalculationDto,
) { }

export class GetTaxCalculationDto {
  @ApiProperty({
    description: 'Tax Group Code ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  tax_group_code_id: string;

  @ApiProperty({
    description: 'Tax Group Area ID',
    example: '321e4567-e89b-12d3-a456-426614174111',
  })
  @IsUUID()
  tax_group_area_id: string;
}

export class CreateInventoryAdjustmentItemDto {
  @ApiProperty({
    description: 'Item ID',
    example: '71f93d93-6fd7-4d64-b103-19b546c878d6',
  })
  @IsUUID()
  @IsNotEmpty()
  item_id: string;

  @ApiProperty({ description: 'Quantity to adjust', example: 5 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Unit Cost', example: 80.0 })
  @IsNumber()
  @IsNotEmpty()
  unit_cost: number;
}

export class CreateInventoryAdjustmentDto {
  @ApiProperty({
    description: 'Date the adjustment was posted',
    example: '2025-06-25',
  })
  @IsNotEmpty()
  @IsDateString()
  posting_date: Date;

  @ApiProperty({
    description: 'Date the adjustment was issued',
    example: '2025-06-24',
  })
  @IsNotEmpty()
  @IsDateString()
  document_date: Date;

  @ApiProperty({
    description: 'List of items associated with the adjustment',
    type: [CreateInventoryAdjustmentItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInventoryAdjustmentItemDto)
  items: CreateInventoryAdjustmentItemDto[];
}

export class UpdateInventoryAdjustmentItemDto {
  @ApiProperty({
    required: false,
    description:
      'ID of the inventory adjustment item. Required only for updating existing items. Omit this field for newly added items.',
    example: 'c7b3c5e0-4b33-4ea5-91db-5f9bdfc76b22',
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    description: 'Item ID',
    example: '71f93d93-6fd7-4d64-b103-19b546c878d6',
  })
  @IsUUID()
  @IsNotEmpty()
  item_id: string;

  @ApiProperty({ description: 'Quantity to adjust', example: 5 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Unit Cost', example: 80.0 })
  @IsNumber()
  @IsNotEmpty()
  unit_cost: number;
}

export class UpdateInventoryAdjustmentDto {
  @ApiProperty({
    description: 'Date the adjustment was posted',
    example: '2025-06-25',
  })
  @IsNotEmpty()
  @IsDateString()
  posting_date: Date;

  @ApiProperty({
    description: 'Date the adjustment was issued',
    example: '2025-06-24',
  })
  @IsNotEmpty()
  @IsDateString()
  document_date: Date;

  @ApiProperty({
    description: 'List of items associated with the adjustment',
    type: [UpdateInventoryAdjustmentItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateInventoryAdjustmentItemDto)
  items: UpdateInventoryAdjustmentItemDto[];
}
