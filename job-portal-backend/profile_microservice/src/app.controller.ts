import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@ApiTags('Profile')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('auth.user-created')
  handleOrderPlaced(@Payload() data) {
    console.log('recieved data', data);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate JWT Access Token via Auth Microservice' })
  @ApiResponse({ status: 200, description: 'Token is valid or invalid' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  validateToken(@Body('token') token: string) {
    return this.appService.validateToken(token);
  }

  @Post('import-cv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.docx'];
        const ext = extname(file.originalname).toLowerCase();
        if (!allowedTypes.includes(ext)) {
          return cb(new Error('Only PDF or DOCX files allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiOperation({ summary: 'Import CV and create user profile' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a PDF or DOCX file and provide userId',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        userId: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'CV imported and user profile created/updated',
  })
  async importCV(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: string,
  ) {
    return this.appService.importCv(file, userId);
  }
}
