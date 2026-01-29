import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRangeDto, UpdateRangeDto } from 'src/dtos/range.dto';
import { RangeService } from 'src/microservices/range.service';

@ApiTags('Range')
@Controller('range')
export class RangeController {
  constructor(private readonly rangeService: RangeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new range' })
  @ApiResponse({ status: 201, description: 'The range has been successfully created.' })
  create(@Body() createRangeDto: CreateRangeDto) {
    return this.rangeService.create(createRangeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all ranges' })
  @ApiResponse({ status: 200, description: 'List of ranges retrieved successfully.' })
  findAll() {
    return this.rangeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a range by ID' })
  @ApiResponse({ status: 200, description: 'Range retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Range not found.' })
  findOne(@Param('id') id: string) {
    return this.rangeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a range by ID' })
  @ApiResponse({ status: 200, description: 'The range has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Range not found.' })
  update(@Param('id') id: string, @Body() updateRangeDto: UpdateRangeDto) {
    return this.rangeService.update(+id, updateRangeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a range by ID' })
  @ApiResponse({ status: 200, description: 'The range has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Range not found.' })
  remove(@Param('id') id: string) {
    return this.rangeService.remove(+id);
  }
}
