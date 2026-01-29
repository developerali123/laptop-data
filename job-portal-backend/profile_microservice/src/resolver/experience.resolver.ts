import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from 'src/dto/experience.dto';
import { Experience } from 'src/entities/experience.entity';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly service: AppService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Experience)
  createExperience(
    @Args('input') input: CreateExperienceInput,
  ): Promise<Experience> {
    return this.service.createExperience(input);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [Experience])
  getExperiences(
    @Args('userProfileId') userProfileId: string,
  ): Promise<Experience[]> {
    return this.service.findExperiences(userProfileId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Experience)
  getExperience(@Args('id') id: string): Promise<Experience> {
    return this.service.findExperience(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Experience)
  updateExperience(
    @Args('input') input: UpdateExperienceInput,
  ): Promise<Experience> {
    return this.service.updateExperience(input.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Experience)
  deleteExperience(@Args('id') id: string): Promise<Experience> {
    return this.service.removeExperience(id);
  }
}
