import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import {
  CreateCertificationInput,
  UpdateCertificationInput,
} from 'src/dto/certification.dto';
import { Certification } from 'src/entities/certification.entity';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

@Resolver(() => Certification)
export class CertificationResolver {
  constructor(private readonly service: AppService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Certification)
  createCertification(
    @Args('input') input: CreateCertificationInput,
  ): Promise<Certification> {
    return this.service.createCertification(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Certification])
  getCertifications(
    @Args('userProfileId') userProfileId: string,
  ): Promise<Certification[]> {
    return this.service.findCertifications(userProfileId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Certification)
  getCertification(@Args('id') id: string): Promise<Certification> {
    return this.service.findCertification(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Certification)
  updateCertification(
    @Args('input') input: UpdateCertificationInput,
  ): Promise<Certification> {
    return this.service.updateCertification(input.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Certification)
  deleteCertification(@Args('id') id: string): Promise<Certification> {
    return this.service.removeCertification(id);
  }
}
