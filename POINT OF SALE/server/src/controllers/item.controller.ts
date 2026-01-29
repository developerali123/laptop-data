import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateItemDto, UpdateItemDto } from 'src/dtos/item.dto';
import { ItemService } from 'src/microservices/item.service';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: 201, description: 'The item has been successfully created.' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all items' })
  @ApiResponse({ status: 200, description: 'List of items retrieved successfully.' })
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an item by ID' })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an item by ID' })
  @ApiResponse({ status: 200, description: 'The item has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiResponse({ status: 200, description: 'The item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
