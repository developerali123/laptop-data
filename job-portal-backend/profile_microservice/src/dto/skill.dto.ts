import { InputType, Field, PartialType } from '@nestjs/graphql';
import { SkillLevel } from '@prisma/client';

@InputType()
export class CreateSkillInput {
  @Field() userProfileId: string;
  @Field() name: string;
  @Field(() => SkillLevel) level: SkillLevel;
}
@InputType()
export class UpdateSkillInput extends PartialType(CreateSkillInput) {
  @Field() id: string;
}
