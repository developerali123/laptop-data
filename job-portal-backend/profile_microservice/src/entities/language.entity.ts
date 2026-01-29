import { Field, ObjectType } from '@nestjs/graphql';
import { LanguageProficiency } from '@prisma/client';

@ObjectType()
export class Language {
  @Field() id: string;
  @Field() userProfileId: string;
  @Field() name: string;
  @Field(() => LanguageProficiency) proficiency: LanguageProficiency;
}
