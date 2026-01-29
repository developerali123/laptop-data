import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWLCMDto {
  @ApiProperty({ description: 'First string' })
  @IsNotEmpty()
  @IsString()
  first: string;

  @ApiProperty({ description: 'Second string (optional)' })
  @IsOptional()
  @IsString()
  second?: string;

  @ApiProperty({ description: 'Third string (optional)' })
  @IsOptional()
  @IsString()
  third?: string;
}

export class UpdateWLCMDto extends PartialType(CreateWLCMDto) {}
