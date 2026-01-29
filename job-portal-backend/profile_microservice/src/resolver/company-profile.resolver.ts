import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CompanyProfile } from 'src/entities/company-profile.entity';
import { AppService } from 'src/app.service';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import {
  CreateCompanyProfileInput,
  UpdateCompanyProfileInput,
} from 'src/dto/companyprofile.dto';

@Resolver(() => CompanyProfile)
export class CompanyProfileResolver {
  constructor(private readonly service: AppService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CompanyProfile)
  createCompanyProfile(
    @Args('input') input: CreateCompanyProfileInput,
  ): Promise<CompanyProfile> {
    return this.service.createCompanyProfile(input);
  }

  @Query(() => [CompanyProfile])
  getAllCompanyProfiles(): Promise<CompanyProfile[]> {
    return this.service.findAllCompanyProfiles();
  }

  @Query(() => CompanyProfile)
  getCompanyProfile(@Args('id') id: string): Promise<CompanyProfile> {
    return this.service.findOneCompanyProfile(id);
  }

  @Mutation(() => CompanyProfile)
  updateCompanyProfile(
    @Args('input') input: UpdateCompanyProfileInput,
  ): Promise<CompanyProfile> {
    return this.service.updateCompanyProfile(input.id, input);
  }

  @Mutation(() => CompanyProfile)
  deleteCompanyProfile(@Args('id') id: string): Promise<CompanyProfile> {
    return this.service.removeCompanyProfile(id);
  }
}
