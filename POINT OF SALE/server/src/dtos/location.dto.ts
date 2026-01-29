import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'Unique code for the location' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Name of the location' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Address of the location', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'City of the location', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: 'Brand associated with the location', required: false })
  @IsOptional()
  @IsString()
  brand?: string;
}

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}