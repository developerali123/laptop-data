import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
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
import { Response } from 'express';
import {
  CalculateInvoiceDto,
  CreatePurchaseInvoiceDto,
  CreatePurchaseReturnInvoiceDto,
  CreateSalesInvoiceDto,
  CreateSalesReturnInvoiceDto,
  UpdatePurchaseInvoiceDto,
  UpdatePurchaseReturnInvoiceDto,
  UpdateSalesInvoiceDto,
  UpdateSalesReturnInvoiceDto,
} from 'src/dtos/invoice.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { InvoiceService } from 'src/services/invoice.service';

@ApiTags('Purchase Invoices')
@Controller('purchase-invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PurchaseInvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new purchase invoice with items' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  create(@Req() req, @Body() dto: CreatePurchaseInvoiceDto) {
    const userId = req.user.userId;
    return this.service.createpurchaseinvoice(userId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all purchase invoices with items(filtered by posted)',
  })
  findAll(@Query('posted') posted?: string) {
    const postedFilter =
      posted === 'true' ? true : posted === 'false' ? false : undefined;
    return this.service.findAllpurchaseinvoices(postedFilter);
  }

  @Get('purchase-report')
  @ApiOperation({ summary: 'Unified Purchase/Purchase Return Invoice Report' })
  @ApiQuery({
    name: 'document_type',
    required: false,
    enum: ['PurchaseInvoice', 'PurchaseReturn'],
  })
  @ApiQuery({ name: 'document_date_from', required: true, type: String })
  @ApiQuery({ name: 'document_date_to', required: true, type: String })
  @ApiQuery({ name: 'vendor_id', required: false })
  getUnifiedPurchaseInvoiceReport(
    @Query('document_type')
    document_type: 'PurchaseInvoice' | 'PurchaseReturn',
    @Query('document_date_from') document_date_from: string,
    @Query('document_date_to') document_date_to: string,
    @Query('vendor_id') vendor_id: string,
  ) {
    return this.service.getUnifiedPurchaseInvoiceReport({
      document_type,
      document_date_from,
      document_date_to,
      vendor_id,
    });
  }

  @Get('summary')
  @ApiQuery({
    name: 'documentType',
    required: false,
    enum: ['SalesInvoice', 'SalesReturn'],
  })
  @ApiQuery({ name: 'vendorId', required: false })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  async getSalesSummary(
    @Query('documentType') documentType?: 'PurchaseInvoice' | 'PurchaseReturn',
    @Query('vendorId') vendorId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.service.getPurchaseSummary({
      documentType,
      vendorId,
      startDate,
      endDate,
    });
  }

  @Get('returnable-posted')
  @ApiOperation({
    summary: 'Get returnable items from all posted purchase invoices',
  })
  getReturnableItemsFromPostedInvoices() {
    return this.service.getReturnableItemsFromPostedPurchaseInvoices();
  }

  @Get('returnable/:id')
  @ApiOperation({
    summary: 'Get returnable items from single posted sales invoices',
  })
  getReturnableItemsByInvoiceId(@Param('id') id: string) {
    return this.service.getReturnablePurchaseItemsById(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get purchase invoice by ID with items' })
  findOne(@Param('id') id: string) {
    return this.service.findOnepurchaseinvoice(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a purchase invoice and its items' })
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdatePurchaseInvoiceDto,
  ) {
    const userId = req.user.userId;
    return this.service.updatepurchaseinvoice(id, userId, dto);
  }

  @Patch('post/:id')
  @ApiOperation({ summary: 'Mark purchase invoice as posted' })
  @ApiParam({ name: 'id', description: 'ID of the purchase invoice' })
  @ApiResponse({ status: 200, description: 'Invoice marked as posted' })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  async postpurchaseinvoice(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.service.postpurchaseinvoice(id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a purchase invoice and its items' })
  remove(@Param('id') id: string) {
    return this.service.removepurchaseinvoice(id);
  }
}

@ApiTags('Sales Invoices')
@Controller('sales-invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SalesInvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post('calculate')
  @ApiOperation({ summary: 'Preview invoice totals (no save)' })
  @ApiResponse({
    status: 200,
    description: 'Returns calculated totals and items',
  })
  async previewInvoice(@Body() dto: CalculateInvoiceDto) {
    return this.service.calculateInvoicePreview(dto);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new sales invoice with items' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  create(@Req() req, @Body() dto: CreateSalesInvoiceDto) {
    const userId = req.user.userId;
    return this.service.createsalesinvoice(userId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all sales invoices with items (filtered by posted)',
  })
  findAll(@Query('posted') posted?: string) {
    const postedFilter =
      posted === 'true' ? true : posted === 'false' ? false : undefined;
    return this.service.findAllsalesinvoices(postedFilter);
  }

  @Get('report')
  @ApiOperation({ summary: 'Get Sales/Sales Return Invoice Report' })
  @ApiQuery({
    name: 'document_type',
    required: true,
    enum: ['SalesInvoice', 'SalesReturn'],
  })
  @ApiQuery({ name: 'document_date_from', required: true, type: String })
  @ApiQuery({ name: 'document_date_to', required: true, type: String })
  @ApiQuery({ name: 'customer_id', required: true })
  getUnifiedInvoiceReport(
    @Query('document_type') document_type: 'SalesInvoice' | 'SalesReturn',
    @Query('document_date_from') document_date_from: string,
    @Query('document_date_to') document_date_to: string,
    @Query('customer_id') customer_id: string,
  ) {
    return this.service.getUnifiedInvoiceReport({
      document_type,
      document_date_from,
      document_date_to,
      customer_id,
    });
  }

  @Get('summary')
  @ApiQuery({
    name: 'documentType',
    required: false,
    enum: ['SalesInvoice', 'SalesReturn'],
  })
  @ApiQuery({ name: 'customerId', required: false })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  async getSalesSummary(
    @Query('documentType') documentType?: 'SalesInvoice' | 'SalesReturn',
    @Query('customerId') customerId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.service.getSalesSummary({
      documentType,
      customerId,
      startDate,
      endDate,
    });
  }

  @Get('report/download')
  @ApiOperation({ summary: 'Download Sales Invoice Report PDF' })
  async downloadReport(@Res() res: Response) {
    const pdf = await this.service.generateSalesInvoiceReportPdf();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="sales-invoice-report.pdf"',
    });

    res.send(pdf);
  }

  @Get('returnable-posted')
  @ApiOperation({
    summary: 'Get returnable items from all posted sales invoices',
  })
  getReturnableItemsFromPostedInvoices() {
    return this.service.getReturnableItemsFromPostedSalesInvoices();
  }

  @Get('returnable/:id')
  @ApiOperation({
    summary: 'Get returnable items from single posted sales invoices',
  })
  getReturnableItemsByInvoiceId(@Param('id') id: string) {
    return this.service.getReturnableSalesItemsById(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sales invoice by ID with items' })
  findOne(@Param('id') id: string) {
    return this.service.findOnesalesinvoice(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sales invoice and its items' })
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateSalesInvoiceDto,
  ) {
    const userId = req.user.userId;
    return this.service.updatesalesinvoice(id, userId, dto);
  }

  @Patch('post/:id')
  @ApiOperation({ summary: 'Mark sales invoice as posted' })
  @ApiParam({ name: 'id', description: 'ID of the sales invoice' })
  @ApiResponse({ status: 200, description: 'Invoice marked as posted' })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  async postsalesinvoice(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.service.postsalesinvoice(id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sales invoice and its items' })
  remove(@Param('id') id: string) {
    return this.service.removesalesinvoice(id);
  }
}

@ApiTags('Sales-Return Invoices')
@Controller('sales-return-invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SalesReturnInvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sales return invoice with items' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  create(@Req() req, @Body() dto: CreateSalesReturnInvoiceDto) {
    const userId = req.user.userId;
    return this.service.createsalesreturninvoice(userId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all sales return invoices with items(filtered by posted)',
  })
  findAll(@Query('posted') posted?: string) {
    const postedFilter =
      posted === 'true' ? true : posted === 'false' ? false : undefined;
    return this.service.findAllsalesreturninvoices(postedFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sales return invoice by ID with items' })
  findOne(@Param('id') id: string) {
    return this.service.findOnesalesreturninvoice(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a purchase invoice and its items' })
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateSalesReturnInvoiceDto,
  ) {
    const userId = req.user.userId;
    return this.service.updateSalesReturnInvoice(id, userId, dto);
  }

  @Patch('post/:id')
  @ApiOperation({ summary: 'Mark sales return invoice as posted' })
  @ApiParam({ name: 'id', description: 'ID of the sales return invoice' })
  @ApiResponse({ status: 200, description: 'Invoice marked as posted' })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  async postsalesreturninvoice(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.service.postsalesreturninvoice(id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sales return invoice and its items' })
  remove(@Param('id') id: string) {
    return this.service.removesalesreturninvoice(id);
  }
}

@ApiTags('Purchase-Return Invoices')
@Controller('purchase-return-invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PurchaseReturnInvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new purchase return invoice with items' })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  create(@Req() req, @Body() dto: CreatePurchaseReturnInvoiceDto) {
    const userId = req.user.userId;
    return this.service.createpurchasereturninvoice(userId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all purchase return invoices with items(filtered by posted)',
  })
  findAll(@Query('posted') posted?: string) {
    const postedFilter =
      posted === 'true' ? true : posted === 'false' ? false : undefined;
    return this.service.findAllpurchasereturninvoices(postedFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get purchase return invoice by ID with items' })
  findOne(@Param('id') id: string) {
    return this.service.findOnepurchasereturninvoice(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a purchase return invoice and its items' })
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdatePurchaseReturnInvoiceDto,
  ) {
    const userId = req.user.userId;
    return this.service.updatepurchaseReturnInvoice(id, userId, dto);
  }

  @Patch('post/:id')
  @ApiOperation({ summary: 'Mark purchase return invoice as posted' })
  @ApiParam({ name: 'id', description: 'ID of the purchase return invoice' })
  @ApiResponse({ status: 200, description: 'Invoice marked as posted' })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  async postpurchasereturninvoice(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.service.postpurchasereturninvoice(id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a purchase return invoice and its items' })
  remove(@Param('id') id: string) {
    return this.service.removepurchasereturninvoice(id);
  }
}

@ApiTags('Ledgers')
@Controller('Ledgers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LedgersController {
  constructor(private readonly service: InvoiceService) {}

  @Get('vendor-ledger')
  @ApiOperation({ summary: 'Get all vendor ledger entries' })
  @ApiResponse({ status: 200, description: 'List of vendor ledger entries' })
  findAllVendorLedgerEntries() {
    return this.service.findAllVendorLedgerEntries();
  }

  @Get('customer-ledger')
  @ApiOperation({ summary: 'Get all customer ledger entries' })
  @ApiResponse({ status: 200, description: 'List of customer ledger entries' })
  findAllCustomerLedgerEntries() {
    return this.service.findAllCustomerLedgerEntries();
  }

  @Get('item-ledger')
  @ApiOperation({ summary: 'Get all item ledger entries (with filters)' })
  @ApiQuery({ name: 'customerId', required: false, type: String })
  @ApiQuery({ name: 'vendorId', required: false, type: String })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Posting date start (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Posting date end (YYYY-MM-DD)',
  })
  @ApiQuery({ name: 'taxGroupCode', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of item ledger entries' })
  findAllItemLedgerEntries(
    @Query('customerId') customerId?: string,
    @Query('vendorId') vendorId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('taxGroupCode') taxGroupCode?: string,
  ) {
    return this.service.findAllItemLedgerEntries({
      customerId,
      vendorId,
      startDate,
      endDate,
      taxGroupCode,
    });
  }
}
