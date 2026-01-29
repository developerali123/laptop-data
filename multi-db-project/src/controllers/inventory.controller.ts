import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateInventoryAdjustmentDto,
  CreateItemCategoryCodeDto,
  CreateItemDto,
  CreateTaxCalculationDto,
  CreateTaxGroupCodeDto,
  GetTaxCalculationDto,
  UpdateInventoryAdjustmentDto,
  UpdateItemCategoryCodeDto,
  UpdateItemDto,
  UpdateTaxCalculationDto,
  UpdateTaxGroupCodeDto
} from 'src/dtos/inventory.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { InventoryService } from 'src/services/inventory.service';

@ApiTags('Tax Group Code')
@Controller('tax-group-codes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TaxGroupCodeController {
  constructor(private readonly service: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tax group code' })
  @ApiResponse({
    status: 201,
    description: 'The tax group code has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Code may already exist or validation failed.',
  })
  create(@Body() dto: CreateTaxGroupCodeDto) {
    return this.service.createtaxgroupcode(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tax group codes' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of all tax group codes.',
  })
  findAll() {
    return this.service.findAlltaxgroupcodes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single tax group code by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the tax group code',
    example: 'dcbd3796-7f2e-48d8-84ab-2c562e9e843a',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the tax group code with the given ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'tax group code not found.',
  })
  findOne(@Param('id') id: string) {
    return this.service.findOnetaxgroupcode(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing tax group code by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the tax group code',
    example: 'dcbd3796-7f2e-48d8-84ab-2c562e9e843a',
  })
  @ApiResponse({
    status: 200,
    description: 'The tax group code has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Code may already exist or validation failed.',
  })
  @ApiResponse({
    status: 404,
    description: 'tax group code not found.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateTaxGroupCodeDto) {
    return this.service.updatetaxgroupcode(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a tax group code by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the tax group code',
    example: 'dcbd3796-7f2e-48d8-84ab-2c562e9e843a',
  })
  @ApiResponse({
    status: 204,
    description: 'The tax group code has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'tax group code not found.',
  })
  remove(@Param('id') id: string) {
    return this.service.removetaxgroupcode(id);
  }
}

@ApiTags('Item-Category-Code')
@Controller('item-category-codes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ItemCategoryCodeController {
  constructor(private readonly service: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item category code' })
  @ApiResponse({
    status: 201,
    description: 'The item category code has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Code may already exist or validation failed.',
  })
  create(@Body() dto: CreateItemCategoryCodeDto) {
    return this.service.createitemcategorycode(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all item category codes' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of all item category codes.',
  })
  findAll() {
    return this.service.findAllitemcategorycodes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single item category code by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the item category code',
    example: 'dcbd3796-7f2e-48d8-84ab-2c562e9e843a',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the item category code with the given ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'item category code not found.',
  })
  findOne(@Param('id') id: string) {
    return this.service.findOneitemcategorycode(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing item category code by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the item category code',
    example: 'dcbd3796-7f2e-48d8-84ab-2c562e9e843a',
  })
  @ApiResponse({
    status: 200,
    description: 'The item category code has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Code may already exist or validation failed.',
  })
  @ApiResponse({
    status: 404,
    description: 'item category code not found.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateItemCategoryCodeDto) {
    return this.service.updateitemcategorycode(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a item category code by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the item category code',
    example: 'dcbd3796-7f2e-48d8-84ab-2c562e9e843a',
  })
  @ApiResponse({
    status: 204,
    description: 'The item category code has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'item category code not found.',
  })
  remove(@Param('id') id: string) {
    return this.service.removeitemcategorycode(id);
  }
}

@ApiTags('Items')
@Controller('items')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ItemController {
  constructor(private readonly itemService: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  create(@Body() dto: CreateItemDto) {
    return this.itemService.createitem(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  findAll() {
    return this.itemService.findAllitems();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  findOne(@Param('id') id: string) {
    return this.itemService.findOneitem(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an item' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  update(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.itemService.updateitem(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item' })
  @ApiParam({ name: 'id', description: 'Item ID' })
  remove(@Param('id') id: string) {
    return this.itemService.removeitem(id);
  }
}

@ApiTags('Inventory Adjustment')
@Controller('inventory-adjustments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InventoryAdjustmentController {
  constructor(private readonly service: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Make negative/positive stock adjustment' })
  adjustStock(@Req() req, @Body() dto: CreateInventoryAdjustmentDto) {
    const userId = req.user.userId;
    return this.service.createInventoryAdjustment(userId, dto);
  }

  @Get()
  @ApiOperation({
    description: 'List of all inventory adjustments(filtered by posted)',
  })
  findAll(@Query('posted') posted?: string) {
    const postedFilter =
      posted === 'true' ? true : posted === 'false' ? false : undefined;

    return this.service.findAllInventoryAdjustment(postedFilter);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Inventory Adjustment Item ID',
    type: 'string',
  })
  @ApiOperation({ description: 'Single inventory adjustment item by ID' })
  @ApiOperation({ description: 'Inventory adjustment not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOneInventoryAdjustment(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update inventory adjustment item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateInventoryAdjustmentDto,
  ) {
    const userId = req.user.userId;
    return this.service.updateInventoryAdjustment(id, userId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete inventory adjustment item by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  delete(@Param('id') id: string) {
    return this.service.deleteInventoryAdjustment(id);
  }

  @Patch('post/:id')
  @ApiOperation({ summary: 'Post inventory adjustment by ID' })
  @ApiParam({
    name: 'id',
    description: 'Inventory Adjustment Item ID',
    type: 'string',
  })
  postInventoryAdjustment(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.service.postInventoryAdjustment(id, userId);
  }
}

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Tax Calculation')
@Controller('tax-calculations')
export class TaxCalculationController {
  constructor(private readonly service: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tax calculation' })
  @ApiResponse({ status: 201, description: 'Successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request: Validation failed' })
  create(@Body() dto: CreateTaxCalculationDto) {
    return this.service.createtaxcalculation(dto);
  }

  @Post('gettaxpercentage')
  @ApiOperation({ summary: 'Get tax calculation by group code and area' })
  @ApiResponse({
    status: 200,
    description: 'Tax calculation retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request or not found.' })
  getTaxCalculation(@Body() dto: GetTaxCalculationDto) {
    return this.service.findByGroupCodeAndArea(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tax calculations' })
  @ApiResponse({ status: 200, description: 'List of all tax calculations' })
  findAll() {
    return this.service.findAlltaxcalculations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tax calculation by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the tax calculation' })
  @ApiResponse({ status: 200, description: 'Tax calculation found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOnetaxcalculation(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a tax calculation by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the tax calculation' })
  @ApiResponse({ status: 200, description: 'Successfully updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() dto: UpdateTaxCalculationDto) {
    return this.service.updatetaxcalculation(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a tax calculation by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the tax calculation' })
  @ApiResponse({ status: 204, description: 'Successfully deleted' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id') id: string) {
    return this.service.removetaxcalculation(id);
  }
}
