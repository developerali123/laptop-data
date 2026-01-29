import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateSubcategoryDto, UpdateSubcategoryDto } from 'src/dtos/subcategory.dto';
import { SubcategoryService } from 'src/microservices/subcategory.service';

@ApiTags('Subcategory')
@Controller('subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subcategory' })
  @ApiResponse({ status: 201, description: 'Subcategory created successfully.' })
  @ApiBody({ type: CreateSubcategoryDto, description: 'Subcategory details' })
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoryService.create(createSubcategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all subcategories' })
  @ApiResponse({ status: 200, description: 'List of subcategories retrieved successfully.' })
  findAll() {
    return this.subcategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific subcategory by ID' })
  @ApiResponse({ status: 200, description: 'Subcategory retrieved successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'Subcategory ID' })
  findOne(@Param('id') id: string) {
    return this.subcategoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific subcategory by ID' })
  @ApiResponse({ status: 200, description: 'Subcategory updated successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'Subcategory ID' })
  @ApiBody({ type: UpdateSubcategoryDto, description: 'Updated subcategory details' })
  update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.subcategoryService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific subcategory by ID' })
  @ApiResponse({ status: 200, description: 'Subcategory deleted successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'Subcategory ID' })
  remove(@Param('id') id: string) {
    return this.subcategoryService.remove(+id);
  }
}