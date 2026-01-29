import { IsString, IsInt } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateSubcategoryDto {
  @IsString()
  @ApiProperty({ description: 'Name of the subcategory', example: 'Mobile Phones' })
  name: string;

  @IsInt()
  @ApiProperty({ description: 'ID of the parent category', example: 1 })
  categoryId: number;
}

export class UpdateSubcategoryDto extends PartialType(CreateSubcategoryDto) {}