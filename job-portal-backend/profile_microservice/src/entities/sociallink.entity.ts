import { Field, ObjectType } from '@nestjs/graphql';
import { SocialLinkPlatform } from '@prisma/client';

@ObjectType()
export class SocialLink {
  @Field() id: string;
  @Field() userProfileId: string;
  @Field(() => SocialLinkPlatform) platform: SocialLinkPlatform;
  @Field() url: string;
}
