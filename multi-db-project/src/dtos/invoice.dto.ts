import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePurchaseInvoiceItemDto {
  @ApiProperty({
    description: 'The unique identifier of the item',
    example: '71f93d93-6fd7-4d64-b103-19b546c878d6',
  })
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @ApiProperty({
    description: 'Quantity of the item purchased (must be at least 1)',
    example: 5,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({
    description: 'Unit cost of the item (optional, defaults to 0)',
    example: 25.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  unit_cost?: number;

  @ApiPropertyOptional({
    description: 'Discount of the item (optional, defaults to 0)',
    example: 2.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(1, { message: 'discount cannot be less than 0' })
  @Max(100, { message: 'discount cannot be greater than 100' })
  discount?: number;
}

export class CreatePurchaseInvoiceDto {
  @ApiProperty({
    description: 'The unique identifier of the vendor',
    example: 'a9f632d7-3c56-4a61-920b-2082be1b7b4f',
  })
  @IsNotEmpty()
  @IsString()
  vendor_id: string;

  @ApiProperty({
    description: 'Invoice number provided by the vendor',
    example: 'INV-2025-00023',
  })
  @IsOptional()
  @IsString()
  vendor_invoice_no?: string;

  @ApiProperty({
    description: 'Date the invoice was posted',
    example: '2025-06-25',
  })
  @IsNotEmpty()
  @IsDateString()
  posting_date: Date;

  @ApiProperty({
    description: 'Date the invoice document was issued',
    example: '2025-06-24',
  })
  @IsNotEmpty()
  @IsDateString()
  document_date: Date;

  @ApiProperty({
    description: 'note',
    required: false,
    example: 'abc',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    description: 'advanced tax (optional, defaults to 0)',
    example: 15,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  advancetax?: number;

  @ApiProperty({
    description: 'List of items associated with the purchase invoice',
    type: [CreatePurchaseInvoiceItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseInvoiceItemDto)
  items: CreatePurchaseInvoiceItemDto[];
}

export class UpdatePurchaseInvoiceItemDto {
  @ApiProperty({
    required: false,
    description:
      'ID of the purchase invoice item. Required only for updating existing items. Omit this field for newly added items.',
    example: 'c7b3c5e0-4b33-4ea5-91db-5f9bdfc76b22',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'ID of the item being invoiced.',
    example: 'a9b8c7d6-e5f4-4321-9abc-df1234567890',
  })
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @ApiProperty({
    description: 'Quantity of the item being invoiced. Must be at least 1.',
    example: 10,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Unit cost of the item.',
    example: 1500.75,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  unit_cost?: number;

  @ApiPropertyOptional({
    description: 'Discount of the item (optional, defaults to 0)',
    example: 2.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  discount?: number;
}

export class UpdatePurchaseInvoiceDto {
  @ApiProperty({
    description: 'ID of the vendor associated with the invoice.',
    example: 'vendor-1234-uuid',
  })
  @IsNotEmpty()
  @IsString()
  vendor_id: string;

  @ApiProperty({
    description: 'Invoice number provided by the vendor.',
    example: 'INV-987654',
  })
  @IsOptional()
  @IsString()
  vendor_invoice_no?: string;

  @ApiProperty({
    description: 'Posting date of the invoice.',
    example: '2025-06-26',
  })
  @IsNotEmpty()
  @IsDateString()
  posting_date: Date;

  @ApiPropertyOptional({
    description: 'advanced tax (optional, defaults to 0)',
    example: 15,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  advancetax?: number;

  @ApiProperty({
    description: 'Document date of the invoice.',
    example: '2025-06-25',
  })
  @IsNotEmpty()
  @IsDateString()
  document_date: Date;

  @ApiProperty({
    description: 'note',
    required: false,
    example: 'abc',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    type: [UpdatePurchaseInvoiceItemDto],
    description:
      'Array of items included in the purchase invoice. Items with `id` will be updated; new items without `id` will be created; items missing from this array but present in DB will be deleted.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePurchaseInvoiceItemDto)
  items: UpdatePurchaseInvoiceItemDto[];
}

export class CreateSalesInvoiceItemDto {
  @ApiProperty({
    description: 'The unique identifier of the item',
    example: '71f93d93-6fd7-4d64-b103-19b546c878d6',
  })
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @ApiProperty({
    description: 'Quantity of the item saled (must be at least 1)',
    example: 5,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({
    description: 'Unit cost of the item (optional, defaults to 0)',
    example: 25.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  unit_cost?: number;

  @ApiPropertyOptional({
    description: 'Retail Price of the item (optional, defaults to 0)',
    example: 25.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  retail_price?: number;

  @ApiPropertyOptional({
    description: 'Discount of the item (optional, defaults to 0)',
    example: 2.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({
    description: 'Further Tax of the item (optional, defaults to 0)',
    example: 2.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  furthertax?: number;

  @ApiPropertyOptional({
    description: 'Fed of the item (optional, defaults to 0)',
    example: 2.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  fed?: number;
}

export class CreateSalesInvoiceDto {
  @ApiProperty({
    description: 'The unique identifier of the customer',
    example: 'a9f632d7-3c56-4a61-920b-2082be1b7b4f',
  })
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @ApiProperty({
    description: 'Date the invoice was posted',
    example: '2025-06-25',
  })
  @IsNotEmpty()
  @IsDateString()
  posting_date: Date;

  @ApiProperty({
    description: 'Date the invoice document was issued',
    example: '2025-06-24',
  })
  @IsNotEmpty()
  @IsDateString()
  document_date: Date;

  @ApiProperty({
    description: 'note',
    required: false,
    example: 'abc',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'scenario_no',
    required: false,
    example: 'sn-001',
  })
  @IsOptional()
  @IsString()
  scenario_no?: string;

  @ApiPropertyOptional({
    description: 'advanced tax (optional, defaults to 0)',
    example: 15,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  advancetax?: number;

  @ApiProperty({
    description: 'List of items associated with the purchase invoice',
    type: [CreateSalesInvoiceItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalesInvoiceItemDto)
  items: CreateSalesInvoiceItemDto[];
}

export class CalculateInvoiceItemDto {
  @ApiProperty({ example: 'c1d94095-55bf-4337-b377-4be21dd50dbe' })
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ example: 25.5, default: 0 })
  @IsOptional()
  @IsNumber()
  unit_cost?: number;

  @ApiPropertyOptional({ example: 25.5, default: 0 })
  @IsOptional()
  @IsNumber()
  retail_price?: number;

  @ApiPropertyOptional({ example: 2.5, default: 0 })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({ example: 2.5, default: 0 })
  @IsOptional()
  @IsNumber()
  furthertax?: number;

  @ApiPropertyOptional({ example: 2.5, default: 0 })
  @IsOptional()
  @IsNumber()
  fed?: number;
}

export class CalculateInvoiceDto {
  @ApiProperty({ example: 'a368a740-7724-4ae6-91fa-16b7ae866da0' })
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @ApiPropertyOptional({ example: 15, default: 0 })
  @IsOptional()
  @IsNumber()
  advancetax?: number;

  @ApiProperty({ type: [CalculateInvoiceItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CalculateInvoiceItemDto)
  items: CalculateInvoiceItemDto[];
}

export class UpdateSalesInvoiceItemDto {
  @ApiProperty({
    required: false,
    description:
      'ID of the purchase invoice item. Required only for updating existing items. Omit this field for newly added items.',
    example: 'c7b3c5e0-4b33-4ea5-91db-5f9bdfc76b22',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'ID of the item being invoiced.',
    example: 'a9b8c7d6-e5f4-4321-9abc-df1234567890',
  })
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @ApiProperty({
    description: 'Quantity of the item being invoiced. Must be at least 1.',
    example: 10,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Unit cost of the item.',
    example: 1500.75,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  unit_cost?: number;

  @ApiPropertyOptional({
    description: 'Retail Price of the item (optional, defaults to 0)',
    example: 25.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  retail_price?: number;

  @ApiPropertyOptional({
    description: 'Discount of the item (optional, defaults to 0)',
    example: 2.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @ApiPropertyOptional({
    description: 'Further Tax of the item (optional, defaults to 0)',
    example: 2.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  furthertax?: number;

  @ApiPropertyOptional({
    description: 'Fed of the item (optional, defaults to 0)',
    example: 2.5,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  fed?: number;
}

export class UpdateSalesInvoiceDto {
  @ApiProperty({
    description: 'ID of the customer associated with the invoice.',
    example: 'vendor-1234-uuid',
  })
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @ApiProperty({
    description: 'Posting date of the invoice.',
    example: '2025-06-26',
  })
  @IsNotEmpty()
  @IsDateString()
  posting_date: Date;

  @ApiProperty({
    description: 'Document date of the invoice.',
    example: '2025-06-25',
  })
  @IsNotEmpty()
  @IsDateString()
  document_date: Date;

  @ApiProperty({
    description: 'note',
    required: false,
    example: 'abc',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'scenario_no',
    required: false,
    example: 'sn-001',
  })
  @IsOptional()
  @IsString()
  scenario_no?: string;

  @ApiPropertyOptional({
    description: 'advanced tax (optional, defaults to 0)',
    example: 15,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  advancetax?: number;

  @ApiProperty({
    type: [UpdateSalesInvoiceItemDto],
    description:
      'Array of items included in the sales invoice. Items with `id` will be updated; new items without `id` will be created; items missing from this array but present in DB will be deleted.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSalesInvoiceItemDto)
  items: UpdateSalesInvoiceItemDto[];
}

export class CreateSalesReturnInvoiceItemDto {
  @ApiProperty({
    description: 'Item ID from original invoice',
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Quantity to return', example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateSalesReturnInvoiceDto {
  @ApiProperty({ description: 'Original sales invoice ID', example: 'uuid' })
  @IsNotEmpty()
  @IsString()
  sales_invoice_id: string;

  @ApiProperty({ example: '2025-06-25' })
  @IsNotEmpty()
  @IsDateString()
  posting_date: Date;

  @ApiProperty({ example: '2025-06-24' })
  @IsNotEmpty()
  @IsDateString()
  document_date: Date;

  @ApiProperty({
    description: 'note',
    required: false,
    example: 'abc',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'scenario_no',
    required: false,
    example: 'sn-001',
  })
  @IsOptional()
  @IsString()
  scenario_no?: string;

  @ApiProperty({ type: [CreateSalesReturnInvoiceItemDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateSalesReturnInvoiceItemDto)
  items: CreateSalesReturnInvoiceItemDto[];
}

export class UpdateSalesReturnInvoiceItemDto {
  @ApiProperty({ example: 'item-uuid' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
}

export class UpdateSalesReturnInvoiceDto {
  @ApiProperty({ example: '2025-06-25' })
  @IsNotEmpty()
  @IsDateString()
  posting_date: Date;

  @ApiProperty({ example: '2025-06-24' })
  @IsNotEmpty()
  @IsDateString()
  document_date: Date;

  @ApiProperty({
    description: 'note',
    required: false,
    example: 'abc',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'scenario_no',
    required: false,
    example: 'sn-001',
  })
  @IsOptional()
  @IsString()
  scenario_no?: string;

  @ApiProperty({ type: [UpdateSalesReturnInvoiceItemDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateSalesReturnInvoiceItemDto)
  items: UpdateSalesReturnInvoiceItemDto[];
}

export class CreatePurchaseReturnInvoiceItemDto {
  @ApiProperty({
    description: 'Item ID from original invoice',
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @ApiProperty({ description: 'Quantity to return', example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreatePurchaseReturnInvoiceDto {
  @ApiProperty({ description: 'Original purchase invoice ID', example: 'uuid' })
  @IsNotEmpty()
  @IsString()
  purchase_invoice_id: string;

  @ApiProperty({
    description: 'Invoice number provided by the vendor.',
    example: 'INV-987654',
  })
  @IsOptional()
  @IsString()
  vendor_invoice_no?: string;

  @ApiProperty({ example: '2025-06-25' })
  @IsNotEmpty()
  @IsDateString()
  posting_date: Date;

  @ApiProperty({ example: '2025-06-24' })
  @IsNotEmpty()
  @IsDateString()
  document_date: Date;

  @ApiProperty({
    description: 'note',
    required: false,
    example: 'abc',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ type: [CreatePurchaseReturnInvoiceItemDto] })
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseReturnInvoiceItemDto)
  items: CreatePurchaseReturnInvoiceItemDto[];
}

export class UpdatePurchaseReturnInvoiceItemDto {
  @ApiProperty({ example: 'item-uuid' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
}

export class UpdatePurchaseReturnInvoiceDto {
  @ApiProperty({ example: '2025-06-25' })
  @IsNotEmpty()
  @IsDateString()
  posting_date: Date;

  @ApiProperty({ example: '2025-06-24' })
  @IsNotEmpty()
  @IsDateString()
  document_date: Date;

  @ApiProperty({
    description: 'Invoice number provided by the vendor.',
    example: 'INV-987654',
  })
  @IsOptional()
  @IsString()
  vendor_invoice_no?: string;

  @ApiProperty({
    description: 'note',
    required: false,
    example: 'abc',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ type: [UpdatePurchaseReturnInvoiceItemDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdatePurchaseReturnInvoiceItemDto)
  items: UpdatePurchaseReturnInvoiceItemDto[];
}
