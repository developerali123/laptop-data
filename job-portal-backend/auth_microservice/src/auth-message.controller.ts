import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AuthMessageController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth.validate-token')
  validateToken(@Payload() token: string) {
    return this.appService.validateToken(token);
  }

  @MessagePattern('auth.validate-company')
  async handleCompanyValidation(@Payload() payload: { companyId: string }) {
    const { companyId } = payload;
    const company = await this.appService.findById(companyId);

    return {
      companyId: company?.id,
      name: company?.name,
      email: company?.email,
    };
  }
}
