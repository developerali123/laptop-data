import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import { CreateHobbyInput, UpdateHobbyInput } from 'src/dto/hobby.dto';
import { Hobby } from 'src/entities/hobby.entity';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

@Resolver(() => Hobby)
export class HobbyResolver {
  constructor(private readonly service: AppService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Hobby)
  createHobby(@Args('input') input: CreateHobbyInput): Promise<Hobby> {
    return this.service.createHobby(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Hobby])
  getHobbies(@Args('userProfileId') userProfileId: string): Promise<Hobby[]> {
    return this.service.findHobbies(userProfileId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Hobby)
  getHobby(@Args('id') id: string): Promise<Hobby> {
    return this.service.findHobby(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Hobby)
  updateHobby(@Args('input') input: UpdateHobbyInput): Promise<Hobby> {
    return this.service.updateHobby(input.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Hobby)
  deleteHobby(@Args('id') id: string): Promise<Hobby> {
    return this.service.removeHobby(id);
  }
}
