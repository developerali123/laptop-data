import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRangeDto {
  @ApiProperty({ description: 'Unique name of the range' })
  @IsNotEmpty()
  @IsString()
  range: string;
}

export class UpdateRangeDto extends PartialType(CreateRangeDto) {}