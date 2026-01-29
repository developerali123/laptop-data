import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import {
  CreateUserProfileInput,
  UpdateUserProfileInput,
} from 'src/dto/userprofile.dto';
import { UserProfile } from 'src/entities/user-profile.entity';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

@Resolver(() => UserProfile)
export class UserProfileResolver {
  constructor(private readonly service: AppService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserProfile)
  createUserProfile(
    @Args('input') input: CreateUserProfileInput,
  ): Promise<UserProfile> {
    return this.service.createUserProfile(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [UserProfile])
  getAllUserProfiles(): Promise<UserProfile[]> {
    return this.service.findAllUserProfiles();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserProfile)
  getUserProfile(@Args('id') id: string): Promise<UserProfile> {
    return this.service.findUserProfile(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserProfile)
  updateUserProfile(
    @Args('input') input: UpdateUserProfileInput,
  ): Promise<UserProfile> {
    return this.service.updateUserProfile(input.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserProfile)
  deleteUserProfile(@Args('id') id: string): Promise<UserProfile> {
    return this.service.removeUserProfile(id);
  }
}
