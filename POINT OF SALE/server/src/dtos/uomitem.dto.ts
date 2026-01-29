import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUOMItemDto {
  @ApiProperty({ description: 'Item number' })
  @IsNotEmpty()
  @IsString()
  itemno: string;

  @ApiProperty({ description: 'UOM ID' })
  @IsNotEmpty()
  @IsNumber()
  uomId: number;

  @ApiProperty({ description: 'Quantity in UOM' })
  @IsNotEmpty()
  @IsNumber()
  quantityuom: number;
}

export class UpdateUOMItemDto extends PartialType(CreateUOMItemDto) {}