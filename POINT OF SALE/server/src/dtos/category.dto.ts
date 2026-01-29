import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({ description: 'Name of the category', example: 'Electronics' })
  name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}