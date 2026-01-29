import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateUOMDto, UpdateUOMDto } from 'src/dtos/uom.dto';
import { UOMService } from 'src/microservices/uom.service';

@ApiTags('UOM')
@Controller('uom')
export class UOMController {
  constructor(private readonly uOMService: UOMService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new unit of measurement' })
  @ApiResponse({ status: 201, description: 'UOM created successfully.' })
  @ApiBody({ type: CreateUOMDto, description: 'Unit of Measurement details' })
  create(@Body() createUOMDto: CreateUOMDto) {
    return this.uOMService.create(createUOMDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all units of measurement' })
  @ApiResponse({ status: 200, description: 'List of UOMs retrieved successfully.' })
  findAll() {
    return this.uOMService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific unit of measurement by ID' })
  @ApiResponse({ status: 200, description: 'UOM retrieved successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'UOM ID' })
  findOne(@Param('id') id: string) {
    return this.uOMService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific unit of measurement by ID' })
  @ApiResponse({ status: 200, description: 'UOM updated successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'UOM ID' })
  @ApiBody({ type: UpdateUOMDto, description: 'Updated UOM details' })
  update(@Param('id') id: string, @Body() updateUOMDto: UpdateUOMDto) {
    return this.uOMService.update(+id, updateUOMDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific unit of measurement by ID' })
  @ApiResponse({ status: 200, description: 'UOM deleted successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'UOM ID' })
  remove(@Param('id') id: string) {
    return this.uOMService.remove(+id);
  }
}
