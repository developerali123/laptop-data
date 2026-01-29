import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import {
  CreateEducationInput,
  UpdateEducationInput,
} from 'src/dto/education.dto';
import { Education } from 'src/entities/education.entity';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

@Resolver(() => Education)
export class EducationResolver {
  constructor(private readonly service: AppService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Education)
  createEducation(
    @Args('input') input: CreateEducationInput,
  ): Promise<Education> {
    return this.service.createEducation(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Education])
  getEducations(
    @Args('userProfileId') userProfileId: string,
  ): Promise<Education[]> {
    return this.service.findEducations(userProfileId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Education)
  getEducation(@Args('id') id: string): Promise<Education> {
    return this.service.findEducation(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Education)
  updateEducation(
    @Args('input') input: UpdateEducationInput,
  ): Promise<Education> {
    return this.service.updateEducation(input.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Education)
  deleteEducation(@Args('id') id: string): Promise<Education> {
    return this.service.removeEducation(id);
  }
}
