import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMasterInfoCodeDto {
  @ApiProperty({ description: 'Unique code' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Description of the master info code' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Prompt text' })
  @IsNotEmpty()
  @IsString()
  prompt: string;
}

export class UpdateMasterInfoCodeDto extends PartialType(CreateMasterInfoCodeDto) {}

