import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WlcmService } from '../microservices/wlcm.service';
import { CreateWLCMDto, UpdateWLCMDto } from 'src/dtos/wlcm.dto';

@ApiTags('WLCM')
@Controller('wlcm')
export class WlcmController {
  constructor(private readonly wlcmService: WlcmService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new WLCM entry' })
  @ApiResponse({ status: 201, description: 'The WLCM entry has been successfully created.' })
  create(@Body() createWLCMDto: CreateWLCMDto) {
    return this.wlcmService.create(createWLCMDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all WLCM entries' })
  @ApiResponse({ status: 200, description: 'List of WLCM entries retrieved successfully.' })
  findAll() {
    return this.wlcmService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a WLCM entry by ID' })
  @ApiResponse({ status: 200, description: 'WLCM entry retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'WLCM entry not found.' })
  findOne(@Param('id') id: string) {
    return this.wlcmService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a WLCM entry by ID' })
  @ApiResponse({ status: 200, description: 'The WLCM entry has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'WLCM entry not found.' })
  update(@Param('id') id: string, @Body() updateWLCMDto: UpdateWLCMDto) {
    return this.wlcmService.update(+id, updateWLCMDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a WLCM entry by ID' })
  @ApiResponse({ status: 200, description: 'The WLCM entry has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'WLCM entry not found.' })
  remove(@Param('id') id: string) {
    return this.wlcmService.remove(+id);
  }
}
