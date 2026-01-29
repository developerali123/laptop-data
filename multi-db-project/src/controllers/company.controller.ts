import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateCompanyDto, UpdateTenantCompanyDto } from '../dtos/company.dto';
import { CompanyService } from 'src/services/company.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company and tenant DB' })
  async create(@Body() dto: CreateCompanyDto) {
    return this.service.createCompany(dto);
  }

  // @UseGuards(JwtAuthGuard)
  //   @ApiBearerAuth()
  //   @Post()
  //   @ApiOperation({ summary: 'Post company profile information' })
  //   @ApiResponse({ status: 200, description: 'Profile created successfully' })
  //   async create(@Body() dto: CreateCompanyDto) {
  //     return this.service.createcompany(dto);
  //   }

  @Post('logo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.service.uploadImageFromBuffer(file);
    return { url: result.secure_url };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('updatecompany')
  @ApiOperation({ summary: 'Update company profile including logo file' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(@Body() dto: UpdateTenantCompanyDto) {
    return this.service.updatecompany(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Get company profile' })
  @ApiResponse({ status: 200, description: 'Profile found successfully' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async getcompany() {
    return this.service.getcompany();
  }
}
