import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from 'src/app.service';
import {
  CreateSocialLinkInput,
  UpdateSocialLinkInput,
} from 'src/dto/sociallink.dto';
import { SocialLink } from 'src/entities/sociallink.entity';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

@Resolver(() => SocialLink)
export class SocialLinkResolver {
  constructor(private readonly service: AppService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SocialLink)
  createSocialLink(
    @Args('input') input: CreateSocialLinkInput,
  ): Promise<SocialLink> {
    return this.service.createSocialLink(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [SocialLink])
  getSocialLinks(
    @Args('userProfileId') userProfileId: string,
  ): Promise<SocialLink[]> {
    return this.service.findSocialLinks(userProfileId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => SocialLink)
  getSocialLink(@Args('id') id: string): Promise<SocialLink> {
    return this.service.findSocialLink(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SocialLink)
  updateSocialLink(
    @Args('input') input: UpdateSocialLinkInput,
  ): Promise<SocialLink> {
    return this.service.updateSocialLink(input.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SocialLink)
  deleteSocialLink(@Args('id') id: string): Promise<SocialLink> {
    return this.service.removeSocialLink(id);
  }
}
