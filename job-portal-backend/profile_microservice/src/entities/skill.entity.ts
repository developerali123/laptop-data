import { Field, ObjectType } from '@nestjs/graphql';
import { SkillLevel } from '@prisma/client';

@ObjectType()
export class Skill {
  @Field() id: string;
  @Field() userProfileId: string;
  @Field() name: string;
  @Field() level: SkillLevel;
}
