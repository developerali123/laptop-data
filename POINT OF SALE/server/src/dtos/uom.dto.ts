import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUOMDto {
  @IsString()
  @ApiProperty({ description: 'Name of the unit', example: 'Kilogram' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Symbol of the unit', example: 'kg' })
  symbol: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Optional description of the unit', example: 'Unit for measuring weight' })
  description?: string;
}

export class UpdateUOMDto extends PartialType(CreateUOMDto) {}
