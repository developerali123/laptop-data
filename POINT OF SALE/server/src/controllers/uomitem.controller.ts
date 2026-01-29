import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UOMItemService } from '../microservices/uomitem.service';
import { CreateUOMItemDto, UpdateUOMItemDto } from 'src/dtos/uomitem.dto';

@ApiTags('UOMItem')
@Controller('uomitem')
export class UOMItemController {
  constructor(private readonly uomItemService: UOMItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new UOMItem' })
  @ApiResponse({ status: 201, description: 'The UOMItem has been successfully created.' })
  create(@Body() createUOMItemDto: CreateUOMItemDto) {
    return this.uomItemService.create(createUOMItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all UOMItems' })
  @ApiResponse({ status: 200, description: 'List of UOMItems retrieved successfully.' })
  findAll() {
    return this.uomItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a UOMItem by ID' })
  @ApiResponse({ status: 200, description: 'UOMItem retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'UOMItem not found.' })
  findOne(@Param('id') id: string) {
    return this.uomItemService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a UOMItem by ID' })
  @ApiResponse({ status: 200, description: 'The UOMItem has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'UOMItem not found.' })
  update(@Param('id') id: string, @Body() updateUOMItemDto: UpdateUOMItemDto) {
    return this.uomItemService.update(+id, updateUOMItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a UOMItem by ID' })
  @ApiResponse({ status: 200, description: 'The UOMItem has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'UOMItem not found.' })
  remove(@Param('id') id: string) {
    return this.uomItemService.remove(+id);
  }
}
