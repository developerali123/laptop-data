import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import { CreateSkillInput, UpdateSkillInput } from 'src/dto/skill.dto';
import { Skill } from 'src/entities/skill.entity';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

@Resolver(() => Skill)
export class SkillResolver {
  constructor(private readonly service: AppService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Skill)
  createSkill(@Args('input') input: CreateSkillInput): Promise<Skill> {
    return this.service.createSkill(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Skill])
  getSkills(@Args('userProfileId') userProfileId: string): Promise<Skill[]> {
    return this.service.findSkills(userProfileId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Skill)
  getSkill(@Args('id') id: string): Promise<Skill> {
    return this.service.findSkill(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Skill)
  updateSkill(@Args('input') input: UpdateSkillInput): Promise<Skill> {
    return this.service.updateSkill(input.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Skill)
  deleteSkill(@Args('id') id: string): Promise<Skill> {
    return this.service.removeSkill(id);
  }
}
