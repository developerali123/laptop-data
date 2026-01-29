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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateCustomerDto,
  CreateTaxAreaCodeDto,
  CreateVendorDto,
  UpdateCustomerDto,
  UpdateTaxAreaCodeDto,
  UpdateVendorDto,
} from 'src/dtos/customer_vendor.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { CustomerVendorService } from 'src/services/customer_vendor.service';

@ApiTags('Tax Area Code')
@Controller('tax-area-code')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TaxAreaCodeController {
  constructor(private readonly service: CustomerVendorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tax area code' })
  @ApiResponse({
    status: 201,
    description: 'The tax area code has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Code may already exist or validation failed.',
  })
  create(@Body() dto: CreateTaxAreaCodeDto) {
    return this.service.createtaxareacode(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tax area codes' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of all tax area codes.',
  })
  findAll() {
    return this.service.findAlltaxareacodes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single tax area code by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the tax area code',
    example: 'dcbd3796-7f2e-48d8-84ab-2c562e9e843a',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the tax area code with the given ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'tax area code not found.',
  })
  findOne(@Param('id') id: string) {
    return this.service.findonetaxareacode(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing tax area code by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the tax area code',
    example: 'dcbd3796-7f2e-48d8-84ab-2c562e9e843a',
  })
  @ApiResponse({
    status: 200,
    description: 'The tax area code has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Code may already exist or validation failed.',
  })
  @ApiResponse({
    status: 404,
    description: 'tax area code not found.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateTaxAreaCodeDto) {
    return this.service.updatetaxareacode(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a tax area code by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the tax area code',
    example: 'dcbd3796-7f2e-48d8-84ab-2c562e9e843a',
  })
  @ApiResponse({
    status: 204,
    description: 'The tax area code has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'tax area code not found.',
  })
  remove(@Param('id') id: string) {
    return this.service.removetaxareacode(id);
  }
}

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly service: CustomerVendorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Duplicate customer_no or invalid group ID',
  })
  create(@Body() dto: CreateCustomerDto) {
    return this.service.createcustomer(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers (paginated)' })
  @ApiResponse({ status: 200, description: 'Paginated list of customers' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of records per page (default: 10)',
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.service.findAllcustomers(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer found' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOnecustomer(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Customer updated' })
  @ApiResponse({
    status: 400,
    description: 'Duplicate customer_no or invalid group ID',
  })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.service.updatecustomer(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a customer by ID' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiResponse({ status: 204, description: 'Customer deleted' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  remove(@Param('id') id: string) {
    return this.service.removecustomer(id);
  }
}

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Vendors')
@Controller('vendors')
export class VendorController {
  constructor(private readonly service: CustomerVendorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vendor' })
  @ApiResponse({ status: 201, description: 'Vendor created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Duplicate vendorr_no or invalid group ID',
  })
  create(@Body() dto: CreateVendorDto) {
    return this.service.createvendor(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vendors(paginated)' })
  @ApiResponse({ status: 200, description: 'Paginated list of vendors' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of records per page (default: 10)',
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.service.findAllvendors(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vemdor by ID' })
  @ApiParam({ name: 'id', description: 'Vendor ID' })
  @ApiResponse({ status: 200, description: 'Vendor found' })
  @ApiResponse({ status: 404, description: 'Vendor not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOnevendor(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vendor by ID' })
  @ApiParam({ name: 'id', description: 'Vendor ID' })
  @ApiResponse({ status: 200, description: 'VendorCustomer updated' })
  @ApiResponse({
    status: 400,
    description: 'Duplicate vendor or invalid group ID',
  })
  @ApiResponse({ status: 404, description: 'Vendor not found' })
  update(@Param('id') id: string, @Body() dto: UpdateVendorDto) {
    return this.service.updatevendor(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a vendor by ID' })
  @ApiParam({ name: 'id', description: 'Vendor ID' })
  @ApiResponse({ status: 204, description: 'Vendor deleted' })
  @ApiResponse({ status: 404, description: 'Vendor not found' })
  remove(@Param('id') id: string) {
    return this.service.removevendor(id);
  }
}
