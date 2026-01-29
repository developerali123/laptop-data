import { InputType, Field, PartialType } from '@nestjs/graphql';
import { SocialLinkPlatform } from '@prisma/client';

@InputType()
export class CreateSocialLinkInput {
  @Field() userProfileId: string;
  @Field(() => SocialLinkPlatform) platform: SocialLinkPlatform;
  @Field() url: string;
}
@InputType()
export class UpdateSocialLinkInput extends PartialType(CreateSocialLinkInput) {
  @Field() id: string;
}
