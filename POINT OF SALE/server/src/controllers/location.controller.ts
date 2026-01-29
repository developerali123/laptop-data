import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LocationService } from '../microservices/location.service';
import { CreateLocationDto, UpdateLocationDto } from 'src/dtos/location.dto';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: 201, description: 'Location created successfully.' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: 200, description: 'Locations retrieved successfully.' })
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by ID' })
  @ApiResponse({ status: 200, description: 'Location retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Location not found.' })
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiResponse({ status: 200, description: 'Location updated successfully.' })
  @ApiResponse({ status: 404, description: 'Location not found.' })
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location by ID' })
  @ApiResponse({ status: 200, description: 'Location deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Location not found.' })
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
