import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMasterInfoCodeDto, UpdateMasterInfoCodeDto } from 'src/dtos/masterinfocode.dto';
import { MasterInfoCodeService } from 'src/microservices/masterinfocode.service';

@ApiTags('MasterInfoCode')
@Controller('master-info-code')
export class MasterInfoCodeController {
  constructor(private readonly service: MasterInfoCodeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new MasterInfoCode' })
  @ApiResponse({ status: 201, description: 'The MasterInfoCode has been successfully created.' })
  create(@Body() createDto: CreateMasterInfoCodeDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all MasterInfoCodes' })
  @ApiResponse({ status: 200, description: 'List of MasterInfoCodes retrieved successfully.' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a MasterInfoCode by ID' })
  @ApiResponse({ status: 200, description: 'MasterInfoCode retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'MasterInfoCode not found.' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a MasterInfoCode by ID' })
  @ApiResponse({ status: 200, description: 'The MasterInfoCode has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'MasterInfoCode not found.' })
  update(@Param('id') id: string, @Body() updateDto: UpdateMasterInfoCodeDto) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a MasterInfoCode by ID' })
  @ApiResponse({ status: 200, description: 'The MasterInfoCode has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'MasterInfoCode not found.' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
