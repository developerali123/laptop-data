import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';
import { CategoryService } from 'src/microservices/category.service';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully.' })
  @ApiBody({ type: CreateCategoryDto, description: 'Category details' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all categories' })
  @ApiResponse({ status: 200, description: 'List of categories retrieved successfully.' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific category by ID' })
  @ApiResponse({ status: 200, description: 'Category retrieved successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'Category ID' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific category by ID' })
  @ApiResponse({ status: 200, description: 'Category updated successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'Category ID' })
  @ApiBody({ type: UpdateCategoryDto, description: 'Updated category details' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific category by ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully.' })
  @ApiParam({ name: 'id', type: Number, description: 'Category ID' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}