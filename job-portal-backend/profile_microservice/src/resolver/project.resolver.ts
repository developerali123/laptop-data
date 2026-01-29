import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import { CreateProjectInput, UpdateProjectInput } from 'src/dto/project.dto';
import { Project } from 'src/entities/project.entity';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly service: AppService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  createProject(@Args('input') input: CreateProjectInput): Promise<Project> {
    return this.service.createProject(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Project])
  getProjects(
    @Args('userProfileId') userProfileId: string,
  ): Promise<Project[]> {
    return this.service.findProjects(userProfileId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Project)
  getProject(@Args('id') id: string): Promise<Project> {
    return this.service.findProject(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  updateProject(@Args('input') input: UpdateProjectInput): Promise<Project> {
    return this.service.updateProject(input.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  deleteProject(@Args('id') id: string): Promise<Project> {
    return this.service.removeProject(id);
  }
}
